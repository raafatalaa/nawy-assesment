import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { Apartment } from './entities/apartment.entity';
import { PaginationDto } from './dto/pagination.dto';
import { SearchApartmentDto } from './dto/search-apartment.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags, 
  ApiQuery, 
  ApiParam,
  ApiBody 
} from '@nestjs/swagger';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all apartments with pagination and filters' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (starts from 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiQuery({ name: 'apartmentName', required: false, type: String, description: 'Filter by apartment name' })
  @ApiQuery({ name: 'propertyNumber', required: false, type: Number, description: 'Filter by property number' })
  @ApiQuery({ name: 'projectName', required: false, type: String, description: 'Filter by project name' })
  @ApiResponse({ 
    status: 200, 
    description: 'Successfully retrieved apartments',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Apartment' }
        },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid parameters' })
  async findAll(@Query() query: PaginationDto & SearchApartmentDto) {
    const { page = 1, limit = 10, apartmentName, propertyNumber, projectName } = query;
    return await this.apartmentService.findAll(
      { apartmentName, propertyNumber, projectName },
      { page, limit },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get apartment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Apartment ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'The apartment has been found',
    type: Apartment
  })
  @ApiResponse({ status: 404, description: 'Apartment not found' })
  async findOne(@Param('id') id: string): Promise<Apartment> {
    return this.apartmentService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new apartment' })
  @ApiBody({ 
    type: CreateApartmentDto,
    description: 'Apartment creation payload'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'The apartment has been successfully created',
    type: Apartment
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad Request - Invalid input data'
  })
  async create(@Body() createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    return this.apartmentService.create(createApartmentDto);
  }
}
