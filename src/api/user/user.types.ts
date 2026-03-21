
export interface IUser {
    id: string;
    euid: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateUserBody {
    firstName: string;
    lastName: string;
    email: string;
}

export type TUpdateUserBody = Partial<ICreateUserBody>;
