import Link from "next/link";
import { cn } from "@/lib/cn";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav className={cn("flex text-sm text-[hsl(var(--muted-foreground))]", className)} aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span>/</span>}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-[hsl(var(--foreground))]">
                {item.label}
              </Link>
            ) : (
              <span className="text-[hsl(var(--foreground))]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
