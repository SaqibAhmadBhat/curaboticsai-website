import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "er.swt.saqibahmad@gmail.com";

/* ------------------------------------------------------------------ */
/*  Nodemailer transporter — Gmail App Password                        */
/*  Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local                */
/* ------------------------------------------------------------------ */
function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER || RECIPIENT_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD || "",
    },
  });
}

/* ------------------------------------------------------------------ */
/*  Build a professional HTML email template                           */
/* ------------------------------------------------------------------ */
function buildEmailHTML(data: Record<string, string | string[]>) {
  const rows = [
    { label: "Full Name", value: data.fullName },
    { label: "Company / Organization", value: data.companyName },
    { label: "Email Address", value: data.email },
    { label: "Phone / WhatsApp", value: data.phone },
    { label: "Country", value: data.country },
    { label: "City / Location", value: data.city },
    { label: "Organization Type", value: data.orgType },
    {
      label: "Assistance Needed",
      value: Array.isArray(data.assistance)
        ? data.assistance.join(", ")
        : data.assistance,
    },
    { label: "Intent", value: data.intent },
    { label: "Equipment / Technology", value: data.equipmentNeeded || "N/A" },
  ];

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:640px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08)">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a73b5 0%,#155a8a 100%);padding:28px 32px">
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700">🏥 CuraBotics AI — New Enterprise Inquiry</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,.85);font-size:14px">Submitted via website consultation form</p>
    </div>
    <!-- Body -->
    <div style="padding:28px 32px">
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            (r) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#6b7280;font-size:13px;font-weight:600;width:180px;vertical-align:top">${r.label}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#1f2937;font-size:14px">${r.value || "—"}</td>
        </tr>`
          )
          .join("")}
      </table>
      <!-- Project Details -->
      <div style="margin-top:20px;padding:16px;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb">
        <p style="margin:0 0 8px;color:#6b7280;font-size:13px;font-weight:600">📋 Project Details / Requirements</p>
        <p style="margin:0;color:#1f2937;font-size:14px;white-space:pre-wrap;line-height:1.6">${data.projectDetails || "—"}</p>
      </div>
    </div>
    <!-- Footer -->
    <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center">
      <p style="margin:0;color:#9ca3af;font-size:12px">CuraBotics AI — Global Healthcare Technology Solutions & Procurement</p>
    </div>
  </div>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  POST handler                                                       */
/* ------------------------------------------------------------------ */
export async function POST(request: Request) {
  try {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email?.trim() || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    /* ---------- Send email ---------- */
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `"CuraBotics AI" <${process.env.GMAIL_USER || RECIPIENT_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `🏥 Enterprise Inquiry — ${companyName} (${orgType})`,
      html: buildEmailHTML(body),
    });

    return NextResponse.json(
      { success: true, message: "Consultation inquiry submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
