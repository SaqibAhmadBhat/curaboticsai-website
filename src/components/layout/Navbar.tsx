"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConsultation } from "@/contexts/ConsultationContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { t } = useLanguage();
  const { openConsultation } = useConsultation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const NAV_LINKS = [
    { name: t("navbar.home"), href: "/" },
    {
      name: t("navbar.solutions"),
      href: "#services",
      children: [
        { name: t("navbar.solAI"), href: "#services" },
        { name: t("navbar.solProcurement"), href: "#equipment" },
        { name: t("navbar.solRobotics"), href: "#services" },
        { name: t("navbar.solInfra"), href: "#services" },
      ],
    },
    { name: t("navbar.equipment"), href: "#equipment" },
    { name: t("navbar.industries"), href: "#industries" },
    { name: t("navbar.process"), href: "#process" },
    {
      name: t("navbar.about"),
      href: "/about",
      children: [
        { name: t("navbar.aboutVision"), href: "/about" },
        { name: t("navbar.aboutFounder"), href: "/about#founder" },
        { name: t("navbar.aboutCareers"), href: "/careers" },
      ],
    },
    { name: t("navbar.contact"), href: "/contact" },
  ];

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-background/60 backdrop-blur-xl border-b border-white/10 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] py-0" : "bg-transparent border-b border-transparent py-2"
      )}
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-base flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img src="/logo/curabotics-logo.png" alt="CuraBotics AI" className="h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <div key={link.name} className="relative" onMouseEnter={() => link.children && setOpenDropdown(link.name)} onMouseLeave={() => setOpenDropdown(null)}>
              <Link href={link.href} className={cn("text-sm font-medium transition-colors hover:text-[hsl(var(--primary))] relative flex items-center gap-1", pathname === link.href ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]")}>
                {link.name}
                {link.children && <ChevronDown size={14} className={cn("transition-transform", openDropdown === link.name && "rotate-180")} />}
                {pathname === link.href && <motion.div layoutId="active-nav-indicator" className="absolute -bottom-[28px] left-0 right-0 h-[2px] bg-[hsl(var(--primary))]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              </Link>
              <AnimatePresence>
                {link.children && openDropdown === link.name && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }} className="absolute top-full left-0 mt-2 w-52 py-2 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] shadow-xl">
                    {link.children.map((child) => (
                      <Link key={child.name} href={child.href} className="block px-4 py-2.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))]/50 transition-colors">{child.name}</Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <button onClick={openConsultation} className="btn-primary h-10 px-6 rounded-full text-sm">
            {t("navbar.cta")}
          </button>
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[hsl(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] rounded-md" aria-label="Toggle Menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur-lg overflow-hidden">
            <nav className="container-base flex flex-col py-4 gap-2">
              {NAV_LINKS.map((link) => (
                <React.Fragment key={link.name}>
                  <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={cn("text-base font-medium py-3 px-2 rounded-lg transition-colors hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))]/50", pathname === link.href ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--foreground))]")}>{link.name}</Link>
                  {link.children?.map((child) => (
                    <Link key={child.name} href={child.href} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium py-2 pl-6 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">{child.name}</Link>
                  ))}
                </React.Fragment>
              ))}
              <div className="pt-4 border-t border-[hsl(var(--border))] mt-2">
                <button onClick={() => { setIsMobileMenuOpen(false); openConsultation(); }} className="btn-primary w-full text-center block">
                  {t("navbar.cta")}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
