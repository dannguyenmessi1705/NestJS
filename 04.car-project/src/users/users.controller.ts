import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  Delete,
  HttpException,
} from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor'; // Import Serialize Decorator từ file serialize.interceptor.ts để sử dụng

import { UsersService } from './users.service'; // Import UsersService từ file users.service.ts để sử dụng các phương thức xử lý logic
import { AuthService } from './auth.service';
@Controller('users')
@Serialize(UserDto) // Sử dụng Serialize Decorator để serialize response theo UserDto
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('signup') // Tạo route POST /users/signup
  async signUp(@Body() body: AuthDto) {
    try {
      await this.authService.signup(body.email, body.password); // Gọi phương thức signup() từ service để tạo mới user
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
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
  getUserByEmail(@Query('email') email: string) {
    const user = this.userService.getUserByEmail(email); // Gọi phương thức getUserByEmail() từ service để lấy user theo email
    return user;
  }
  @Patch('/:id') // Tạo route PATCH /users/:id
  updateUser(@Param('id') id: number, @Body() attrs: UpdateUserDto) {
    this.userService.updateUser(id, attrs); // Gọi phương thức updateUser() từ service để cập nhật user theo id
  }

  @Delete('/:id') // Tạo route DELETE /users/:id
  deleteUser(@Param('id') id: number) {
    this.userService.deleteUser(id); // Gọi phương thức deleteUser() từ service để xóa user theo id
  }
}
