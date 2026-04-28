import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSubscriberByEmail, addPendingSubscriber, updateSubscriberToken } from "@/lib/newsletter-db";
import { getOptInEmailTemplate, getAdminNotificationTemplate } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimits = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowMs = 60 * 1000;
    const limit = 5;
    
    if (ip !== "unknown") {
      const userLimit = rateLimits.get(ip);
      if (userLimit && now - userLimit.timestamp < windowMs) {
        if (userLimit.count >= limit) {
          return NextResponse.json({ success: false, message: "Too many requests. Please try again later." }, { status: 429 });
        }
        rateLimits.set(ip, { count: userLimit.count + 1, timestamp: userLimit.timestamp });
      } else {
        rateLimits.set(ip, { count: 1, timestamp: now });
      }
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, message: "Invalid request payload" }, { status: 400 });
    }

    const email = body?.email?.toLowerCase().trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "A valid email is required" }, { status: 400 });
    }

    const existingSubscriber = await getSubscriberByEmail(email);
    let token: string;
    
    if (existingSubscriber) {
      if (existingSubscriber.status === 'subscribed') {
        return NextResponse.json({ success: false, message: "This email is already subscribed." }, { status: 400 });
      }
      token = await updateSubscriberToken(email);
    } else {
      token = await addPendingSubscriber(email, "website");
    }

    const origin = req.headers.get('origin') || 'https://curaboticsai.com';
    const confirmUrl = `${origin}/api/newsletter/confirm?token=${token}`;

    const resendResponse = await resend.emails.send({
      from: "CuraBotics AI <hello@curaboticsai.com>",
      to: email,
      subject: "Action Required: Confirm your subscription",
      html: getOptInEmailTemplate(confirmUrl, email),
    });

    if (resendResponse.error) {
      return NextResponse.json({ success: false, message: "Failed to send confirmation email. Please try again later." }, { status: 500 });
    }

    resend.emails.send({
      from: "CuraBotics AI <hello@curaboticsai.com>",
      to: "saqibahmadbhat885@gmail.com",
      subject: "🔔 New Newsletter Subscriber (Pending)",
      html: getAdminNotificationTemplate(email),
    }).catch(() => null);

    return NextResponse.json({ success: true, message: "Please check your email to confirm your subscription." });

  } catch (error) {
    return NextResponse.json({ success: false, message: "An unexpected error occurred. Please try again later." }, { status: 500 });
  }
}