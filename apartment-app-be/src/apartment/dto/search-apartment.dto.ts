import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchApartmentDto {
  @IsOptional()
  @IsString()
  apartmentName?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  propertyNumber?: number;

  @IsOptional()
  @IsString()
  projectName?: string;
}
