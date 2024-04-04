import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(new ValidationPipe()); // Sử dụng pipe để validate dữ liệu của request, sử dụng ở main.ts cho phép validate dữ liệu của tất cả các request
  await app.listen(3000);
}
bootstrap();
