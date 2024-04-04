import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { CreateMessageDto } from './dtos/create-message.dto'; // Nhập DTO của message để validate dữ liệu

@Controller('messages')
export class MessagesController {
  @Get() // Tạo request với method GET
  listMessages() {}
  @Post() // Tạo request với method POST
  createMessage(@Body() body: CreateMessageDto) {
    // Body là nội dung của request POST và được validate bởi DTO
    console.log(body);
  }
  @Get('/:id') // Tạo request với method GET và id là params của request
  getMessage(@Param('id') id: string) {
    // Param là params của request
    console.log(id);
  }
}
