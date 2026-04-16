"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("divide-y divide-[hsl(var(--border))] rounded-xl border border-[hsl(var(--border))]", className)}>
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-[hsl(var(--muted))]"
          >
            {item.title}
            <span className={cn("transition-transform", openIndex === i && "rotate-180")}>▾</span>
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4 text-sm text-[hsl(var(--muted-foreground))]">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
