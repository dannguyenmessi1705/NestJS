import { AuthDto } from './dtos/auth.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    signUp(user: AuthDto): void;
    getAllUsers(): Promise<import("./users.entity").User[]>;
    getUserById(id: number): Promise<import("./users.entity").User>;
    getUserByEmail(query: any): Promise<import("./users.entity").User>;
}
