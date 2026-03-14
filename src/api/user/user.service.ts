import apiClient from '@/api/axios';
import type { User, CreateUserBody, UpdateUserBody } from '@/api/user/user.types';

export const getUser = async () => {
    const { data } = await apiClient.get<User>('/users/me');
    return data;
};

export const createUser = async (body: CreateUserBody) => {
    const { data } = await apiClient.post<User>('/users', body);
    return data;
};

export const updateUser = async (id: string, body: UpdateUserBody) => {
    const { data } = await apiClient.put<User>(`/users/${id}`, body);
    return data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
};
