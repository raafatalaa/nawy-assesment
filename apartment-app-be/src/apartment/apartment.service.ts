import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './entities/apartment.entity';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
  ) {}


  async findAll(
    filters: {
      apartmentName?: string;
      propertyNumber?: number;
      projectName?: string;
    },
    pagination: { page: number; limit: number },
  ): Promise<{ data: Apartment[]; total: number; page: number; limit: number }> {
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


  async findOne(id: number): Promise<Apartment> {
    const apartment = await this.apartmentRepository.findOne({ where: { id } });
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }

  create(apartment: Omit<Apartment, 'id'>): Promise<Apartment> {
    const newApartment = this.apartmentRepository.create(apartment);
    return this.apartmentRepository.save(newApartment);
  }
}
