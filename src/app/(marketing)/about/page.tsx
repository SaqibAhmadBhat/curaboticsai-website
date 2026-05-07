import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us — Our Mission & Vision",
  description:
    "CuraBotics AI is a global healthcare technology company bridging German precision engineering with AI-driven medical solutions. Discover our mission, vision, and the team behind intelligent healthcare robotics and automation.",
  alternates: { canonical: "https://curaboticsai.com/about" },
  openGraph: {
    title: "About CuraBotics AI — Our Mission & Vision",
    description:
      "Discover the mission, vision, and team behind CuraBotics AI — bridging German engineering with AI-driven healthcare technology worldwide.",
    url: "https://curaboticsai.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
