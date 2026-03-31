import apiClient from "../axios";
import { IToken } from "./api-keys.types";

const API_KEYS_ENDPOINT = '/api/api-keys';

export const generateToken = async (expirationTime: string) => {
    const { data } = await apiClient.post<IToken>(`${API_KEYS_ENDPOINT}/generate-token`, { expirationTime });
    return data;
};
