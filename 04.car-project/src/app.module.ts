import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

// Import TypeORM modules để sử dụng database
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Loại database
      database: 'db.sqlite', // Tên database sẽ tạo
      entities: [], // Thêm các entity vào đây để sử dụng
      synchronize: true, // Tự động tạo bảng trong database khi chạy ứng dụng (Chỉ sử dụng trong môi trường dev)
    }), // Nhập import TypeOrmModule.forRoot({}) để sử dụng databas, tạo file database ở ngay bên ngoài thư mục src
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
