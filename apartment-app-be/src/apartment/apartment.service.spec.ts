import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentService } from './apartment.service';
import { ApartmentRepository } from './repositories/apartment.repository';
import { NotFoundException } from '@nestjs/common';
import { Apartment } from './entities/apartment.entity';

describe('ApartmentService', () => {
  let service: ApartmentService;
  let repository: ApartmentRepository;

  const mockApartmentRepository = {
    findAllWithFiltersAndPagination: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApartmentService,
        {
          provide: ApartmentRepository,
          useValue: mockApartmentRepository,
        },
      ],
    }).compile();

    service = module.get<ApartmentService>(ApartmentService);
    repository = module.get<ApartmentRepository>(ApartmentRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated results', async () => {
      const expectedResult = {
        data: [{ id: 1, apartmentName: 'Test Apartment' }],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      };

      mockApartmentRepository.findAllWithFiltersAndPagination.mockResolvedValue(expectedResult);

      const result = await service.findAll(
        { apartmentName: 'Test' },
        { page: 1, limit: 10 },
      );

      expect(result).toEqual(expectedResult);
      expect(mockApartmentRepository.findAllWithFiltersAndPagination).toHaveBeenCalledWith(
        { apartmentName: 'Test' },
        { page: 1, limit: 10 },
      );
    });
  });

  describe('findOne', () => {
    it('should return an apartment when it exists', async () => {
      const apartment = { id: 1, apartmentName: 'Test Apartment' };
      mockApartmentRepository.findById.mockResolvedValue(apartment);

      const result = await service.findOne(1);
      expect(result).toEqual(apartment);
    });

    it('should throw NotFoundException when apartment does not exist', async () => {
      mockApartmentRepository.findById.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new apartment', async () => {
      const newApartment = {
        apartmentName: 'New Apartment',
        propertyNumber: '123',
        apartmentPrice: 1000,
        projectName: 'Test Project'
      };
      const createdApartment = { id: 1, ...newApartment };
      mockApartmentRepository.create.mockResolvedValue(createdApartment);

      const result = await service.create(newApartment as unknown as Omit<Apartment, 'id'>);
      expect(result).toEqual(createdApartment);
      expect(mockApartmentRepository.create).toHaveBeenCalledWith(newApartment);
    });
  });
});
