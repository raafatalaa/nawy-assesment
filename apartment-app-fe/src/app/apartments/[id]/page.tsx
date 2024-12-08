'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getApartmentById } from '@/lib/api';

type Apartment = {
  id: number;
  apartmentName: string;
  propertyNumber: number;
  apartmentPrice: number;
  projectName: string;
};

export default function ApartmentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const data = await getApartmentById(Number(id));
        setApartment(data);
      } catch (error) {
        console.error('Error fetching apartment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!apartment) {
    return <div>Apartment not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-4">
          {apartment.apartmentName}
        </h1>
        
        <div className="space-y-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Project Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 uppercase">Price</p>
                <p className="text-2xl font-bold text-green-600">
                  ${apartment.apartmentPrice.toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 uppercase">Property Number</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {apartment.propertyNumber}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
                <p className="text-sm text-gray-500 uppercase">Project Name</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {apartment.projectName}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button 
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}