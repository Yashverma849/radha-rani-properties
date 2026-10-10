import { NextResponse } from "next/server";

export interface LeadSubmission {
  id: string;
  name: string;
  mobile: string;
  enquiryType: string;
  propertyType?: string;
  location?: string;
  configuration?: string;
  budget?: string;
  requirements?: string;
  consent: boolean;
  createdAt: string;
  source: string;
}

// In-memory lead buffer for rapid founder retrieval during development/MVP
// Easily connectable to Supabase, Google Sheets, or webhook when CRM credentials are supplied
const receivedLeads: LeadSubmission[] = [];

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validation per PRD Section 4
    if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your valid full name." },
        { status: 400 }
      );
    }

    const cleanMobile = (data.mobile || "").replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!data.consent) {
      return NextResponse.json(
        { success: false, error: "Kindly authorize contact consent to proceed." },
        { status: 400 }
      );
    }

    const leadId = `RRP-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const newLead: LeadSubmission = {
      id: leadId,
      name: data.name.trim(),
      mobile: data.mobile.trim(),
      enquiryType: data.enquiryType || "Property Sourcing Requirement",
      propertyType: data.propertyType || "Residential",
      location: data.location || "Delhi NCR",
      configuration: data.configuration || "Standard",
      budget: data.budget || "Not Specified",
      requirements: data.requirements ? data.requirements.trim() : "",
      consent: Boolean(data.consent),
      createdAt: new Date().toISOString(),
      source: "Delhi NCR Web Portal",
    };

    receivedLeads.unshift(newLead);

    return NextResponse.json({
      success: true,
      message: "Your property requirement has been directly recorded on the founder desk.",
      leadId,
      leadSummary: {
        name: newLead.name,
        enquiryType: newLead.enquiryType,
        location: newLead.location,
      },
    });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again or reach out on WhatsApp." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Returns recent count and sample without exposing private mobile numbers
  return NextResponse.json({
    totalLeadsRecorded: receivedLeads.length,
    status: "Lead Reception Active",
  });
}
