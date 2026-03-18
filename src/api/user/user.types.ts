import type { IWallet } from '@/api/wallet/wallet.types';

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    wallets: IWallet[];
}

export interface ICreateUserBody {
    firstName: string;
    lastName: string;
    email: string;
}

export type TUpdateUserBody = Partial<ICreateUserBody>;
