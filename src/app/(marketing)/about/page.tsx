import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about CuraBotics AI — our mission, vision, and the team behind intelligent healthcare robotics.",
};

export default function AboutPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          About CuraBotics AI
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
          Bridging German precision engineering with AI-driven healthcare solutions.
        </p>
      </div>
    </section>
  );
}
