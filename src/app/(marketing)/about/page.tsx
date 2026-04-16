import type { Metadata } from "next";
import { FounderPreview } from "@/components/sections/home/FounderPreview";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about CuraBotics AI — our mission, vision, and the team behind intelligent healthcare robotics.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <FounderPreview />
    </div>
  );
}
