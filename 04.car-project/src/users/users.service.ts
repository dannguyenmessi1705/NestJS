import { Injectable } from '@nestjs/common';

import { User } from './users.entity'; // Import entity User từ file users.entity.ts
import { Repository } from 'typeorm'; // Import Repository từ thư viện TypeORM để sử dụng các phương thức tương tác với database
import { InjectRepository } from '@nestjs/typeorm'; // Import InjectRepository để inject Repository vào service

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // Inject Repository của entity User vào service
  ) {}

  async createUser(email: string, password: string) {
    const user = this.userRepository.create({ email, password }); // Truyền 1 object dữ liệu entity User vào phương thức create() để tạo mới một user
    await this.userRepository.save(user); // Lưu dữ liệu vào database
  }
}
