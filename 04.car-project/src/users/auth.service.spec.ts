import { Test } from '@nestjs/testing'; // Import module Test từ thư viện testing của NestJS để tạo unit test
import { AuthService } from './auth.service'; // Import AuthService từ file auth.service.ts để sử dụng trong unit test
import { UsersService } from './users.service'; // Import các class, service mà AuthService cần sử dụng
import { User } from './users.entity'; // Import các class, service mà AuthService cần sử dụng

// ** TEST SIGNUP METHOD ** //
import { BadRequestException, NotFoundException } from '@nestjs/common';
// ** TEST SIGNUP METHOD ** //

describe('AuthService', () => {
  let service: AuthService; // Khai báo biến service để sử dụng trong các unit test
  let fakeUsersService: Partial<UsersService>; // Khai báo biến fakeUsersService để tạo bản copy giả của UsersService
  // Sử dụng Partial để tạo 1 phần method của UsersService phục vụ cho AuthService
  beforeEach(async () => {
    // Tạo 1 bản copy giả của module UsersService
    fakeUsersService = {
      getUserByEmail: (email: string) => Promise.resolve({} as User), // Tạo 1 method getUserByEmail trả về một user giả
      createUser: (email: string, password: string) =>
        Promise.resolve({ id: 17, email, password } as User), // Tạo 1 method createUser trả về một user giả
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

  // ** TEST HASH PASSWORD SIGNUP METHOD ** //
  it('Test has hashed password and salt yet', async () => {
    fakeUsersService.getUserByEmail = (email: string) =>
      Promise.resolve(null as User); // Tạo 1 user giả với email không tồn tại trong database để test method signup
    const user = await service.signup('abcde@gmail.com', '12345');
    expect(user.password).not.toEqual('12345'); // Kiểm tra xem password đã được hash chưa, nếu đã hash thì password sẽ khác với password ban đầu
    const [salt, hash] = user.password.split('.'); // Tách salt và hash password từ password
    expect(salt).toBeDefined(); // Kiểm tra xem salt đã được tạo chưa
    expect(hash).toBeDefined(); // Kiểm tra xem hash password đã được tạo chưa
  });

  // ** TEST EMAIL ALREADY USE IN SIGNUP METHOD ** //
  it('Test email already used in signup method', async () => {
    fakeUsersService.getUserByEmail = (email: string) =>
      Promise.resolve({ id: 1, email, password: '12345.6789' } as User); // Tạo 1 user giả với email đã tồn tại trong database để test method signup
    await expect(service.signup('abcde@gmail.com', '12345')).rejects.toThrow(
      BadRequestException,
    ); // Kiểm tra xem method signup có throw BadRequestException khi email đã tồn tại chưa
  });

  // ** TEST EMAIL IS EXISTED IN SIGNIN METHOD ** //
  it('Test email isnot existed method', async () => {
    fakeUsersService.getUserByEmail = (email: string) =>
      Promise.resolve(null as User); // Tạo 1 user giả với email không tồn tại trong database để test method signin
    await expect(service.signin('abc@gmail.com', '12345')).rejects.toThrow(
      NotFoundException,
    );
  });

  // ** TEST INVALID PASSWORD IN SIGNIN METHOD ** //
  it('Test invalid password in signin method', async () => {
    fakeUsersService.getUserByEmail = (email: string) =>
      Promise.resolve({ id: 1, email: email, password: '123456' } as User); // Tạo 1 user giả với email tồn tại trong database để test method signin
    await expect(service.signin('abc@gmail.com', '12345')).rejects.toThrow(
      BadRequestException,
    ); // Kiểm tra xem method signin có throw BadRequestException khi password không đúng chưa
  });

  // ** TEST RETURN USER IN SIGNIN METHOD ** //
  it('Test return user in signin method', async () => {
    fakeUsersService.getUserByEmail = (email: string) =>
      Promise.resolve({ id: 1, email: email, password: '83ab87b7b524a62f.58083e48e7ad99f7be8e4850bc50b53ce34c13eae292a8273dbdd40221c6fd49' } as User); // Tạo 1 user giả với email tồn tại trong database để test method signin
    const user = await service.signin('abc@gmail.com', '12345'); // Gọi method signin với email và password đúng
    expect(user).toBeDefined(); // Kiểm tra xem method signin có trả về user không
  });
}); // Tạo 1 group test cho AuthService để quản lý các unit test
