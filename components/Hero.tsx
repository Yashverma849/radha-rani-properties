"use client";

import React from "react";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onSelectTab?: (tab: "source" | "list") => void;
}

export function Hero({ onSelectTab }: HeroProps) {
  const handleScrollToSearch = () => {
    const elem = document.getElementById("search-desk");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen min-h-[640px] w-full flex items-end overflow-hidden">
      {/* Background Cinematic Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/hero_radha_rani_properties-ezremove.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Subtle contrast overlays */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
      </div>

      {/* Hero Bottom Content Bar */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 2xl:px-24 pb-14 sm:pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          {/* Main Headline - Stewart & Co Tracked Serif Style */}
          <div className="max-w-4xl">
            <h1 className="font-serif tracking-[0.15em] sm:tracking-[0.18em] uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight drop-shadow-md">
              Selling Luxury Property in Palam & Delhi NCR
            </h1>
          </div>

          {/* Explore / Scroll Indicator */}
          <div className="shrink-0 flex items-center gap-4">
            <button
              onClick={handleScrollToSearch}
              className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#1E252B] backdrop-blur-md border border-white/20 transition-all duration-300 text-xs uppercase tracking-[0.2em] font-semibold cursor-pointer shadow-lg"
            >
              <span>Explore Sourcing</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
