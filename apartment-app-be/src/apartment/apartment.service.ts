import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './entities/apartment.entity';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
  ) {}

  // Get all apartments
  findAll(): Promise<Apartment[]> {
    return this.apartmentRepository.find();
  }

  // Get apartment by ID
  async findOne(id: number): Promise<Apartment> {
    const apartment = await this.apartmentRepository.findOne({ where: { id } });
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }

  // Add a new apartment
  create(apartment: Omit<Apartment, 'id'>): Promise<Apartment> {
    const newApartment = this.apartmentRepository.create(apartment);
    return this.apartmentRepository.save(newApartment);
  }
}
