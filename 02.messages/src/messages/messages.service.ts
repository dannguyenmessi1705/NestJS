// import { Injectable } from "@nestjs/common";
import { MessageRepository } from './messages.repository';

// // Cách 2: Sử dụng @Injectable để inject repository vào service (khuyến khích)
// @Injectable()

export class MessageService {
  // Cách 1: Sử dụng constructor để inject repository vào service (không khuyến khích)
  messageRepo: MessageRepository; // Khai báo biến messageRepo
  constructor() {
    this.messageRepo = new MessageRepository(); // Khởi tạo messageRepo
  }

  findOne(id: string) {
    return this.messageRepo.findOne(id); // Gọi hàm findOne từ repository
  }

  findAll() {
    return this.messageRepo.findAll(); // Gọi hàm findAll từ repository
  }

  create(content: string) {
    return this.messageRepo.create(content); // Gọi hàm create từ repository
  }
}
