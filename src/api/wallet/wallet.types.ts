import type { IAsset } from '@/api/assets/asset.types';

export interface IWalletAsset {
    id: string;
    quantity: number;
    walletId: string;
    assetId: string;
    asset: IAsset;
    createdAt: string;
    updatedAt: string;
}

export interface IWallet {
    id: string;
    userId: string;
    displayName: string;
    walletAssets?: IWalletAsset[];
    createdAt: string;
    updatedAt: string;
}

export interface ICreateWalletBody {
    displayName: string;
}

export type TUpdateWalletBody = Partial<ICreateWalletBody>;

export interface ICreateWalletAssetBody {
    walletId: string;
    assetId: string;
    quantity: number;
}

export type TUpdateWalletAssetBody = Partial<ICreateWalletAssetBody>;