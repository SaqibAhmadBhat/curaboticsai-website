"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutPreview() {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-background relative overflow-hidden text-left">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 relative"
          >
            <div className="w-16 h-1 bg-primary mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">{t("about.badge")}</h2>
            <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight text-foreground">
              {t("about.headline")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent-foreground))]">{t("about.gradient")}</span>
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              {t("about.description")}
            </p>
            <div className="mt-8">
              <Link href="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors uppercase tracking-wider text-sm group">
                {t("about.cta")} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full rounded-3xl overflow-hidden glassmorphism border border-border/50 shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-muted/20"
          >
            <Image 
              src="/images/photo_hospital.jpg"
              alt="CuraBotics AI Engineering Staff"
              fill
              className="object-cover hover:scale-105 transition-transform duration-[15s]"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-foreground font-heading font-bold text-2xl tracking-tight leading-tight">Advanced Medical Systems Integration</p>
              <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mt-2">[ Global Partnerships ]</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
