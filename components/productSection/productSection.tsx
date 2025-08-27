"use client";

import productData from "@/app/HomePage/productData";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { LiaCarSideSolid } from "react-icons/lia";

const ProductSection = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 pb-16 sm:px-6">
      <div className="pt-6 pb-6 bg-white">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
          <div className="flex flex-col">
            <button className="text-black font-bold text-[44px] hover:underline mb-1 text-left">
              Other Products
            </button>
            <div className="text-gray-600 text-[20px]">
              These are the luxury collection we have
            </div>
          </div>
          <button className="text-black hover:underline border border-gray-700 rounded-2xl px-4 py-1 mt-2 sm:mt-0 text-[20px]">
            View More
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productData.map((car, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-[24px] p-4 shadow-sm hover:shadow-md transition-shadow duration-300 text-left"
            >
              {/* Image Wrapper */}
              <div className="rounded-[20px] border border-gray-300 overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.title}
                  width={280}
                  height={200}
                  className="w-full h-[200px] object-cover"
                />
              </div>

              <h2 className="text-[24px] sm:text-[26px] font-bold mt-2">{car.title}</h2>
              <p className="text-[20px] sm:text-[22px] text-gray-500">{car.sub_title}</p>

              <div className="flex text-[16px] text-gray-600 flex-wrap gap-2 mt-2">
                <span className="flex items-center gap-1">
                  <LiaCarSideSolid />
                  {car.num2}
                </span>
                <span className="flex items-center gap-1">
                  <CiStar />
                  {car.num3}
                </span>
              </div>

              <div className="mt-3 flex flex-col">
                {/* Choti Heading */}
                <div className="text-gray-500 text-[14px]">
                  Price
                </div>

                {/* Price Row */}
                <div className="flex items-center gap-2 mt-1">
                  {/* Main Price */}
                  <span className="font-bold text-[24px] text-green-700">
                    {car.amount_price}
                  </span>

                  <span className="text-gray-500 text-[12px] line-through">
                    {car.sub_price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
