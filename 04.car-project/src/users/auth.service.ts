import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
// RandomBytes: Tạo một chuỗi ngẫu nhiên
// Scrypt: Hash password
import { promisify } from 'util'; // Import promisify để chuyển callback function thành promise

import { UsersService } from './users.service'; // Import UsersService để sử dụng các method trong service

const scrypt = promisify(_scrypt); // Chuyển hàm scrypt thành promise,, do scrypt không hỗ trợ promise

@Injectable() // Sử dụng decorator @Injectable() để đánh dấu class AuthService là một service, đưa vào DI container
export class AuthService {
  constructor(private userService: UsersService) {} // Inject UsersService vào AuthService thông qua constructor

  async signup(email: string, password: string) {
    // Kiểm tra xem email đã tồn tại trong database chưa
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    // Tạo chuỗi ngẫu nhiên salt
    const salt = randomBytes(8).toString('hex'); // Tạo chuỗi ngẫu nhiên 8 bytes và chuyển sang dạng hex => Chuỗi salt có 32 ký tự

    // Hash password với salt
    const hashPassword = (await scrypt(password, salt, 32)) as Buffer; // Hash password với salt và 32 bytes => Chuỗi hash password có 64 ký tự. Do scrypt trả về buffer nên cần cho hashPassword ép về dạng Buffer

    // Nối salt và hash password lại với nhau
    const result = salt + '.' + hashPassword.toString('hex'); // Nối salt và hash password với nhau và chuyển sang dạng hex => Chuỗi result có 96 ký tự

    // Tạo user mới với email và password đã hash
    const newUser = await this.userService.createUser(email, result);
    return newUser;
  }

  async signin(email: string, password: string) {
    // Kiểm tra xem email có tồn tại trong database không
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Tách salt và hash password từ password trong database
    const [salt, storeHash] = user.password.split('.'); // Tách salt và hash password từ password trong database

    // Hash password với salt từ database
    const hash = (await scrypt(password, salt, 32)) as Buffer; // Hash password với salt từ database và 32 bytes => Chuỗi hash có 64 ký tự và chuyển sang dạng Buffer

    // So sánh hash password từ database và hash password từ client
    if (storeHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }
}
