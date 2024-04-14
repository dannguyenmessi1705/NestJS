import { Injectable, NotFoundException } from '@nestjs/common';

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
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } }); // Lấy dữ liệu từ table user theo email
    if (!user) {
      throw new NotFoundException('User not found');
    } // Kiểm tra xem user có tồn tại không
    return user;
  }

  async updateUser(id: number, attrs: Partial<User>) {
    // Partial<User> là một kiểu dữ liệu cho phép truyền vào một phần của entity User
    // -- NẾU MUỐN SỬ DỤNG HOOK DECORATOR logUpdate() THÌ PHẢI SỬ DỤNG PHƯƠNG THỨC save() ĐỂ LƯU DỮ LIỆU
    const user = await this.userRepository.findOneBy({ id }); // Lấy dữ liệu từ table user theo id
    if (!user) {
      throw new NotFoundException('User not found');
    } // Kiểm tra xem user có tồn tại không
    Object.assign(user, attrs); // Gán giá trị mới vào user dựa trên attrs truyền vào
    await this.userRepository.save(user); // Lưu dữ liệu vào database

    // -- SỬ DỤNG update() ĐỂ CẬP NHẬT DỮ LIỆU NHƯNG KHÔNG CHẠY HOOK DECORATOR logUpdate()
    // await this.userRepository.update(id, attrs); // Cập nhật dữ liệu vào table user theo id
  }

  async deleteUser(id: number) {
    // -- NẾU MUỐN SỬ DỤNG HOOK DECORATOR logRemove() THÌ PHẢI SỬ DỤNG PHƯƠNG THỨC remove() ĐỂ XÓA DỮ LIỆU
    // const user = await this.userRepository.findOneBy({ id }); // Lấy dữ liệu từ table user theo id
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // } // Kiểm tra xem user có tồn tại không
    // await this.userRepository.remove(user); // Xóa dữ liệu từ table user theo id

    // -- SỬ DỤNG delete() ĐỂ XÓA DỮ LIỆU NHƯNG KHÔNG CHẠY HOOK DECORATOR logRemove()
    await this.userRepository.delete(id); // Xóa dữ liệu từ table user theo id 
  }
}
