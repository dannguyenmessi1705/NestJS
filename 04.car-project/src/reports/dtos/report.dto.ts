import {
  Expose, // Đánh dấu key muốn trả về
  Transform, // Decorator để thực hiện một hàm biến đổi trước khi trả về response
} from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  @Expose()
  price: number;

  @Expose()
  approved: boolean;

  @Expose()
  @Transform(({ obj }) => obj.user.id) // Biến đổi trước khi trả về response, lấy id của user tạo ra report
  // obj là object hiện tại (Report), user là field trong object hiện tại
  userId: number;
}
