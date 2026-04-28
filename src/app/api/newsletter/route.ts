import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSubscriberByEmail, addPendingSubscriber, updateSubscriberToken } from "@/lib/newsletter-db";
import { getOptInEmailTemplate, getAdminNotificationTemplate } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

// Basic in-memory rate limiting
const rateLimits = new Map<string, number>();

export async function POST(req: Request) {
  try {
    // Basic Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const limit = 5; // max 5 requests per minute per IP
    
    if (ip !== "unknown") {
      const userRequests = rateLimits.get(ip) || 0;
      if (userRequests >= limit) {
        return NextResponse.json({ success: false, message: "Too many requests. Please try again later." }, { status: 429 });
      }
      rateLimits.set(ip, userRequests + 1);
      setTimeout(() => rateLimits.set(ip, (rateLimits.get(ip) || 1) - 1), windowMs);
    }

    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return NextResponse.json(
        { success: false, message: "Invalid request payload" },
        { status: 400 }
      );
    }

    const email = body?.email?.toLowerCase().trim();

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "A valid email is required" },
        { status: 400 }
      );
    }

    // Check existing subscriber
    const existingSubscriber = await getSubscriberByEmail(email);
    let token: string;
    
    if (existingSubscriber) {
      if (existingSubscriber.status === 'subscribed') {
        return NextResponse.json(
          { success: false, message: "This email is already subscribed." },
          { status: 400 }
        );
      } else {
        // Refresh token if pending
        token = await updateSubscriberToken(email);
      }
    } else {
      // Add new pending subscriber
      token = await addPendingSubscriber(email, "website");
    }

    // Build confirm URL
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const confirmUrl = `${origin}/api/newsletter/confirm?token=${token}`;

    // Send Double Opt-In Email
    const resendResponse = await resend.emails.send({
      from: "CuraBotics AI <onboarding@resend.dev>",
      to: email, // Sending to the user
      subject: "Action Required: Confirm your subscription",
      html: getOptInEmailTemplate(confirmUrl, email),
    });

    if (resendResponse.error) {
      console.error("RESEND API ERROR (Opt-In):", resendResponse.error);
      return NextResponse.json(
        { success: false, message: "Failed to send confirmation email. Please try again later." },
        { status: 500 }
      );
    }

    // Send Admin Notification (Non-blocking)
    resend.emails.send({
      from: "CuraBotics AI <onboarding@resend.dev>",
      to: "saqibahmadbhat885@gmail.com",
      subject: "🔔 New Newsletter Subscriber (Pending)",
      html: getAdminNotificationTemplate(email),
    }).catch(err => console.error("Admin notification failed:", err));

    return NextResponse.json({
      success: true,
      message: "Please check your email to confirm your subscription.",
    });

  } catch (error: any) {
    console.error("NEWSLETTER ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}