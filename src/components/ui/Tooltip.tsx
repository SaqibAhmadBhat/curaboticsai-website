import { cn } from "@/lib/cn";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  className?: string;
}

export function Tooltip({ children, text, className }: TooltipProps) {
  return (
    <div className={cn("group relative inline-block", className)}>
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-[hsl(var(--foreground))] px-2 py-1 text-xs text-[hsl(var(--background))] opacity-0 transition-opacity group-hover:opacity-100">
        {text}
      </span>
    </div>
  );
}
