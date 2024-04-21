import {
  IsString,
  Min,
  Max,
  IsNumber,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

import { Transform } from 'class-transformer'; // decorator dùng để thay đổi giá trị của key trong object trước khi trả về response

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value)) // Thay đổi giá trị của key year từ string sang number, trong trường hợp sử dụng QUERY PARAMS
  @IsNumber()
  @Min(1930)
  @Max(2024)
  year: number;

  @Transform(({ value }) => parseFloat(value)) // Thay đổi giá trị của key year từ string sang number, trong trường hợp sử dụng QUERY PARAMS\
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value)) // Thay đổi giá trị của key year từ string sang number, trong trường hợp sử dụng QUERY PARAMS\
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseInt(value)) // Thay đổi giá trị của key year từ string sang number, trong trường hợp sử dụng QUERY PARAMS
  @IsNumber()
  @Min(0)
  mileage: number;
}
