"use client";

import Image from "next/image";
import Link from "next/link";
import carSectionData from "@/app/carSection/data";
import { FaUser, FaGasPump, FaTachometerAlt } from "react-icons/fa";

interface CarSectionProps {
  limit?: number; // optional prop for limiting cards
}

const CarSection = ({ limit }: CarSectionProps) => {
  return (
    <div className="max-w-[1400px] mx-auto pt-8 pb-16">
      <div className="bg-white">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
          <div className="flex flex-col">
            <button className="text-black text-[44px] font-bold mb-1 text-left">
              Discover More
            </button>
            <div className="text-gray-600 text-[20px]">
              These are the luxury collection we have
            </div>
          </div>
          <button className="text-black hover:underline border border-gray-700 rounded-2xl px-4 py-1 mt-2 sm:mt-0 text-[20px]">
            View More
          </button>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-2 gap-6">
          {carSectionData
            .slice(0, limit || carSectionData.length) // yahan limit apply ho rahi hai
            .map((car) => (
              <Link key={car.id} href={`/car/${car.id}`} className="cursor-pointer">
                <div className="border border-gray-300 rounded-[24px] mt-6 duration-300 text-left w-[314px] h-[426px] mx-auto p-4 hover:shadow-lg">
                  {/* First image from images array */}
                  <Image
                    src={car.images[0]}
                    alt={car.title}
                    width={314}
                    height={200}
                    className="rounded-[18px] border border-gray-300 p-1 object-cover w-full h-[200px]"
                  />
                  <h2 className="text-[24px] font-bold mt-3">{car.title}</h2>
                  <p className="text-[24px] text-gray-500">{car.sub_title}</p>

                  <div className="flex justify-between mt-3 text-sm text-gray-600 flex-wrap gap-2">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-gray-500" />
                      {car.num} Seats
                    </span>
                    <span className="flex items-center gap-1">
                      <FaGasPump className="text-gray-500" />
                      {car.num2}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaTachometerAlt className="text-gray-500" />
                      {car.num3}
                    </span>
                  </div>

                  <div className="mt-2">
                    <div className="text-gray-500 text-2xl">{car.price}</div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[24px] text-green-700">
                        {car.amount_price}
                      </span>
                      <span className="text-gray-400 text-sm line-through">
                        {car.sub_price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CarSection;
