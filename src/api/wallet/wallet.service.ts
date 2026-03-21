import apiClient from '@/api/axios';
import type {
    IWallet,
    IWalletAsset,
    ICreateWalletBody,
    TUpdateWalletBody,
    ICreateWalletAssetBody,
    TUpdateWalletAssetBody,
} from '@/api/wallet/wallet.types';

const BASE_URL = '/api/wallets';
const WALLETS_ASSETS_BASE_URL = `${BASE_URL}/assets`;

export const getWallets = async () => {
    const { data } = await apiClient.get<IWallet[]>(BASE_URL);
    return data;
};

export const getWallet = async (id: string) => {
    const { data } = await apiClient.get<IWallet>(`${BASE_URL}/${id}`);
    return data;
};

export const createWallet = async (body: ICreateWalletBody) => {
    const { data } = await apiClient.post<IWallet>(BASE_URL, body);
    return data;
};

export const updateWallet = async (id: string, body: TUpdateWalletBody) => {
    const { data } = await apiClient.put<IWallet>(`${BASE_URL}/${id}`, body);
    return data;
};

export const deleteWallet = async (id: string) => {
    await apiClient.delete(`${BASE_URL}/${id}`);
};

export const createWalletAsset = async (body: ICreateWalletAssetBody) => {
    const { data } = await apiClient.post<IWalletAsset>(WALLETS_ASSETS_BASE_URL, body);
    return data;
};

export const updateWalletAsset = async (id: string, body: TUpdateWalletAssetBody) => {
    const { data } = await apiClient.put<IWalletAsset>(`${WALLETS_ASSETS_BASE_URL}/${id}`, body);
    return data;
};

export const deleteWalletAsset = async (id: string) => {
    await apiClient.delete(`${WALLETS_ASSETS_BASE_URL}/${id}`);
};
