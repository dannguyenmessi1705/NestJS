import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/users.entity';
export declare class ReportsService {
    private reportRepository;
    constructor(reportRepository: Repository<Report>);
    createReport(body: CreateReportDto, user: User): Promise<Report>;
    approveReport(id: number, approved: boolean): Promise<Report>;
}
