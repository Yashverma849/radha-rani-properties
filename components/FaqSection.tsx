"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Radha Rani Properties operate without an online public listing database?",
      a: "Most mass portals are flooded with duplicate cards and fake prices to harvest phone numbers. We operate honestly from home in Palam. You share your requirement, and we personally arrange accompanied visits to genuine on-ground plots and properties with verified ownership.",
    },
    {
      q: "Are you compliant with Real Estate Regulatory Authority (RERA) norms?",
      a: "Yes. We strictly respect the Real Estate (Regulation and Development) Act guidelines across Delhi. All residential projects and documentation are cross-checked against statutory approvals prior to client recommendation.",
    },
    {
      q: "Do you charge upfront consultation fees for property buyers or tenants?",
      a: "No. There are no upfront fees to submit a requirement or have an exploratory advisory conversation with our founder. Standard, transparent professional brokerage is agreed upon in writing and is only payable upon the successful execution and registration of your transaction.",
    },
    {
      q: "Are your LIC Insurance and Housing Loan services restricted to Palam?",
      a: "No. While our property and plot dealings are hyper-focused on Palam (Southwest Delhi), our upcoming LIC insurance advisory and housing loan referral guidance are available pan-India and worldwide for NRIs looking for trusted family financial protection and home financing assistance.",
    },
    {
      q: "Can you assist Non-Resident Indians (NRIs) and worldwide clients?",
      a: "Absolutely. We specialize in founder-guided representation for NRIs worldwide who need absolute integrity on the ground—whether for acquiring plots or homes in Southwest Delhi, or structuring mortgage insurance and housing loans.",
    },
    {
      q: "How is my contact information protected under the DPDP Act 2023?",
      a: "We adhere strictly to India's Digital Personal Data Protection framework. Your telephone number and property details remain securely held on our private founder desk. We never share, sell, or monetize contact details with third-party telemarketers or call centers.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#EDE9E3] border-b border-[#D8D2C8] relative">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        
        {/* Editorial Split Header: Title Left, Description Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 max-w-4xl mx-auto">
          <div className="text-left">
            <h2 className="font-serif tracking-[0.2em] uppercase text-3xl sm:text-4xl md:text-5xl font-light text-[#1E252B]">
              Frequently Asked
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#525A62] max-w-md font-light leading-relaxed md:text-right">
            Complete transparency regarding our business model, broker compensation, and regulatory registrations.
          </p>
        </div>

        {/* Accordion Single Column Layout */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-[#D8D2C8] rounded-2xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-7 py-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-[#F0ECE7]/40 transition-colors cursor-pointer"
                >
                  <span className="font-serif tracking-wider uppercase text-xs sm:text-sm font-medium text-[#1E252B]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5A15A] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-7 py-5 bg-white text-xs sm:text-sm text-[#525A62] font-light leading-relaxed border-t border-[#D8D2C8]/50 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
