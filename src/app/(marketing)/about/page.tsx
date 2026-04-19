import type { Metadata } from "next";
import { FounderPreview } from "@/components/sections/home/FounderPreview";

export const metadata: Metadata = {
  title: "About Us — Our Mission & Vision",
  description:
    "Learn about CuraBotics AI — a global healthcare technology company bridging German precision engineering with AI-driven medical solutions. Discover our mission, vision, founding story, and the team behind intelligent healthcare robotics and automation.",
  alternates: {
    canonical: "https://curaboticsai.com/about",
  },
  openGraph: {
    title: "About CuraBotics AI — Our Mission & Team",
    description:
      "Discover the mission, vision, and team behind CuraBotics AI — bridging German engineering with AI-driven healthcare technology worldwide.",
    url: "https://curaboticsai.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <FounderPreview />
    </div>
  );
}
