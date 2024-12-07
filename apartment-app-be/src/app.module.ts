import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentModule } from './apartment/apartment.module';
import { Apartment } from './apartment/entities/apartment.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'apartment_db',
        entities: [Apartment],
        synchronize: true,
      }),
    }),
    ApartmentModule,
  ],
})
export class AppModule {}
