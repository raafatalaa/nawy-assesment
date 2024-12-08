import { Apartment } from '@/types/apartment';

interface Props {
  apartment: Apartment;
}

export function ApartmentDetails({ apartment }: Props) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">{apartment.apartmentName}</h1>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-gray-600">Property Number</span>
          <span className="font-medium">{apartment.propertyNumber}</span>
        </div>
        
        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-gray-600">Project Name</span>
          <span className="font-medium">{apartment.projectName}</span>
        </div>
        
        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-gray-600">Price</span>
          <span className="text-xl font-bold text-green-600">
            ${apartment.apartmentPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
