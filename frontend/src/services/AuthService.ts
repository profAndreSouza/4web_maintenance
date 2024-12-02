import axios from 'axios';
import { UserLogin } from '@/types/UserLogin';

// const BASE_URL = 'http://localhost:3002/api/Auth';

class AuthService {

    static async login(userData: UserLogin): Promise<string> {
        try {
            // const response = await axios.post(BASE_URL, userData);
            const response = {'data': 'token'};
            localStorage.setItem('token', response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async logout() {
        localStorage.removeItem('token');
    }

}

export default AuthService;