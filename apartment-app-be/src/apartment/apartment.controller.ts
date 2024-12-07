import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { Apartment } from './entities/apartment.entity';

@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Get()
  async findAll(): Promise<Apartment[]> {
    return this.apartmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Apartment> {
    return this.apartmentService.findOne(+id);
  }

  @Post()
  async create(@Body() apartment: Omit<Apartment, 'id'>): Promise<Apartment> {
    return this.apartmentService.create(apartment);
  }
}
