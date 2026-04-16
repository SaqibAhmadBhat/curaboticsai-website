"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe, Cpu, Headphones, Settings } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

export function TrustStrip() {
  const { t } = useLanguage();

  const trustItems = [
    { icon: ShieldCheck, key: "trust.t1" },
    { icon: Globe, key: "trust.t2" },
    { icon: Cpu, key: "trust.t3" },
    { icon: Headphones, key: "trust.t4" },
  ];

  return (
    <section className="py-6 bg-muted/30 border-y border-border/50">
      <Container>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground">
              <item.icon size={16} className="text-primary shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap">{t(item.key)}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
