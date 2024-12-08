export interface Apartment {
  id: number;
  apartmentName: string;
  propertyNumber: number;
  apartmentPrice: number;
  projectName: string;
}

export interface SearchApartmentDto {
  apartmentName?: string;
  propertyNumber?: number;
  projectName?: string;
}

export interface PaginationDto {
  page?: number;
  limit?: number;
}

export interface CreateApartmentDto {
  apartmentName: string;
  propertyNumber: number;
  apartmentPrice: number;
  projectName: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchFilters extends PaginationDto, SearchApartmentDto {
  page: number;
  limit: number;
}
