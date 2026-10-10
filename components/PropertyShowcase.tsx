"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, MapPin, Building, DollarSign } from "lucide-react";

interface PropertyItem {
  id: string;
  title: string;
  price: string;
  specs: string;
  image: string;
  tag: string;
  location: string;
}

export function PropertyShowcase({ onSelectProperty }: { onSelectProperty?: (item: PropertyItem) => void }) {
  const [keyword, setKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedBudget, setSelectedBudget] = useState("All Budgets");

  const properties: PropertyItem[] = [
    {
      id: "prop-1",
      title: "PALAM COLONY | PRIME RESIDENTIAL PLOT",
      price: "₹45,00,000",
      specs: "100 SQ YD • CLEAR REGISTRY TITLE • 30 FT ROAD",
      image: "/images/palam-floor.jpg",
      tag: "READY FOR CONSTRUCTION",
      location: "Palam Colony",
    },
    {
      id: "prop-2",
      title: "SADH NAGAR | LUXURY BUILDER FLOOR",
      price: "₹65,00,000",
      specs: "03 BEDROOMS • 02 BATHROOMS • FLOOR AREA 1,150 SQ FT",
      image: "/images/luxury-interior.jpg",
      tag: "IMMEDIATE POSSESSION",
      location: "Sadh Nagar",
    },
    {
      id: "prop-3",
      title: "MAHAVIR ENCLAVE | EXCLUSIVE CORNER RESIDENCE",
      price: "₹95,00,000",
      specs: "04 BEDROOMS • 03 BATHROOMS • ELEVATOR & PARKING",
      image: "/images/hero-estate.jpg",
      tag: "VERIFIED OWNERSHIP",
      location: "Mahavir Enclave",
    },
    {
      id: "prop-4",
      title: "RAJ NAGAR | BOUTIQUE RESIDENTIAL FLOOR",
      price: "₹52,00,000",
      specs: "02 BEDROOMS • 02 BATHROOMS • MODULAR FITTINGS",
      image: "/images/palam-floor.jpg",
      tag: "CLEAR TITLE CHECK",
      location: "Raj Nagar",
    },
  ];

  const handleCardClick = (prop: PropertyItem) => {
    if (onSelectProperty) {
      onSelectProperty(prop);
    }
    const elem = document.getElementById("discovery");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const elem = document.getElementById("discovery");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="search-desk" className="py-20 md:py-28 bg-[#EDE9E3] text-[#1E252B]">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        
        {/* Editorial Split Header: Title Left, Description Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="font-serif tracking-[0.2em] uppercase text-2xl sm:text-3xl md:text-4xl font-normal text-[#1E252B]">
              Luxury Lives Here
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#525A62] max-w-md font-light leading-relaxed md:text-right">
            With deep neighborhood roots and verified title standards, Radha Rani Properties delivers exceptional 
            sourcing in Palam for plots and residential homes, helping families buy with transparency.
          </p>
        </div>

        {/* Stewart & Co Signature Floating Filter Pills Bar with Very Low Shadow */}
        <form onSubmit={handleSearchSubmit} className="max-w-6xl mx-auto mb-16">
          <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl sm:rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-[#D8D2C8] flex flex-col md:flex-row items-center gap-3">
            
            {/* Keyword Input */}
            <div className="w-full md:flex-1 relative">
              <input
                type="text"
                placeholder="Search plot size, floor, pocket..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-6 pr-4 py-3 rounded-full text-xs text-[#1E252B] placeholder-[#8A9199] outline-none bg-transparent"
              />
            </div>

            <div className="hidden md:block w-[1px] h-6 bg-[#D8D2C8]"></div>

            {/* Location Select */}
            <div className="w-full md:w-48">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-full text-xs text-[#2C353D] outline-none bg-transparent cursor-pointer"
              >
                <option value="All Locations">All Palam Pockets</option>
                <option value="Palam Colony">Palam Colony</option>
                <option value="Raj Nagar">Raj Nagar 1 & 2</option>
                <option value="Sadh Nagar">Sadh Nagar</option>
                <option value="Mahavir Enclave">Mahavir Enclave</option>
                <option value="Ram Phal Chowk">Ram Phal Chowk</option>
              </select>
            </div>

            <div className="hidden md:block w-[1px] h-6 bg-[#D8D2C8]"></div>

            {/* Property Type Select */}
            <div className="w-full md:w-48">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 rounded-full text-xs text-[#2C353D] outline-none bg-transparent cursor-pointer"
              >
                <option value="All Types">All Property Types</option>
                <option value="Plots">Residential Plots</option>
                <option value="Builder Floors">Builder Floors</option>
                <option value="Houses">Independent Houses</option>
                <option value="Commercial">Local Commercial</option>
              </select>
            </div>

            <div className="hidden md:block w-[1px] h-6 bg-[#D8D2C8]"></div>

            {/* Budget Select */}
            <div className="w-full md:w-44">
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-full text-xs text-[#2C353D] outline-none bg-transparent cursor-pointer"
              >
                <option value="All Budgets">All Price Ranges</option>
                <option value="Under ₹35L">Under ₹35 Lakh</option>
                <option value="₹35L - ₹65L">₹35L – ₹65 Lakh</option>
                <option value="₹65L - ₹1Cr">₹65L – ₹1.0 Cr</option>
                <option value="₹1Cr+">₹1.0 Cr & Above</option>
              </select>
            </div>

            {/* Search Pill Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 rounded-full bg-[#2C353D] hover:bg-[#641E2B] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-none hover:shadow-xs cursor-pointer shrink-0"
            >
              Search
            </button>

          </div>
        </form>

        {/* Stewart & Co 2-Column Wide Property Showcase Cards */}
        <div id="showcase" className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {properties.map((prop) => (
            <div
              key={prop.id}
              onClick={() => handleCardClick(prop)}
              className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#1E252B]"
            >
              {/* Background Property Image */}
              <Image
                src={prop.image}
                alt={prop.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

              {/* Top Tag Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] tracking-[0.2em] uppercase font-medium border border-white/20">
                  {prop.tag}
                </span>
              </div>

              {/* Bottom Card Information Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
                
                {/* Title and Price */}
                <div className="space-y-1">
                  <h3 className="font-serif tracking-[0.15em] uppercase text-sm sm:text-base md:text-lg font-light text-white group-hover:text-[#C5A15A] transition-colors leading-snug">
                    {prop.title}
                  </h3>
                  <div className="text-sm sm:text-base font-semibold tracking-wide text-[#FAF8F4]">
                    {prop.price}
                  </div>
                </div>

                {/* Specs */}
                <div className="text-[11px] sm:text-xs text-white/80 font-light tracking-wide sm:text-right shrink-0">
                  {prop.specs}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
