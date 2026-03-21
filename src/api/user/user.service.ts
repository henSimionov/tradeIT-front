import apiClient from '@/api/axios';
import type { IUser } from '@/api/user/user.types';

const BASE_URL = '/users';

export const getUser = async () => {
    const { data } = await apiClient.get<IUser>(`${BASE_URL}/me`);
    return data;
};
