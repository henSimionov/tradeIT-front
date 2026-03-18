import apiClient from '@/api/axios';
import type { IUser, ICreateUserBody, TUpdateUserBody } from '@/api/user/user.types';

const USER_ENDPOINT = '/api/users';

export const getUser = async () => {
    const { data } = await apiClient.get<IUser>(`${USER_ENDPOINT}/me`);
    return data;
};

export const createUser = async (body: ICreateUserBody) => {
    const { data } = await apiClient.post<IUser>(USER_ENDPOINT, body);
    return data;
};

export const updateUser = async (id: string, body: TUpdateUserBody) => {
    const { data } = await apiClient.put<IUser>(`${USER_ENDPOINT}/${id}`, body);
    return data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await apiClient.delete(`${USER_ENDPOINT}/${id}`);
};
