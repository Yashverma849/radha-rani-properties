"use client";

import React from "react";
import { MessageSquare, Users, FileCheck2, Compass, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Tailored Enquiry",
      desc: "Share your preferences, budget range, and preferred NCR localities via our requirement desk or WhatsApp.",
      icon: MessageSquare,
    },
    {
      num: "02",
      title: "Requirement Discussion",
      desc: "Direct 1-on-1 dialogue with our founder to calibrate parameters, budget nuances, and practical ground realities.",
      icon: Users,
    },
    {
      num: "03",
      title: "Curated & Vetted Shortlist",
      desc: "We screen local inventory, eliminate dubious titles, and present handpicked options directly verified with owners.",
      icon: FileCheck2,
    },
    {
      num: "04",
      title: "Accompanied Site Visits",
      desc: "Founder personally attends physical inspections, supports honest price discussions, and assists legal registry steps.",
      icon: Compass,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#EDE9E3] border-b border-[#D8D2C8] relative">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        
        {/* Editorial Split Header: Title Left, Description Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="font-serif tracking-[0.2em] uppercase text-3xl sm:text-4xl md:text-5xl font-light text-[#1E252B]">
              The 4-Step Journey
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#525A62] max-w-md font-light leading-relaxed md:text-right">
            A principled, transparent personal consultation from initial enquiry to final keys and legal registry.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#D8D2C8] p-8 shadow-sm hover:shadow-xl transition-all duration-500 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-light text-[#1E252B]/35 group-hover:text-[#1E252B] transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-serif tracking-[0.1em] uppercase text-base sm:text-lg font-normal text-[#1E252B] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525A62] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#D8D2C8]/50 flex items-center justify-between text-xs text-[#8A9199]">
                  <span className="text-[10px] tracking-[0.15em] uppercase">Step {step.num} of 04</span>
                  <span className="text-[10px] text-[#8A9199] uppercase tracking-wider font-medium">Founder-guided</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
