import apiClient from '@/api/axios';
import type { IAsset } from '@/api/assets/asset.types';

const ASSETS_ENDPOINT = '/api/assets';

export const getAssets = async () => {
    const { data } = await apiClient.get<IAsset[]>(ASSETS_ENDPOINT);
    return data;
};
