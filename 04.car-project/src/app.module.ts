import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

// Import TypeORM modules để sử dụng database
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/users.entity'; // Import entity User từ file users.entity.ts sau khi đã tạo và import entity vào users.module.ts
import { Report } from './reports/reports.entity'; // Import entity Report từ file reports.entity.ts sau khi đã tạo và import entity vào reports.module.ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Loại database
      database: 'db.sqlite', // Tên database sẽ tạo
      entities: [User, Report], // Thêm các entity vào đây để sử dụng
      synchronize: true, // Tự động tạo bảng trong database khi chạy ứng dụng (Chỉ sử dụng trong môi trường dev)
    }), // Nhập import TypeOrmModule.forRoot({}) để sử dụng databas, tạo file database ở ngay bên ngoài thư mục src
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}