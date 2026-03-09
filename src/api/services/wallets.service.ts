import type {
    Wallet,
    WalletAsset,
    CreateWalletBody,
    UpdateWalletBody,
    CreateWalletAssetBody,
    UpdateWalletAssetBody,
} from '@/api/types';
import { apiClient } from '@/api/axios';

const WALLETS_PREFIX = '/wallets';
const WALLET_ASSETS_PREFIX = `${WALLETS_PREFIX}/assets`;

export const getWallets = async () => {
    const { data } = await apiClient.get<Wallet[]>(WALLETS_PREFIX);
    return data;
};

export const getWallet = async (id: string) => {
    const { data } = await apiClient.get<Wallet>(`${WALLETS_PREFIX}/${id}`);
    return data;
};

export const createWallet = async (body: CreateWalletBody) => {
    const { data } = await apiClient.post<Wallet>(WALLETS_PREFIX, body);
    return data;
};

export const updateWallet = async (id: string, body: UpdateWalletBody) => {
    const { data } = await apiClient.patch<Wallet>(`${WALLETS_PREFIX}/${id}`, body);
    return data;
};

export const deleteWallet = async (id: string) => {
    await apiClient.delete(`${WALLETS_PREFIX}/${id}`);
};

export const createWalletAsset = async (body: CreateWalletAssetBody) => {
    const { data } = await apiClient.post<WalletAsset>(WALLET_ASSETS_PREFIX, body);
    return data;
};

export const updateWalletAsset = async (id: string, body: UpdateWalletAssetBody) => {
    const { data } = await apiClient.patch<WalletAsset>(`${WALLET_ASSETS_PREFIX}/${id}`, body);
    return data;
};

export const deleteWalletAsset = async (id: string) => {
    await apiClient.delete(`${WALLET_ASSETS_PREFIX}/${id}`);
};
