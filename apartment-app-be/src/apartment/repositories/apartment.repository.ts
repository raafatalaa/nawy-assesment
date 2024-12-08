import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from '../entities/apartment.entity';
import { PaginationArgs, PaginatedResult } from '../../common/pagination/pagination.interface';
import { PaginationService } from '../../common/pagination/pagination.service';

@Injectable()
export class ApartmentRepository {
  constructor(
    @InjectRepository(Apartment)
    private repository: Repository<Apartment>,
    private paginationService: PaginationService,
  ) {}

  async findAllWithFiltersAndPagination(
    filters: {
      apartmentName?: string;
      propertyNumber?: number;
      projectName?: string;
    },
    pagination: PaginationArgs,
  ): Promise<PaginatedResult<Apartment>> {
    const queryBuilder = this.repository.createQueryBuilder('apartment');

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

    return this.paginationService.paginate(queryBuilder, pagination);
  }

  async findById(id: number): Promise<Apartment | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(apartment: Omit<Apartment, 'id'>): Promise<Apartment> {
    const newApartment = this.repository.create(apartment);
    return this.repository.save(newApartment);
  }
}
