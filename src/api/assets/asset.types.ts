export type AssetType = 'STOCK' | 'CRYPTO' | 'VIRTUAL_COIN';

export interface IAsset {
    id: string;
    euid: string;
    displayName: string;
    type: AssetType;
    value: number;
    createdAt: string;
    updatedAt: string;
}
