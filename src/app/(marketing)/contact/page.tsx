import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/home/ContactCta";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch",
  description:
    "Contact CuraBotics AI for healthcare technology consultations, medical equipment procurement enquiries, partnership opportunities, or general questions. Reach our team via email, WhatsApp, or the contact form.",
  alternates: {
    canonical: "https://curaboticsai.com/contact",
  },
  openGraph: {
    title: "Contact CuraBotics AI — Healthcare Technology Enquiries",
    description:
      "Get in touch with CuraBotics AI for healthcare procurement, AI automation, and partnership enquiries. Email, WhatsApp, or contact form available.",
    url: "https://curaboticsai.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactCta />
    </div>
  );
}
