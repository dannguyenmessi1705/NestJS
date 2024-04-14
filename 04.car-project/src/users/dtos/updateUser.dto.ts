import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail() // Kiểm tra xem email có đúng định dạng không
  @IsOptional() // Cho phép email có thể không được truyền vào
  email: string; // Khai báo email có kiểu dữ liệu là string

  @IsString() // Kiểm tra xem password có phải là string không
  @IsOptional() // Cho phép password có thể không được truyền vào
  password: string; // Khai báo password có kiểu dữ liệu là string
}
