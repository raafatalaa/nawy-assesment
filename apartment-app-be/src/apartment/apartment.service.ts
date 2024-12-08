import { Injectable, NotFoundException } from '@nestjs/common';
import { Apartment } from './entities/apartment.entity';
import { ApartmentRepository } from './repositories/apartment.repository';

@Injectable()
export class ApartmentService {
  constructor(private apartmentRepository: ApartmentRepository) {}

  async findAll(
    filters: {
      apartmentName?: string;
      propertyNumber?: number;
      projectName?: string;
    },
    pagination: { page: number; limit: number },
  ) {
    return this.apartmentRepository.findAllWithFiltersAndPagination(
      filters,
      pagination,
    );
  }

  async findOne(id: number): Promise<Apartment> {
    const apartment = await this.apartmentRepository.findById(id);
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }

  create(apartment: Omit<Apartment, 'id'>): Promise<Apartment> {
    return this.apartmentRepository.create(apartment);
  }
}
