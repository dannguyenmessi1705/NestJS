import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString() // Kiểm tra xem content có phải là string không, nếu không sẽ trả về lỗi
  content: string; // Nội dung của message
}
