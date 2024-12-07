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
exports.ApartmentController = void 0;
const common_1 = require("@nestjs/common");
const apartment_service_1 = require("./apartment.service");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let ApartmentController = class ApartmentController {
    constructor(apartmentService) {
        this.apartmentService = apartmentService;
    }
    findAll(paginationDto, apartmentName, propertyNumber, projectName) {
        console.log('Pagination DTO:', paginationDto);
        const { page = 1, limit = 10 } = paginationDto;
        return this.apartmentService.findAll({ apartmentName, propertyNumber, projectName }, { page, limit });
    }
    async findOne(id) {
        return this.apartmentService.findOne(+id);
    }
    async create(apartment) {
        return this.apartmentService.create(apartment);
    }
};
exports.ApartmentController = ApartmentController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('apartmentName')),
    __param(2, (0, common_1.Query)('propertyNumber')),
    __param(3, (0, common_1.Query)('projectName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String, Number, String]),
    __metadata("design:returntype", void 0)
], ApartmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "create", null);
exports.ApartmentController = ApartmentController = __decorate([
    (0, common_1.Controller)('apartments'),
    __metadata("design:paramtypes", [apartment_service_1.ApartmentService])
], ApartmentController);
//# sourceMappingURL=apartment.controller.js.map