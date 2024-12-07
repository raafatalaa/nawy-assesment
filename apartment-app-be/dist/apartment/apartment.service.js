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
exports.ApartmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const apartment_entity_1 = require("./entities/apartment.entity");
let ApartmentService = class ApartmentService {
    constructor(apartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }
    async findAll(filters, pagination) {
        const { page, limit } = pagination;
        const queryBuilder = this.apartmentRepository.createQueryBuilder('apartment');
        if (filters.apartmentName) {
            queryBuilder.andWhere('apartment.apartmentName ILIKE :apartmentName', {
                apartmentName: `%${filters.apartmentName}%`,
            });
        }
        if (filters.propertyNumber) {
            queryBuilder.andWhere('apartment.propertyNumber = :propertyNumber', {
                propertyNumber: filters.propertyNumber,
            });
        }
        if (filters.projectName) {
            queryBuilder.andWhere('apartment.projectName ILIKE :projectName', {
                projectName: `%${filters.projectName}%`,
            });
        }
        queryBuilder.skip((page - 1) * limit).take(limit);
        const [data, total] = await queryBuilder.getManyAndCount();
        return { data, total, page, limit };
    }
    async findOne(id) {
        const apartment = await this.apartmentRepository.findOne({ where: { id } });
        if (!apartment) {
            throw new common_1.NotFoundException(`Apartment with ID ${id} not found`);
        }
        return apartment;
    }
    create(apartment) {
        const newApartment = this.apartmentRepository.create(apartment);
        return this.apartmentRepository.save(newApartment);
    }
};
exports.ApartmentService = ApartmentService;
exports.ApartmentService = ApartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(apartment_entity_1.Apartment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ApartmentService);
//# sourceMappingURL=apartment.service.js.map