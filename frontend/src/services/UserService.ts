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
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default UserService;