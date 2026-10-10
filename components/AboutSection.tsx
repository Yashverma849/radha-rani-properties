"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShieldCheck, HeartHandshake, UserLock } from "lucide-react";

export function AboutSection() {
  const [activeMandate, setActiveMandate] = useState(0);

  const mandates = [
    {
      id: "mandate-1",
      number: "01",
      title: "Ethical Agency",
      subtitle: "Zero fake bidding & clean titles",
      description:
        "Every plot, floor, and property presented undergoes stringent on-ground physical inspection, verified registry checks, and zero phantom inventories before you commit.",
      image: "/images/mandate-ethical-agency.jpg",
      tag: "RADICAL TITLE TRANSPARENCY",
      icon: ShieldCheck,
    },
    {
      id: "mandate-2",
      number: "02",
      title: "Reverent Trust",
      subtitle: "Inspired by our traditional name",
      description:
        "Honoring the sacred tradition of our name, we treat family wealth with reverence—fostering enduring multi-generational relationships rather than transactional greed.",
      image: "/images/mandate-reverent-trust.jpg",
      tag: "TIMELESS TRADITIONAL VALUES",
      icon: HeartHandshake,
    },
    {
      id: "mandate-3",
      number: "03",
      title: "Person-to-Person",
      subtitle: "Strict confidentiality & privacy",
      description:
        "Direct founder engagement with Yash Verma under DPDP Act 2023 compliance. Strict zero-spam guarantee: your family details are never brokered or shared.",
      image: "/images/mandate-person-to-person.jpg",
      tag: "DIRECT FOUNDER PRIVACY",
      icon: UserLock,
    },
  ];

  const nextMandate = () => {
    setActiveMandate((prev) => (prev + 1) % mandates.length);
  };

  const prevMandate = () => {
    setActiveMandate((prev) => (prev - 1 + mandates.length) % mandates.length);
  };

  const current = mandates[activeMandate];

  return (
    <section id="about" className="py-24 bg-[#F0ECE7] border-b border-[#D8D2C8] relative overflow-hidden">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        
        {/* Founder Story Grid - Centered alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Founder Photo & Credibility Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative rounded-3xl overflow-hidden border border-[#D8D2C8] shadow-2xl bg-white p-3">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/yash-verma.jpg"
                    alt="Yash Verma, Founder of Radha Rani Properties"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white p-4 rounded-xl bg-black/50 backdrop-blur-md border border-white/10">
                    <div className="text-[10px] font-medium text-white/80 tracking-[0.2em] uppercase">
                      Yash Verma • Founder
                    </div>
                    <div className="text-xs text-[#EDE9E3] mt-1 font-light leading-snug">
                      Founder-led Palam advisory with quiet integrity and verified title checks.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Founder Narrative & Advisory Mandate */}
          <div className="lg:col-span-7 space-y-8">
            
            <div>
              <h2 className="font-serif tracking-[0.15em] uppercase text-3xl sm:text-4xl md:text-5xl font-light text-[#1E252B] leading-tight">
                Restoring Dignity to Property Advisory
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#525A62] font-light leading-relaxed">
              <p>
                Founded by <strong className="font-medium text-[#1E252B]">Yash Verma</strong>, Radha Rani Properties was established with a singular conviction: securing a residential plot, family home, or financial protection should not feel like navigating a minefield of deceptive claims, inflated prices, and relentless spam calls.
              </p>
              <p>
                Yash Verma leads the practice with grounded, traditional Indian values—where relationships outlast single transactions and words carry absolute weight. Operating from home in Palam (Southwest Delhi), we focus on genuine residential plots and properties with clear titles; for LIC insurance and housing loan facilitation, our advisory reaches families nationwide and NRIs worldwide.
              </p>
            </div>

            {/* Our Advisory Mandate: Inside Founder Section, Single Big Card at once with background images */}
            <div className="pt-4 border-t border-[#D8D2C8] space-y-4">
              
              {/* Mandate Bar: Title + Switcher Tabs + Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8A9199] font-medium">
                  Our Advisory Mandate
                </span>

                {/* Pill Switchers & Arrows */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {mandates.map((m, idx) => (
                      <button
                        key={m.id}
                        onClick={() => setActiveMandate(idx)}
                        className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.15em] font-medium transition-all duration-300 cursor-pointer ${
                          activeMandate === idx
                            ? "bg-[#1E252B] text-white shadow-xs"
                            : "bg-white/80 hover:bg-white text-[#525A62] border border-[#D8D2C8]"
                        }`}
                      >
                        <span className="opacity-60 mr-1">{m.number}.</span>
                        <span>{m.title}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 ml-1">
                    <button
                      onClick={prevMandate}
                      className="w-7 h-7 rounded-full bg-white hover:bg-[#1E252B] text-[#1E252B] hover:text-white border border-[#D8D2C8] flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer"
                      aria-label="Previous Mandate"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={nextMandate}
                      className="w-7 h-7 rounded-full bg-white hover:bg-[#1E252B] text-[#1E252B] hover:text-white border border-[#D8D2C8] flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer"
                      aria-label="Next Mandate"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* The Single Big Card at once */}
              <div className="relative w-full h-[260px] sm:h-[300px] md:h-[320px] rounded-2xl overflow-hidden shadow-lg border border-[#D8D2C8] bg-[#1E252B] group">
                
                {/* Background Image */}
                <Image
                  key={current.id}
                  src={current.image}
                  alt={current.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center scale-102 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Cinematic Vignette Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent"></div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2.5 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[9px] tracking-[0.22em] uppercase font-semibold border border-white/15">
                    {current.tag}
                  </span>
                  <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-light">
                    0{activeMandate + 1} / 0{mandates.length}
                  </span>
                </div>

                {/* Bottom Content Over Image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-8 z-10 space-y-2.5 text-white">
                  <div className="space-y-0.5">
                    <span className="text-[10px] sm:text-[11px] text-white/70 tracking-[0.22em] uppercase font-medium block">
                      {current.subtitle}
                    </span>
                    <h4 className="font-serif tracking-[0.16em] uppercase text-xl sm:text-2xl md:text-3xl font-light text-white leading-tight">
                      {current.title}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-[#EDE9E3] font-light leading-relaxed max-w-xl">
                    {current.description}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
