import type { Asset } from './asset.types';

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
    createdAt: string;
    updatedAt: string;
    walletAssets: WalletAsset[];
}

export interface CreateWalletBody {
    displayName: string;
    userId: string;
}

export type UpdateWalletBody = Partial<CreateWalletBody>;

export interface CreateWalletAssetBody {
    walletId: string;
    assetId: string;
    quantity: number;
}

export type UpdateWalletAssetBody = Partial<CreateWalletAssetBody>;
