"use client";

import React from "react";
import { UserCheck, FileText, MapPinned, BellRing, Sparkles } from "lucide-react";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: UserCheck,
      title: "Personal Founder Attention",
      description:
        "Every requirement is handled directly by the founder. You will never be bounced between inexperienced junior callers or commissioned external agents.",
      badge: "Direct Contact",
    },
    {
      icon: FileText,
      title: "Transparent Documentation",
      description:
        "Zero artificial price inflation or misleading claims. We scrutinize RERA registrations, encumbrances, and sanction letters before you commit.",
      badge: "Statutory Clarity",
    },
    {
      icon: MapPinned,
      title: "Verified On-Ground Reality",
      description:
        "Direct access to genuine plots, builder floors, and residential properties in Palam. Verified title documents and clear ownership without brokerage confusion or inflated layers.",
      badge: "Verified Titles",
    },
    {
      icon: BellRing,
      title: "Disciplined Follow-Up",
      description:
        "We respect your privacy and family time. Structured, low-pressure advisory without unsolicited cold calling, harassment, or persistent spam.",
      badge: "Zero Spam Mandate",
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#F0ECE7] border-b border-[#D8D2C8] relative">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        
        {/* Editorial Split Header: Title Left, Description Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="font-serif tracking-[0.2em] uppercase text-3xl sm:text-4xl md:text-5xl font-light text-[#1E252B]">
              Grounded Credibility
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#525A62] max-w-md font-light leading-relaxed md:text-right">
            Why discerning families in Palam and clients worldwide partner with Radha Rani Properties for their property and financial decisions.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, index) => {
            return (
              <div
                key={index}
                className="group flex flex-col justify-between rounded-2xl border border-[#D8D2C8] bg-white p-8 hover:border-[#1E252B] hover:shadow-xl transition-all duration-500"
              >
                <div className="space-y-4">

                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A9199]">
                      {item.badge}
                    </span>
                    <h3 className="font-serif tracking-[0.1em] uppercase text-lg sm:text-xl font-normal text-[#1E252B] mt-2">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#525A62] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#D8D2C8]/50 mt-6 flex items-center justify-between text-xs text-[#1E252B]">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#1E252B]">Pillar 0{index + 1}</span>
                  <span className="text-[10px] text-[#8A9199] tracking-wider uppercase font-light">Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
