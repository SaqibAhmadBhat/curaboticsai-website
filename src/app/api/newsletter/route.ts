import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT_EMAIL = "er.swt.saqibahmad@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    /* ---------- Email validation ---------- */
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email?.trim() || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    /* ---------- Send notification email ---------- */
    const { error: resendError } = await resend.emails.send({
      from: "CuraBotics AI <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject: `📬 New Newsletter Subscriber — ${email}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:500px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08)">
    <div style="background:linear-gradient(135deg,#1a73b5 0%,#155a8a 100%);padding:24px 28px">
      <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700">📬 New Newsletter Subscriber</h1>
    </div>
    <div style="padding:24px 28px">
      <p style="margin:0 0 12px;color:#6b7280;font-size:14px">A new user has subscribed to CuraBotics AI updates:</p>
      <div style="padding:14px 18px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
        <p style="margin:0;color:#166534;font-size:16px;font-weight:600">${email}</p>
      </div>
      <p style="margin:16px 0 0;color:#9ca3af;font-size:12px">Submitted at: ${new Date().toISOString()}</p>
    </div>
  </div>
</body>
</html>`,
    });

    if (resendError) {
      console.error("Resend API Newsletter Error:", resendError);
      return NextResponse.json(
        { error: "Subscription delivery failed. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Thank you for subscribing to CuraBotics AI updates." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }
}
