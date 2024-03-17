import { NestFactory } from "@nestjs/core"; // Nhận NestFactory từ thư viện nestjs để sử dụng để tạo server
import { AppModule } from "./app.module"; // Nhận AppModule từ file app.module.ts

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Tạo server với AppModule là module điều khiển
  await app.listen(9000); // Server sẽ lắng nghe ở cổng 9000
}
bootstrap(); // Chạy hàm bootstrap để tạo server
