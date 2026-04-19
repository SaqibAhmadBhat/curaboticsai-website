import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Healthcare Innovation Case Studies",
  description:
    "Discover CuraBotics AI projects — real-world case studies of intelligent robotics, AI automation, and medical equipment deployment in hospitals and healthcare facilities around the world.",
  alternates: {
    canonical: "https://curaboticsai.com/projects",
  },
  openGraph: {
    title: "CuraBotics AI Projects — Healthcare Innovation in Action",
    description:
      "Real-world healthcare technology implementations: robotics integration, AI automation, and medical procurement success stories.",
    url: "https://curaboticsai.com/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Our Projects
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
          Innovative healthcare technology solutions deployed worldwide.
          Explore how CuraBotics AI is transforming hospitals with robotics, AI 
          automation, and precision medical equipment procurement.
        </p>
      </div>
    </section>
  );
}
