import { User } from './users.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(email: string, password: string): Promise<void>;
}
