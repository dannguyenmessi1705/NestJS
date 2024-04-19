import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}
  async createReport(body: CreateReportDto, user: User) {
    const report = await this.reportRepository.create(body);
    report.user = user; // Gán user hiện tại vào report vừa tạo
    await this.reportRepository.save(report);
    return report;
  }
}
