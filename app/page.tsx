"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PropertyShowcase } from "@/components/PropertyShowcase";
import { PanoramicStrips } from "@/components/PanoramicStrips";
import { ServicesSection } from "@/components/ServicesSection";
import { PropertyDesk } from "@/components/PropertyDesk";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { AboutSection } from "@/components/AboutSection";
import { FaqSection } from "@/components/FaqSection";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { FutureServiceModal } from "@/components/FutureServiceModal";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

export default function Home() {
  const [deskTab, setDeskTab] = useState<"source" | "list">("source");
  const [futureModalType, setFutureModalType] = useState<"lic" | "loans" | null>(null);

  const handleHeroSelectTab = (tab: "source" | "list") => {
    setDeskTab(tab);
  };

  const handleScrollToPropertyDesk = () => {
    const elem = document.getElementById("discovery");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F4] selection:bg-[#641E2B] selection:text-[#FAF8F4]">
      {/* 01. Header & Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 02. Hero Section */}
        <Hero onSelectTab={handleHeroSelectTab} />

        {/* Stewart & Co "Luxury Lives Here" Property Showcase */}
        <PropertyShowcase />

        {/* Stewart & Co Panoramic Feature Strips */}
        <PanoramicStrips />

        {/* 03. Services Portfolio (Live Property, Coming Soon LIC, Referral Loans) */}
        <ServicesSection
          onOpenFutureModal={(type) => setFutureModalType(type)}
          onScrollToPropertyDesk={handleScrollToPropertyDesk}
        />

        {/* 04. Property Discovery Desk (Requirement & Listing Form) */}
        <PropertyDesk key={deskTab} initialTab={deskTab} />

        {/* 05. Why Choose Us (Credibility, No Fake Hype) */}
        <WhyChooseUs />

        {/* 06. How It Works (4-Step Advisory Journey) */}
        <HowItWorks />

        {/* 07. About Us (Founder, Philosophy & Locations) */}
        <AboutSection />

        {/* 08. FAQs */}
        <FaqSection />

        {/* Stewart & Co Style Dedicated Storytelling Consultation Call-to-Action with Background Image */}
        <section className="relative py-28 md:py-36 overflow-hidden border-t border-[#313B44]">
          {/* Background Estate Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-estate.jpg"
              alt="Exclusive Delhi NCR Estate & Private Advisory"
              fill
              sizes="100vw"
              className="object-cover object-center scale-105"
            />
            {/* Low-shadow overlay filter to keep the estate image luminous */}
            <div className="absolute inset-0 bg-black/45"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/65"></div>
          </div>

          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 2xl:px-24 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-3 text-center md:text-left max-w-2xl">
              <h2 className="font-serif tracking-[0.18em] uppercase text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white leading-tight drop-shadow-md">
                Looking for Genuine Advisory?
              </h2>
              <p className="text-xs sm:text-sm text-[#F0ECE7] font-light leading-relaxed max-w-xl">
                Book a dedicated session or accompanied on-ground property inspection in Palam on our consultation desk.
              </p>
            </div>
            <Link
              href="/schedule-consultation"
              className="px-9 py-4 rounded-full bg-white hover:bg-[#1E252B] text-[#1E252B] hover:text-white text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-500 shadow-sm hover:shadow-md shrink-0 text-center border border-white/20 hover:border-transparent group"
            >
              <span>Schedule Consultation →</span>
            </Link>
          </div>
        </section>
      </main>

      {/* 09. Footer & Regulatory Disclosures */}
      <Footer />

      {/* Planned Services Notice Modal */}
      <FutureServiceModal
        isOpen={Boolean(futureModalType)}
        onClose={() => setFutureModalType(null)}
        serviceType={futureModalType}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}
