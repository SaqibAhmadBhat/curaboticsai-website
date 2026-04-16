import { notFound } from "next/navigation";

interface CareerDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CareerDetailPageProps) {
  return {
    title: `Career — ${params.slug}`,
  };
}

export default function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { slug } = params;

  if (!slug) {
    notFound();
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight capitalize">
          {slug.replace(/-/g, " ")}
        </h1>
        <p className="mt-4 text-[hsl(var(--muted-foreground))]">
          Job details coming soon.
        </p>
      </div>
    </section>
  );
}
