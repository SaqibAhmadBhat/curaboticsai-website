import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "er.swt.saqibahmad@gmail.com";

/* ------------------------------------------------------------------ */
/*  Build Admin Email HTML                                           */
/* ------------------------------------------------------------------ */
function buildAdminHTML(data: Record<string, any>) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;background:#fff;border:1px solid #eee;border-radius:12px;overflow:hidden">
    <div style="background:#0b63f6;padding:24px;color:#fff">
      <h2 style="margin:0;">🏥 New Enterprise Inquiry</h2>
      <p style="margin:8px 0 0;">Submitted via CuraBotics AI website</p>
    </div>

    <div style="padding:24px;">
      <table width="100%" cellspacing="0" cellpadding="8" style="border-collapse:collapse;">
        <tr><td><b>Name</b></td><td>${data.fullName}</td></tr>
        <tr><td><b>Company</b></td><td>${data.companyName}</td></tr>
        <tr><td><b>Email</b></td><td>${data.email}</td></tr>
        <tr><td><b>Phone</b></td><td>${data.phone}</td></tr>
        <tr><td><b>Country</b></td><td>${data.country}</td></tr>
        <tr><td><b>City</b></td><td>${data.city}</td></tr>
        <tr><td><b>Organization Type</b></td><td>${data.orgType}</td></tr>
        <tr><td><b>Intent</b></td><td>${data.intent}</td></tr>
        <tr><td><b>Equipment Needed</b></td><td>${data.equipmentNeeded || "N/A"}</td></tr>
        <tr><td><b>Assistance</b></td><td>${Array.isArray(data.assistance) ? data.assistance.join(", ") : data.assistance}</td></tr>
      </table>

      <div style="margin-top:20px;padding:16px;background:#f8fafc;border-radius:10px;">
        <b>Project Details</b>
        <p>${data.projectDetails}</p>
      </div>
    </div>
  </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  Build Client Auto-Reply Email HTML                               */
/* ------------------------------------------------------------------ */
function buildClientHTML(name: string) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#eef4fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
<tr>
<td align="center">

<table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);">

<tr>
<td style="background:linear-gradient(135deg,#0b63f6,#00b8ff);padding:34px;text-align:center;">
<h1 style="margin:0;color:#fff;">CuraBotics AI</h1>
<p style="margin:10px 0 0;color:#eaf7ff;">Healthcare Technology • Robotics • Global Solutions</p>
</td>
</tr>

<tr>
<td style="padding:34px;">

<h2 style="margin-top:0;">Thank You, ${name} 👋</h2>

<p style="font-size:16px;line-height:1.8;color:#4b5563;">
We have successfully received your consultation request.
Our team will review your inquiry and contact you shortly.
</p>

<p style="font-size:16px;line-height:1.8;color:#4b5563;">
At CuraBotics AI, we help organizations with:
</p>

<ul style="color:#111827;line-height:1.8;">
<li>Medical Equipment Procurement</li>
<li>Healthcare AI Solutions</li>
<li>Hospital Technology Integration</li>
<li>Strategic Global Partnerships</li>
</ul>

<div style="text-align:center;margin-top:28px;">
<a href="https://curaboticsai.com"
style="background:#0b63f6;color:#fff;text-decoration:none;padding:14px 28px;border-radius:10px;display:inline-block;font-weight:bold;">
Visit Website
</a>
</div>

<p style="margin-top:30px;color:#6b7280;">
Regards,<br>
CuraBotics AI Team
</p>

</td>
</tr>

<tr>
<td style="background:#111827;color:#d1d5db;text-align:center;padding:22px;">
Global Healthcare Innovation
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

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();

    const {
      fullName,
      companyName,
      email,
      phone,
      country,
      city,
      orgType,
      assistance,
      equipmentNeeded,
      intent,
      projectDetails,
    } = body;

    /* ---------- Validation ---------- */
    const missing: string[] = [];
    if (!fullName?.trim()) missing.push("Full Name");
    if (!companyName?.trim()) missing.push("Company");
    if (!phone?.trim()) missing.push("Phone");
    if (!country?.trim()) missing.push("Country");
    if (!city?.trim()) missing.push("City");
    if (!orgType) missing.push("Organization Type");
    if (!intent) missing.push("Intent");
    if (!projectDetails?.trim()) missing.push("Project Details");
    if (!assistance || (Array.isArray(assistance) && assistance.length === 0))
      missing.push("Assistance Needed");

    /* Email validation */
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email?.trim() || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    /* ---------- Send Admin Notification Email ---------- */
    const { error: adminError } = await resend.emails.send({
      from: "CuraBotics AI <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      reply_to: email,
      subject: `🏥 Enterprise Inquiry — ${companyName} (${orgType})`,
      html: buildAdminHTML(body),
    });

    if (adminError) {
      console.error("Resend API Admin Contact Error:", adminError);
      return NextResponse.json(
        { error: "Failed to send inquiry via Resend API. Please try again later." },
        { status: 500 }
      );
    }

    /* ---------- Send Client Confirmation Email ---------- */
    // Note: To send emails directly to subscribers via Resend, your domain must be verified.
    const { error: clientError } = await resend.emails.send({
      from: "CuraBotics AI <onboarding@resend.dev>",
      to: [email],
      subject: "Your Consultation Request Has Been Received | CuraBotics AI",
      html: buildClientHTML(fullName),
    });

    if (clientError) {
      console.error("Resend API Client Contact Error:", clientError);
    }

    return NextResponse.json(
      { success: true, message: "Consultation inquiry submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    // We log the unexpected error server-side to avoid leaking any internal stack trace to the frontend
    console.error("Contact API Unexpected Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}