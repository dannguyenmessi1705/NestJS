import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core'; // Import APP_INTERCEPTOR từ @nestjs/core để sử dụng interceptor trong app.module.ts (Global interceptor)
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor'; // Import CurrentUserInterceptor từ file current-user.interceptor.ts để sử dụng
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';

import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeORM modules để sử dụng database
import { User } from './users.entity'; // Import entity User từ file users.entity.ts

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Nhập import TypeOrmModule.forFeature([User]) để sử dụng entity User
  ],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR, // Sử dụng APP_INTERCEPTOR để sử dụng interceptor trong app.module.ts (Global interceptor)
      useClass: CurrentUserInterceptor, // Sử dụng CurrentUserInterceptor làm interceptor cho toàn bộ ứng dụng
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
