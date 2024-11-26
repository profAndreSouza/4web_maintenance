"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserLogin } from "@/types/UserLogin";
import AuthService from "@/services/AuthService";

const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {

    e.preventDefault();
    setError(null);

    const loginData: UserLogin = {
      username: username,
      password: password
    }

    AuthService.login(loginData)
      .then((token) => {
        setError("Usuário Autenticado com sucesso");
        router.push('/');
      })
      .catch((error) => {
        const response = error.response ? JSON.stringify(error.response.data, null, 4) : "Erro desconhecido";
        console.log(error);
        setError(response);
      });
    

  }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-sm p-8 space-y-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-700">Entrar</h2>
    
            {error && <div className="text-red-500">{error}</div>}

            <form className="space-y-4" method="post" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  E-mail
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome de usuário"
                  required
                />
              </div>
    
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sua senha"
                />
              </div>
    
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Entrar
                </button>
              </div>
            </form>
    

            <div className="mt-4 text-center">
                <a
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                >
                    Esqueceu sua senha?
                </a>
            </div>

        <div className="mt-4 text-center">
          <a
            href="/register"
            className="text-sm text-blue-600 hover:underline"
          >
            Não tem uma conta? Registre-se aqui
          </a>
        </div>
          </div>
        </div>
    );
}

export default LoginPage;