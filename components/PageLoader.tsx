"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Show the logo fading in and out for a brief, graceful moment
    const timer = setTimeout(() => {
      setFadingOut(true);
    }, 1600);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 2300);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-label="Loading Radha Rani Properties"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FAF8F4] transition-all duration-700 select-none ${
        fadingOut ? "opacity-0 pointer-events-none scale-102" : "opacity-100"
      }`}
    >
      {/* Subtle traditional aesthetic background pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#641E2B_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative flex flex-col items-center justify-center text-center px-4">
        
        {/* Logo Container with continuous breathing fade in & out */}
        <div className="relative mb-6">
          {/* Logo - Enlarged, Pure Image without background circle */}
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center animate-pulse-fade">
            <Image
              src="/images/radha_rani_property-removebg-preview.png"
              alt="Radha Rani Properties Emblem"
              width={280}
              height={280}
              priority
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-1.5 transition-all duration-500">
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold tracking-tight text-[#242424]">
            Radha Rani Properties
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#C5A15A] font-semibold">
            <span className="w-6 h-[1px] bg-[#C5A15A]"></span>
            <span>A Trusted Name For Your Next Chapter</span>
            <span className="w-6 h-[1px] bg-[#C5A15A]"></span>
          </div>
        </div>

        {/* Subtle Gold Shimmer Progress Bar */}
        <div className="w-32 h-[2px] bg-[#E8E2D6] rounded-full mt-6 overflow-hidden">
          <div className="w-full h-full bg-[#641E2B] rounded-full animate-progress-indeterminate"></div>
        </div>

      </div>
    </div>
  );
}
