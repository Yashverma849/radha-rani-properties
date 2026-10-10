"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Sparkles, MessageCircle, Phone, RefreshCw } from "lucide-react";

interface PropertyDeskProps {
  initialTab?: "source" | "list";
}

export function PropertyDesk({ initialTab = "source" }: PropertyDeskProps) {
  const [activeTab, setActiveTab] = useState<"source" | "list">(initialTab);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    propertyType: "Residential Plot (50–200 sq yd)",
    location: "Palam Colony (Main Area)",
    configuration: "Plot (50–100 sq yd)",
    budget: "₹25 Lakh – ₹50 Lakh",
    requirements: "",
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<{
    id: string;
    name: string;
    mobile: string;
    enquiryType: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError("Please provide your full name.");
      return;
    }

    const cleanMobile = formData.mobile.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.consent) {
      setError("Please provide affirmative contact consent to proceed.");
      return;
    }

    setLoading(true);

    try {
      const enquiryType =
        activeTab === "source"
          ? "Property Sourcing Requirement (Buy/Rent)"
          : "Owner Listing Registration (Sell/Rent)";

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          enquiryType,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit requirement.");
      }

      setSubmittedLead({
        id: result.leadId,
        name: formData.name,
        mobile: formData.mobile,
        enquiryType,
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please reach out via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedLead(null);
    setFormData({
      name: "",
      mobile: "",
      propertyType: "Residential Plot (50–200 sq yd)",
      location: "Palam Colony (Main Area)",
      configuration: "Plot (50–100 sq yd)",
      budget: "₹25 Lakh – ₹50 Lakh",
      requirements: "",
      consent: true,
    });
  };

  const getWhatsAppPrefillUrl = () => {
    if (!submittedLead) return "https://wa.me/919310033960";
    const text = encodeURIComponent(
      `Namaste Radha Rani Properties,\n\nI have registered my requirement with Reference #${submittedLead.id}.\nName: ${formData.name}\nType: ${submittedLead.enquiryType}\nLocation: ${formData.location}\nBudget: ${formData.budget}\nDetails: ${formData.requirements || "Standard requirement"}\n\nKindly connect at your earliest convenience.`
    );
    return `https://wa.me/919310033960?text=${text}`;
  };

  return (
    <section id="discovery" className="py-24 bg-[#EDE9E3] relative">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        
        {/* Editorial Split Header: Title Left, Description Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="font-serif tracking-[0.2em] uppercase text-3xl sm:text-4xl md:text-5xl font-light text-[#1E252B]">
              Curated To Your Exact Needs
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#525A62] max-w-md font-light leading-relaxed md:text-right">
            Operating from home in Palam. Tell us your exact requirement 
            for plots, builder floors, or properties for transparent, direct matching without fake listings.
          </p>
        </div>

        {/* Tab Switcher - Floating Pill Style */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#D8D2C8] shadow-sm">
            <button
              type="button"
              onClick={() => {
                setActiveTab("source");
                setError(null);
              }}
              className={`px-7 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 cursor-pointer ${
                activeTab === "source"
                  ? "bg-[#1E252B] text-white shadow-sm"
                  : "text-[#525A62] hover:text-[#1E252B]"
              }`}
            >
              Sourcing / Buy / Rent
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("list");
                setError(null);
              }}
              className={`px-7 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 cursor-pointer ${
                activeTab === "list"
                  ? "bg-[#1E252B] text-white shadow-sm"
                  : "text-[#525A62] hover:text-[#1E252B]"
              }`}
            >
              Have Property to Sell / Rent
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-[#D8D2C8] shadow-xl p-8 sm:p-12 relative overflow-hidden max-w-6xl mx-auto">
          
          {submittedLead ? (
            /* Success State */
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#FAF0E1] border-2 border-[#C5A15A] text-[#641E2B] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#C5A15A]">
                  RECORDED DIRECTLY ON FOUNDER DESK
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#242424]">
                  Thank You, {submittedLead.name}
                </h3>
                <p className="text-sm text-[#525252] max-w-lg mx-auto">
                  Your property dossier has been logged under Reference ID:{" "}
                  <strong className="text-[#641E2B] font-mono text-base">{submittedLead.id}</strong>. 
                  Our founder will review and reach out personally within business hours.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
                <a
                  href={getWhatsAppPrefillUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-lg bg-[#242424] hover:bg-[#641E2B] text-white text-sm font-semibold transition-all shadow-md group"
                >
                  <MessageCircle className="w-4 h-4 text-[#C5A15A] group-hover:scale-110 transition-transform" />
                  <span>Send via WhatsApp Now</span>
                </a>

                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-lg border border-[#C5A15A] hover:bg-[#FAF8F4] text-[#242424] text-sm font-semibold transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-[#641E2B]" />
                  <span>Submit Another Requirement</span>
                </button>
              </div>
            </div>
          ) : (
            /* Lead Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form Fields: Responsive 3-Column Grid for Widescreen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                    Full Name <span className="text-[#641E2B]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Ramesh Verma"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                    Mobile Number (WhatsApp) <span className="text-[#641E2B]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-xs font-semibold text-[#737373]">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="93100 XXXXX"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                    Property Type <span className="text-[#641E2B]">*</span>
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50 transition-colors"
                  >
                    <option value="Residential Plot (50–200 sq yd)">Residential Plot (50–200 sq yd)</option>
                    <option value="Commercial Plot / Land">Commercial Plot / Land</option>
                    <option value="Independent Builder Floor">Independent Builder Floor</option>
                    <option value="Independent House / Kothi">Independent House / Kothi</option>
                    <option value="Commercial Shop / Space">Commercial Shop / Retail Floor</option>
                    <option value="Agricultural / Other Land">Agricultural / Other Land Parcel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                    Locality / Palam Pocket <span className="text-[#641E2B]">*</span>
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50 transition-colors"
                  >
                    <option value="Palam Colony (Main Area)">Palam Colony (Main Area)</option>
                    <option value="Raj Nagar (Palam)">Raj Nagar (Palam)</option>
                    <option value="Sadh Nagar (Palam)">Sadh Nagar (Palam)</option>
                    <option value="Mahavir Enclave (Palam)">Mahavir Enclave (Palam)</option>
                    <option value="Ram Phal Chowk / Dwarka Sec 7 Border">Ram Phal Chowk / Dwarka Sec 7 Border</option>
                    <option value="Palam Village & Extension">Palam Village & Extension</option>
                    <option value="Manglapuri / Palam">Manglapuri / Palam</option>
                    <option value="Dwarka & Southwest Delhi Surrounds">Dwarka & Southwest Delhi Surrounds</option>
                    <option value="Other Delhi NCR Region">Other Delhi NCR Region</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                    Desired Configuration <span className="text-[#641E2B]">*</span>
                  </label>
                  <select
                    name="configuration"
                    value={formData.configuration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50 transition-colors"
                  >
                    <option value="Plot (50–100 sq yd)">Plot (50–100 sq yd)</option>
                    <option value="Plot (100–250 sq yd)">Plot (100–250 sq yd)</option>
                    <option value="Plot (250+ sq yd)">Plot (250+ sq yd)</option>
                    <option value="1 BHK Builder Floor">1 BHK Builder Floor</option>
                    <option value="2 BHK Builder Floor">2 BHK Builder Floor</option>
                    <option value="3 BHK Builder Floor">3 BHK Builder Floor</option>
                    <option value="4+ BHK / Independent House">4+ BHK / Independent House</option>
                    <option value="Commercial Shop / Bay">Commercial Shop / Bay</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                    Budget Bracket <span className="text-[#641E2B]">*</span>
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50 transition-colors"
                  >
                    <option value="Under ₹25 Lakh">Under ₹25 Lakh</option>
                    <option value="₹25 Lakh – ₹50 Lakh">₹25 Lakh – ₹50 Lakh</option>
                    <option value="₹50 Lakh – ₹1 Crore">₹50 Lakh – ₹1.00 Crore</option>
                    <option value="₹1 Cr – ₹2.5 Cr">₹1.00 Crore – ₹2.50 Crore</option>
                    <option value="₹2.5 Crore+">₹2.50 Crore+</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Specific Requirements or Timing */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#363636] mb-2">
                  Specific Requirements or Timing (Optional)
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="e.g. Park-facing, ready-to-move-in, Vastu compliant, high rental yield, wide road, or lease-out expectations..."
                  className="w-full px-4 py-3 rounded-lg border border-[#E8E2D6] focus:border-[#C5A15A] focus:ring-2 focus:ring-[#C5A15A]/20 outline-none text-sm text-[#242424] bg-[#FAF8F4]/50 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#641E2B] focus:ring-[#C5A15A] cursor-pointer"
                  />
                  <span className="text-xs text-[#525252] leading-relaxed select-none">
                    I authorize Radha Rani Properties to contact me via Call or WhatsApp regarding 
                    my property requirement. We honor your privacy under the DPDP Act 2023: no spam 
                    and zero telemarketing sharing.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-8 rounded-full bg-[#1E252B] hover:bg-[#641E2B] text-white font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <span>Registering with Founder Desk...</span>
                  ) : (
                    <>
                      <span>
                        {activeTab === "source"
                          ? "Submit Requirement to Founder Desk"
                          : "Register Property for Advisory Review"}
                      </span>
                      <Send className="w-4 h-4 text-[#C5A15A]" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
