import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "CuraBotics AI Terms of Service — the terms and conditions governing your use of our website and healthcare technology services.",
  alternates: { canonical: "https://curaboticsai.com/terms" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "8 May 2025";

export default function TermsPage() {
  return (
    <main className="overflow-x-hidden pt-28 pb-20">
      <Container className="max-w-3xl">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-foreground mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-[15px] leading-relaxed text-muted-foreground [&_h2]:text-foreground [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-3 [&_a]:text-primary [&_a]:underline-offset-2 [&_a]:hover:opacity-80 [&_ul]:pl-5 [&_li]:mb-1">

          <p>
            Welcome to CuraBotics AI (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). By accessing or using our website at{" "}
            <a href="https://curaboticsai.com">curaboticsai.com</a> and any associated services, you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). Please read them carefully.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing our website, submitting enquiries, or engaging our services, you confirm that you are at least 18 years old and have the legal authority to enter into these Terms on behalf of yourself or your organisation.
          </p>

          <h2>2. Description of Services</h2>
          <p>CuraBotics AI provides:</p>
          <ul>
            <li>Medical equipment procurement consultation and facilitation.</li>
            <li>Healthcare AI automation and robotics advisory services.</li>
            <li>Hospital infrastructure and technology consulting.</li>
            <li>Manufacturer-hospital connection and partnership management.</li>
            <li>Informational content and newsletter services.</li>
          </ul>
          <p>
            All services are subject to separate engagement agreements where applicable. The information on our website is for general informational purposes only and does not constitute a binding offer.
          </p>

          <h2>3. Use of the Website</h2>
          <p>You agree to use our website only for lawful purposes and in a manner that does not:</p>
          <ul>
            <li>Infringe any applicable laws or regulations.</li>
            <li>Harm, abuse, or harass other users or third parties.</li>
            <li>Transmit any viruses, malware, or harmful code.</li>
            <li>Attempt to gain unauthorised access to our systems.</li>
            <li>Scrape, crawl, or harvest data without express written permission.</li>
          </ul>

          <h2>4. Contact Forms and Enquiries</h2>
          <p>
            When you submit a contact form or consultation request, you authorise CuraBotics AI to contact you via email and WhatsApp regarding your enquiry. We will not use your contact information for unrelated marketing without your consent.
          </p>

          <h2>5. Newsletter</h2>
          <p>
            Our newsletter service requires double opt-in confirmation. You may unsubscribe at any time by clicking the unsubscribe link in any newsletter email or by contacting us directly. We will not share your email address with third parties for marketing purposes.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content on this website — including text, graphics, logos, images, and software — is the property of CuraBotics AI or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            Our website and services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the website will be uninterrupted, error-free, or free of viruses.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, CuraBotics AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability, in any case, shall not exceed the amount paid by you (if any) for the specific service giving rise to the claim in the 12 months preceding the claim.
          </p>

          <h2>9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. These are provided for convenience only. We have no control over third-party content and accept no responsibility for their content, privacy practices, or availability.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of India and, where applicable, the laws of the Federal Republic of Germany and the European Union. Any disputes shall be subject to the jurisdiction of competent courts in the applicable jurisdiction.
          </p>

          <h2>11. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Material changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of our website after such changes constitutes acceptance of the revised Terms.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:<br />
            <strong>CuraBotics AI</strong><br />
            Email: <a href="mailto:er.swt.saqibahmad@gmail.com">er.swt.saqibahmad@gmail.com</a><br />
            WhatsApp: <a href="https://wa.me/917006557535">+91 7006557535</a>
          </p>
        </div>
      </Container>
    </main>
  );
}
