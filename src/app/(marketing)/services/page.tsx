import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Healthcare AI, Robotics & Medical Procurement",
  description:
    "Explore CuraBotics AI services — medical equipment procurement, AI-powered hospital automation, healthcare robotics integration, computer vision diagnostics, and strategic healthcare consulting for hospitals and clinics worldwide.",
  alternates: {
    canonical: "https://curaboticsai.com/services",
  },
  openGraph: {
    title: "CuraBotics AI Services — Healthcare Technology Solutions",
    description:
      "End-to-end healthcare technology services: medical equipment procurement, AI automation, robotics integration, and hospital consulting.",
    url: "https://curaboticsai.com/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Our Services
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
          End-to-end AI, robotics, and procurement solutions powering the
          healthcare industry. From medical equipment sourcing to intelligent
          hospital automation, CuraBotics AI delivers technology that transforms
          patient care.
        </p>
      </div>
    </section>
  );
}
