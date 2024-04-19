import {
  IsString,
  Min,
  Max,
  IsNumber,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  modal: string;

  @IsNumber()
  @Min(1930)
  @Max(2024)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  mileage: number;

  @IsNumber()
  @Min(0)
  price: number;
}
