import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get() // Tạo request với method GET
  listMessages() {}
  @Post() // Tạo request với method POST
  createMessage(@Body() body: any) { // Body là nội dung của request POST
    console.log(body); 
  }
  @Get('/:id') // Tạo request với method GET và id là params của request
  getMessage(@Param('id') id: string) { // Param là params của request
    console.log(id);
  }
}
