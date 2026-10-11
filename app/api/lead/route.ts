import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

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

// In-memory fallback buffer
const receivedLeads: LeadSubmission[] = [];

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validation
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

    const isConsultation = Boolean(
      data.isConsultation ||
      (data.enquiryType && data.enquiryType.toLowerCase().includes("consultation"))
    );

    // Save to Supabase
    let supabaseSaved = false;
    try {
      const supabaseAdmin = getSupabaseAdmin();

      if (isConsultation) {
        // Table 1: schedule_consultations
        const { error: dbError } = await supabaseAdmin
          .from("schedule_consultations")
          .insert({
            reference_id: leadId,
            name: data.name.trim(),
            mobile: cleanMobile,
            service: data.service || "property",
            meeting_mode: data.meetingMode || "visit",
            preferred_date: data.preferredDate || null,
            time_slot: data.timeSlot || "Morning (10:00 AM – 1:00 PM)",
            location_pocket: data.location || "Palam Colony / Main Area",
            notes: data.notes || data.requirements || "",
            consent: Boolean(data.consent),
            status: "pending",
            source: "Website Consultation Page",
          });

        if (dbError) {
          console.warn("[Supabase Insert Warning - schedule_consultations]:", dbError.message);
        } else {
          supabaseSaved = true;
        }
      } else {
        // Table 2: curated_property_requirements
        const { error: dbError } = await supabaseAdmin
          .from("curated_property_requirements")
          .insert({
            reference_id: leadId,
            lead_type: data.leadType || "source",
            name: data.name.trim(),
            mobile: cleanMobile,
            property_type: data.propertyType || "Residential Plot (50–200 sq yd)",
            location: data.location || "Palam Colony (Main Area)",
            configuration: data.configuration || "Standard",
            budget: data.budget || "Not Specified",
            requirements: data.requirements ? data.requirements.trim() : "",
            consent: Boolean(data.consent),
            status: "new",
            source: "Property Desk Portal",
          });

        if (dbError) {
          console.warn("[Supabase Insert Warning - curated_property_requirements]:", dbError.message);
        } else {
          supabaseSaved = true;
        }
      }
    } catch (supabaseErr: any) {
      console.warn("[Supabase Connection Warning]:", supabaseErr?.message || supabaseErr);
    }

    // Keep fallback in-memory entry
    const newLead: LeadSubmission = {
      id: leadId,
      name: data.name.trim(),
      mobile: data.mobile.trim(),
      enquiryType: data.enquiryType || (isConsultation ? "Scheduled Consultation" : "Property Sourcing Requirement"),
      propertyType: data.propertyType || "Residential",
      location: data.location || "Delhi NCR",
      configuration: data.configuration || "Standard",
      budget: data.budget || "Not Specified",
      requirements: data.requirements ? data.requirements.trim() : "",
      consent: Boolean(data.consent),
      createdAt: new Date().toISOString(),
      source: isConsultation ? "Consultation Page" : "Property Desk Portal",
    };
    receivedLeads.unshift(newLead);

    return NextResponse.json({
      success: true,
      message: isConsultation
        ? "Your consultation has been scheduled and recorded."
        : "Your property requirement has been directly recorded on the founder desk.",
      leadId,
      supabaseSaved,
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
  let supabaseCount = 0;
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const [consultationsRes, curatedRes] = await Promise.all([
      supabaseAdmin.from("schedule_consultations").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("curated_property_requirements").select("id", { count: "exact", head: true }),
    ]);

    supabaseCount = (consultationsRes.count || 0) + (curatedRes.count || 0);
  } catch {
    // ignore
  }

  return NextResponse.json({
    totalLeadsRecorded: receivedLeads.length + supabaseCount,
    status: "Lead Reception Active (Connected to Supabase)",
  });
}
