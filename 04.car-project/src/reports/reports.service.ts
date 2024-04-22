import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { EstimateReportDto } from './dtos/estimate-report.dto';
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

  async approveReport(id: number, approved: boolean) {
    let report = await this.reportRepository.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;
    await this.reportRepository.save(report);
    return report;
  }

  async getEstimateReport(query: EstimateReportDto) {
    return this.reportRepository
      .createQueryBuilder() // Tạo một query builder
      .where('make = :make', { make: query.make }) // Thêm điều kiện cho query builder với make = query.make
      .andWhere('model = :model', { model: query.model }) // Thêm điều kiện cho query builder với model = query.model
      .andWhere('year - :year BETWEEN -3 AND 3', { year: query.year }) // Thêm điều kiện cho query builder với year - query.year BETWEEN -3 AND 3
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: query.lng }) // Thêm điều kiện cho query builder với lng - query.lng BETWEEN -5 AND 5
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: query.lat }) // Thêm điều kiện cho query builder với lat - query.lat BETWEEN -5 AND 5
      .orderBy('ABS(mileage - :mileage)', 'DESC') // Sắp xếp theo khoảng cách giữa mileage và query.mileage
      .setParameters({ mileage: query.mileage }) // Set giá trị cho mileage
      .getMany(); // Lấy ra tất cả các bản ghi
  }
}
