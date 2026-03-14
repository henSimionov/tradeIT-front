import axios from 'axios';
import { config } from '@/config';

const apiClient = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(async (axiosConfig) => {
    const token = await window.Clerk?.session?.getToken();
    if (!token) throw new Error('No auth token available');
    axiosConfig.headers.Authorization = `${config.clerk.tokenMethod} ${token}`;
    return axiosConfig;
});

export default apiClient;
