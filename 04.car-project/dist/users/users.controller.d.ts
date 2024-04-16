import { AuthDto } from './dtos/auth.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    signUp(body: AuthDto): Promise<void>;
    sigin(body: AuthDto): Promise<void>;
    getAllUsers(): Promise<import("./users.entity").User[]>;
    getUserById(id: number): Promise<import("./users.entity").User>;
    getUserByEmail(email: string): Promise<import("./users.entity").User>;
    updateUser(id: number, attrs: UpdateUserDto): void;
    deleteUser(id: number): void;
}
