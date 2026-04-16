import { cn } from "@/lib/cn";

export function Separator({ className }: { className?: string }) {
  return <hr className={cn("border-t border-[hsl(var(--border))]", className)} />;
}
