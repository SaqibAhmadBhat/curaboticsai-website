import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY RECEIVED:", body);

    const {
      name,
      email,
      phone,
      organization,
      location,
      equipment,
      details,
    } = body;

    const response = await resend.emails.send({
      from: "CuraBotics AI <onboarding@resend.dev>",
      to: "saqibahmadbhat885@gmail.com",
      subject: "🚀 New Consultation Request - CuraBotics AI",
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Equipment:</strong> ${equipment}</p>
        <p><strong>Details:</strong> ${details}</p>
      `,
    });

    console.log("EMAIL RESPONSE:", response);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error: any) {
    console.error("EMAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Email failed",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}