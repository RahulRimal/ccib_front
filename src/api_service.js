import axios from 'axios';
import { Cookies } from 'react-cookie';

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
        console.log('Request:', config);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        if (error.response) {
            console.error('Error Response:', error.response);
            //   Handle specific error like 401 status
            if (error.response.status === 401) {
                // Handle unauthorized access
            }
        }
        return Promise.reject(error);
    }
);

// API methods
const get = (url, params = {}, config = {}) => api.get(url, {...config, params});
const post = (url, data, config = {}) => api.post(url, data, config);
const put = (url, data, config = {}) => api.put(url, data, config);
const patch = (url, data, config = {}) => api.patch(url, data, config);
const del = (url, config = {}) => api.delete(url, config);

const apiService = {
    get,
    post,
    put,
    patch,
    delete: del,
};

export default apiService;
