import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentDto {
  @ApiProperty({
    description: 'Name of the apartment',
    example: 'Luxury Suite A1',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  apartmentName: string;

  @ApiProperty({
    description: 'Property identification number',
    example: 101,
    type: Number
  })
  @IsNotEmpty()
  @IsNumber()
  propertyNumber: number;

  @ApiProperty({
    description: 'Price of the apartment',
    example: 250000,
    type: Number
  })
  @IsNotEmpty()
  @IsNumber()
  apartmentPrice: number;

  @ApiProperty({
    description: 'Name of the project',
    example: 'Green Valley Residences',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  projectName: string;
} 