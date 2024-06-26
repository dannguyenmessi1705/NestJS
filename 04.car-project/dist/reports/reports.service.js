"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reports_entity_1 = require("./reports.entity");
let ReportsService = class ReportsService {
    constructor(reportRepository) {
        this.reportRepository = reportRepository;
    }
    async createReport(body, user) {
        const report = await this.reportRepository.create(body);
        report.user = user;
        await this.reportRepository.save(report);
        return report;
    }
    async approveReport(id, approved) {
        let report = await this.reportRepository.findOne({ where: { id } });
        if (!report) {
            throw new common_1.NotFoundException('Report not found');
        }
        report.approved = approved;
        await this.reportRepository.save(report);
        return report;
    }
    async getEstimateReport(query) {
        return this.reportRepository
            .createQueryBuilder()
            .where('make = :make', { make: query.make })
            .andWhere('model = :model', { model: query.model })
            .andWhere('year - :year BETWEEN -3 AND 3', { year: query.year })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: query.lng })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: query.lat })
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage: query.mileage })
            .getMany();
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reports_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map