import { Repository } from 'typeorm';
import { Apartment } from './entities/apartment.entity';
export declare class ApartmentService {
    private apartmentRepository;
    constructor(apartmentRepository: Repository<Apartment>);
    findAll(): Promise<Apartment[]>;
    findOne(id: number): Promise<Apartment>;
    create(apartment: Omit<Apartment, 'id'>): Promise<Apartment>;
}
