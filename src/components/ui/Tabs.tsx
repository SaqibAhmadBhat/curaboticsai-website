"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface Tab {
  label: string;
  content: React.ReactNode;
}

export function Tabs({ tabs, className }: { tabs: Tab[]; className?: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("", className)}>
      <div className="flex border-b border-[hsl(var(--border))]">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              active === i
                ? "border-b-2 border-brand-600 text-brand-600"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">{tabs[active]?.content}</div>
    </div>
  );
}
