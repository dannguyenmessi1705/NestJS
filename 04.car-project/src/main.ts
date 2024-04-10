import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Import ValidationPipe từ @nestjs/common để sử dụng pipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Bật whitelist để loại bỏ các trường không cần thiết trong DTO nếu người dùng gửi thêm
      // VD DTO: { name: 'John', age: 20}, nếu người dùng gửi thêm trường 'email' thì nó sẽ bị loại bỏ
    }),
  );
  await app.listen(3000);
}
bootstrap();
