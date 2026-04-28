import { NextResponse } from "next/server";
import { Resend } from "resend";
import { confirmSubscriber } from "@/lib/newsletter-db";
import { getWelcomeEmailTemplate } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const htmlResponse = (title: string, message: string, success: boolean) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | CuraBotics AI</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: white; padding: 48px 40px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); text-align: center; max-width: 400px; width: 100%; }
    .icon { width: 64px; height: 64px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; }
    .icon.success { background-color: #d1fae5; color: #10b981; }
    .icon.error { background-color: #fee2e2; color: #ef4444; }
    h1 { margin: 0 0 16px; font-size: 24px; color: #0f172a; }
    p { margin: 0 0 32px; color: #64748b; line-height: 1.5; }
    .btn { display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; transition: background-color 0.2s; }
    .btn:hover { background-color: #059669; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon ${success ? 'success' : 'error'}">
      ${success ? 
        '<svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : 
        '<svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
      }
    </div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="/" class="btn">Return to Website</a>
  </div>
</body>
</html>
`;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new NextResponse(
        htmlResponse("Invalid Link", "The confirmation link is invalid or is missing a token.", false),
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    const subscriber = await confirmSubscriber(token);

    if (!subscriber) {
      return new NextResponse(
        htmlResponse("Invalid Link", "We could not find a pending subscription for this link. It may have expired.", false),
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    // Attempt to send welcome email (don't block the UI response if this fails)
    resend.emails.send({
      from: "CuraBotics AI <onboarding@resend.dev>",
      to: subscriber.email,
      subject: "Welcome to CuraBotics AI!",
      html: getWelcomeEmailTemplate(),
    }).catch(err => console.error("Welcome email failed to send:", err));

    return new NextResponse(
      htmlResponse(
        "Subscription Confirmed!", 
        "Thank you! Your email has been verified and your subscription is active.", 
        true
      ),
      { status: 200, headers: { "Content-Type": "text/html" } }
    );

  } catch (error) {
    console.error("CONFIRMATION ERROR:", error);
    return new NextResponse(
      htmlResponse("System Error", "An error occurred while confirming your subscription. Please try again later.", false),
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}
