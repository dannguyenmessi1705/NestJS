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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guard/auth.guard");
const create_report_dto_1 = require("./dtos/create-report.dto");
const report_dto_1 = require("./dtos/report.dto");
const reports_service_1 = require("./reports.service");
const curren_user_decorator_1 = require("../users/decorators/curren-user.decorator");
const users_entity_1 = require("../users/users.entity");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
let ReportsController = class ReportsController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    createReport(body, user) {
        return this.reportService.createReport(body, user);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, serialize_interceptor_1.Serialize)(report_dto_1.ReportDto),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, curren_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_report_dto_1.CreateReportDto, users_entity_1.User]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "createReport", null);
exports.ReportsController = ReportsController = __decorate([
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map