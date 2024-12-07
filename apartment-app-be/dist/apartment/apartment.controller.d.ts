import { ApartmentService } from './apartment.service';
import { Apartment } from './entities/apartment.entity';
import { PaginationDto } from './dto/pagination.dto';
import { SearchApartmentDto } from './dto/search-apartment.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
export declare class ApartmentController {
    private readonly apartmentService;
    constructor(apartmentService: ApartmentService);
    findAll(query: PaginationDto & SearchApartmentDto): Promise<{
        data: Apartment[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Apartment>;
    create(createApartmentDto: CreateApartmentDto): Promise<Apartment>;
}
