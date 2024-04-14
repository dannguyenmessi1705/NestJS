import {
  NestInterceptor, // đây là interface mà tất cả các Interceptor cần implement
  ExecutionContext, // đây là 1 bộ context chứa thông tin về request và response
  CallHandler, // đây là 1 class chứa thông tin về handler của request
  UseInterceptors, // đây là decorator để sử dụng Interceptor
} from '@nestjs/common';

import { Observable } from 'rxjs'; // đây là 1 class Observable từ thư viện rxjs để trả về transform response
import { map } from 'rxjs/operators'; // đây là 1 hàm map từ thư viện rxjs/operators để thực hiện transform response

import { plainToClass, ClassConstructor } from 'class-transformer';
// đây là hàm plainToClass từ thư viện class-transformer để chuyển plain object thành class object
// đây là hàm ClassConstructor từ thư viện class-transformer để tạo 1 class object từ class

export function Serialize(dto: ClassConstructor<unknown>) {
  // Tạo 1 decorator Serialize nhận vào 1 class object là dto 
  return UseInterceptors(new SerializeInterceptor(dto)); // Sử dụng ClassSerializerInterceptor để serialize response theo class object
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor<unknown>) {} // Inject class object vào SerializeInterceptor
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Code sẽ chạy trước khi request được xử lý bởi handler
    console.log('I am running before the handler');

    // Code sẽ chạy sau khi request được xử lý bởi handler
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(
          this.dto, // class object sẽ chuyển từ plain object thành class object
          data, // data trả về từ handler chính là response trả về
          {
            excludeExtraneousValues: true, // loại bỏ các key không cần thiết trong UserDto, các key không được đánh dấu bởi @Expose
          },
        ); // chuyển plain object thành class object theo cấu trúc của UserDto
      }),
    );
  } // Hàm intercept() nhận vào 2 tham số là context và next, trả về 1 Observable chứa response sau khi được xử lý
}
