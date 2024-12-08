'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createApartment } from '@/lib/api';
import { CreateApartmentDto } from '@/types/apartment';

export function CreateApartmentForm() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<CreateApartmentDto>({
    apartmentName: '',
    propertyNumber: 0,
    apartmentPrice: 0,
    projectName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await createApartment(formData);
      router.push('/apartments');
    } catch (err) {
      setError('Failed to create apartment. Please check your input.');
      console.error('Error creating apartment:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apartment Name
          </label>
          <input
            type="text"
            required
            value={formData.apartmentName}
            onChange={(e) => setFormData({ ...formData, apartmentName: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Luxury Suite A1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Number
          </label>
          <input
            type="number"
            required
            value={formData.propertyNumber}
            onChange={(e) => setFormData({ ...formData, propertyNumber: Number(e.target.value) })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 101"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apartment Price
          </label>
          <input
            type="number"
            required
            value={formData.apartmentPrice}
            onChange={(e) => setFormData({ ...formData, apartmentPrice: Number(e.target.value) })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 250000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>
          <input
            type="text"
            required
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Green Valley Residences"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Apartment
          </button>
        </div>
      </div>
    </form>
  );
}
