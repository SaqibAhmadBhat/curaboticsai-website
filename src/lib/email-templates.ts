// Generate standard HTML boilerplate with consistent styling
const getBaseTemplate = (title: string, preheader: string, content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9fb; color: #1f2937; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); }
    .header { padding: 32px 40px; background-color: #f0fdf4; text-align: center; border-bottom: 1px solid #e5e7eb; }
    .content { padding: 40px; }
    .footer { padding: 24px 40px; background-color: #f8fafc; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e5e7eb; }
    h1 { margin: 0 0 16px; font-size: 24px; font-weight: 700; color: #0f172a; }
    p { margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #334155; }
    .btn { display: inline-block; padding: 14px 28px; background-color: #10b981; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px; margin: 8px 0; transition: background-color 0.2s; }
    .btn:hover { background-color: #059669; }
    .preheader { display: none; max-height: 0px; overflow: hidden; }
  </style>
</head>
<body>
  <div class="preheader">${preheader}</div>
  <div class="container">
    <div class="header">
      <h2 style="margin:0; color: #10b981; font-size: 28px; font-weight: 800; tracking: -0.5px;">CuraBotics AI</h2>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p style="margin: 0 0 8px;">&copy; ${new Date().getFullYear()} CuraBotics AI. All rights reserved.</p>
      <p style="margin: 0;">You are receiving this email because you subscribed to updates at curabotics.com</p>
    </div>
  </div>
</body>
</html>
`;

export function getOptInEmailTemplate(confirmUrl: string, email: string): string {
  const content = `
    <h1>Confirm your subscription</h1>
    <p>Hi there,</p>
    <p>Thank you for subscribing to CuraBotics AI updates! We need to verify that you requested this subscription for <strong>${email}</strong>.</p>
    <p>Please click the button below to confirm your subscription and start receiving our latest healthcare technology and procurement insights.</p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${confirmUrl}" class="btn">Confirm Subscription</a>
    </div>
    <p style="font-size: 14px; color: #64748b; margin-bottom: 0;">Or copy and paste this link into your browser:<br><a href="${confirmUrl}" style="color: #10b981;">${confirmUrl}</a></p>
  `;
  return getBaseTemplate("Confirm your subscription", "Action required: Confirm your CuraBotics AI newsletter subscription", content);
}

export function getWelcomeEmailTemplate(): string {
  const content = `
    <h1>Welcome to CuraBotics AI! 🚀</h1>
    <p>Your subscription is confirmed. We are thrilled to have you here.</p>
    <p>You will now receive our exclusive updates regarding the latest advancements in AI-driven healthcare, intelligent procurement solutions, and upcoming CuraBotics features.</p>
    <p>If you're looking to learn more about how our platform transforms medical equipment management, feel free to explore our website.</p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="https://curabotics.com" class="btn">Explore CuraBotics AI</a>
    </div>
  `;
  return getBaseTemplate("Welcome to CuraBotics AI", "Your subscription is confirmed. Welcome aboard!", content);
}

export function getAdminNotificationTemplate(email: string): string {
  const content = `
    <h1>New Newsletter Subscriber</h1>
    <p>A new user has requested to join the newsletter.</p>
    <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
      <p style="margin: 0;"><strong>Subscriber:</strong> ${email}</p>
      <p style="margin: 8px 0 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    </div>
    <p>Note: They have been sent the double opt-in confirmation link.</p>
  `;
  return getBaseTemplate("New Newsletter Subscriber", `New subscriber: ${email}`, content);
}
