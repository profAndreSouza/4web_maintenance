import axios from 'axios';
import { User } from '@/types/User';

const BASE_URL = 'http://localhost:3002/api/User';

class UserService {

    static async create(userData: User): Promise<User> {
        try {
            const response = await axios.post(BASE_URL, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getAll(): Promise<User[]> {
        const token = localStorage.getItem('token');
        if (!token)
            throw "Acesso não autorizado!";

        try {
            const response = await axios.get(
                BASE_URL,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default UserService;