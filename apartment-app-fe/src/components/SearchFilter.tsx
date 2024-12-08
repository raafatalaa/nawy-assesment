'use client';

import { useState } from 'react';
import { SearchApartmentDto } from '@/types/apartment';

interface SearchFiltersProps {
  onSearch: (filters: SearchApartmentDto) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchApartmentDto>({
    apartmentName: '',
    propertyNumber: undefined,
    projectName: '',
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Apartment Name"
          value={filters.apartmentName}
          onChange={(e) => setFilters({ ...filters, apartmentName: e.target.value })}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Property Number"
          value={filters.propertyNumber || ''}
          onChange={(e) => setFilters({ ...filters, propertyNumber: e.target.value ? Number(e.target.value) : undefined })}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Project Name"
          value={filters.projectName}
          onChange={(e) => setFilters({ ...filters, projectName: e.target.value })}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button 
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}
