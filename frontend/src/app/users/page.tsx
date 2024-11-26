"use client"
import React, { useState, useEffect } from 'react';
import { User } from '@/types/User';
import { Aside } from '@/components/aside';
import { Footer } from '@/components/footer';
import UserService from '@/services/UserService';
import { useRouter } from 'next/navigation';

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await UserService.getAll();
                setUsers(userData);
            } catch (error: any) {
                if (error.response?.status === 401) {
                    setError("Acesso não autorizado. Redirecionando para o login...");
                    router.push('/login');
                }
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

  return (

    <div className="h-screen flex flex-col">
      <div className="flex-1 flex h-4/5">
        
        <Aside />

        <main className="flex-1 flex flex-col">

        <h1 className="text-4xl font-bold uppercase w-full
           bg-white/40 p-6 text-center">
            Sistema de Gestão de Manutenção</h1>

            <div className="flex flex-col gap-2 p-6 pt-0">

                {error && <div className="text-red-500">{error}</div>}
                    
                <h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
                
                {loading && <div className="text-2xl font-bold text-white">Carregando...</div>}
                {users.length > 0 ? (
                    <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">E-mail</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                        <tr
                            key={user.id}
                            className="hover:bg-gray-50 cursor-pointer"
                        >
                            <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                            <td className="border border-gray-300 px-4 py-2">
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-600">Nenhum usuário encontrado.</p>
                )}
            </div>


        </main>

      </div>

      <Footer />

    </div>
  );
};

export default UsersList;