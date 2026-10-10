"use client";

import React from "react";
import { Building2, ShieldCheck, Landmark, CheckCircle2, ArrowRight, AlertCircle, Clock } from "lucide-react";

interface ServicesSectionProps {
  onOpenFutureModal: (serviceType: "lic" | "loans") => void;
  onScrollToPropertyDesk: () => void;
}

export function ServicesSection({ onOpenFutureModal, onScrollToPropertyDesk }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 bg-[#F0ECE7] border-y border-[#D8D2C8] relative">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        
        {/* Editorial Split Header: Title Left, Description Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="font-serif tracking-[0.2em] uppercase text-3xl sm:text-4xl md:text-5xl font-light text-[#1E252B]">
              Strategic Ecosystem
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#525A62] max-w-md font-light leading-relaxed md:text-right">
            A disciplined triad of services designed to advise and safeguard Delhi NCR 
            families across life's major milestones, honoring regulatory integrity at every step.
          </p>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Property Dealing (Active) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#D8D2C8] bg-white p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-500 relative group">
            <div className="space-y-6">
              
              {/* Card Header & Badge */}
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#1E252B] text-white text-[10px] font-medium tracking-[0.2em] uppercase">
                  ACTIVE DESK
                </span>
              </div>

              <div>
                <h3 className="font-serif tracking-[0.1em] uppercase text-xl sm:text-2xl font-normal text-[#1E252B]">
                  Plots & Properties Dealing
                </h3>
                <p className="text-xs tracking-wider text-[#641E2B] mt-1 font-medium">
                  Core Live Service • Focused on Palam
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#525A62] font-light leading-relaxed">
                Buy, sell, and acquire residential plots, builder floors, and independent houses in Palam (Southwest Delhi). Grounded in clear titles, transparent paperwork, and direct local owner connections.
              </p>

              {/* Offerings list */}
              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#2C353D] font-light">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                  <span>Direct Owner Engagements & Zero Ghost Inventories in Palam</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                  <span>Residential Plots, Builder Floors, Houses & Local Commercial</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                  <span>End-to-end site visit accompaniment & paperwork review</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={onScrollToPropertyDesk}
                className="w-full py-3.5 px-6 rounded-full bg-[#1E252B] hover:bg-[#641E2B] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <span>Immediate Inquiry</span>
                <ArrowRight className="w-4 h-4 text-[#C5A15A] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: LIC Insurance (Coming Soon) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#D8D2C8] bg-white p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-500 relative group">
            <div className="space-y-6">
              
              {/* Card Header & Badge */}
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#F0ECE7] border border-[#D8D2C8] text-[#1E252B] text-[10px] font-medium tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#1E252B]" />
                  <span>COMING SOON</span>
                </span>
              </div>

              <div>
                <h3 className="font-serif tracking-[0.1em] uppercase text-xl sm:text-2xl font-normal text-[#1E252B]">
                  LIC Insurance
                </h3>
                <p className="text-xs tracking-wider text-[#8A9199] mt-1 font-medium">
                  Planned Service • Pan-India & Worldwide NRI Advisory
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#525A62] font-light leading-relaxed">
                Foundational family wealth security, mortgage redemption cover, endowment instruments, and life protection policies serving families across India and NRIs globally.
              </p>

              {/* Regulatory Notice Banner */}
              <div className="p-3.5 rounded-xl bg-[#F0ECE7]/60 border border-[#D8D2C8] text-[11px] sm:text-xs text-[#525A62] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#8A9199] shrink-0 mt-0.5" />
                <span>
                  <strong>Regulatory Notice:</strong> Authorization process underway. Policies will be advised strictly under individual agency appointment post IRDAI accreditation.
                </span>
              </div>

              {/* Offerings list */}
              <ul className="space-y-3 pt-1 text-xs sm:text-sm text-[#2C353D] font-light">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E252B] shrink-0 mt-0.5" />
                  <span>Mortgage Protection & Term Assurance Advisory</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E252B] shrink-0 mt-0.5" />
                  <span>Guaranteed Growth & Retirement Planning Structuring</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onOpenFutureModal("lic")}
                className="w-full py-3.5 px-6 rounded-full bg-[#F0ECE7] hover:bg-[#1E252B] text-[#1E252B] hover:text-white border border-[#D8D2C8] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              >
                <span>Enquire About Future Availability</span>
              </button>
            </div>
          </div>

          {/* Card 3: Housing Loans (Referral Model) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#D8D2C8] bg-white p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-500 relative group">
            <div className="space-y-6">
              
              {/* Card Header & Badge */}
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#F0ECE7] border border-[#D8D2C8] text-[#1E252B] text-[10px] font-medium tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#1E252B]" />
                  <span>REFERRAL MODEL</span>
                </span>
              </div>

              <div>
                <h3 className="font-serif tracking-[0.1em] uppercase text-xl sm:text-2xl font-normal text-[#1E252B]">
                  Housing Loans
                </h3>
                <p className="text-xs tracking-wider text-[#8A9199] mt-1 font-medium">
                  Referral Assistance • Pan-India & Worldwide NRI
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#525A62] font-light leading-relaxed">
                Transparent home financing assistance through permitted banking partnerships and verified DSA networks with leading private and public sector institutions for domestic and overseas clients.
              </p>

              {/* Regulatory Notice Banner */}
              <div className="p-3.5 rounded-xl bg-[#F0ECE7]/60 border border-[#D8D2C8] text-[11px] sm:text-xs text-[#525A62] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                <span>
                  <strong>Referral Network:</strong> Referral/DSA partnerships in onboarding. Radha Rani Properties acts solely as an assistance point, not an independent lender.
                </span>
              </div>

              {/* Offerings list */}
              <ul className="space-y-3 pt-1 text-xs sm:text-sm text-[#2C353D] font-light">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                  <span>Anticipated competitive capital tie-ups & rate checks</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                  <span>Balance Transfer & Top-up Guidance (Post-launch)</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onOpenFutureModal("loans")}
                className="w-full py-3.5 px-6 rounded-full bg-[#F0ECE7] hover:bg-[#1E252B] text-[#1E252B] hover:text-white border border-[#D8D2C8] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              >
                <span>Get Alerted for Assistance</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
