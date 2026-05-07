import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSubscriberByEmail, addPendingSubscriber, updateSubscriberToken } from "@/lib/newsletter-db";
import { getOptInEmailTemplate, getAdminNotificationTemplate } from "@/lib/email-templates";

/* ─── Resend client ─────────────────────────────────────────────────── */
const resend = new Resend(process.env.RESEND_API_KEY);

/* ─── Simple in-memory rate limiter (per-IP, per process) ──────────── */
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;   // 1 minute
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) return true;

  entry.count++;
  return false;
}

/* ─── POST /api/newsletter ──────────────────────────────────────────── */
export async function POST(req: Request) {
  try {
    /* ── 1. Rate limiting ────────────────────────────────────────────── */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (ip !== "unknown" && isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    /* ── 2. Parse body ───────────────────────────────────────────────── */
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request payload." },
        { status: 400 }
      );
    }

    /* ── 3. Validate email ───────────────────────────────────────────── */
    const rawEmail = (body as Record<string, unknown>)?.email;
    if (typeof rawEmail !== "string" || !rawEmail.trim()) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    const email = rawEmail.toLowerCase().trim();
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    /* ── 4. Check existing subscriber ───────────────────────────────── */
    let token: string;

    const existing = await getSubscriberByEmail(email);

    if (existing) {
      if (existing.status === "subscribed") {
        return NextResponse.json(
          { success: false, message: "This email is already subscribed to our newsletter." },
          { status: 409 }
        );
      }
      // Re-send confirmation for pending subscriber
      token = await updateSubscriberToken(email);
    } else {
      token = await addPendingSubscriber(email, "website");
    }

    /* ── 5. Build confirmation URL ───────────────────────────────────── */
    const origin =
      req.headers.get("origin") ||
      req.headers.get("referer")?.replace(/\/$/, "") ||
      "https://curaboticsai.com";

    const confirmUrl = `${origin}/api/newsletter/confirm?token=${token}`;

    /* ── 6. Send opt-in confirmation email ───────────────────────────── */
    const { error: sendError } = await resend.emails.send({
      from: "CuraBotics AI <onboarding@resend.dev>",
      to: email,
      subject: "Confirm your CuraBotics AI newsletter subscription",
      html: getOptInEmailTemplate(confirmUrl, email),
    });

    if (sendError) {
      console.error("[newsletter] Resend send error:", sendError);
      return NextResponse.json(
        { success: false, message: "Failed to send confirmation email. Please try again later." },
        { status: 500 }
      );
    }

    /* ── 7. Fire-and-forget admin notification ───────────────────────── */
    resend.emails
      .send({
        from: "CuraBotics AI <onboarding@resend.dev>",
        to: "saqibahmadbhat885@gmail.com",
        subject: "🔔 New Newsletter Subscriber (Pending Confirmation)",
        html: getAdminNotificationTemplate(email),
      })
      .catch((err) => console.error("[newsletter] Admin notification failed:", err));

    /* ── 8. Success ──────────────────────────────────────────────────── */
    return NextResponse.json(
      {
        success: true,
        message:
          "Please check your inbox and click the confirmation link to complete your subscription.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[newsletter] Unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}