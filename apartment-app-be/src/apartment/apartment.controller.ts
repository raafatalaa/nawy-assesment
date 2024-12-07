import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { Apartment } from './entities/apartment.entity';
import { PaginationDto } from './dto/pagination.dto';
import { SearchApartmentDto } from './dto/search-apartment.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';

@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Get()
  findAll(@Query() query: PaginationDto & SearchApartmentDto) {
    const { page = 1, limit = 10, apartmentName, propertyNumber, projectName } = query;
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
  async create(@Body() createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    return this.apartmentService.create(createApartmentDto);
  }
}
