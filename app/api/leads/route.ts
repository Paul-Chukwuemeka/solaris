import { NextResponse } from "next/server";
import { z } from "zod";

const LeadSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(7, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(2, "City is required"),
  source: z.string().optional(),
  notes: z.string().optional(),
  region: z.string().optional(),
  systemSpec: z.record(z.string(), z.unknown()).optional(),
  loads: z
    .array(
      z.object({
        name: z.string(),
        watts: z.number(),
        quantity: z.number(),
        hours: z.number(),
      })
    )
    .optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const lead = parsed.data;

    // TODO: Replace console.log with real integrations:
    // 1. Send email via Resend/SendGrid to sales team
    // 2. Save to database (Supabase, Prisma, etc.)
    // 3. Post to Slack / WhatsApp notification channel
    // 4. Push to CRM webhook (HubSpot, Zoho, Pipedrive)
    console.log("=== NEW LEAD ===");
    console.log("Contact:", lead.fullName, "|", lead.phone, "|", lead.email);
    console.log("Location:", lead.city, "| Region:", lead.region);
    console.log("Source:", lead.source ?? "Not provided");
    console.log("System Spec:", JSON.stringify(lead.systemSpec, null, 2));
    console.log("Loads:", JSON.stringify(lead.loads, null, 2));
    console.log("Notes:", lead.notes ?? "None");
    console.log("================");

    return NextResponse.json(
      {
        success: true,
        message:
          "Quote request received. Our team will contact you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead Capture Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
