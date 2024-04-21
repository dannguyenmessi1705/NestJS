import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { user_id } = req.session || {}; // Lấy user_id từ session trong request
    if (user_id) {
      const user = await this.userService.getUserById(user_id); // Lấy user từ user_id
      //@ts-ignore
      req.user = user; // Gán user vào request
    }
    next(); // Chuyển tiếp request sang middleware tiếp theo
  }
}
