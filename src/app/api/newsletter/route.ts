import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    console.log("NEWSLETTER EMAIL:", email);

    const response = await resend.emails.send({
      from: "CuraBotics AI <onboarding@resend.dev>",
      to: "saqibahmadbhat885@gmail.com",
      subject: "📩 New Newsletter Subscriber",
      html: `<p>New subscriber: ${email}</p>`,
    });

    console.log("NEWSLETTER RESPONSE:", response);

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    });

  } catch (error: any) {
    console.error("NEWSLETTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Subscription failed",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}