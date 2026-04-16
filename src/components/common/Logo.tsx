import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="font-heading text-xl font-bold tracking-tight text-brand-600">
        Cura<span className="text-[hsl(var(--foreground))]">Botics</span>
      </span>
      <span className="rounded bg-brand-600 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
        AI
      </span>
    </Link>
  );
}
