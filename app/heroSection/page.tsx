"use client";

import { useState } from "react";

export default function HeroSection() {
  const [city, setCity] = useState("All Cities");
  const [price, setPrice] = useState("Price Range");

  return (
    <section
      className="relative h-[90vh] w-full bg-cover bg-center flex items-start justify-center pt-44"
      style={{ backgroundImage: "url('/heroCar.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[50px] font-semibold leading-tight">
          Experience the thrill of driving <br /> the finest cars with us!
        </h1>

        <p className="mt-3 text-lg text-gray-200">
          With thousands of cars, we have just the right one for you
        </p>

        {/* Search Bar Row */}
        <div className="mt-6 w-full flex flex-col sm:flex-row items-center justify-center sm:gap-2">
          {/* White Rounded Box */}
          <div className="flex flex-col sm:flex-row items-end gap-2 rounded-lg shadow-md max-w-[1400px] w-full mx-auto">
            {/* Input wrapper div with full rounded border */}
            <div className="flex-1 sm:w-[914px] h-[57px] bg-white border border-gray-300 rounded-full flex items-center px-6">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 sm:w[914px] h-[57] bg-transparent focus:outline-none border-none text-black font-light"
              />
              <div className="flex items-center gap-1 ml-0 sm:ml-4">
                {/* Price Range */}
                <div className="border border-gray-300 rounded-full px-4 py-2">
                  <select className="bg-transparent focus:outline-none border-none text-gray-700 font-light">
                    <option>Price Range</option>
                    <option>$0 - $100</option>
                    <option>$100 - $500</option>
                    <option>$500+</option>
                  </select>
                </div>

                {/* Cities */}
                <div className="border border-gray-300 rounded-full px-4 py-2">
                  <select className="bg-transparent focus:outline-none border-none text-gray-700 font-light">
                    <option>All Cities</option>
                    <option>Karachi</option>
                    <option>Lahore</option>
                    <option>Islamabad</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Search Button */}
          <button className="bg-red-700 hover:bg-green-600 sm:w[124px] h-[57] text-white px-8 py-4 text-lg rounded-full shadow-lg font-medium transition w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
