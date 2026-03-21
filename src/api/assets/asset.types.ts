
export type TAssetType = 'STOCK' | 'CRYPTO' | 'VIRTUAL_COIN';

export interface IAsset {
    id: string;
    euid: string;
    displayName: string;
    type: TAssetType;
    value: number;
    createdAt: string;
    updatedAt: string;
}
