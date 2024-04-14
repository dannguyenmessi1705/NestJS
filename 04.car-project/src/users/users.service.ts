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
    /**
     * Tạo 1 entity table user với 2 cột email và password rồi mới đưa vào phương thức save() mục đích để cho hook decorator logInsert() chạy
     * Nếu chạy thẳng save({email, password}) thì sẽ không chạy hook decorator logInsert()
     */
  }

  async getAllUsers() {
    const users = await this.userRepository.find(); // Lấy tất cả dữ liệu từ table user
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id }); // Lấy dữ liệu từ table user theo id
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } }); // Lấy dữ liệu từ table user theo email
    return user;
  }
}
