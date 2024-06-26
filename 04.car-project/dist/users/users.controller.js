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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const auth_dto_1 = require("./dtos/auth.dto");
const updateUser_dto_1 = require("./dtos/updateUser.dto");
const user_dto_1 = require("./dtos/user.dto");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const users_service_1 = require("./users.service");
const auth_service_1 = require("./auth.service");
const curren_user_decorator_1 = require("./decorators/curren-user.decorator");
const users_entity_1 = require("./users.entity");
const auth_guard_1 = require("../guard/auth.guard");
let UsersController = class UsersController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async whoAmI(user) {
        return user;
    }
    async signUp(body, session) {
        const user = await this.authService.signup(body.email, body.password);
        session.user_id = user.id;
        return user;
    }
    async sigin(body, session) {
        const user = await this.authService.signin(body.email, body.password);
        session.user_id = user.id;
        return user;
    }
    signout(session) {
        session.user_id = null;
    }
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    getUserById(id) {
        return this.userService.getUserById(id);
    }
    getUserByEmail(email) {
        const user = this.userService.getUserByEmail(email);
        return user;
    }
    updateUser(id, attrs) {
        this.userService.updateUser(id, attrs);
    }
    deleteUser(id) {
        this.userService.deleteUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('whoami'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, curren_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "whoAmI", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sigin", null);
__decorate([
    (0, common_1.Post)('signout'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "signout", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserByEmail", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
//# sourceMappingURL=users.controller.js.map