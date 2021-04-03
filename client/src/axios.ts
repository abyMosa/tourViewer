import axios, { AxiosInstance, AxiosError } from 'axios';

export const api: AxiosInstance = axios.create({
    baseURL: '/api',
});

// used in two places 1- login 2- page refreshed
export const setAuthHeader = (token: (string | null)) => {
    if (token) {
        api.defaults.headers.common['auth-token'] = token;
    } else {
        delete api.defaults.headers.common['auth-token'];
    }
}

export const axiosErr = (err: AxiosError) => err.response ? err.response.data.message : err.message;