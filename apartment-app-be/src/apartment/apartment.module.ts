import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { ApartmentRepository } from './repositories/apartment.repository';
import { Apartment } from './entities/apartment.entity';
import { PaginationModule } from '../common/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apartment]),
    PaginationModule,
  ],
  controllers: [ApartmentController],
  providers: [ApartmentService, ApartmentRepository],
})
export class ApartmentModule {}
