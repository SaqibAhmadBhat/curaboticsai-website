import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("NEWSLETTER JSON PARSE ERROR:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid request payload" },
        { status: 400 }
      );
    }

    console.log("NEWSLETTER BODY:", body);

    const email = body?.email;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: "A valid email is required" },
        { status: 400 }
      );
    }

    const resendResponse = await resend.emails.send({
      from: "CuraBotics AI <onboarding@resend.dev>",
      to: "saqibahmadbhat885@gmail.com",
      subject: "📩 New Newsletter Subscriber",
      html: `<p>New subscriber: ${email}</p>`,
    });

    console.log("NEWSLETTER RESPONSE:", resendResponse);

    if (resendResponse.error) {
      console.error("RESEND API ERROR:", resendResponse.error);
      return NextResponse.json(
        { success: false, message: "Subscription failed" },
        { status: 500 }
      );
    }

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
      },
      { status: 500 }
    );
  }
}