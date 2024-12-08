import { Apartment } from '@/types/apartment';
import Link from 'next/link';

interface Props {
  apartment: Apartment;
}

export function ApartmentCard({ apartment }: Props) {
  return (
    <Link 
      href={`/apartments/${apartment.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{apartment.apartmentName}</h2>
        <div className="space-y-2 text-gray-600">
          <p>Property Number: {apartment.propertyNumber}</p>
          <p>Project: {apartment.projectName}</p>
          <p className="text-lg font-medium text-green-600">
            ${apartment.apartmentPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
