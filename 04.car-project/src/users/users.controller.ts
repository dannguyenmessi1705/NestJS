import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  Delete,
  UseInterceptors, // Thêm dòng này để sử dụng Interceptor xử lý response trả về
  ClassSerializerInterceptor, // Thêm dòng này để sử dụng ClassSerializerInterceptor xử lý response trả về
} from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

import { UsersService } from './users.service'; // Import UsersService từ file users.service.ts để sử dụng các phương thức xử lý logic
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('signup') // Tạo route POST /users/signup
  signUp(@Body() user: AuthDto) {
    this.userService.createUser(user.email, user.password); // Gọi phương thức createUser() từ service để tạo mới một user
  }
  @Get('/all') // Tạo route GET /users/all
  @UseInterceptors(ClassSerializerInterceptor) // Sử dụng ClassSerializerInterceptor để xử lý response trả về (Ẩn password
  getAllUsers() {
    return this.userService.getAllUsers(); // Gọi phương thức getAllUsers() từ service để lấy tất cả user
  }
  @Get('/:id') // Tạo route GET /users/:id
  @UseInterceptors(ClassSerializerInterceptor) // Sử dụng ClassSerializerInterceptor để xử lý response trả về (Ẩn password
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id); // Gọi phương thức getUserById() từ service để lấy user theo id
  }
  @Get('/') // Tạo route GET /users/:email
  @UseInterceptors(ClassSerializerInterceptor) // Sử dụng ClassSerializerInterceptor để xử lý response trả về (Ẩn password
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
