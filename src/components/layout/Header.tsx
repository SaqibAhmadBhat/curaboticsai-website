interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <div className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
