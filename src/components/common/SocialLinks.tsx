export function SocialLinks() {
  const links = [
    { label: "LinkedIn", href: "#", icon: "in" },
    { label: "Twitter", href: "#", icon: "𝕏" },
    { label: "GitHub", href: "#", icon: "GH" },
  ];

  return (
    <div className="flex items-center gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] text-xs font-bold text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
