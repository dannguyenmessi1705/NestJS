import { Module } from "@nestjs/common"; // Nhận module từ thư viện nestjs để sử dụng
import { AppController } from "./app.controller"; // Nhận controller từ file app.controller.ts
@Module({
  controllers: [AppController],
}) // Module này sẽ sử dụng controller AppController để điều khiển request
export class AppModule {} // Class AppModule dùng để điều khiển các module
