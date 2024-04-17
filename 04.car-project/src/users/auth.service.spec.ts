import { Test } from '@nestjs/testing'; // Import module Test từ thư viện testing của NestJS để tạo unit test
import { AuthService } from './auth.service'; // Import AuthService từ file auth.service.ts để sử dụng trong unit test
import { UsersService } from './users.service'; // Import các class, service mà AuthService cần sử dụng
import { User } from './users.entity'; // Import các class, service mà AuthService cần sử dụng

describe('AuthService', () => {
  let service = AuthService; // Khai báo biến service để sử dụng trong các unit test
  beforeEach(async () => {
    // Tạo 1 bản copy giả của module UsersService
    const fakeUsersService: Partial<UsersService> = {
      // Sử dụng Partial để tạo 1 phần method của UsersService phục vụ cho AuthService
      getUserByEmail: (email: string) => Promise.resolve({} as User), // Tạo 1 method getUserByEmail trả về một user giả
      createUser: (email: string, password: string) =>
        Promise.resolve({} as User), // Tạo 1 method createUser trả về một user giả
    }; // LƯU Ý: CÁC METHOD TRONG OBJECT PHẢI TRẢ VỀ PROMISE, và phải khai báo đúng các METHOD được AUTHSERVICE SỬ DỤNG trong USERSERVICE

    // Tạo module testing với các providers cần thiết
    const module = await Test.createTestingModule({
      providers: [
        AuthService, // Cung cấp AuthService để inject vào module
        {
          provide: UsersService, // Cung cấp UsersService để inject vào AuthService
          useValue: fakeUsersService, // Sử dụng giá trị của fakeUsersService để thay thế UsersService thật
        },
      ],
    }).compile(); // Compile module testing để sử dụng

    service = module.get(AuthService); // Lấy AuthService từ module testing để sử dụng trong unit test gán lai cho biến service
  }); // Trước khi chạy các unit test, chúng ta cần khởi tạo môi trường test

  it('can be created instance of AuthService', async () => {
    expect(service).toBeDefined(); // Kiểm tra xem AuthService đã được tạo thành công chưa
  }); // Tạo 1 unit test kiểm tra xem AuthService đã được tạo thành công chưa
}); // Tạo 1 group test cho AuthService để quản lý các unit test
