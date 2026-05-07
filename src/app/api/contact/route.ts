import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ─── Rate limiter ───────────────────────────────────────────────────── */
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

/* ─── POST /api/contact ─────────────────────────────────────────────── */
export async function POST(req: Request) {
  try {
    /* Rate limit */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (ip !== "unknown" && isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait and try again." },
        { status: 429 }
      );
    }

    /* Parse body */
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    /* Extract and validate all fields — matching the form's payload shape */
    const fullName       = String(body.fullName       ?? "").trim();
    const companyName    = String(body.companyName    ?? "").trim();
    const email          = String(body.email          ?? "").trim().toLowerCase();
    const phone          = String(body.phone          ?? "").trim();
    const country        = String(body.country        ?? "").trim();
    const city           = String(body.city           ?? "").trim();
    const orgType        = String(body.orgType        ?? "").trim();
    const intent         = String(body.intent         ?? "").trim();
    const equipmentNeeded= String(body.equipmentNeeded?? "").trim();
    const projectDetails = String(body.projectDetails ?? "").trim();
    const assistance: string[] = Array.isArray(body.assistance)
      ? (body.assistance as string[]).map(String)
      : [];

    /* Basic validation */
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!fullName || !companyName || !email || !phone || !country || !city) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    /* Build email HTML */
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Enterprise Inquiry — CuraBotics AI</title>
  <style>
    body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f9f9fb;color:#1f2937;}
    .wrap{max-width:640px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);}
    .header{background:linear-gradient(135deg,#0284c7,#0369a1);padding:32px 40px;text-align:center;}
    .header h1{margin:0;color:#fff;font-size:22px;font-weight:700;}
    .header p{margin:6px 0 0;color:#bae6fd;font-size:14px;}
    .body{padding:32px 40px;}
    .section{margin-bottom:24px;}
    .section h2{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;margin:0 0 12px;}
    .field{display:flex;gap:8px;margin-bottom:10px;font-size:15px;}
    .label{color:#64748b;min-width:130px;flex-shrink:0;}
    .value{color:#0f172a;font-weight:500;word-break:break-word;}
    .tags{display:flex;flex-wrap:wrap;gap:6px;}
    .tag{display:inline-block;padding:3px 10px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:999px;font-size:13px;color:#1d4ed8;}
    .details{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;font-size:15px;line-height:1.7;color:#334155;white-space:pre-wrap;}
    .footer{background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;font-size:13px;color:#94a3b8;}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>🏥 New Enterprise Inquiry</h1>
      <p>Received via CuraBotics AI — ${new Date().toLocaleString("en-GB", { timeZone: "UTC" })} UTC</p>
    </div>
    <div class="body">
      <div class="section">
        <h2>Contact Details</h2>
        <div class="field"><span class="label">Full Name</span><span class="value">${fullName}</span></div>
        <div class="field"><span class="label">Company / Org</span><span class="value">${companyName}</span></div>
        <div class="field"><span class="label">Email</span><span class="value">${email}</span></div>
        <div class="field"><span class="label">Phone / WhatsApp</span><span class="value">${phone}</span></div>
        <div class="field"><span class="label">Location</span><span class="value">${city}, ${country}</span></div>
      </div>

      <div class="section">
        <h2>Organization</h2>
        <div class="field"><span class="label">Type</span><span class="value">${orgType || "—"}</span></div>
        <div class="field"><span class="label">Assistance</span>
          <span class="value">
            <span class="tags">${
              assistance.length
                ? assistance.map((a) => `<span class="tag">${a}</span>`).join("")
                : "—"
            }</span>
          </span>
        </div>
      </div>

      <div class="section">
        <h2>Requirements</h2>
        <div class="field"><span class="label">Intent</span><span class="value">${intent || "—"}</span></div>
        <div class="field"><span class="label">Equipment / Tech</span><span class="value">${equipmentNeeded || "—"}</span></div>
      </div>

      <div class="section">
        <h2>Project Details</h2>
        <div class="details">${projectDetails || "—"}</div>
      </div>
    </div>
    <div class="footer">CuraBotics AI · curaboticsai.com · Reply to: ${email}</div>
  </div>
</body>
</html>`;

    /* Send email via Resend */
    const { error: sendError } = await resend.emails.send({
      from: "CuraBotics AI <onboarding@resend.dev>",
      to: "saqibahmadbhat885@gmail.com",
      reply_to: email,
      subject: `🏥 New Inquiry from ${fullName} — ${companyName}`,
      html,
    });

    if (sendError) {
      console.error("[contact] Resend error:", sendError);
      return NextResponse.json(
        { success: false, error: "Failed to send your inquiry. Please try again or contact us via WhatsApp." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Inquiry submitted successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}