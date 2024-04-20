import { CreateReportDto } from './dtos/create-report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { ReportsService } from './reports.service';
import { User } from 'src/users/users.entity';
export declare class ReportsController {
    private reportService;
    constructor(reportService: ReportsService);
    createReport(body: CreateReportDto, user: User): Promise<import("./reports.entity").Report>;
    approveReport(id: number, body: ApproveReportDto): Promise<import("./reports.entity").Report>;
}
