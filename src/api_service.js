import axios from 'axios';
import { Cookies } from 'react-cookie';
import { mainUrl } from './constants';
import { enqueueSnackbar } from 'notistack';
import { isEmptyObject } from './helpers';

const api = axios.create({
    baseURL: 'http://192.168.1.71:9000',
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    config => {
        const userCookie = new Cookies();
        const token = userCookie.get("access");
        if (token) config.headers['Authorization'] = `JWT ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        if (error.response) {

            let cookie = new Cookies();
            console.error('Error Response:', error.response);
            if (error.response.status === 401) {
                if (error.request.responseURL === `${mainUrl}/auth/refresh-token/`) {
                    cookie.remove('access');
                    cookie.remove('refresh');
                    window.location.href = '/signin';
                    enqueueSnackbar('Session Expired, please login to continue', { variant: 'error' });
                    return Promise.reject(error);
                }
                // Handle access token expiration
                if (error.response.data.code && error.response.data.code === 'token_not_valid') {
                    let refresh = cookie.get('refresh');
                    try {
                        const response = await api.post(`${mainUrl}/auth/refresh-token/`, { "refresh": refresh });
                        cookie.set('access', response.data.access, { path: '/' });
                        api.defaults.headers['Authorization'] = `JWT ${response.data.access}`;
                        return api(error.config);
                    } catch (error) {
                        cookie.remove('access');
                        cookie.remove('refresh');
                        window.location.href = '/signin';
                        enqueueSnackbar('Session Expired, please login to continue', { variant: 'error' });
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
const get = (url, params = {}, config = {}) => api.get(url, { ...config, params });
const post = (url, data, config = {}) => api.post(url, data, config);
const put = (url, data, config = {}) => api.put(url, data, config);
const patch = (url, data, config = {}) => api.patch(url, data, config);
const del = (url, config = {}) => api.delete(url, config);

export const filterTable = async (filterParmas, url, setData, setTableLoading, {responseHandler = null} = {}) => {
    setTableLoading(true);
    
    if (isEmptyObject(filterParmas)) {
        return;
    }

    try {
        const response = await apiService.get(url, filterParmas);
        if (response.status === 200) {
            if (responseHandler) {
                response.data = responseHandler(response.data);
            }
            setData(response.data);
        }
    } catch (error) {
        console.error(error);
    }
    finally {
        setTableLoading(false);
    }
};



const apiService = {
    get,
    post,
    put,
    patch,
    delete: del,
    filterTable
};


export default apiService;
