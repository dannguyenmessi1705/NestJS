import { AuthDto } from './dtos/auth.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    whoAmI(user: User): Promise<User>;
    signUp(body: AuthDto, session: any): Promise<User>;
    sigin(body: AuthDto, session: any): Promise<User>;
    signout(session: any): void;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    updateUser(id: number, attrs: UpdateUserDto): void;
    deleteUser(id: number): void;
}
