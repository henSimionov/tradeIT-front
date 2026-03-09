import type { User, CreateUserBody, UpdateUserBody } from '@/api/types';
import { apiClient } from '@/api/axios';

const USERS_PREFIX = '/users';

export const getUsers = async () => {
    const { data } = await apiClient.get<User[]>(USERS_PREFIX);
    return data;
};

export const getUser = async (id: string) => {
    const { data } = await apiClient.get<User>(`${USERS_PREFIX}/${id}`);
    return data;
};

export const createUser = async (body: CreateUserBody) => {
    const { data } = await apiClient.post<User>(USERS_PREFIX, body);
    return data;
};

export const updateUser = async (id: string, body: UpdateUserBody) => {
    const { data } = await apiClient.patch<User>(`${USERS_PREFIX}/${id}`, body);
    return data;
};

export const deleteUser = async (id: string) => {
    await apiClient.delete(`${USERS_PREFIX}/${id}`);
};
