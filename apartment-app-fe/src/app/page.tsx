'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getApartments } from '@/lib/api';
import { ApartmentCard } from '@/components/ApartmentCard';
import { SearchFilters } from '@/components/SearchFilter';
import { Pagination } from '@/components/Pagination';
import type { Apartment, SearchApartmentDto } from '@/types/apartment';

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchFilters, setSearchFilters] = useState<SearchApartmentDto>({});

  useEffect(() => {
    fetchApartments();
  }, [page, searchFilters]);

  const fetchApartments = async () => {
    try {
      const response = await getApartments({ 
        page, 
        limit,
        ...searchFilters 
      });
      setApartments(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };

  const handleSearch = (filters: SearchApartmentDto) => {
    setSearchFilters(filters);
    setPage(1); // Reset to first page when searching
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Apartments</h1>
        <Link 
          href="/apartments/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Apartment
        </Link>
      </div>
      
      <SearchFilters onSearch={handleSearch} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment.id} apartment={apartment} />
        ))}
      </div>
      
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(total / limit)}
        onPageChange={setPage}
      />
    </div>
  );
}
