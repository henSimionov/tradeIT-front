import type { Wallet } from '@/api/wallet/wallet.types';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    wallets: Wallet[];
}

export interface CreateUserBody {
    firstName: string;
    lastName: string;
    email: string;
}

export type UpdateUserBody = Partial<CreateUserBody>;
