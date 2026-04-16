import { cn } from "@/lib/cn";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent", className)} />
  );
}
