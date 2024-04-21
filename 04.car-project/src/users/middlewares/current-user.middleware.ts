import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../users.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
} // Khai báo global namespace Express để mở rộng interface Request, thêm thuộc tính user kiểu User
// Để có thể sủe dụng req.user mà không báo lỗi (Không phải dùng //@ts-ignore)
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { user_id } = req.session || {}; // Lấy user_id từ session trong request
    if (user_id) {
      const user = await this.userService.getUserById(user_id); // Lấy user từ user_id
      req.user = user; // Gán user vào request
    }
    next(); // Chuyển tiếp request sang middleware tiếp theo
  }
}
