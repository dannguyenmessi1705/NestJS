import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../users.entity';
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    private userService;
    constructor(userService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
