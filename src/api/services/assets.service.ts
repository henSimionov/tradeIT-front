import type { Asset } from '@/api/types';
import { apiClient } from '@/api/axios';

const ASSETS_PREFIX = '/assets';

export const getAssets = async () => {
    const { data } = await apiClient.get<Asset[]>(ASSETS_PREFIX);
    return data;
};
