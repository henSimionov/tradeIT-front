import apiClient from '@/api/axios';
import type { IAsset } from '@/api/assets/asset.types';

const BASE_URL = '/api/assets';

export const getAssets = async () => {
    const { data } = await apiClient.get<IAsset[]>(BASE_URL);
    return data;
};
