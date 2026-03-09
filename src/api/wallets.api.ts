import type {
    Wallet,
    WalletAsset,
    CreateWalletBody,
    UpdateWalletBody,
    CreateWalletAssetBody,
    UpdateWalletAssetBody,
} from './types';
import { apiClient } from './axios';

// ── Wallets ───────────────────────────────────────────────────────────────────

export const getWallets = async (): Promise<Wallet[]> => {
    const { data } = await apiClient.get<Wallet[]>('/wallets');
    return data;
};

export const getWallet = async (id: string): Promise<Wallet> => {
    const { data } = await apiClient.get<Wallet>(`/wallets/${id}`);
    return data;
};

export const createWallet = async (body: CreateWalletBody): Promise<Wallet> => {
    const { data } = await apiClient.post<Wallet>('/wallets', body);
    return data;
};

export const updateWallet = async (id: string, body: UpdateWalletBody): Promise<Wallet> => {
    const { data } = await apiClient.patch<Wallet>(`/wallets/${id}`, body);
    return data;
};

export const deleteWallet = async (id: string): Promise<void> => {
    await apiClient.delete(`/wallets/${id}`);
};

// ── Wallet Assets ─────────────────────────────────────────────────────────────

export const createWalletAsset = async (body: CreateWalletAssetBody): Promise<WalletAsset> => {
    const { data } = await apiClient.post<WalletAsset>('/wallets/assets', body);
    return data;
};

export const updateWalletAsset = async (id: string, body: UpdateWalletAssetBody): Promise<WalletAsset> => {
    const { data } = await apiClient.patch<WalletAsset>(`/wallets/assets/${id}`, body);
    return data;
};

export const deleteWalletAsset = async (id: string): Promise<void> => {
    await apiClient.delete(`/wallets/assets/${id}`);
};
