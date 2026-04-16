export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-[hsl(var(--border))] lg:block">
      <div className="sticky top-20 p-6">{children}</div>
    </aside>
  );
}
