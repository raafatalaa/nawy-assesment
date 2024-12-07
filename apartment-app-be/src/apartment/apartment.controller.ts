import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { Apartment } from './entities/apartment.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('apartmentName') apartmentName?: string,
    @Query('propertyNumber') propertyNumber?: number,
    @Query('projectName') projectName?: string,
  ) {
    console.log('Pagination DTO:', paginationDto);
    const { page = 1, limit = 10 } = paginationDto;
    return this.apartmentService.findAll(
      { apartmentName, propertyNumber, projectName },
      { page, limit },
    );
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
