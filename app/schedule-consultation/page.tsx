"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ScheduleConsultationPage() {
  const [service, setService] = useState<"property" | "lic" | "loans">("property");
  const [meetingMode, setMeetingMode] = useState<"visit" | "whatsapp">("visit");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (10:00 AM – 1:00 PM)");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [locationOrPocket, setLocationOrPocket] = useState("Palam Colony / Main Area");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || name.trim().length < 2) {
      setError("Please provide your full name.");
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      setError("Please enter a valid 10-digit WhatsApp number.");
      return;
    }

    if (!consent) {
      setError("Please provide contact consent to schedule your consultation.");
      return;
    }

    setLoading(true);

    try {
      const serviceNameMap = {
        property: "Palam Plots & Properties (Builder Site Visit / Advisory)",
        lic: "LIC Insurance Advisory (Pan-India & Worldwide NRI)",
        loans: "Housing Loan Advisory (Pan-India & Worldwide NRI)",
      };

      const modeNameMap = {
        visit: "Accompanied Builder Site Visit (Palam)",
        whatsapp: "WhatsApp Direct Consultation",
      };

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          mobile: cleanMobile,
          enquiryType: `Scheduled Consultation: ${serviceNameMap[service]} [${modeNameMap[meetingMode]}]`,
          propertyType: service === "property" ? "Plots & Builder Floors" : "Financial Advisory",
          location: locationOrPocket,
          requirements: `Date: ${preferredDate || "Earliest Available"} | Slot: ${timeSlot} | Notes: ${notes || "No additional notes"}`,
          consent,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to schedule consultation.");
      }

      setSubmittedLeadId(result.leadId);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please connect directly via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const getDirectWhatsAppUrl = () => {
    const serviceName =
      service === "property"
        ? "Palam Plots & Properties"
        : service === "lic"
        ? "LIC Life Insurance Advisory"
        : "Housing Loan Advisory";

    const modeText =
      meetingMode === "visit"
        ? "Accompanied Builder Site Visit in Palam"
        : "WhatsApp Chat Consultation";

    const msg = encodeURIComponent(
      `Namaste Radha Rani Properties,\n\nI would like to schedule a consultation with the founder.\n\n` +
      `• Name: ${name || "Client"}\n` +
      `• Mobile: ${mobile || "Provided via WhatsApp"}\n` +
      `• Service: ${serviceName}\n` +
      `• Mode: ${modeText}\n` +
      `• Preferred Date: ${preferredDate || "Earliest available"}\n` +
      `• Time Slot: ${timeSlot}\n` +
      `• Details/Notes: ${notes || "Looking for genuine advisory"}\n\n` +
      `Kindly confirm your availability.`
    );

    return `https://wa.me/919310033960?text=${msg}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EDE9E3] selection:bg-[#1E252B] selection:text-white">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1 pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
          
          {/* Breadcrumb & Header */}
          <div className="mb-14 max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#8A9199] mb-4">
              <Link href="/" className="hover:text-[#1E252B] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#1E252B]">Schedule Consultation</span>
            </div>

            <h1 className="font-serif tracking-[0.15em] uppercase text-3xl sm:text-4xl lg:text-5xl font-light text-[#1E252B] leading-tight">
              Schedule A Consultation
            </h1>
            <p className="text-xs sm:text-sm text-[#525A62] mt-3 leading-relaxed font-light max-w-3xl">
              Book dedicated time directly with founder Yash Verma. We operate from home in Palam (Southwest Delhi) for genuine plots and properties, and provide pan-India and worldwide advisory for LIC insurance and housing loans.
            </p>
          </div>

          {/* Main Grid: Form (Col-8) & Trust Details (Col-4) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Interactive Booking Form */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E8E2D6] shadow-xl p-6 sm:p-10">
              
              {submittedLeadId ? (
                /* Success State */
                <div className="text-center py-10 space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#FAF0E1] border-2 border-[#C5A15A] text-[#641E2B] flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#242424]">
                      Consultation Request Received
                    </h2>
                    <p className="text-sm text-[#525252] max-w-md mx-auto">
                      Reference <strong className="text-[#641E2B]">#{submittedLeadId}</strong> has been logged directly on the founder desk.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E8E2D6] text-xs text-[#525252] max-w-lg mx-auto text-left space-y-2">
                    <div><strong>Client:</strong> {name}</div>
                    <div><strong>Service:</strong> {service === "property" ? "Palam Plots & Properties" : service === "lic" ? "LIC Insurance" : "Housing Loans"}</div>
                    <div><strong>Meeting Mode:</strong> {meetingMode === "visit" ? "Accompanied Site Visit (Palam)" : "WhatsApp Advisory"}</div>
                    <div><strong>Requested Slot:</strong> {preferredDate || "Earliest Available"} — {timeSlot}</div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={getDirectWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-lg bg-[#242424] hover:bg-[#641E2B] text-white font-semibold text-sm transition-all shadow-md"
                    >
                      Instant WhatsApp Confirmation (+91 93100 33960)
                    </a>
                    <Link
                      href="/"
                      className="px-6 py-3.5 rounded-lg border border-[#C5A15A] text-[#242424] hover:bg-[#FAF8F4] font-semibold text-sm transition-all text-center"
                    >
                      Return to Homepage
                    </Link>
                  </div>
                </div>
              ) : (
                /* Interactive Booking Form */
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Step 1: Select Advisory Service */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#363636]">
                      1. Select Advisory Service <span className="text-[#641E2B]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setService("property")}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          service === "property"
                            ? "border-[#641E2B] bg-[#FAF8F4] ring-2 ring-[#641E2B]/20"
                            : "border-[#E8E2D6] hover:border-[#C5A15A] bg-white"
                        }`}
                      >
                        <div className="font-semibold text-sm text-[#242424]">Palam Properties</div>
                        <div className="text-xs text-[#737373] mt-1">Residential plots, builder floors & on-ground site visits</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setService("lic")}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          service === "lic"
                            ? "border-[#641E2B] bg-[#FAF8F4] ring-2 ring-[#641E2B]/20"
                            : "border-[#E8E2D6] hover:border-[#C5A15A] bg-white"
                        }`}
                      >
                        <div className="font-semibold text-sm text-[#242424]">LIC Insurance</div>
                        <div className="text-xs text-[#737373] mt-1">Pan-India & worldwide NRI policy guidance</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setService("loans")}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          service === "loans"
                            ? "border-[#641E2B] bg-[#FAF8F4] ring-2 ring-[#641E2B]/20"
                            : "border-[#E8E2D6] hover:border-[#C5A15A] bg-white"
                        }`}
                      >
                        <div className="font-semibold text-sm text-[#242424]">Housing Loans</div>
                        <div className="text-xs text-[#737373] mt-1">Pan-India home loan & mortgage referral</div>
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Preferred Mode */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#363636]">
                      2. Consultation Mode <span className="text-[#641E2B]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setMeetingMode("visit")}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          meetingMode === "visit"
                            ? "border-[#641E2B] bg-[#FAF8F4] ring-2 ring-[#641E2B]/20"
                            : "border-[#E8E2D6] hover:border-[#C5A15A] bg-white"
                        }`}
                      >
                        <div className="font-semibold text-sm text-[#242424]">Accompanied Site Visit</div>
                        <div className="text-xs text-[#737373] mt-1">Personal on-ground walkthrough of plot/property in Palam</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMeetingMode("whatsapp")}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          meetingMode === "whatsapp"
                            ? "border-[#641E2B] bg-[#FAF8F4] ring-2 ring-[#641E2B]/20"
                            : "border-[#E8E2D6] hover:border-[#C5A15A] bg-white"
                        }`}
                      >
                        <div className="font-semibold text-sm text-[#242424]">WhatsApp Direct Consultation</div>
                        <div className="text-xs text-[#737373] mt-1">Convenient messaging & document review via WhatsApp (+91 93100 33960)</div>
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Preferred Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                        Preferred Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                        Preferred Time Window <span className="text-[#641E2B]">*</span>
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50"
                      >
                        <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                        <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                        <option value="Evening (5:00 PM – 7:30 PM)">Evening (5:00 PM – 7:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 4: Contact Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                        Your Full Name <span className="text-[#641E2B]">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Rajesh Sharma"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                        WhatsApp Number <span className="text-[#641E2B]">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-xs font-semibold text-[#737373]">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="93100 XXXXX"
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50"
                        />
                      </div>
                      <span className="text-[11px] text-[#737373] mt-1 block">
                        WhatsApp messaging only — calls not accepted on this number.
                      </span>
                    </div>
                  </div>

                  {/* Palam Pocket / Location */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                      Preferred Palam Area / Pocket (If Property Related)
                    </label>
                    <select
                      value={locationOrPocket}
                      onChange={(e) => setLocationOrPocket(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50"
                    >
                      <option value="Palam Colony / Main Area">Palam Colony / Main Area</option>
                      <option value="Raj Nagar 1 & 2">Raj Nagar 1 & 2</option>
                      <option value="Sadh Nagar 1 & 2">Sadh Nagar 1 & 2</option>
                      <option value="Mahavir Enclave">Mahavir Enclave</option>
                      <option value="Ram Phal Chowk Vicinity">Ram Phal Chowk Vicinity</option>
                      <option value="Palam Village (Gaon)">Palam Village (Gaon)</option>
                      <option value="Manglapuri Area">Manglapuri Area</option>
                      <option value="Worldwide NRI / Out of Station">Worldwide NRI / Pan-India Advisory</option>
                    </select>
                  </div>

                  {/* Specific Requirement Notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                      Specific Requirements / Questions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Mention budget range, plot size (50, 100, 200 sq yd), builder floor specs, or financial advisory details..."
                      className="w-full px-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50 resize-y"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="consultConsent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#E8E2D6] text-[#641E2B] focus:ring-[#C5A15A]"
                    />
                    <label htmlFor="consultConsent" className="text-xs text-[#525252] leading-relaxed cursor-pointer">
                      I agree to be contacted exclusively by Radha Rani Properties regarding this consultation request. Zero spam or third-party sharing.
                    </label>
                  </div>

                  {/* Error display */}
                  {error && (
                    <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                      {error}
                    </div>
                  )}

                  {/* Submission Buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#641E2B] hover:bg-[#4D1721] text-white font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? "Recording Request..." : "Book Consultation Request"}
                    </button>

                    <a
                      href={getDirectWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#242424] hover:bg-black text-white font-semibold text-sm tracking-wide transition-all text-center"
                    >
                      Direct WhatsApp Booking (+91 93100 33960)
                    </a>
                  </div>

                </form>
              )}

            </div>

            {/* Right Column: Advisory Pillars & Ground Realities */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Card 1: Operating Realities */}
              <div className="bg-white rounded-2xl border border-[#E8E2D6] p-6 shadow-xs space-y-4">
                <h3 className="font-serif-title text-lg font-bold text-[#242424]">
                  Consultation Standards
                </h3>
                <div className="space-y-3 text-xs text-[#525252] leading-relaxed">
                  <div className="pb-3 border-b border-[#E8E2D6]">
                    <strong className="text-[#242424] block mb-0.5">Home-Operated in Palam</strong>
                    We do not maintain commercial showroom overheads. Consultations take place either directly on-site in Palam or via direct WhatsApp messaging.
                  </div>
                  <div className="pb-3 border-b border-[#E8E2D6]">
                    <strong className="text-[#242424] block mb-0.5">Verified On-Ground Reality</strong>
                    All real estate walkthroughs in Palam are scheduled directly at authentic on-ground plots and residential properties with clear title papers.
                  </div>
                  <div>
                    <strong className="text-[#242424] block mb-0.5">WhatsApp Only Desk</strong>
                    Direct calls are disabled on this number. We coordinate appointments and send Google location drop-pins exclusively through WhatsApp.
                  </div>
                </div>
              </div>

              {/* Card 2: Direct Contact Box */}
              <div className="bg-[#FAF8F4] rounded-2xl border border-[#C5A15A]/40 p-6 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A15A]">
                  Founder Desk
                </span>
                <div className="font-serif-title text-xl font-bold text-[#242424]">
                  Radha Rani Properties
                </div>
                <p className="text-xs text-[#525252] leading-relaxed">
                  Palam, Southwest Delhi<br />
                  WhatsApp: +91 93100 33960 (No Calls)<br />
                  Timings: Mon–Sat, 9:30 AM – 7:30 PM IST
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/919310033960"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#641E2B] text-white text-xs font-semibold transition-colors"
                  >
                    <span>Message on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A15A]" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}
