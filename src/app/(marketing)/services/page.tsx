import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore CuraBotics AI services — medical robotics, AI automation, computer vision, and healthcare consulting.",
};

export default function ServicesPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Our Services
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
          End-to-end AI and robotics solutions for the healthcare industry.
        </p>
      </div>
    </section>
  );
}
