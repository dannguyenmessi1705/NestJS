import { Controller, Get, Post, Patch, Body } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';

@Controller('users')
export class UsersController {
  @Post('signup') // Tạo route POST /users/signup
  signUp(@Body() user: AuthDto) {
    console.log(user);
  }
}
