export type AssetType = 'STOCK' | 'CRYPTO' | 'VIRTUAL_COIN';

export interface Asset {
    id: string;
    euid: string;
    displayName: string;
    type: AssetType;
    value: number;
    createdAt: string;
    updatedAt: string;
}

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

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    wallets?: Wallet[];
}

export interface CreateUserBody {
    firstName: string;
    lastName: string;
    email: string;
}

export interface UpdateUserBody {
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface CreateWalletBody {
    displayName: string;
    userId: string;
}

export interface UpdateWalletBody {
    displayName?: string;
}

export interface CreateWalletAssetBody {
    walletId: string;
    assetId: string;
    quantity: number;
}

export interface UpdateWalletAssetBody {
    quantity?: number;
}
