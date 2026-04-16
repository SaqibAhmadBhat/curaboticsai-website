import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="font-heading text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
      >
        Go Home
      </Link>
    </main>
  );
}
