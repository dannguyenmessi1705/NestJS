import { AuthDto } from './dtos/auth.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    signUp(user: AuthDto): void;
}
