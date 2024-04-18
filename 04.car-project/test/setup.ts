import { rm } from 'fs/promises'; // Dùng để xóa file hoặc thư mục
import { join } from 'path'; // Dùng để join đường dẫn giữa các thư mục

global.beforeEach(async () => {
  // Xóa database trước khi chạy unit test
  await rm(join(__dirname, '..', 'test.db')).catch(() => {}); // Xóa file test.db nếu tồn tại hoặc không tồn tại
}); // Chạy trước mỗi unit test
