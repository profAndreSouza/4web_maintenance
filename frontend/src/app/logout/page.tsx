"use client"
import AuthService from "@/services/AuthService";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
    
    const router = useRouter();
    AuthService.logout()
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        const response = error.response ? JSON.stringify(error.response.data, null, 4) : "Erro desconhecido";
        console.log(error);
        router.push('/');
      });

    return <>Logout</>
};

export default LogoutPage;