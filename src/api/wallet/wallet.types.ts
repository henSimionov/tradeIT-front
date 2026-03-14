import type { Asset } from '@/api/assets/asset.types';

export interface WalletAsset {
    id: string;
    quantity: number;
    walletId: string;
    assetId: string;
    asset: Asset;
    createdAt: string;
    updatedAt: string;
}

export interface Wallet {
    id: string;
    userId: string;
    displayName: string;
    walletAssets?: WalletAsset[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateWalletBody {
    displayName: string;
}

export type UpdateWalletBody = Partial<CreateWalletBody>;

export interface CreateWalletAssetBody {
    walletId: string;
    assetId: string;
    quantity: number;
}

export type UpdateWalletAssetBody = Partial<CreateWalletAssetBody>;
