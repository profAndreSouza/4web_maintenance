import axios from 'axios';
import { User } from '@/types/User';

const BASE_URL = 'http://localhost:3002/api/User';

class UserService {

    static async createUser(userData: User): Promise<User> {
        try {
            const response = await axios.post(BASE_URL, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default UserService;