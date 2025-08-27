"use client";

import Image from "next/image";
import accessoriesData from "./data";
import Navbar from "@/components/navbar/Navbar";

export default function CarAccessoriesCollectionPage() {
  return (
    <div>
      <Navbar/>
      {/* ✅ Green Hero Section */}
      <div className="bg-green-900 text-white">
        <div className="w-full h-[400px] flex flex-col items-center justify-center relative overflow-hidden text-center">
          <h2 className=" text-2xl sm:text-3xl font-extrabold tracking-tight">
            Car Accessories 🛠️
          </h2>
          <p className="mt-3 text-base sm:text-lg font-normal tracking-tight max-w-2xl">
            Yahan pe sari premium car accessories ki listings available hain.
          </p>
        </div>
      </div>

      {/* ✅ Accessories Grid Section */}
      <div className="p-4 sm:p-8 md:p-16 bg-gray-50 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessoriesData.slice(0, 12).map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 text-left bg-white"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={280}
                height={180}
                className="rounded-lg border border-gray-300 p-1 object-cover w-full h-44 sm:h-48"
              />

              <h2 className="text-lg font-semibold mt-3">{item.title}</h2>
              <p className="text-gray-500">{item.sub_title}</p>

              <div className="flex flex-row gap-1 mt-3 text-sm text-gray-600">
                <span>✅ {item.feature1}</span>
                <span>✅ {item.rating}</span>
                
              </div>

              <div className="mt-4">
                <div className="text-gray-500 text-xs">{item.price}</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-bold text-lg text-green-700">
                    {item.amount_price}
                  </span>
                  <span className="text-gray-400 line-through">
                    {item.sub_price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Pagination UI */}
         <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-1 sm:space-x-2 py-2">
          {/* Left Arrow */}
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
            &#8592;
          </button>

          {/* Page Numbers */}
          {Array.from({ length: 9 }).map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded-lg whitespace-nowrap ${
                i === 1 ? "bg-green-600 text-white" : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Right Arrow */}
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}
