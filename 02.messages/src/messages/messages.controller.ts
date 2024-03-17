import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get() // Tạo request với method GET
  listMessages() {}
  @Post() // Tạo request với method POST
  createMessage() {}
  @Get('/:id') // Tạo request với method GET và id là params của request
  getMessage() {}
}
