"use client";

import { useParams } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import carSectionData from "@/app/carSection/data";
import { FaUser, FaGasPump, FaTachometerAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useState, useEffect } from "react";
import CarSection from "@/app/carSection/page";
import ExploreSection from "@/app/explore/page";
import ProductSection from "@/components/productSection/productSection";

const CarDetailPage = () => {
  const params = useParams();
  const carIdStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const carId = parseInt(carIdStr!);
  const car = carSectionData.find((c) => c.id === carId);

  const [selectedImage, setSelectedImage] = useState<StaticImageData | undefined>(undefined);

  // accordion states
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isAuctionOpen, setIsAuctionOpen] = useState(false);

  useEffect(() => {
    if (car?.images?.length) {
      setSelectedImage(car.images[0]);
    }
  }, [car]);

  if (!car) return <div className="text-center mt-10 text-xl">Car not found</div>;

  return (
    <>
      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto pt-8 pb-16 mt-24">
        <div className="flex gap-8">
          {/* Left side */}
          <div className="flex  flex-col flex-1">
            <div className="rounded-lg  border border-gray-300 p-2 mb-4">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt={car.title}
                  width={600}
                  height={400}
                  className="w-full object-cover rounded-lg"
                />
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto px-1">
              {car.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`border-2 rounded-md p-[2px] cursor-pointer transition-colors duration-300 ${
                    selectedImage === img ? "border-blue-600" : "border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`thumb-${index}`}
                    width={120}
                    height={70}
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-center mt-6">
              
              <button className="bg-green-600 w-full text-white px-6 py-2 rounded-lg font-semibold shadow-sm hover:bg-green-700 transition">
                Contact Now
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex-1 flex flex-col justify-start">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{car.title}</h1>
                <p className="text-gray-700 mt-1">{car.sub_title}</p>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-black font-medium text-sm">Price</span>
                <span className="text-green-800 font-semibold text-xl">
                  {car.amount_price}
                </span>
                <span className="text-gray-400 line-through">{car.sub_price}</span>
              </div>
            </div>

            {/* Icons Row */}
          <div className="flex justify-between mt-6 text-gray-600 flex-wrap items-center">
  {/* Left side icons */}
  <div className="flex gap-6">
    <span className="flex items-center gap-2">
      <FaUser /> {car.num} Seats
    </span>
    <span className="flex items-center gap-2">
      <FaGasPump /> {car.num2}
    </span>
    <span className="flex items-center gap-2">
      <FaTachometerAlt /> {car.num3}
    </span>
  </div>

  {/* Right side Warehouse Button */}
  <button className="bg-green-600 text-white px-3 py-1 rounded-full font-medium shadow-sm hover:bg-blue-700 transition">
    Warehouse
  </button>
</div>


            {/* Overview */}
            <div className="mt-8 border-b pb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOverviewOpen(!isOverviewOpen)}
              >
                <h2 className="font-semibold text-lg">Overview</h2>
                {isOverviewOpen ? <FaMinus /> : <FaPlus />}
              </div>
              {isOverviewOpen && (
                <div className="grid grid-cols-2 gap-4 text-gray-700 mt-3">
                  <p><span className="font-medium">Engine: </span>{car.engine}</p>
                  <p><span className="font-medium">Auction Grade: </span>{car.auction_grade}</p>
                  <p><span className="font-medium">Assembly: </span>{car.assembly}</p>
                  <p><span className="font-medium">Imported Year: </span>{car.imported_year}</p>
                  <p><span className="font-medium">Mileage: </span>{car.mileage}</p>
                  <p><span className="font-medium">Color: </span>{car.color}</p>
                  <p><span className="font-medium">Interior Color: </span>{car.interior_color}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-6 border-b pb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              >
                <h2 className="font-semibold text-lg">Description</h2>
                {isDescriptionOpen ? <FaMinus /> : <FaPlus />}
              </div>
              {isDescriptionOpen && (
                <div className="text-gray-700 mt-3">
                  <p>
                    This is a dummy description. Car is in excellent condition with no major
                    accidents. Imported recently with verified auction sheet. Spacious
                    interior and fuel-efficient engine.
                  </p>
                </div>
              )}
            </div>

            {/* Auction Sheet */}
            <div className="mt-6 border-b pb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsAuctionOpen(!isAuctionOpen)}
              >
                <h2 className="font-semibold text-lg">Auction Sheet</h2>
                {isAuctionOpen ? <FaMinus /> : <FaPlus />}
              </div>
              {isAuctionOpen && (
                <div className="text-gray-700 mt-3">
                  <p><span className="font-medium">Auction Grade: </span>4.5</p>
                  <p><span className="font-medium">Verified: </span>Yes</p>
                  <p><span className="font-medium">Condition Notes: </span>Minor scratches on left door, otherwise clean.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <CarSection limit={4} />
      </div>
      <div className="">
        <ExploreSection />
      </div>
      <ProductSection/>
    </>
  );
};

export default CarDetailPage;
