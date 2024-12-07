import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be greater than or equal to 1' })
  page?: number;

  @IsOptional()
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be greater than or equal to 1' })
  limit?: number;
}
