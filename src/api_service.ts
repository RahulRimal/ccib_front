import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Cookies } from "react-cookie";
import { mainUrl } from "./constants";
import { enqueueSnackbar } from "notistack";
import { isEmptyObject } from "./helpers";
import { Dispatch, SetStateAction } from "react";

const api = axios.create({
  baseURL: "http://192.168.1.71:9000",
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const userCookie = new Cookies();
    const token = userCookie.get("access");
    if (token) config.headers["Authorization"] = `JWT ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      let cookie = new Cookies();
      console.error("Error Response:", error.response);
      if (error.response.status === 401) {
        if (error.request.responseURL === `${mainUrl}/auth/refresh-token/`) {
          cookie.remove("access");
          cookie.remove("refresh");
          window.location.href = "/signin";
          enqueueSnackbar("Session Expired, please login to continue", {
            variant: "error",
          });
          return Promise.reject(error);
        }
        // Handle access token expiration
        if (
          error.response.data.code &&
          error.response.data.code === "token_not_valid"
        ) {
          let refresh = cookie.get("refresh");
          try {
            const response = await api.post(`${mainUrl}/auth/refresh-token/`, {
              refresh: refresh,
            });
            cookie.set("access", response.data.access, { path: "/" });
            api.defaults.headers[
              "Authorization"
            ] = `JWT ${response.data.access}`;
            return api(error.config);
          } catch (error) {
            cookie.remove("access");
            cookie.remove("refresh");
            window.location.href = "/signin";
            enqueueSnackbar("Session Expired, please login to continue", {
              variant: "error",
            });
            return Promise.reject(error);
          }
        }
        // enqueueSnackbar('Something went wrong', { variant: 'error' });
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// API methods
const get = <T>(
  url: string,
  params: Record<string, any> = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => api.get<T>(url, { ...config, params });

const post = <T>(
  url: string,
  data: Record<string, any>,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => api.post<T>(url, data, config);

const put = <T>(
  url: string,
  data: Record<string, any>,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => api.put<T>(url, data, config);

const patch = <T>(
  url: string,
  data: Record<string, any>,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => api.patch<T>(url, data, config);

const del = <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => api.delete<T>(url, config);

export const filterTable = async <T>(
  filterParams: Record<string, any>,
  url: string,
  setData: Dispatch<SetStateAction<T[]>>,
  setTableLoading: Dispatch<SetStateAction<boolean>>,
  {
    responseHandler = null,
  }: { responseHandler?: ((data: any) => T[]) | null } = {}
): Promise<void> => {
  setTableLoading(true);

  if (isEmptyObject(filterParams)) {
    setTableLoading(false);
    return;
  }

  try {
    const response = await get<T[]>(url, filterParams);
    if (response.status === 200) {
      if (responseHandler) {
        response.data = responseHandler(response.data);
      }
      setData(response.data);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setTableLoading(false);
  }
};

const apiService = <Record<string, any>>{
  get,
  post,
  put,
  patch,
  delete: del,
  filterTable,
};

export default apiService;
