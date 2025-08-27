"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { BatchHeader } from "@/components/ui/batch-header";
import { CarTable } from "@/components/ui/car-table";
import { useEffect, useState } from "react";
import { carAPI } from "@/lib/api";

export default function SoldCarsPage() {
  const [soldCars, setSoldCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSoldCars();
  }, []);

  const fetchSoldCars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch cars with sold status
      const response = await carAPI.getAll({ status: 'sold' });
      
      if (response.success) {
        setSoldCars(response.data);
      } else {
        setError(response.error || "Failed to fetch sold cars");
      }
    } catch (error: any) {
      console.error("Error fetching sold cars:", error);
      setError(error.message || "An error occurred while fetching sold cars");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading sold cars...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={fetchSoldCars}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col space-y-6 p-4">
        <BatchHeader title="Cars Sold" showFilters={true} />
        <div className="mt-6">
          <CarTable cars={soldCars} />
        </div>
      </div>
    </div>
    </MainLayout>
  );
}
