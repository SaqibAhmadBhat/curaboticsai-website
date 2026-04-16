"use client";

export function ThemeToggle() {
  // TODO: Integrate with ThemeProvider context
  return (
    <button
      className="rounded-md p-2 text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
      aria-label="Toggle theme"
    >
      🌓
    </button>
  );
}
