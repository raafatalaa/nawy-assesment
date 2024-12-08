'use client';

import { CreateApartmentForm } from '@/components/CreateApartmentForm';

export default function CreateApartmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Apartment</h1>
      <CreateApartmentForm />
    </div>
  );
}
