import { Test, TestingModule } from '@nestjs/testing'; // Import module Test và TestingModule từ thư viện testing của NestJS để tạo unit test
import { INestApplication } from '@nestjs/common'; // Import INestApplication từ @nestjs/common để tạo instance của ứng dụng
import request from 'supertest'; // Import request từ thư viện supertest để test API
import { AppModule } from 'src/app.module'; // Import AppModule từ file app.module.ts để sử dụng trong unit test cho e2e test

describe('Authentication System', async () => {
  let app: INestApplication; // Khai báo biến app để lưu trữ instance của ứng dụng

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import AppModule để sử dụng trong unit test
    }).compile(); // Compile module để sử dụng

    app = module.createNestApplication(); // Tạo instance của ứng dụng từ module

    await app.init(); // Khởi tạo ứng dụng trước khi chạy các unit test
  });

  it('handles sign up request', async () => {
    const email = 'test@gmail.com';
    return request(app.getHttpServer())
      .post('/users/signup') // Gửi request POST tới đường dẫn /users/signup
      .send({
        email: 'test@gmail.com',
        password: '12345',
      }) // Gửi email và password trong body của request
      .expect(201) // Mong muốn nhận được status code 201 từ server sau khi gửi request
      .then((res) => {
        expect(res.body.id).toBeDefined(); // Kiểm tra xem id của user đã được tạo chưa
        expect(res.body.email).toEqual(email); // Kiểm tra xem email của user đã được tạo chưa
      });
  }); // Mô tả một unit test với tên là handles sign up
  /** CHẠY SẼ LỖI Ở ĐÂY VÌ APP CÒN CÓ THÊM PHỤ THUỘC KHÁC NHƯ COOKIE SESSION, VALIDATION PIPE MÀ CHƯA ĐƯỢC KHỞI TẠO */

  afterEach(async () => {
    await app.close(); // Đóng ứng dụng sau khi chạy xong các unit test
  }); // Mô tả một unit test với tên là handles sign up
}); // Mô tả một nhóm các unit test với tên là Authentication System
