import { Repository } from 'typeorm';
import { Apartment } from './entities/apartment.entity';
export declare class ApartmentService {
    private apartmentRepository;
    constructor(apartmentRepository: Repository<Apartment>);
    findAll(filters: {
        apartmentName?: string;
        propertyNumber?: number;
        projectName?: string;
    }, pagination: {
        page: number;
        limit: number;
    }): Promise<{
        data: Apartment[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<Apartment>;
    create(apartment: Omit<Apartment, 'id'>): Promise<Apartment>;
}
