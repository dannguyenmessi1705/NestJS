import {
  Expose, // decorator dùng để đổi tên key của object khi trả về response, hoặc đánh dấu key muốn trả về
} from 'class-transformer';

export class UserDto {
  @Expose() // Đánh dấu key muốn trả về
  id: number;

  @Expose() // Đánh dấu key muốn trả về
  email: string;

  @Expose() // Đánh dấu key muốn trả về
  admin: boolean;
}
