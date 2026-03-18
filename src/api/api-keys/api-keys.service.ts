import apiClient from "../axios";
import { IgenerateTokenBody, IToken } from "./api-keys.types";

const API_KEYS_ENDPOINT = '/api/api-keys';

export const generateToken = async (body: IgenerateTokenBody) => {
    console.log('Generating token with body:', body);
    const { data } = await apiClient.post<IToken>(`${API_KEYS_ENDPOINT}/generate-token`, body)
    return data;
};
