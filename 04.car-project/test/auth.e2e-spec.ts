import { Test, TestingModule } from '@nestjs/testing'; // Import module Test và TestingModule từ thư viện testing của NestJS để tạo unit test
import { INestApplication } from '@nestjs/common'; // Import INestApplication từ @nestjs/common để tạo instance của ứng dụng
import request from 'supertest'; // Import request từ thư viện supertest để test API
import { AppModule } from './../src/app.module'; // Import AppModule từ file app.module.ts để sử dụng trong unit test cho e2e test

describe('Authentication System', () => {
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
        email,
        password: '12345',
      }) // Gửi email và password trong body của request
      .expect(201) // Mong muốn nhận được status code 201 từ server sau khi gửi request
      .then((res) => {
        expect(res.body.id).toBeDefined(); // Kiểm tra xem id của user đã được tạo chưa
        expect(res.body.email).toEqual(email); // Kiểm tra xem email của user đã được tạo chưa
      });
  }); // Mô tả một unit test với tên là handles sign up
  /** CHẠY SẼ LỖI Ở ĐÂY VÌ APP CÒN CÓ THÊM PHỤ THUỘC KHÁC NHƯ COOKIE SESSION, VALIDATION PIPE MÀ CHƯA ĐƯỢC KHỞI TẠO */
  /*
  Để khắc phục lỗi này, chúng ta cần phải mock các phụ thuộc của AppModule như CookieSession, ValidationPipe, ... để chạy được unit test
  Hoặc đưa các phụ thuộc này vào trong AppModule để chạy được unit test, thay vì config trong main.ts
  VD:
  app.module.ts
  import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
  import { APP_PIPE } from '@nestjs/core';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import cookieSession from 'cookie-session';

  @Module({
    imports: [],
    controllers: [AppController],
    providers: [
      AppService,
      {
        provide: APP_PIPE,
        useValue: new ValidationPipe({
          whitelist: true,
        }),
      },
    ]
    export class AppModule {
      configure(consumer: MiddlewareConsumer) { // Sử dụng cookie-session cho tất cả các route
        consumer.apply(cookieSession
        ({
          keys: ['key1'], 
        })).forRoutes('*'); // Sử dụng cookie-session cho tất cả các route
    }

    Tuy nhiên, vẫn còn 1 lỗi nữa là phải phân biệt giữa môi trường test và môi trường phát triển để database không bị xung đột
  */

  afterEach(async () => {
    await app.close(); // Đóng ứng dụng sau khi chạy xong các unit test
  }); // Mô tả một unit test với tên là handles sign up
}); // Mô tả một nhóm các unit test với tên là Authentication System
