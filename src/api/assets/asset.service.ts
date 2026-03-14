import apiClient from '@/api/axios';
import type { Asset } from '@/api/assets/asset.types';

export const getAssets = async () => {
    const { data } = await apiClient.get<Asset[]>('/assets');
    return data;
};
