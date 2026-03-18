import type { IWallet } from '@/api/wallet/wallet.types';

export enum UserRoleEnum {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRoleEnum;
    createdAt: string;
    updatedAt: string;
    wallets: IWallet[];
    initials: string;
}

export interface ICreateUserBody {
    firstName: string;
    lastName: string;
    email: string;
}

export type TUpdateUserBody = Partial<ICreateUserBody>;
