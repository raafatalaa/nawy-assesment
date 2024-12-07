import { ApartmentService } from './apartment.service';
import { Apartment } from './entities/apartment.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class ApartmentController {
    private readonly apartmentService;
    constructor(apartmentService: ApartmentService);
    findAll(paginationDto: PaginationDto, apartmentName?: string, propertyNumber?: number, projectName?: string): Promise<{
        data: Apartment[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Apartment>;
    create(apartment: Omit<Apartment, 'id'>): Promise<Apartment>;
}
