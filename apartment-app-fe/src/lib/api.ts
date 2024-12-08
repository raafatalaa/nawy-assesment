import axios from 'axios';
import { Apartment, PaginatedResponse, SearchFilters, CreateApartmentDto } from '@/types/apartment';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

export const getApartments = async (filters: SearchFilters) => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
  );

  const { data } = await api.get<PaginatedResponse<Apartment>>('/apartments', {
    params: cleanFilters,
  });
  return data;
};

export const getApartmentById = async (id: number) => {
  const { data } = await api.get<Apartment>(`/apartments/${id}`);
  return data;
};

export const createApartment = async (data: CreateApartmentDto): Promise<Apartment> => {
  const response = await axios.post<Apartment>('http://localhost:3000/apartments', data);
  return response.data;
};
