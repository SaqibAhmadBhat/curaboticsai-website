import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/sections/services/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services — Healthcare AI, Robotics & Medical Procurement",
  description:
    "Explore CuraBotics AI services: medical equipment procurement, AI-powered hospital automation, healthcare robotics integration, and strategic consulting for hospitals and clinics worldwide.",
  alternates: { canonical: "https://curaboticsai.com/services" },
  openGraph: {
    title: "CuraBotics AI Services — Healthcare Technology Solutions",
    description:
      "End-to-end healthcare technology services: medical equipment procurement, AI automation, robotics integration, and hospital consulting.",
    url: "https://curaboticsai.com/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
