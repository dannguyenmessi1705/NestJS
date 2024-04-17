import { User } from './users.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(email: string, password: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    updateUser(id: number, attrs: Partial<User>): Promise<void>;
    deleteUser(id: number): Promise<void>;
}
