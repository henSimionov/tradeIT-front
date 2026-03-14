import apiClient from '@/api/axios';
import type {
    Wallet,
    WalletAsset,
    CreateWalletBody,
    UpdateWalletBody,
    CreateWalletAssetBody,
    UpdateWalletAssetBody,
} from '@/api/wallet/wallet.types';

export const getWallets = async () => {
    const { data } = await apiClient.get<Wallet[]>('/wallets');
    return data;
};

export const getWallet = async (id: string) => {
    const { data } = await apiClient.get<Wallet>(`/wallets/${id}`);
    return data;
};

export const createWallet = async (body: CreateWalletBody) => {
    const { data } = await apiClient.post<Wallet>('/wallets', body);
    return data;
};

export const updateWallet = async (id: string, body: UpdateWalletBody) => {
    const { data } = await apiClient.put<Wallet>(`/wallets/${id}`, body);
    return data;
};

export const deleteWallet = async (id: string) => {
    await apiClient.delete(`/wallets/${id}`);
};

export const createWalletAsset = async (body: CreateWalletAssetBody) => {
    const { data } = await apiClient.post<WalletAsset>('/wallets/assets', body);
    return data;
};

export const updateWalletAsset = async (id: string, body: UpdateWalletAssetBody) => {
    const { data } = await apiClient.put<WalletAsset>(`/wallets/assets/${id}`, body);
    return data;
};

export const deleteWalletAsset = async (id: string) => {
    await apiClient.delete(`/wallets/assets/${id}`);
};
