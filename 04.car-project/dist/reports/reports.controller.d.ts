import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private reportService;
    constructor(reportService: ReportsService);
    createReport(body: CreateReportDto): Promise<import("./reports.entity").Report>;
}
