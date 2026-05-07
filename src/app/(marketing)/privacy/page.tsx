import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "CuraBotics AI Privacy Policy — learn how we collect, use, and protect your personal data in compliance with GDPR and applicable data protection laws.",
  alternates: { canonical: "https://curaboticsai.com/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "8 May 2025";

export default function PrivacyPage() {
  return (
    <main className="overflow-x-hidden pt-28 pb-20">
      <Container className="max-w-3xl">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-foreground mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-[15px] leading-relaxed text-muted-foreground [&_h2]:text-foreground [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-3 [&_a]:text-primary [&_a]:underline-offset-2 [&_a]:hover:opacity-80 [&_ul]:pl-5 [&_li]:mb-1">

          <p>
            CuraBotics AI (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your personal data. This Privacy Policy explains what data we collect, how we use it, and your rights under applicable data protection laws, including the EU General Data Protection Regulation (GDPR).
          </p>

          <h2>1. Data We Collect</h2>
          <p>We may collect the following categories of data when you interact with our website or services:</p>
          <ul>
            <li><strong>Contact information:</strong> name, email address, phone number, company name, and location — collected when you submit a consultation request or contact form.</li>
            <li><strong>Newsletter subscription:</strong> email address, collected when you subscribe to our newsletter.</li>
            <li><strong>Usage data:</strong> pages visited, time spent, browser type, IP address — collected automatically via standard web server logs and analytics tools.</li>
            <li><strong>Communications data:</strong> any content you send us via email, WhatsApp, or contact forms.</li>
          </ul>

          <h2>2. How We Use Your Data</h2>
          <ul>
            <li>To respond to your consultation requests and enquiries.</li>
            <li>To send you our newsletter (only with your explicit consent).</li>
            <li>To improve our website and services through analytics.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h2>3. Legal Basis for Processing (GDPR)</h2>
          <ul>
            <li><strong>Consent:</strong> newsletter subscriptions (you may withdraw at any time).</li>
            <li><strong>Legitimate interests:</strong> responding to business enquiries, website analytics.</li>
            <li><strong>Legal obligation:</strong> record keeping and compliance with applicable laws.</li>
          </ul>

          <h2>4. Data Sharing</h2>
          <p>
            We do not sell your personal data. We may share data with the following service providers to operate our services:
          </p>
          <ul>
            <li><strong>Resend</strong> — for transactional and newsletter email delivery.</li>
            <li><strong>Vercel</strong> — for website hosting and edge deployment.</li>
          </ul>
          <p>All service providers are contractually bound to process data only on our instructions and maintain appropriate security measures.</p>

          <h2>5. International Transfers</h2>
          <p>
            CuraBotics AI operates across India and Germany. Data may be processed in either jurisdiction. Where we transfer data outside the EEA, we ensure appropriate safeguards are in place (e.g., Standard Contractual Clauses).
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain personal data for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Newsletter subscriber data is retained until you unsubscribe. Inquiry data is retained for up to 24 months.
          </p>

          <h2>7. Your Rights</h2>
          <p>Under GDPR, you have the right to:</p>
          <ul>
            <li>Access a copy of your personal data.</li>
            <li>Correct inaccurate data.</li>
            <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;).</li>
            <li>Object to or restrict processing.</li>
            <li>Data portability.</li>
            <li>Withdraw consent at any time (without affecting prior processing).</li>
          </ul>
          <p>To exercise any of these rights, contact us at: <a href="mailto:er.swt.saqibahmad@gmail.com">er.swt.saqibahmad@gmail.com</a></p>

          <h2>8. Cookies</h2>
          <p>
            Our website uses minimal cookies — primarily for theme preference storage (localStorage) and language settings. We do not use third-party advertising cookies. Analytics data is collected in an aggregated, non-personally-identifiable form.
          </p>

          <h2>9. Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect your data, including HTTPS encryption, secure server environments, and access controls.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Material changes will be communicated via our website. Continued use of our services after changes constitute acceptance of the updated policy.
          </p>

          <h2>11. Contact</h2>
          <p>
            For any privacy-related queries or to exercise your rights, please contact:<br />
            <strong>CuraBotics AI</strong><br />
            Email: <a href="mailto:er.swt.saqibahmad@gmail.com">er.swt.saqibahmad@gmail.com</a><br />
            WhatsApp: <a href="https://wa.me/917006557535">+91 7006557535</a>
          </p>
        </div>
      </Container>
    </main>
  );
}
