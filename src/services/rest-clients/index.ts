import axios from 'axios';

import { ENV, getEnv } from 'format-env';
import { LOCAL_STORAGE_KEY } from 'libs/local-storage-client';

export type ApiRequestMethods = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';
export const BASE_URL = `${getEnv(ENV.REACT_APP_API_BASE_URL)}`;
export const PUBLIC_KEY = `${getEnv(ENV.REACT_APP_PUBLIC_KEY)}`;
export const RATES_URL = `${BASE_URL}/rates`;
export const PAYMENTS_URL = `${BASE_URL}/payments`;
export const CLIENT_API_TOKEN = getEnv(ENV.REACT_APP_CLIENT_API_TOKEN);

export const axiosClient = <T = Record<string, string>>(method: ApiRequestMethods = 'GET', data?: T) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        method,
        data,
        timeout: 7000,
        headers: { 'client-api-token': CLIENT_API_TOKEN, public_key: 'e62c738069e69dd5ae5b4593a9925366c629e7cd16280df6fc40a6216d78aaad' }
    });
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
    instance.interceptors.request.use(function (config) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    return instance;
};
