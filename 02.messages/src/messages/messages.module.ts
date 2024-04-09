import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessageRepository } from './messages.repository';
import { MessageService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessageRepository, MessageService], // Khai báo MessageRepository và MessageService là các provider của module, để có thể inject vào class khác
})
export class MessagesModule {}
