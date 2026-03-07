import apiClient from './axios';
import type { User, CreateUserBody, UpdateUserBody } from '@/types';

export const getUser = async (id: string) => {
    const { data } = await apiClient.get<User>(`/users/${id}`);
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

export const deleteUser = async (id: string) => {
    await apiClient.delete(`/users/${id}`);
};
