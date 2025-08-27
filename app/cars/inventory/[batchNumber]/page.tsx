"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { CarTable } from "@/components/ui/car-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { carAPI, batchAPI } from "@/lib/api";
import type { Car } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface BatchDetailPageProps {
  params: {
    batchNumber: string;
  };
}

export default function BatchDetailPage({ params }: BatchDetailPageProps) {
  const router = useRouter();
  const { batchNumber } = params;
  console.log("BatchDetailPage received batchNumber:", batchNumber);
  const [cars, setCars] = useState<any[]>([]);
  const [allBatches, setAllBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9;

  useEffect(() => {
    fetchCars();
  }, [batchNumber]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching cars for batch number:", batchNumber);
      
      // Fetch cars for this specific batch and all batches in parallel
      const [carsResponse, batchesResponse] = await Promise.all([
        carAPI.getAll({ batchNo: batchNumber }),
        batchAPI.getAll()
      ]);
      
      console.log("API response:", carsResponse);
      
      if (carsResponse.success && batchesResponse.success) {
        setCars(carsResponse.data);
        setAllBatches(batchesResponse.data);
        console.log("Cars loaded:", carsResponse.data.length);
      } else {
        console.error("API error:", carsResponse.error);
        setError(carsResponse.error || "Failed to fetch cars");
      }
    } catch (error: any) {
      console.error("Error fetching cars:", error);
      setError(error.message || "An error occurred while fetching cars");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = (car: Car) => {
    console.log("Delete car:", car);
  };

  const handleViewCar = (car: Car) => {
    console.log("View car:", car);
  };

  // Calculate pagination
  const totalPages = Math.ceil(cars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const currentCars = cars.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddNewCar = () => {
    router.push(`/cars/inventory/${batchNumber}/add-car`);
  };

  // Check if this batch is the latest one
  const isLatestBatch = () => {
    if (allBatches.length === 0) return false;
    
    // Sort batches by batch number (latest first)
    const sortedBatches = allBatches.sort((a: any, b: any) => {
      const numA = parseInt(a.batchNo.replace(/\D/g, ''));
      const numB = parseInt(b.batchNo.replace(/\D/g, ''));
      return numB - numA;
    });
    
    return sortedBatches[0]?.batchNo === batchNumber;
  };



  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading cars...</p>
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
              onClick={fetchCars}
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
        <div className="flex-1 flex flex-col space-y-4 p-2">
          {/* Header Section with Navigation */}
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2"
              style={{
                width: '604.5px',
                height: '30px',
                gap: '12px',
                opacity: 1
              }}
            >
              <span className="text-gray-600">All Inventory</span>
              <i className="fas fa-chevron-right text-gray-400 text-sm"></i>
              <span className="font-medium">Batch {batchNumber}</span>
              
              {isLatestBatch() && (
                <div
                  style={{
                    width: '102px',
                    height: '25px',
                    borderRadius: '1000px',
                    opacity: 1,
                    gap: '10px',
                    paddingTop: '4px',
                    paddingRight: '10px',
                    paddingBottom: '4px',
                    paddingLeft: '10px',
                    background: '#00674F1F',
                    color: '#00674F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  Latest Batch
                </div>
              )}
              

            </div>
            <Button 
              className="flex items-center gap-2.5 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              style={{
                width: '148px',
                height: '50px',
                borderRadius: '50px',
                paddingTop: '10px',
                paddingRight: '18px',
                paddingBottom: '10px',
                paddingLeft: '18px',
                gap: '10px',
                borderWidth: '1px',
                opacity: 1
              }}
              onClick={handleAddNewCar}
            >
              <Plus className="h-4 w-4" />
              Add New Car
            </Button>
          </div>

          {/* Search and Filter Section */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="relative flex-1 max-w-md">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" size="sm" className="rounded-xl">
                <i className="fas fa-filter mr-2"></i>
                Filter
              </Button>
            </div>

            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Company</option>
                <option>Honda</option>
                <option>Toyota</option>
                <option>Nissan</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Grade</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Import year</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Status</option>
                <option>Sold</option>
                <option>In Transit</option>
                <option>Warehouse</option>
              </select>
            </div>
          </div>

          {/* Car Table */}
          <div className="mt-6">
            <div style={{ height: '710px', overflow: 'hidden' }}>
              <CarTable
                cars={currentCars}
                batchNumber={batchNumber}
                onDelete={handleDeleteCar}
                onView={handleViewCar}
              />
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-4 justify-center">
              <button
                className="p-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`text-sm ${
                    currentPage === page
                      ? 'bg-[#00674F] text-white'
                      : 'text-black  bg-transparent'
                  }`}
                  style={{
                    width: '26px',
                    height: '25px',
                    borderRadius: '1000px',
                    opacity: 1,
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              
              <button
                className="p-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
