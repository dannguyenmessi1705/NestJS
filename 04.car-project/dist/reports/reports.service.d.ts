import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dtos/create-report.dto';
export declare class ReportsService {
    private reportRepository;
    constructor(reportRepository: Repository<Report>);
    createReport(body: CreateReportDto): Promise<Report>;
}
