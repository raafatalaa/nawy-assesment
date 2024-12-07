import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apartmentName: string;

  @Column()
  propertyNumber: number;

  @Column()
  apartmentPrice: number;

  @Column()
  projectName: string;
}
