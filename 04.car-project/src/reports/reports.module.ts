import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeORM modules để sử dụng database
import { Report } from './reports.entity'; // Import entity Report từ file reports.entity.ts

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]), // Nhập import TypeOrmModule.forFeature([Report]) để sử dụng entity Report
  ],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
