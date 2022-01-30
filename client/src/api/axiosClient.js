import Axios from 'axios';
import queryString from 'query-string';

import apiConfig from './apiConfig';

const axios = Axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify({ ...params, api_key: apiConfig.apiKey })
});

axios.interceptors.request.use(async (config) => config);

axios.interceptors.response.use((response) => {
    if (response && response.data) return response.data;
    return response;
}, (error) => {
    throw error;
});

export default axios;