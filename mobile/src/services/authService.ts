import axios from 'axios';

// URL base da API (substitua pela URL da sua API)
const API_BASE_URL = 'https://sua-api.com';

// Tipos
export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

// Função de login
export const login = async (email: string, password: string): Promise<LoginResponse['user']> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    // Supondo que a resposta contenha o token e informações do usuário
    const data: LoginResponse = response.data;

    // Armazenar o token em local seguro (não feito aqui, mas no contexto global ou SecureStore)
    return data.user;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('Credenciais inválidas');
    }
    throw new Error('Erro ao conectar com o servidor');
  }
};

// Função para verificar o token (opcional)
export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Função de logout (opcional)
export const logout = async (): Promise<void> => {
  // Limpeza local de dados relacionados ao usuário (por exemplo, SecureStore)
};
