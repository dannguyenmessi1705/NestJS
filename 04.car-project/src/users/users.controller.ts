import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';

import { UsersService } from './users.service'; // Import UsersService từ file users.service.ts để sử dụng các phương thức xử lý logic
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('signup') // Tạo route POST /users/signup
  signUp(@Body() user: AuthDto) {
    this.userService.createUser(user.email, user.password); // Gọi phương thức createUser() từ service để tạo mới một user
  }
  @Get('/all') // Tạo route GET /users/all
  getAllUsers() {
    return this.userService.getAllUsers(); // Gọi phương thức getAllUsers() từ service để lấy tất cả user
  }
  @Get('/:id') // Tạo route GET /users/:id
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id); // Gọi phương thức getUserById() từ service để lấy user theo id
  }
  @Get('/') // Tạo route GET /users/:email
  getUserByEmail(@Query() query) {
    console.log(query.email);
    const user = this.userService.getUserByEmail(query.email); // Gọi phương thức getUserByEmail() từ service để lấy user theo email
    return user;
  }
}
