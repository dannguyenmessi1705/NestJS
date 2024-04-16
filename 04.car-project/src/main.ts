import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Import ValidationPipe từ @nestjs/common để sử dụng pipe
import cookieSession from 'cookie-session'; // Import cookieSession từ 'cookie-session' để sử dụng cookie session

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['dan17052002'],
    }),
  ); // Sử dụng cookie session với key là 'dan17052002'
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Bật whitelist để loại bỏ các trường không cần thiết trong DTO nếu người dùng gửi thêm
      // VD DTO: { name: 'John', age: 20}, nếu người dùng gửi thêm trường 'email' thì nó sẽ bị loại bỏ
    }),
  );
  await app.listen(3000);
}
bootstrap();
