import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportService.createReport(body);
  }
}
