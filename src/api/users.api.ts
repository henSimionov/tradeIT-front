import type { User, CreateUserBody, UpdateUserBody } from './types';
import { apiClient } from './axios';

export const getUser = async (id: string): Promise<User> => {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data;
};

export const createUser = async (body: CreateUserBody): Promise<User> => {
    const { data } = await apiClient.post<User>('/users', body);
    return data;
};

export const updateUser = async (id: string, body: UpdateUserBody): Promise<User> => {
    const { data } = await apiClient.patch<User>(`/users/${id}`, body);
    return data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
};
