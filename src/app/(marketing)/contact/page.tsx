import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/home/ContactCta";

export const metadata: Metadata = {
  title: "Contact",
  description: "Enterprise Healthcare Consultation - Procure advanced medical equipment, connect with global manufacturers, or integrate AI automation with CuraBotics AI.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactCta />
    </div>
  );
}
