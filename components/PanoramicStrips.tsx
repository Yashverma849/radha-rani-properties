"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function PanoramicStrips() {
  const strips = [
    {
      title: "FOR PROPERTY BUYERS & PLOT INVESTORS",
      subtitle: "Verified Title Sourcing & On-Ground Inspection in Palam",
      image: "/images/luxury-interior.jpg",
      href: "#discovery",
    },
    {
      title: "WORLDWIDE LIC & HOUSING LOAN ADVISORY",
      subtitle: "Pan-India & Worldwide NRI Financial Advisory",
      image: "/images/palam-floor.jpg",
      href: "/schedule-consultation",
    },
  ];

  return (
    <section className="bg-[#EDE9E3] pb-16 space-y-4">
      {strips.map((strip, idx) => (
        <Link
          key={idx}
          href={strip.href}
          className="group relative block w-full h-44 sm:h-56 md:h-64 overflow-hidden"
        >
          {/* Background Image */}
          <Image
            src={strip.image}
            alt={strip.title}
            fill
            sizes="100vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-1000"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-500"></div>

          {/* Centered Stewart & Co Style Tracked Title */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h3 className="font-serif tracking-[0.25em] uppercase text-lg sm:text-2xl md:text-3xl text-white font-light group-hover:tracking-[0.28em] transition-all duration-500 drop-shadow-md">
              {strip.title}
            </h3>
            <span className="text-[11px] sm:text-xs text-white/80 uppercase tracking-[0.2em] font-medium mt-2">
              {strip.subtitle}
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
