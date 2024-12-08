import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { PaginationArgs, PaginatedResult } from './pagination.interface';

@Injectable()
export class PaginationService {
  async paginate<T>(
    queryBuilder: SelectQueryBuilder<T>,
    args: PaginationArgs,
  ): Promise<PaginatedResult<T>> {
    const { page, limit } = args;
    const skip = (page - 1) * limit;

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
