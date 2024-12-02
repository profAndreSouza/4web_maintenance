"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserLogin } from "@/types/UserLogin";
import AuthService from "@/services/AuthService";
import Alert from "@/components/login/Alert";
import LoginForm from "@/components/login/LoginForm";
import LoadingSpinner from "@/components/login/LoadingSpinner";

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (userData: UserLogin) => {
    setIsLoading(true);
    setError(null);

    // Simula a autenticação
    AuthService.login(userData)
      .then((token) => {
        setError("Usuário Autenticado com sucesso");
        router.push('/');
      })
      .catch((error) => {
        const response = error.response ? JSON.stringify(error.response.data, null, 4) : "Erro desconhecido";
        console.log(error);
        setError(response);
      });
      
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
      {error && <Alert message={error} type="error" />}
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default LoginPage;