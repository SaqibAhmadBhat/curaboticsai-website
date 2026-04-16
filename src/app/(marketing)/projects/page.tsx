import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Discover CuraBotics AI projects — real-world applications of intelligent robotics in healthcare.",
};

export default function ProjectsPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Our Projects
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
          Innovative solutions powering the future of healthcare.
        </p>
      </div>
    </section>
  );
}
