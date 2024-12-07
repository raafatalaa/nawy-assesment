import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateApartmentDto {
  @IsNotEmpty()
  @IsString()
  apartmentName: string;

  @IsNotEmpty()
  @IsNumber()
  propertyNumber: number;

  @IsNotEmpty()
  @IsNumber()
  apartmentPrice: number;

  @IsNotEmpty()
  @IsString()
  projectName: string;
} 