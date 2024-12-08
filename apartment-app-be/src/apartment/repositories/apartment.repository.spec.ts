import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartmentRepository } from './apartment.repository';
import { Apartment } from '../entities/apartment.entity';
import { PaginationService } from '../../common/pagination/pagination.service';

describe('ApartmentRepository', () => {
  let repository: ApartmentRepository;
  let typeOrmRepository: Repository<Apartment>;
  let paginationService: PaginationService;

  const mockTypeOrmRepository = {
    createQueryBuilder: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockPaginationService = {
    paginate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApartmentRepository,
        {
          provide: getRepositoryToken(Apartment),
          useValue: mockTypeOrmRepository,
        },
        {
          provide: PaginationService,
          useValue: mockPaginationService,
        },
      ],
    }).compile();

    repository = module.get<ApartmentRepository>(ApartmentRepository);
    typeOrmRepository = module.get<Repository<Apartment>>(getRepositoryToken(Apartment));
    paginationService = module.get<PaginationService>(PaginationService);
  });

  describe('findAllWithFiltersAndPagination', () => {
    it('should return paginated results with filters', async () => {
      const mockQueryBuilder = {
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn(),
      };

      mockTypeOrmRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      mockPaginationService.paginate.mockResolvedValue({
        data: [{ id: 1, apartmentName: 'Test' }],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });

      const result = await repository.findAllWithFiltersAndPagination(
        { apartmentName: 'Test' },
        { page: 1, limit: 10 },
      );

      expect(result).toBeDefined();
      expect(mockTypeOrmRepository.createQueryBuilder).toHaveBeenCalledWith('apartment');
      expect(mockPaginationService.paginate).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find apartment by id', async () => {
      const apartment = { id: 1, apartmentName: 'Test' };
      mockTypeOrmRepository.findOne.mockResolvedValue(apartment);

      const result = await repository.findById(1);
      expect(result).toEqual(apartment);
      expect(mockTypeOrmRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('create', () => {
    it('should create a new apartment', async () => {
      const newApartment = { apartmentName: 'New Apartment' };
      const createdApartment = { id: 1, ...newApartment };

      mockTypeOrmRepository.create.mockReturnValue(createdApartment);
      mockTypeOrmRepository.save.mockResolvedValue(createdApartment);

      const result = await repository.create(newApartment as unknown as Omit<Apartment, 'id'>);
      expect(result).toEqual(createdApartment);
      expect(mockTypeOrmRepository.create).toHaveBeenCalledWith(newApartment);
      expect(mockTypeOrmRepository.save).toHaveBeenCalledWith(createdApartment);
    });
  });
});
