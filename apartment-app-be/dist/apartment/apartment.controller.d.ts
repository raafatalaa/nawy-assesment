import { ApartmentService } from './apartment.service';
import { Apartment } from './entities/apartment.entity';
export declare class ApartmentController {
    private readonly apartmentService;
    constructor(apartmentService: ApartmentService);
    findAll(): Promise<Apartment[]>;
    findOne(id: string): Promise<Apartment>;
    create(apartment: Omit<Apartment, 'id'>): Promise<Apartment>;
}
