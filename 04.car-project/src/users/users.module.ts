import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeORM modules để sử dụng database
import { User } from './users.entity'; // Import entity User từ file users.entity.ts

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Nhập import TypeOrmModule.forFeature([User]) để sử dụng entity User
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
