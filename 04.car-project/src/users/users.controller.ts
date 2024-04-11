import { Controller, Get, Post, Patch, Body } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';

import { UsersService } from './users.service'; // Import UsersService từ file users.service.ts để sử dụng các phương thức xử lý logic
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('signup') // Tạo route POST /users/signup
  signUp(@Body() user: AuthDto) {
    this.userService.createUser(user.email, user.password); // Gọi phương thức createUser() từ service để tạo mới một user
  }
}
