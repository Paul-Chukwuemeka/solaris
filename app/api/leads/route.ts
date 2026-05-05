import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // In a real app, you would:
    // 1. Validate data with Zod
    // 2. Save to a database (Supabase, Prisma, etc.)
    // 3. Send email via Resend/SendGrid
    // 4. Send Slack/WhatsApp notification to sales team

    console.log("Lead Received:", data);

    return NextResponse.json({ 
      success: true, 
      message: "Lead captured successfully. Our team will contact you shortly." 
    }, { status: 200 });

  } catch (error) {
    console.error("Lead Capture Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to capture lead. Please try again." 
    }, { status: 500 });
  }
}
