"use client";

import Image from "next/image";
import { FaUser, FaGasPump, FaTachometerAlt } from "react-icons/fa";
import { Car, carsData } from "./data";
import Navbar from "@/components/navbar/Navbar";

export default function CarsCollectionPage() {
  function CarCard({ car }: { car: Car }) {
    return (
      <div className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 text-left bg-white">
        <Navbar/>
        <Image
          src={car.image}
          alt={car.title}
          width={280}
          height={180}
          className="rounded-lg border border-gray-300 p-1 object-cover w-full h-44 sm:h-48"
        />
        <h2 className="text-lg font-semibold mt-3 truncate">{car.title}</h2>
        <p className="text-gray-500 truncate">{car.sub_title}</p>

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

        <div className="mt-4">
          <div className="text-gray-500 text-xs truncate">{car.price}</div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="font-bold text-lg text-green-700">
              {car.amount_price}
            </span>
            <span className="text-gray-400 line-through">{car.sub_price}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ✅ Green Hero Section */}
      <div className="bg-green-900 text-white">
        <div className="w-full h-[400px] flex flex-col items-center justify-center relative overflow-hidden text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Happy Buyers, Real Stories
          </h2>
          <p className="mt-3 text-base sm:text-lg font-normal tracking-tight max-w-2xl">
            Stories from happy buyers who found their car with DriveXDeals.
          </p>

          {/* ✅ Search Bar Section */}
          <div className="mt-6 w-full max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
            {/* Input wrapper div with full rounded border */}
            <div className="flex-1 h-[55px] bg-white border border-gray-300 rounded-full flex items-center px-6">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 h-full bg-transparent focus:outline-none border-none text-black font-light"
              />
              <div className="flex items-center gap-2 ml-2">
                {/* Price Range */}
                <div className="border border-gray-300 rounded-full px-3 py-1.5">
                  <select className="bg-transparent focus:outline-none border-none text-gray-700 font-light">
                    <option>Price Range</option>
                    <option>PKR 0 - 100</option>
                    <option>PKR 100 - 500</option>
                    <option>PKR 500+</option>
                  </select>
                </div>

                {/* Cities */}
                <div className="border border-gray-300 rounded-full px-3 py-1.5">
                  <select className="bg-transparent focus:outline-none border-none text-gray-700 font-light">
                    <option>All Cities</option>
                    <option>Karachi</option>
                    <option>Lahore</option>
                    <option>Islamabad</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-red-700 hover:bg-green-600 h-[55px] text-white px-8 text-lg rounded-full shadow-lg font-medium transition w-full sm:w-auto">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Cards Section */}
      <div className="p-4 sm:p-8 md:p-16 bg-gray-50 relative z-10">
        {/* Grid */}
        <div className="space-y-6">
          {Array.from({ length: Math.ceil(carsData.length / 4) }).map(
            (_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
              >
                {carsData
                  .slice(rowIndex * 4, rowIndex * 4 + 4)
                  .map((car, index) => (
                    <CarCard key={index} car={car} />
                  ))}
              </div>
            )
          )}
        </div>

        {/* Pagination with Arrows */}
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
