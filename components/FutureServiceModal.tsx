"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Landmark, CheckCircle2, AlertCircle, Send } from "lucide-react";

interface FutureServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: "lic" | "loans" | null;
}

export function FutureServiceModal({ isOpen, onClose, serviceType }: FutureServiceModalProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !serviceType) return null;

  const isLic = serviceType === "lic";
  const title = isLic ? "LIC Insurance Availability Notice" : "Housing Loan Assistance Alert";
  const badge = isLic ? "AGENCY AUTHORIZATION IN SETUP" : "BANKING PARTNERSHIP IN ONBOARDING";
  const notice = isLic
    ? "Regulatory Notice: Authorization process is underway. Radha Rani Properties will advise insurance policies strictly upon completion of formal individual agency appointment post IRDAI accreditation. You will be alerted once active."
    : "Referral Model Notice: Radha Rani Properties acts solely as an advisory facilitator and not as an independent financial lender. Permitted DSA/referral arrangements with partner banks are currently in onboarding.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please provide your full name.");
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      setError("Please provide a valid 10-digit mobile number.");
      return;
    }

    if (!consent) {
      setError("Kindly authorize communication consent.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          mobile: mobile.trim(),
          enquiryType: isLic ? "Future LIC Insurance Interest" : "Future Home Financing Assistance",
          requirements: notes.trim(),
          consent,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to register notice.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    setName("");
    setMobile("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-[#E8E2D6] shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#737373] hover:text-[#242424] rounded-lg hover:bg-[#FAF8F4] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF0E1] border-2 border-[#C5A15A] text-[#641E2B] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-title text-2xl font-bold text-[#242424]">
              Interest Registered
            </h3>
            <p className="text-sm text-[#525252] leading-relaxed">
              Thank you, {name}. Your interest has been noted. We will directly notify your phone number once our formal regulatory appointments and partner channels are operational.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 rounded-lg bg-[#641E2B] text-white text-sm font-semibold hover:bg-[#4D1721] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#C5A15A] bg-[#FAF0E1] px-2.5 py-1 rounded-full border border-[#C5A15A]/30 inline-block">
                {badge}
              </span>
              <h3 className="font-serif-title text-2xl font-bold text-[#242424] pt-1">
                {title}
              </h3>
            </div>

            {/* Regulatory Notice Banner */}
            <div className="p-3.5 rounded-lg bg-[#FAF8F4] border border-[#E8E2D6] text-xs text-[#525252] flex items-start gap-2.5 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
              <span>{notice}</span>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-1.5">
                Full Name <span className="text-[#641E2B]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your Name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-1 focus:ring-[#C5A15A] outline-none text-sm text-[#242424]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-1.5">
                Mobile Number (WhatsApp) <span className="text-[#641E2B]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-semibold text-[#737373]">
                  +91
                </span>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  placeholder="93100 XXXXX"
                  className="w-full pl-11 pr-3.5 py-2.5 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-1 focus:ring-[#C5A15A] outline-none text-sm text-[#242424]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-1.5">
                Specific Area of Interest (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder={
                  isLic
                    ? "e.g. Mortgage redemption policy, endowment plan, child wealth creation..."
                    : "e.g. New property purchase loan, balance transfer, tentative loan requirement..."
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-1 focus:ring-[#C5A15A] outline-none text-sm text-[#242424] resize-none"
              ></textarea>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#641E2B] focus:ring-[#C5A15A]"
              />
              <span className="text-[11px] text-[#525252] leading-tight select-none">
                I authorize Radha Rani Properties to alert me via WhatsApp or Call once this service pathway becomes active.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-lg bg-[#641E2B] hover:bg-[#4D1721] text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <span>Registering Alert...</span>
              ) : (
                <>
                  <span>Register for Service Notice</span>
                  <Send className="w-4 h-4 text-[#C5A15A]" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
