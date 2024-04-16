# Authentication

## 1.Sign up
- Đê bảo mật thông tin, chúng ta cần mã hóa mật khẩu trước khi lưu vào database. Để mã hóa mật khẩu, có các bước sau:
    + B1: Tạo 1 chuỗi `salt` ngẫu nhiên để mã hóa mật khẩu.
    + B2: Mã hóa mật khẩu với chuỗi `salt` đã tạo ở bước 1 bằng hàm băm.
    + B3: Nối chuỗi `salt` với mật khẩu đã mã hóa ở bước 2 rồi lưu vào database.
- Khi người dùng đăng nhập, chúng ta cần kiểm tra mật khẩu đã mã hóa với mật khẩu người dùng nhập vào. Để kiểm tra mật khẩu, có các bước sau:
    + B1: Lấy chuỗi `salt` từ mật khẩu đã mã hóa trong database.
    + B2: Mã hóa mật khẩu người dùng nhập vào với chuỗi `salt` đã lấy ở bước 1.
    + B3: So sánh mật khẩu đã mã hóa ở bước 2 với mật khẩu đã mã hóa trong database.

### 1.1. Thực hiện trong NestJS
- Để tạo 1 chuỗi `salt` ngẫu nhiên, chúng ta sử dụng hàm thư viện `crypto` của NodeJS:
```typescript
import { randomBytes } from 'crypto';

const salt = randomBytes(16).toString('hex'); // Tạo một chuỗi có độ dài 16 byte, mà mỗi byte được biểu diễn bằng 2 ký tự hex => chuỗi có độ dài 32 ký tự
```
- Để mã hóa mật khẩu với chuỗi `salt`, chúng ta sử dụng hàm `scrypt` của thư viện `crypto` + `promisify` của `util` để chuyển hàm `scrypt` từ callback sang promise, vì hàm `scrypt` không hỗ trợ promise, cũng như chuyển hàm `scrypt` sang dạng promise để sử dụng `async/await`:
```typescript
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util'; // Chuyển hàm callback sang promise để sử dụng async/await

const scrypt = promisify(_scrypt); // Chuyển hàm scrypt sang promise

export async function hashPassword(password: string, salt: string) {
  return (await scrypt(password, salt, 64)) // Mã hóa mật khẩu với salt và 64 byte
    .toString('hex'); // Chuyển buffer sang chuỗi hex để lưu vào database
}
```