import {
  Injectable, // Sử dụng decorator @Injectable() để đánh dấu vào DI container
  NestInterceptor, // Sử dụng NestInterceptor để tạo interceptor
  ExecutionContext, // Sử dụng ExecutionContext để lấy request từ client
  CallHandler, // Sử dụng CallHandler để xử lý response
} from '@nestjs/common';

import { UsersService } from '../users.service'; // Import UsersService từ file users.service.ts để sử dụng các phương thức xử lý logic

@Injectable() // Sử dụng decorator @Injectable() để đánh dấu vào DI container
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {} // Inject UsersService vào CurrentUserInterceptor thông qua constructor

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest(); // context bao gồm các thông tin của request, response, next, chuyển context HTTP request
    const { user_id } = request.session || {}; // Lấy user_id từ session trong request hoặc trả về object rỗng
    const user = this.userService.getUserById(user_id); // Gọi phương thức getUserById() từ service để lấy user theo user_id
    if (user) {
      request.user = user; // Nếu user tồn tại thì gán user vào request để sử dụng ở các route khác
    }
    return next.handle(); // Trả về response từ route tiếp theo nếu có
  }
}
