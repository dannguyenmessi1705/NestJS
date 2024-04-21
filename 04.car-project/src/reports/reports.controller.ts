import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { AdminGuard } from 'src/guard/admin.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/users/decorators/curren-user.decorator'; // Import decorator CurrentUser từ file curren-user.decorator.ts để lấy user hiện tại từ request
import { User } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto) // Sử dụng SerializeInterceptor để serialize response theo ReportDto
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.createReport(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: number, @Body() body: ApproveReportDto) {
    return this.reportService.approveReport(id, body.approved);
  }
}
