import type { Asset } from './types';
import { apiClient } from './axios';

export const getAssets = async (): Promise<Asset[]> => {
    const { data } = await apiClient.get<Asset[]>('/assets');
    return data;
};
