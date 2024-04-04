import { readFile, writeFile } from 'fs/promises'; // Nhập hàm đọc và ghi file

export class MessageRepository {
  // Repository của message
  async findOne(id: string) {
    // Hàm tìm kiếm message theo id
    const data = await readFile('messages.json', 'utf-8'); // Đọc file messages.json
    const message = JSON.parse(data); // Parse dữ liệu đọc được
    return message[id]; // Trả về message theo id
  }

  async findAll() {
    // Hàm lấy tất cả message
    const data = await readFile('messages.json', 'utf-8'); // Đọc file messages.json
    const message = JSON.parse(data); // Parse dữ liệu đọc được
    return message; // Trả về tất cả message
  }

  async create(content: string) {
    // Hàm tạo message mới
    const data = await readFile('messages.json', 'utf-8'); // Đọc file messages.json
    const message = JSON.parse(data); // Parse dữ liệu đọc được
    const id = Math.floor(Math.random() * 999); // Tạo id ngẫu nhiên
    message[id] = { content, id }; // Thêm message mới vào object message
    await writeFile('messages.json', JSON.stringify(message)); // Ghi lại file messages.json
  }
}
