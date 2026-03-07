import apiClient from './axios';
import type { Asset } from '@/types';

export const getAssets = async () => {
    const { data } = await apiClient.get<Asset[]>('/assets');
    return data;
};