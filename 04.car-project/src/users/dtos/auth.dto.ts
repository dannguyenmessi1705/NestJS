import { IsEmail, IsString } from 'class-validator'; // Nhập các hàm kiểm tra dữ liệu từ class-validator

export class AuthDto {
  @IsEmail() // Kiểm tra xem email có đúng định dạng không
  email: string;

  @IsString() // Kiểm tra xem password có phải là string không
  password: string;
}
