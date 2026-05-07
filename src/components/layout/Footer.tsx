"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConsultation } from "@/contexts/ConsultationContext";

export function Footer() {
  const { t } = useLanguage();
  const { openConsultation } = useConsultation();

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]/50 backdrop-blur-sm">
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2" title="CuraBotics AI — Homepage">
              <Image
                src="/logo/curabotics-logo.png"
                alt="CuraBotics AI — Global Healthcare Technology"
                width={144}
                height={36}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-sm">{t("footer.tagline")}</p>
            <NewsletterSignup />
            <div className="mt-4 flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--primary))]">Global Healthcare Gateway</span>
              <span className="text-sm text-[hsl(var(--muted-foreground))]">India ↔ Germany Healthcare Bridge</span>
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Robotics Integration • Procurement Expertise</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider">{t("footer.colCompany")}</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[hsl(var(--muted-foreground))]">
              <li><Link href="/about" className="hover:text-[hsl(var(--primary))] transition-colors">{t("footer.aboutUs")}</Link></li>
              <li><Link href="/about#vision" className="hover:text-[hsl(var(--primary))] transition-colors">{t("footer.vision")}</Link></li>
              <li><Link href="/about#founder" className="hover:text-[hsl(var(--primary))] transition-colors">{t("footer.founder")}</Link></li>
              <li><Link href="/careers" className="hover:text-[hsl(var(--primary))] transition-colors">{t("footer.careers")}</Link></li>
              <li><Link href="/projects" className="hover:text-[hsl(var(--primary))] transition-colors">Projects</Link></li>
              <li><a href="https://saqibahmadbhat.github.io/Portfolio/" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--primary))] transition-colors">Founder Portfolio</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider">{t("footer.colSolutions")}</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[hsl(var(--muted-foreground))]">
              <li><Link href="/services" className="hover:text-[hsl(var(--primary))] transition-colors">{t("footer.aiAutomation")}</Link></li>
              <li><Link href="/services" className="hover:text-[hsl(var(--primary))] transition-colors">{t("footer.procurement")}</Link></li>
              <li><Link href="/services" className="hover:text-[hsl(var(--primary))] transition-colors">{t("footer.robotics")}</Link></li>
              <li><Link href="/services" className="hover:text-[hsl(var(--primary))] transition-colors">{t("footer.infrastructure")}</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider">{t("navbar.contact")}</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[hsl(var(--muted-foreground))]">
              <li><a href="mailto:er.swt.saqibahmad@gmail.com" className="hover:text-[hsl(var(--primary))] transition-colors">er.swt.saqibahmad@gmail.com</a></li>
              <li><a href="https://wa.me/917006557535" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--primary))] transition-colors">WhatsApp: +91 7006557535</a></li>
              <li><a href="https://www.linkedin.com/company/curaboticsai" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--primary))] transition-colors">LinkedIn</a></li>
              <li><button onClick={openConsultation} className="hover:text-[hsl(var(--primary))] transition-colors">{t("footer.consultation")}</button></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-8 text-sm text-[hsl(var(--muted-foreground))]">
          <p>© {new Date().getFullYear()} CuraBotics AI. {t("footer.rights")}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[hsl(var(--foreground))] transition-colors">{t("footer.privacy")}</Link>
            <Link href="/terms" className="hover:text-[hsl(var(--foreground))] transition-colors">{t("footer.terms")}</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
