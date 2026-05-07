import type { Metadata } from "next";
import { CareersPageContent } from "@/components/sections/careers/CareersPageContent";

export const metadata: Metadata = {
  title: "Careers — Join the Healthcare AI Revolution",
  description:
    "Join CuraBotics AI — explore opportunities in healthcare AI, robotics, medical technology, business development, and engineering. Help build the future of global healthcare.",
  alternates: { canonical: "https://curaboticsai.com/careers" },
  openGraph: {
    title: "Careers at CuraBotics AI — Healthcare Technology Jobs",
    description:
      "Join a global healthcare technology company. Open roles in AI, robotics, medical procurement, and engineering.",
    url: "https://curaboticsai.com/careers",
    type: "website",
  },
};

export default function CareersPage() {
  return <CareersPageContent />;
}
