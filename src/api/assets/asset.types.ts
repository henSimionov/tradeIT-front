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
