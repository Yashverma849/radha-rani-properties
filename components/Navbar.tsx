"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const showTransparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "PROPERTIES", href: "/#showcase" },
    { name: "SERVICES", href: "/#services" },
    { name: "PALAM DESK", href: "/#discovery" },
    { name: "WHY US", href: "/#why-us" },
    { name: "ABOUT", href: "/#about" },
    { name: "FAQS", href: "/#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showTransparent
          ? "bg-transparent py-5 text-white"
          : "bg-[#EDE9E3]/90 backdrop-blur-md shadow-xs border-b border-[#D8D2C8]/60 py-3 text-[#1E252B]"
      }`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-105 shrink-0 flex items-center justify-center">
              <Image
                src="/images/radha_rani_property-removebg-preview.png"
                alt="Radha Rani Properties Logo"
                width={70}
                height={70}
                priority
                className={`w-full h-full object-contain transition-all duration-300 ${
                  showTransparent ? "brightness-0 invert drop-shadow-md" : "brightness-100"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif tracking-[0.18em] uppercase text-base sm:text-lg font-normal transition-colors ${
                showTransparent ? "text-white" : "text-[#1E252B]"
              }`}>
                Radha Rani Properties
              </span>
              <span className={`text-[9px] uppercase tracking-[0.25em] font-medium transition-colors ${
                showTransparent ? "text-white/80" : "text-[#641E2B]"
              }`}>
                Palam • Southwest Delhi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Stewart & Co Tracked Uppercase Style */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors relative py-1 hover:opacity-100 ${
                  showTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-[#2C353D] hover:text-[#641E2B]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right CTA: Schedule Consultation */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/schedule-consultation"
              className={`px-5 py-2.5 rounded-full text-xs tracking-[0.18em] uppercase font-semibold transition-all duration-300 ${
                showTransparent
                  ? "bg-white/15 hover:bg-white text-white hover:text-[#1E252B] backdrop-blur-md border border-white/30"
                  : "bg-[#2C353D] hover:bg-[#641E2B] text-white shadow-xs"
              }`}
            >
              Schedule Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="https://wa.me/919310033960"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#25D366] text-white shadow-xs"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors focus:outline-none ${
                showTransparent ? "text-white" : "text-[#1E252B]"
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-6 mt-3 border-t border-black/10 bg-[#EDE9E3] text-[#1E252B] rounded-2xl px-6 shadow-xl animate-fadeIn">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-xs tracking-[0.2em] uppercase font-medium text-[#1E252B] hover:text-[#641E2B] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <Link
                href="/schedule-consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 py-3 text-center text-xs tracking-[0.18em] uppercase font-semibold bg-[#2C353D] text-white rounded-full"
              >
                Schedule Consultation
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
