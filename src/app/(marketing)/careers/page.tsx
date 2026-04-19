import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Join the Healthcare AI Revolution",
  description:
    "Join CuraBotics AI — explore career opportunities in healthcare robotics, artificial intelligence, medical technology, software engineering, and innovation. Help us build the future of healthcare.",
  alternates: {
    canonical: "https://curaboticsai.com/careers",
  },
  openGraph: {
    title: "Careers at CuraBotics AI — Healthcare Technology Jobs",
    description:
      "Join a global healthcare technology startup. Open positions in AI, robotics, medical technology, and engineering.",
    url: "https://curaboticsai.com/careers",
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Careers at CuraBotics AI
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
          Build the future of healthcare with us. We're looking for talented
          engineers, researchers, and innovators who want to revolutionise
          medical technology through AI and robotics.
        </p>
      </div>
    </section>
  );
}
