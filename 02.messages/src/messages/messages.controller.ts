import {
  Controller, // Thêm Controller để tạo controller
  Get, // Thêm Get để tạo request với method GET
  Post, // Thêm Post để tạo request với method POST
  Body, // Thêm Body để lấy body của request
  Param, // Thêm Param để lấy params của request
  NotFoundException, // Thêm NotFoundException để xử lý lỗi 404
} from '@nestjs/common';

import { CreateMessageDto } from './dtos/create-message.dto'; // Nhập DTO của message để validate dữ liệu
import { MessageService } from './messages.service';

// Có 2 cách để inject service vào controller
// Cách 1: Sử dụng constructor để inject service vào controller (không khuyến khích)
// Cách 2: Sử dụng decorator @Injectable để inject service vào controller (khuyến khích)
@Controller('messages')
export class MessagesController {
  messageService: MessageService; // Khai báo biến messageService để sử dụng service
  constructor() {
    this.messageService = new MessageService(); // Khởi tạo messageService
  }

  @Get() // Tạo request với method GET
  listMessages() {
    return this.messageService.findAll(); // Gọi hàm findAll từ service
  }
  @Post() // Tạo request với method POST
  createMessage(@Body() body: CreateMessageDto) {
    // Body là nội dung của request POST và được validate bởi DTO
    return this.messageService.create(body.content); // Gọi hàm create từ service
  }
  @Get('/:id') // Tạo request với method GET và id là params của request
  async getMessage(@Param('id') id: string) {
    // Param là params của request
    const message = await this.messageService.findOne(id); // Gọi hàm findOne từ service
    if (!message) {
      throw new NotFoundException('Message not found'); // Nếu không tìm thấy message thì throw lỗi 404
    }
    return message; // Trả về message nếu tìm thấy
  }
}
