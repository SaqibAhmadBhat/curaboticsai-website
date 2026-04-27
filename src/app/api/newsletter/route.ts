import { NextResponse } from "next/server";
import { Resend } from "resend";

function buildSubscriberWelcomeHTML() {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CuraBotics AI</title>
</head>

<body style="margin:0;padding:0;background:#eef4fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:25px 10px;">
<tr>
<td align="center">

<table width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.08);">

<tr>
<td style="background:linear-gradient(135deg,#0b63f6,#00b8ff);padding:40px 30px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:42px;">CuraBotics AI</h1>
<p style="margin:12px 0 0;color:#eaf7ff;font-size:18px;">
Global Healthcare Technology • Robotics • AI Systems
</p>
</td>
</tr>

<tr>
<td style="padding:40px 30px;">

<h2 style="margin:0;color:#111827;font-size:34px;">
Welcome to the Future of Healthcare 🚀
</h2>

<p style="margin-top:20px;color:#4b5563;font-size:18px;line-height:1.8;">
Thank you for joining CuraBotics AI.
You are now connected with a premium network focused on medical technology, hospital automation, intelligent robotics, and global healthcare transformation.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:25px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;">
<tr>
<td style="padding:18px;">
<p style="margin:0;font-size:16px;">✅ AI Healthcare Insights</p>
<p style="margin:10px 0 0;font-size:16px;">✅ Robotics Innovations</p>
<p style="margin:10px 0 0;font-size:16px;">✅ Medical Equipment Opportunities</p>
<p style="margin:10px 0 0;font-size:16px;">✅ Startup & Partnership Updates</p>
</td>
</tr>
</table>

<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:30px;">
<tr>
<td align="center">

<a href="https://curaboticsai.com"
style="background:#0b63f6;color:#ffffff;text-decoration:none;padding:16px 28px;border-radius:10px;font-size:18px;font-weight:bold;display:inline-block;">
Visit Website
</a>

</td>
</tr>
</table>

<p style="margin-top:32px;color:#4b5563;font-size:16px;line-height:1.8;">
We're building solutions that connect healthcare with intelligent technology worldwide.
Thank you for joining us early.
</p>

<p style="margin-top:20px;font-size:16px;font-weight:bold;color:#111827;">
— Founder, CuraBotics AI
</p>

</td>
</tr>

<tr>
<td style="background:#111827;padding:28px;text-align:center;">
<p style="margin:0;color:#ffffff;font-size:22px;font-weight:bold;">
CuraBotics AI
</p>

<p style="margin:10px 0 0;color:#9ca3af;font-size:14px;">
Building the bridge between healthcare and innovation.
</p>

<p style="margin:18px 0 0;">
<a href="https://curaboticsai.com" style="color:#60a5fa;text-decoration:none;">Website</a>
&nbsp; | &nbsp;
<a href="https://linkedin.com/company/curaboticsai" style="color:#60a5fa;text-decoration:none;">LinkedIn</a>
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email?.trim().toLowerCase();
    console.log("📬 Newsletter API — Subscriber email:", email);

    /* ---------- Email validation ---------- */
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    /* ---------- Resend Setup ---------- */
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY is not set in environment variables.");
      return NextResponse.json(
        { success: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const SENDER = "CuraBotics AI <onboarding@resend.dev>";
    const ADMIN_EMAIL = "saqibahmadbhat885@gmail.com";

    /* ---------- Send notification email to Admin ---------- */
    console.log("📤 Sending admin notification about new subscriber...");
    const adminResult = await resend.emails.send({
      from: SENDER,
      to: [ADMIN_EMAIL],
      subject: `📬 New Newsletter Subscriber — ${email}`,
      html: `<h2>New Subscriber</h2><p><strong>Email:</strong> ${email}</p><p><strong>Time:</strong> ${new Date().toLocaleString()}</p>`,
    });
    console.log("✅ Admin notification result:", JSON.stringify(adminResult, null, 2));

    if (adminResult.error) {
      console.error("❌ Resend admin notification error:", adminResult.error);
      return NextResponse.json(
        { success: false, error: "Subscription failed. Please try again later." },
        { status: 500 }
      );
    }

    /* ---------- Send Premium Welcome Email to Subscriber ---------- */
    console.log("📤 Sending welcome email to subscriber:", email);
    const subscriberResult = await resend.emails.send({
      from: SENDER,
      to: [email],
      subject: "Welcome to CuraBotics AI | Future of Healthcare 🚀",
      html: buildSubscriberWelcomeHTML(),
    });
    console.log("✅ Subscriber welcome email result:", JSON.stringify(subscriberResult, null, 2));

    if (subscriberResult.error) {
      console.error("⚠️ Subscriber welcome email failed (non-critical):", subscriberResult.error);
      // Non-critical: admin already received the notification
    }

    return NextResponse.json(
      { success: true, message: "Thank you for subscribing to CuraBotics AI updates." },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Newsletter API Unexpected Error:", error);
    return NextResponse.json(
      { success: false, error: "Subscription failed. Please try again later." },
      { status: 500 }
    );
  }
}