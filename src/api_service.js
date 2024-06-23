import { Cookies } from "react-cookie";
import { mainUrl } from "@/app/constants";
import { enqueueSnackbar } from "notistack";

class CustomFetchError extends Error {
  constructor(message, data) {
    super(message);
    this.data = data;
  }
}

const customFetch = async (url, options = {}) => {
  const cookies = new Cookies();
  const token = cookies.get("access");

  const headers = {
    ...options.headers,
    ...(token ? { "Authorization": `JWT ${token}` } : {}),
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers,
    mode: 'cors', // Ensure CORS mode is enabled
  };

  console.log("Request URL:", url);
  console.log("Request Config:", config);

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401) {
        if (errorData.code === "token_not_valid") {
          const refreshToken = cookies.get("refresh");
          if (refreshToken) {
            try {
              const refreshResponse = await fetch(`${mainUrl}/auth/refresh-token/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
              });

              if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                cookies.set("access", refreshData.access, { path: "/" });
                return customFetch(url, options); // Retry original request
              } else {
                cookies.remove("access");
                cookies.remove("refresh");
                window.location.href = "/signin";
                enqueueSnackbar("Session Expired, please login to continue", {
                  variant: "error",
                });
                return;
              }
            } catch (error) {
              cookies.remove("access");
              cookies.remove("refresh");
              window.location.href = "/signin";
              enqueueSnackbar("Session Expired, please login to continue", {
                variant: "error",
              });
              return;
            }
          } else {
            cookies.remove("access");
            cookies.remove("refresh");
            window.location.href = "/signin";
            enqueueSnackbar("Session Expired, please login to continue", {
              variant: "error",
            });
            return;
          }
        } else {
          if (!errorData) {
            throw new CustomFetchError("Something went wrong", null);
          } else {
            let data = null;
            if (errorData.details === undefined) {
              data = [errorData.detail]; // Converting to array because raised error is being caught and treated as array in signIn page
            } else {
              data = errorData.details;
            }
            throw new CustomFetchError(JSON.stringify(data));
          }
        }
      }
    }

    return response;
  } catch (error) {
    if (error instanceof CustomFetchError) {
      throw error; // Rethrow custom errors to be handled outside
    } else {
      console.error("Fetch error:", error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
      return Promise.reject(error);
    }
  }
};

const get = (url, params = {}, options = {}) => {
  const queryString = new URLSearchParams(params).toString();
  if (queryString) url += `?${queryString}`;
  return customFetch( url, options);
};

const post = (url, data, options = {}) =>
  customFetch(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });

const put = (url, data, options = {}) =>
  customFetch(url, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });

const patch = (url, data, options = {}) =>
  customFetch(url, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(data),
  });

const del = (url, options = {}) =>
  customFetch(url, {
    ...options,
    method: "DELETE",
  });

const apiService = {
  get,
  post,
  put,
  patch,
  delete: del,
};

export default apiService;
