import axios from 'axios';

import { LOCAL_STORAGE_KEY } from 'libs/local-storage-client';

export type ApiRequestMethods = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';
export const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;
export const RATES_URL = `${process.env.REACT_APP_API_BASE_URL}/rates`;
export const PAYMENTS_URL = `${process.env.REACT_APP_API_BASE_URL}/payments`;
const CLIENT_API_TOKEN = process.env.REACT_APP_CLIENT_API_TOKEN;

export const axiosClient = <T = Record<string, string>>(method: ApiRequestMethods = 'GET', data?: T) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        method,
        data,
        timeout: 7000,
        headers: { 'client-api-token': CLIENT_API_TOKEN }
    });
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
    instance.interceptors.request.use(function (config) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    return instance;
};
