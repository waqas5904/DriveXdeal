"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, X, Upload, Loader2 } from "lucide-react";
import { carAPI } from "@/lib/api";

interface AddCarPageProps {
  params: {
    batchNumber: string;
  };
}

export default function AddCarPage({ params }: AddCarPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { batchNumber } = params;
  const isFromTransit = searchParams.get('from') === 'transit';
  const isEditMode = searchParams.get('edit') === 'true';
  const carDataParam = searchParams.get('carData');
  const [formData, setFormData] = useState({
    carName: "Vitara",
    company: "Suzuki",
    engineNumber: "M16A-345678",
    mileage: "14k",
    auctionGrade: "5",
    importYear: "2022",
    assembly: "Imported",
    engineCapacity: "1600 cc",
    interiorColor: "Black Leather",
    keywords: ["Cars", "Suzuki", "More than 1000 cc", "Imported", "SUV"],
    status: "Transit",
    deliveryTimeframe: "Least 34 weeks",
    color: "Sonic Red",
    selectedBatch: batchNumber,
    description: "The Suzuki Vitara is a compact SUV that combines style, performance, and practicality. This 2022 model features a 1.6L engine with excellent fuel efficiency and smooth handling. The vehicle comes with advanced safety features, modern infotainment system, and comfortable interior. Perfect for both city driving and weekend adventures. The car has been well-maintained and is in excellent condition with low mileage.",
    auctionPrice: "2,300,000",
    auctionExpenses: "150,000",
    inlandCharges: "50,000",
    shipmentCharges: "250,000",
    variantDuty: "500,000",
    passportCharges: "5,000",
    servicesCharges: "30,000",
    transportCharges: "40,000",
    repairCharges: "100,000",
    miscellaneousCharges: "75,000"
  });

  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [auctionSheet, setAuctionSheet] = useState<File | null>(null);
  const [carPictures, setCarPictures] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle pre-filling form data when in edit mode
  useEffect(() => {
    if (isEditMode && carDataParam) {
      try {
        const carData = JSON.parse(decodeURIComponent(carDataParam));
        setFormData(prev => ({
          ...prev,
          carName: carData.name || carData.carName || prev.carName,
          company: carData.company || prev.company,
          engineNumber: carData.engineNumber || prev.engineNumber,
          mileage: carData.mileage || prev.mileage,
          auctionGrade: carData.grade?.toString() || carData.auctionGrade || prev.auctionGrade,
          importYear: carData.importYear?.toString() || prev.importYear,
          assembly: carData.assembly || prev.assembly,
          engineCapacity: carData.engineCapacity || prev.engineCapacity,
          interiorColor: carData.interiorColor || prev.interiorColor,
          keywords: carData.keywords || prev.keywords,
          status: carData.status || prev.status,
          deliveryTimeframe: carData.deliveryTimeframe || prev.deliveryTimeframe,
          color: carData.color || prev.color,
          selectedBatch: carData.batch || batchNumber,
          description: carData.description || prev.description,
          auctionPrice: carData.price?.toString() || carData.auctionPrice || prev.auctionPrice,
          auctionExpenses: carData.auctionExpenses || prev.auctionExpenses,
          inlandCharges: carData.inlandCharges || prev.inlandCharges,
          shipmentCharges: carData.shipmentCharges || prev.shipmentCharges,
          variantDuty: carData.variantDuty || prev.variantDuty,
          passportCharges: carData.passportCharges || prev.passportCharges,
          servicesCharges: carData.servicesCharges || prev.servicesCharges,
          transportCharges: carData.transportCharges || prev.transportCharges,
          repairCharges: carData.repairCharges || prev.repairCharges,
          miscellaneousCharges: carData.miscellaneousCharges || prev.miscellaneousCharges
        }));
      } catch (error) {
        console.error('Error parsing car data:', error);
      }
    }
  }, [isEditMode, carDataParam, batchNumber]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleKeywordAdd = (keyword: string) => {
    if (keyword && !formData.keywords.includes(keyword)) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keyword]
      }));
    }
  };

  const handleKeywordRemove = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  const handleFileUpload = (type: 'cover' | 'auction' | 'pictures', file: File) => {
    if (type === 'cover') {
      setCoverPhoto(file);
    } else if (type === 'auction') {
      setAuctionSheet(file);
    } else if (type === 'pictures') {
      setCarPictures(prev => [...prev, file]);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate required fields
      const requiredFields = [
        'carName', 'company', 'engineNumber', 'auctionGrade', 'importYear', 
        'assembly', 'engineCapacity', 'interiorColor', 'mileage', 'color', 
        'deliveryTimeframe', 'description'
      ];
      
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData] || formData[field as keyof typeof formData] === '') {
          setError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
          return;
        }
      }

      // Validate financing fields
      const financingFields = [
        'auctionPrice', 'auctionExpenses', 'inlandCharges', 'shipmentCharges',
        'variantDuty', 'passportCharges', 'servicesCharges', 'transportCharges',
        'repairCharges', 'miscellaneousCharges'
      ];
      
      for (const field of financingFields) {
        if (!formData[field as keyof typeof formData] || formData[field as keyof typeof formData] === '') {
          setError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
          return;
        }
      }

      // Validate car pictures
      if (carPictures.length < 4) {
        setError("At least 4 car pictures are required");
        return;
      }

      // Prepare car data for API
      const carData = {
        carName: formData.carName.trim(),
        company: formData.company.trim(),
        engineNumber: formData.engineNumber.trim(),
        chasisNumber: `CHS-${formData.company.toUpperCase()}-${Date.now()}`, // Generate chassis number
        auctionGrade: parseInt(formData.auctionGrade),
        importYear: parseInt(formData.importYear),
        assembly: formData.assembly.toLowerCase() === 'imported' ? 'import' : 'local',
        engineCapacity: formData.engineCapacity.trim(),
        interiorColor: formData.interiorColor.trim(),
        mileage: formData.mileage.trim(),
        keywords: Array.isArray(formData.keywords) ? formData.keywords : [],
        status: formData.status.toLowerCase().replace(' ', '_'),
        color: formData.color.trim(),
        deliveryTimeframe: formData.deliveryTimeframe.trim(),
        batchNo: formData.selectedBatch, // This will be the batch number like "04"
        description: formData.description.trim(),
        financing: {
          auctionPrice: parseInt(formData.auctionPrice.replace(/,/g, '')),
          auctionTaxes: parseInt(formData.auctionExpenses.replace(/,/g, '')),
          inlandCharges: parseInt(formData.inlandCharges.replace(/,/g, '')),
          shipmentCharges: parseInt(formData.shipmentCharges.replace(/,/g, '')),
          variantDuty: parseInt(formData.variantDuty.replace(/,/g, '')),
          passportCharges: parseInt(formData.passportCharges.replace(/,/g, '')),
          serviceCharges: parseInt(formData.servicesCharges.replace(/,/g, '')),
          transportCharges: parseInt(formData.transportCharges.replace(/,/g, '')),
          repairCharges: parseInt(formData.repairCharges.replace(/,/g, '')),
          miscellaneousCharges: parseInt(formData.miscellaneousCharges.replace(/,/g, ''))
        },
        images: {
          coverPhoto: coverPhoto ? URL.createObjectURL(coverPhoto) : "https://example.com/default-cover.jpg",
          auctionSheet: auctionSheet ? URL.createObjectURL(auctionSheet) : "https://example.com/default-sheet.pdf",
          carPictures: carPictures.map(file => URL.createObjectURL(file))
        }
      };

      console.log("Sending car data to API:", carData);

      // Call the API
      const response = await carAPI.create(carData);

      if (response.success) {
        console.log("Car created successfully:", response.data);
        // Show success message before redirecting
        alert("Car created successfully!");
        // Redirect to the batch page
        router.push(`/cars/inventory/${batchNumber}`);
      } else {
        // Handle specific validation errors
        if (response.error && response.error.includes('Validation failed')) {
          const errorDetails = response.details || [];
          setError(`Validation failed: ${errorDetails.join(', ')}`);
        } else {
          setError(response.error || "Failed to create car");
        }
      }
    } catch (error: any) {
      console.error("Error creating car:", error);
      setError(error.message || "An error occurred while creating the car");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    const prices = [
      parseInt(formData.auctionPrice.replace(/,/g, '')),
      parseInt(formData.auctionExpenses.replace(/,/g, '')),
      parseInt(formData.inlandCharges.replace(/,/g, '')),
      parseInt(formData.shipmentCharges.replace(/,/g, '')),
      parseInt(formData.variantDuty.replace(/,/g, '')),
      parseInt(formData.passportCharges.replace(/,/g, '')),
      parseInt(formData.servicesCharges.replace(/,/g, '')),
      parseInt(formData.transportCharges.replace(/,/g, '')),
      parseInt(formData.repairCharges.replace(/,/g, '')),
      parseInt(formData.miscellaneousCharges.replace(/,/g, ''))
    ];
    return prices.reduce((sum, price) => sum + price, 0).toLocaleString();
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-6 gap-1">
              <span className="text-gray-600 ">Batch 0{batchNumber}</span>
              <i className="fas fa-chevron-right text-gray-400 text-sm px-3"></i>
              <span className="font-medium">{isEditMode ? 'Edit Car' : 'Add New Car'}</span>
          </div>

          <div>
            {/* Car Information Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Car Information</h2>
              <div className="space-y-4">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black-700 mb-2">Car Name</label>
                    <Input
                      value={formData.carName}
                      onChange={(e) => handleInputChange('carName', e.target.value)}
                      placeholder="Enter car name"
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                      style={{
                        height: '42px',
                        borderRadius: '8px',
                        opacity: 1,
                        gap: '12px',
                        borderWidth: '1px',
                        paddingTop: '10px',
                        paddingRight: '12px',
                        paddingBottom: '10px',
                        paddingLeft: '12px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Company</label>
                                          <Select value={formData.company} onValueChange={(value) => handleInputChange('company', value)}>
                        <SelectTrigger 
                          className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                          style={{
                            height: '42px',
                            borderRadius: '8px',
                            opacity: 1,
                            gap: '12px',
                            borderWidth: '1px',
                            paddingTop: '10px',
                            paddingRight: '12px',
                            paddingBottom: '10px',
                            paddingLeft: '12px'
                          }}
                        >
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Suzuki">Suzuki</SelectItem>
                        <SelectItem value="Honda">Honda</SelectItem>
                        <SelectItem value="Toyota">Toyota</SelectItem>
                        <SelectItem value="Nissan">Nissan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Engine Number inventory</label>
                    <Input
                      value={formData.engineNumber}
                      onChange={(e) => handleInputChange('engineNumber', e.target.value)}
                      placeholder="Enter engine number"
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                      style={{
                        height: '42px',
                        borderRadius: '8px',
                        opacity: 1,
                        gap: '12px',
                        borderWidth: '1px',
                        paddingTop: '10px',
                        paddingRight: '12px',
                        paddingBottom: '10px',
                        paddingLeft: '12px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Mileage</label>
                    <Select value={formData.mileage} onValueChange={(value) => handleInputChange('mileage', value)}>
                      <SelectTrigger className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                        style={{
                          height: '42px',
                          borderRadius: '8px',
                          opacity: 1,
                          gap: '12px',
                          borderWidth: '1px',
                          paddingTop: '10px',
                          paddingRight: '12px',
                          paddingBottom: '10px',
                          paddingLeft: '12px'
                        }}
                      >
                        <SelectValue placeholder="Select mileage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="14k">14k</SelectItem>
                        <SelectItem value="15k">15k</SelectItem>
                        <SelectItem value="16k">16k</SelectItem>
                        <SelectItem value="17k">17k</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Auction Grade</label>
                    <Select value={formData.auctionGrade} onValueChange={(value) => handleInputChange('auctionGrade', value)}>
                      <SelectTrigger className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                        style={{
                          height: '42px',
                          borderRadius: '8px',
                          opacity: 1,
                          gap: '12px',
                          borderWidth: '1px',
                          paddingTop: '10px',
                          paddingRight: '12px',
                          paddingBottom: '10px',
                          paddingLeft: '12px'
                        }}
                      >
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Import Year</label>
                    <Select value={formData.importYear} onValueChange={(value) => handleInputChange('importYear', value)}>
                      <SelectTrigger className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                        style={{
                          height: '42px',
                          borderRadius: '8px',
                          opacity: 1,
                          gap: '12px',
                          borderWidth: '1px',
                          paddingTop: '10px',
                          paddingRight: '12px',
                          paddingBottom: '10px',
                          paddingLeft: '12px'
                        }}
                      >
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Fourth Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Assembly</label>
                    <Select value={formData.assembly} onValueChange={(value) => handleInputChange('assembly', value)}>
                      <SelectTrigger className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                        style={{
                          height: '42px',
                          borderRadius: '8px',
                          opacity: 1,
                          gap: '12px',
                          borderWidth: '1px',
                          paddingTop: '10px',
                          paddingRight: '12px',
                          paddingBottom: '10px',
                          paddingLeft: '12px'
                        }}
                      >
                        <SelectValue placeholder="Select assembly" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Imported">Imported</SelectItem>
                        <SelectItem value="Local">Local</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Engine Capacity</label>
                    <Select value={formData.engineCapacity} onValueChange={(value) => handleInputChange('engineCapacity', value)}>
                      <SelectTrigger className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                        style={{
                          height: '42px',
                          borderRadius: '8px',
                          opacity: 1,
                          gap: '12px',
                          borderWidth: '1px',
                          paddingTop: '10px',
                          paddingRight: '12px',
                          paddingBottom: '10px',
                          paddingLeft: '12px'
                        }}
                      >
                        <SelectValue placeholder="Select capacity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1600 cc">1600 cc</SelectItem>
                        <SelectItem value="1800 cc">1800 cc</SelectItem>
                        <SelectItem value="2000 cc">2000 cc</SelectItem>
                        <SelectItem value="2500 cc">2500 cc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Fifth Row - Interior Color Only */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Interior Color</label>
                  <Input
                    value={formData.interiorColor}
                    onChange={(e) => handleInputChange('interiorColor', e.target.value)}
                    placeholder="Enter interior color"
                    className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                    style={{
                      height: '42px',
                      borderRadius: '8px',
                      opacity: 1,
                      gap: '12px',
                      borderWidth: '1px',
                      paddingTop: '10px',
                      paddingRight: '12px',
                      paddingBottom: '10px',
                      paddingLeft: '12px'
                    }}
                  />
                </div>

                {/* Keywords - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Keywords</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {keyword}
                        <button
                          onClick={() => handleKeywordRemove(keyword)}
                          className="ml-1 hover:text-green-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <Input
                    placeholder="Add keyword"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleKeywordAdd(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                    style={{
                      height: '42px',
                      borderRadius: '8px',
                      opacity: 1,
                      gap: '12px',
                      borderWidth: '1px',
                      paddingTop: '10px',
                      paddingRight: '12px',
                      paddingBottom: '10px',
                      paddingLeft: '12px'
                    }}
                  />
                </div>

                {/* Status and Color as Pills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Select Status</label>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {formData.status}
                        <button
                          onClick={() => handleInputChange('status', '')}
                          className="ml-1 hover:text-green-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    </div>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200 mt-2"
                        style={{
                          height: '42px',
                          borderRadius: '8px',
                          opacity: 1,
                          gap: '12px',
                          borderWidth: '1px',
                          paddingTop: '10px',
                          paddingRight: '12px',
                          paddingBottom: '10px',
                          paddingLeft: '12px'
                        }}
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Transit">Transit</SelectItem>
                        <SelectItem value="Warehouse">Warehouse</SelectItem>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Color</label>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-800 text-white rounded-full text-sm">
                        {formData.color}
                        <button
                          onClick={() => handleInputChange('color', '')}
                          className="ml-1 hover:text-red-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    </div>
                    <Select value={formData.color} onValueChange={(value) => handleInputChange('color', value)}>
                      <SelectTrigger className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200 mt-2"
                        style={{
                          height: '42px',
                          borderRadius: '8px',
                          opacity: 1,
                          gap: '12px',
                          borderWidth: '1px',
                          paddingTop: '10px',
                          paddingRight: '12px',
                          paddingBottom: '10px',
                          paddingLeft: '12px'
                        }}
                      >
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sonic Red">Sonic Red</SelectItem>
                        <SelectItem value="Pearl White">Pearl White</SelectItem>
                        <SelectItem value="Metallic Gray">Metallic Gray</SelectItem>
                        <SelectItem value="Navy Blue">Navy Blue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Delivery Timeframe and Batch Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Delivery Timeframe</label>
                    <Select value={formData.deliveryTimeframe} onValueChange={(value) => handleInputChange('deliveryTimeframe', value)}>
                      <SelectTrigger className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                        style={{
                          height: '42px',
                          borderRadius: '8px',
                          opacity: 1,
                          gap: '12px',
                          borderWidth: '1px',
                          paddingTop: '10px',
                          paddingRight: '12px',
                          paddingBottom: '10px',
                          paddingLeft: '12px'
                        }}
                      >
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Least 34 weeks">Least 34 weeks</SelectItem>
                        <SelectItem value="Least 30 weeks">Least 30 weeks</SelectItem>
                        <SelectItem value="Least 28 weeks">Least 28 weeks</SelectItem>
                        <SelectItem value="Least 24 weeks">Least 24 weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Select Batch</label>
                    <Select 
                      value={isFromTransit ? formData.selectedBatch || batchNumber : batchNumber} 
                      disabled={!isFromTransit}
                      onValueChange={isFromTransit ? (value) => handleInputChange('selectedBatch', value) : undefined}
                    >
                      <SelectTrigger className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                        style={{
                          height: '42px',
                          borderRadius: '8px',
                          opacity: 1,
                          gap: '12px',
                          borderWidth: '1px',
                          paddingTop: '10px',
                          paddingRight: '12px',
                          paddingBottom: '10px',
                          paddingLeft: '12px'
                        }}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {isFromTransit ? (
                          <>
                            <SelectItem value="01">01</SelectItem>
                            <SelectItem value="02">02</SelectItem>
                            <SelectItem value="03">03</SelectItem>
                            <SelectItem value="04">04</SelectItem>
                            <SelectItem value="05">05</SelectItem>
                            <SelectItem value="06">06</SelectItem>
                            <SelectItem value="07">07</SelectItem>
                            <SelectItem value="08">08</SelectItem>
                            <SelectItem value="09">09</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="11">11</SelectItem>
                            <SelectItem value="12">12</SelectItem>
                          </>
                        ) : (
                          <SelectItem value={batchNumber}>{batchNumber}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>


            {/* Car Description Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Car Description</h2>
              <div>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                  placeholder="Enter detailed description of the car..."
                />
                <div className="text-sm text-gray-500 mt-2">
                  Total words: {formData.description.split(' ').length}/500
                </div>
              </div>
            </div>

            {/* Financing Information Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Financing Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Auction price</label>
                    <Input
                      value={formData.auctionPrice}
                      onChange={(e) => handleInputChange('auctionPrice', e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                      placeholder="0"
                      style={{
                        height: '42px',
                        borderRadius: '8px',
                        opacity: 1,
                        gap: '12px',
                        borderWidth: '1px',
                        paddingTop: '10px',
                        paddingRight: '12px',
                        paddingBottom: '10px',
                        paddingLeft: '12px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Auction expenses/taxes</label>
                    <Input
                      value={formData.auctionExpenses}
                      onChange={(e) => handleInputChange('auctionExpenses', e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                      placeholder="0"
                      style={{
                        height: '42px',
                        borderRadius: '8px',
                        opacity: 1,
                        gap: '12px',
                        borderWidth: '1px',
                        paddingTop: '10px',
                        paddingRight: '12px',
                        paddingBottom: '10px',
                        paddingLeft: '12px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Inland charges</label>
                    <Input
                      value={formData.inlandCharges}
                      onChange={(e) => handleInputChange('inlandCharges', e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                      placeholder="0"
                      style={{
                        height: '42px',
                        borderRadius: '8px',
                        opacity: 1,
                        gap: '12px',
                        borderWidth: '1px',
                        paddingTop: '10px',
                        paddingRight: '12px',
                        paddingBottom: '10px',
                        paddingLeft: '12px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Shipment charges</label>
                    <Input
                      value={formData.shipmentCharges}
                      onChange={(e) => handleInputChange('shipmentCharges', e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                      placeholder="0"
                      style={{
                        height: '42px',
                        borderRadius: '8px',
                        opacity: 1,
                        gap: '12px',
                        borderWidth: '1px',
                        paddingTop: '10px',
                        paddingRight: '12px',
                        paddingBottom: '10px',
                        paddingLeft: '12px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Varient duty</label>
                    <Input
                      value={formData.variantDuty}
                      onChange={(e) => handleInputChange('variantDuty', e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                      placeholder="0"
                      style={{
                        height: '42px',
                        borderRadius: '8px',
                        opacity: 1,
                        gap: '12px',
                        borderWidth: '1px',
                        paddingTop: '10px',
                        paddingRight: '12px',
                        paddingBottom: '10px',
                        paddingLeft: '12px'
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Passport charges</label>
                    <Input
                      value={formData.passportCharges}
                      onChange={(e) => handleInputChange('passportCharges', e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                      placeholder="0"
                      style={{
                        height: '42px',
                        borderRadius: '8px',
                        opacity: 1,
                        gap: '12px',
                        borderWidth: '1px',
                        paddingTop: '10px',
                        paddingRight: '12px',
                        paddingBottom: '10px',
                        paddingLeft: '12px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Services charges</label>
                    <Input
                      value={formData.servicesCharges}
                      onChange={(e) => handleInputChange('servicesCharges', e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                      placeholder="0"
                      style={{
                        height: '42px',
                        borderRadius: '8px',
                        opacity: 1,
                        gap: '12px',
                        borderWidth: '1px',
                        paddingTop: '10px',
                        paddingRight: '12px',
                        paddingBottom: '10px',
                        paddingLeft: '12px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Transport charges</label>
                    <Input
                      value={formData.transportCharges}
                      onChange={(e) => handleInputChange('transportCharges', e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                      placeholder="0"
                      style={{
                        height: '42px',
                        borderRadius: '8px',
                        opacity: 1,
                        gap: '12px',
                        borderWidth: '1px',
                        paddingTop: '10px',
                        paddingRight: '12px',
                        paddingBottom: '10px',
                        paddingLeft: '12px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Repair charges</label>
                    <Input
                      value={formData.repairCharges}
                      onChange={(e) => handleInputChange('repairCharges', e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                      placeholder="0"
                      style={{
                        height: '42px',
                        borderRadius: '8px',
                        opacity: 1,
                        gap: '12px',
                        borderWidth: '1px',
                        paddingTop: '10px',
                        paddingRight: '12px',
                        paddingBottom: '10px',
                        paddingLeft: '12px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Miscellaneous charges</label>
                    <Input
                      value={formData.miscellaneousCharges}
                      onChange={(e) => handleInputChange('miscellaneousCharges', e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-200"
                      placeholder="0"
                      style={{
                        height: '42px',
                        borderRadius: '8px',
                        opacity: 1,
                        gap: '12px',
                        borderWidth: '1px',
                        paddingTop: '10px',
                        paddingRight: '12px',
                        paddingBottom: '10px',
                        paddingLeft: '12px'
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="text-lg font-semibold text-green-800">
                  Total Price = {calculateTotalPrice()}/- PKR
                </div>
              </div>
            </div>

            {/* File Upload Sections */}
            <div className="space-y-6">
              {/* Cover Photo */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Cover Photo</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  {coverPhoto ? (
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-gray-500">Preview</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{coverPhoto.name}</p>
                        <button
                          onClick={() => setCoverPhoto(null)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Change cover
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">PNG, JPG, GIF upto 5MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('cover', e.target.files[0])}
                        className="hidden"
                        id="cover-photo"
                      />
                      <label htmlFor="cover-photo" className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                        Upload Cover Photo
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Auction Sheet */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Auction Sheet</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  {auctionSheet ? (
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-gray-500">PDF</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{auctionSheet.name}</p>
                        <button
                          onClick={() => setAuctionSheet(null)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">PNG, JPG, GIF upto 5MB</p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('auction', e.target.files[0])}
                        className="hidden"
                        id="auction-sheet"
                      />
                      <label htmlFor="auction-sheet" className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                        Upload Auction Sheet
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* More Car Pictures */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">More Car Pictures (Minimum 4 Pictures)</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  {carPictures.length > 0 && (
                    <div className="grid grid-cols-5 gap-4 mb-4">
                      {carPictures.map((file, index) => (
                        <div key={index} className="relative">
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-sm text-gray-500">Preview</span>
                          </div>
                          <button
                            onClick={() => setCarPictures(prev => prev.filter((_, i) => i !== index))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">PNG, JPG, GIF upto 5MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('pictures', e.target.files[0])}
                      className="hidden"
                      id="car-pictures"
                    />
                    <label htmlFor="car-pictures" className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      Upload Car Pictures
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleSaveChanges}
                className="text-white px-8 py-3 text-lg font-medium"
                style={{
                  backgroundColor: '#00674F',
                  borderRadius: '50px'
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {isEditMode ? 'Updating...' : 'Saving...'}
                  </>
                ) : (
                  isEditMode ? 'Update Car' : 'Save Changes'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
