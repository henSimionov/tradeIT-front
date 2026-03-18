import apiClient from '@/api/axios';
import type {
    IWallet,
    IWalletAsset,
    ICreateWalletBody,
    TUpdateWalletBody,
    ICreateWalletAssetBody,
    TUpdateWalletAssetBody,
} from '@/api/wallet/wallet.types';

const WALLETS_ENDPOINT = '/api/wallets';
const WALLETS_ASSETS_ENDPOINT = '/api/wallets/assets';

export const getWallets = async () => {
    const { data } = await apiClient.get<IWallet[]>(WALLETS_ENDPOINT);
    return data;
};

export const getWallet = async (id: string) => {
    const { data } = await apiClient.get<IWallet>(`${WALLETS_ENDPOINT}/${id}`);
    return data;
};

export const createWallet = async (body: ICreateWalletBody) => {
    const { data } = await apiClient.post<IWallet>(WALLETS_ENDPOINT, body);
    return data;
};

export const updateWallet = async (id: string, body: TUpdateWalletBody) => {
    const { data } = await apiClient.put<IWallet>(`${WALLETS_ENDPOINT}/${id}`, body);
    return data;
};

export const deleteWallet = async (id: string) => {
    await apiClient.delete(`${WALLETS_ENDPOINT}/${id}`);
};

export const createWalletAsset = async (body: ICreateWalletAssetBody) => {
    const { data } = await apiClient.post<IWalletAsset>(WALLETS_ASSETS_ENDPOINT, body);
    return data;
};

export const updateWalletAsset = async (id: string, body: TUpdateWalletAssetBody) => {
    const { data } = await apiClient.put<IWalletAsset>(`${WALLETS_ASSETS_ENDPOINT}/${id}`, body);
    return data;
};

export const deleteWalletAsset = async (id: string) => {
    await apiClient.delete(`${WALLETS_ASSETS_ENDPOINT}/${id}`);
};
