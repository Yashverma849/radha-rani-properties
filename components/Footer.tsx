"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#1E252B] text-[#EDE9E3] pt-20 pb-12 border-t border-[#313B44]">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        
        {/* Main Footer Row - 3 Balanced Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-[#313B44]">
          
          {/* Brand & Purpose */}
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
                <Image
                  src="/images/radha_rani_property-removebg-preview.png"
                  alt="Radha Rani Properties Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain brightness-0 invert opacity-95"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.15em] uppercase text-xl font-light text-white">
                  Radha Rani Properties
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#A0AAB2] font-medium mt-0.5">
                  A trusted name for your next chapter
                </span>
              </div>
            </div>
            <p className="text-xs text-[#A0AAB2] leading-relaxed font-light">
              Founder-operated by Yash Verma from home in Palam (Southwest Delhi). Building our brand on quiet integrity, genuine verified plots and homes, with worldwide reach for LIC insurance and housing loan advisory.
            </p>
            <div className="pt-2 text-[11px] text-[#A0AAB2] uppercase tracking-[0.2em] font-medium flex flex-wrap items-center gap-2">
              <span>Palam Home Desk</span>
              <span>•</span>
              <span>Verified Plots</span>
              <span>•</span>
              <span>Global Reach</span>
            </div>
          </div>

          {/* Advisory & Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif tracking-[0.2em] uppercase text-xs font-normal text-white">
              Navigation & Advisory
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A0AAB2] font-light">
              <li>
                <Link href="/schedule-consultation" className="text-white hover:text-white/80 uppercase tracking-wider transition-colors underline underline-offset-4">
                  Schedule Consultation Page →
                </Link>
              </li>
              <li>
                <Link href="/#hero" className="hover:text-white transition-colors">
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link href="/#showcase" className="hover:text-white transition-colors">
                  Featured Palam Properties
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Plots & Property Dealing (Palam)
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  LIC Insurance Advisory (Worldwide NRI)
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Housing Loan Advisory (Pan-India)
                </Link>
              </li>
              <li>
                <Link href="/#discovery" className="hover:text-white transition-colors">
                  Submit Property Requirement Desk
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="hover:text-white transition-colors">
                  Why Clients Trust Our Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Desk & Presence */}
          <div className="space-y-4">
            <h4 className="font-serif tracking-[0.2em] uppercase text-xs font-normal text-white">
              Direct Contact & Visits
            </h4>
            <p className="text-xs text-[#A0AAB2] leading-relaxed font-light">
              Palam, Southwest Delhi<br />
              Home-Operated • Accompanied Site Visits by Prior Appointment<br />
              WhatsApp Only: +91 93100 33960 (No Direct Calls)<br />
              Active Hours: Mon–Sat, 9:30 AM – 7:30 PM IST
            </p>
            <div className="pt-3">
              <a
                href="https://wa.me/919310033960"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#1E252B] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A15A] hover:text-white transition-all duration-300 shadow-md"
              >
                <span>WhatsApp (+91 93100 33960)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright and Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#717E8A] gap-4 font-light">
          <p>© 2026 Radha Rani Properties. All rights reserved. Operating in Palam & worldwide.</p>
          <div className="flex items-center gap-6 tracking-wider uppercase text-[10px]">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms of Engagement
            </span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              RERA Guidance
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
