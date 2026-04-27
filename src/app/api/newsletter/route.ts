import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

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
We’re building solutions that connect healthcare with intelligent technology worldwide.
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
<a href="https://linkedin.com" style="color:#60a5fa;text-decoration:none;">LinkedIn</a>
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

    /* ---------- Email validation ---------- */
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email?.trim() || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Missing Gmail credentials in environment variables.");
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    const transporter = createTransporter();
    const BRAND_EMAIL = process.env.GMAIL_USER;
    const ADMIN_EMAIL = process.env.TO_EMAIL || process.env.GMAIL_USER;

    /* ---------- Send notification email to Admin ---------- */
    await transporter.sendMail({
      from: `"CuraBotics AI" <${BRAND_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `📬 New Newsletter Subscriber — ${email}`,
      html: `<h2>New Subscriber</h2><p><strong>Email:</strong> ${email}</p><p><strong>Time:</strong> ${new Date().toLocaleString()}</p>`
    });

    /* ---------- Send Premium Welcome Email to Subscriber ---------- */
    await transporter.sendMail({
      from: `"CuraBotics AI" <${BRAND_EMAIL}>`,
      to: email,
      subject: "Welcome to CuraBotics AI | Future of Healthcare 🚀",
      html: buildSubscriberWelcomeHTML()
    });

    return NextResponse.json(
      { success: true, message: "Thank you for subscribing to CuraBotics AI updates." },
      { status: 200 }
    );
  } catch (error) {
    console.error("NEWSLETTER ERROR:", error);
    return NextResponse.json(
      { error: "Subscription failed. Please try again later." },
      { status: 500 }
    );
  }
}