import { Report } from 'src/reports/reports.entity';
export declare class User {
    id: number;
    email: string;
    admin: boolean;
    password: string;
    logInsert(): void;
    logRemove(): void;
    logUpdate(): void;
    reports: Report[];
}
