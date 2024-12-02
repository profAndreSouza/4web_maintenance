import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'https://sua-api.com';

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export const login = async (email: string, password: string): Promise<LoginResponse['user']> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    const data: LoginResponse = response.data;
    await saveToken('authToken', data.token);
    return data.user;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('Credenciais inválidas');
    }
    throw new Error('Erro ao conectar com o servidor');
  }
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.status === 200;
  } catch {
    return false;
  }
};

export const logout = async (): Promise<void> => {
  await deleteToken('authToken');
};

export const saveToken = async (key: string, value: string): Promise<void> => {
  await SecureStore.setItemAsync(key, value);
};

export const getToken = async (key: string): Promise<string | null> => {
  return await SecureStore.getItemAsync(key);
};

export const deleteToken = async (key: string): Promise<void> => {
  await SecureStore.deleteItemAsync(key);
};
