"use client";

import { useState } from "react";
import carimage1 from "@/public/logo.png";
import Image from "next/image";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCarsOpen, setMobileCarsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [carsOpen, setCarsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 py-3 flex items-center justify-between px-4 md:px-12 bg-transparent">
      {/* Logo */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <Image
          src={carimage1}
          alt="Logo"
          width={184}
          height={24}
          className="object-contain"
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 font-medium text-[16px]">
        {/* Home Link */}
        <li className="text-white cursor-pointer hover:text-green-600">
          <Link href="/">Home</Link>
        </li>

        {/* Cars Dropdown */}
        <li className="relative cursor-pointer text-black hover:text-green-600">
          <div
            className="flex items-center gap-1"
            onClick={() => setCarsOpen(!carsOpen)}
          >
            Cars
            <FaChevronDown
              size={12}
              className={`transition-transform ${carsOpen ? "rotate-180" : ""}`}
            />
          </div>
          {carsOpen && (
            <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-md w-48 text-[16px]">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <Link href="/cars-collection">Cars Collection</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <Link href="/cars-accessories">Cars Accessories</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Products Mega Menu */}
        <li className="relative cursor-pointer text-black hover:text-green-600">
          <div
            className="flex items-center gap-1"
            onClick={() => setProductsOpen(!productsOpen)}
          >
            Products
            <FaChevronDown
              size={12}
              className={`transition-transform ${
                productsOpen ? "rotate-180" : ""
              }`}
            />
          </div>
          {productsOpen && (
            <div
              className="
                absolute left-1/2 -translate-x-1/2 mt-2 
                bg-white text-black rounded-xl shadow-xl
                w-[1320px] max-w-[1320px] h-[288px] overflow-y-auto
                p-6
              "
            >
              <div className="grid grid-cols-4 gap-6 divide-x">
                {/* Car Accessories */}
                <div className="pr-8">
                  <h3 className="font-semibold mb-2">Car Accessories</h3>
                  <ul className="space-y-1">
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Seat Covers</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Floor Mats</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Steering Wheel Covers</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Dashboard Covers</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Sun Shades</li>
                  </ul>
                </div>

                {/* Interior Accessories */}
                <div className="px-6">
                  <h3 className="font-semibold mb-2">Interior Accessories</h3>
                  <ul className="space-y-1">
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">LED Lights</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Mobile Holders</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Organizers</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Cushions</li>
                  </ul>
                </div>

                {/* Exterior Accessories */}
                <div className="px-6">
                  <h3 className="font-semibold mb-2">Exterior Accessories</h3>
                  <ul className="space-y-1">
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Alloy Wheels</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Body Kits</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Car Covers</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Roof Racks</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Spoilers</li>
                  </ul>
                </div>

                {/* Electronics */}
                <div className="pl-6">
                  <h3 className="font-semibold mb-2">Electronics</h3>
                  <ul className="space-y-1">
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Dash Cameras</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Parking Sensors</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Reverse Cameras</li>
                    <li className="hover:text-green-600 cursor-pointer whitespace-nowrap">Chargers & Cables</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </li>

        <li className="text-black hover:text-green-600 cursor-pointer">
          <Link href="/blog">Blog</Link>
        </li>
        <li className="text-black hover:text-green-600 cursor-pointer">
          <Link href="/gallery">Gallery</Link>
        </li>
        <li className="text-black hover:text-green-600 cursor-pointer">
          <Link href="/contect">Contact</Link>
        </li>
      </ul>

      {/* Desktop CTA */}
      <button
        className="hidden md:block w-[193px] h-[50px] border border-gray-400 rounded-full bg-white 
        hover:bg-gray-200 text-black transition text-[16px]"
      >
        Get My Dream Car
      </button>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-30 flex items-center">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-black">
          {mobileMenuOpen ? <FaTimes size={24} className="text-black" /> : <FaBars size={24} className="text-black" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white flex flex-col items-start justify-start pt-24 px-6 transition-transform duration-300
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} z-20`}
      >
        <ul className="space-y-4 text-[16px] font-medium w-full">
          {/* Home Mobile */}
          <li className="text-white">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          </li>

          {/* Cars Mobile */}
          <li>
            <div
              className="flex justify-between items-center cursor-pointer text-black"
              onClick={() => setMobileCarsOpen(!mobileCarsOpen)}
            >
              Cars <FaChevronDown className={`transition-transform ${mobileCarsOpen ? "rotate-180" : ""}`} />
            </div>
            {mobileCarsOpen && (
              <ul className="pl-4 mt-2 space-y-2 text-black">
                <li><Link href="/cars-collection" onClick={() => setMobileMenuOpen(false)}>Cars Collection</Link></li>
                <li><Link href="/cars-accessories" onClick={() => setMobileMenuOpen(false)}>Cars Accessories</Link></li>
              </ul>
            )}
          </li>

          {/* Products Mobile (simple list) */}
          <li>
            <div
              className="flex justify-between items-center cursor-pointer text-black"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            >
              Products <FaChevronDown className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
            </div>
            {mobileProductsOpen && (
              <ul className="pl-4 mt-2 space-y-2 text-black">
                <li>Seat Covers</li><li>Floor Mats</li><li>Steering Wheel Covers</li>
                <li>Dashboard Covers</li><li>Sun Shades</li><li>LED Lights</li>
                <li>Mobile Holders</li><li>Organizers</li><li>Cushions</li>
                <li>Alloy Wheels</li><li>Body Kits</li><li>Car Covers</li>
                <li>Roof Racks</li><li>Spoilers</li><li>Dash Cameras</li>
                <li>Parking Sensors</li><li>Reverse Cameras</li><li>Chargers & Cables</li>
              </ul>
            )}
          </li>

          <li className="text-black"><Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link></li>
          <li className="text-black"><Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
          <li className="text-black"><Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>

          <li>
            <button className="border border-gray-400 text-black rounded-full bg-white hover:bg-gray-200 w-full py-2 text-[16px]">
              Get My Dream Car
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
