import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join CuraBotics AI — explore open positions in robotics, AI, and healthcare technology.",
};

export default function CareersPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Careers
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
          Build the future of healthcare with us.
        </p>
      </div>
    </section>
  );
}
