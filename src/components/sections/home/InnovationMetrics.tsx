"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-muted-foreground drop-shadow-sm">
      {count}{suffix}
    </span>
  );
}

export function InnovationMetrics() {
  const { t } = useLanguage();

  const metrics = [
    { label: t("metrics.m1"), value: 50, suffix: "+" },
    { label: t("metrics.m2"), value: 20, suffix: "+" },
    { label: t("metrics.m3"), value: 100, suffix: "+" },
    { label: t("metrics.m4"), value: 99, suffix: "%" },
  ];

  return (
    <section className="py-32 bg-background relative border-y border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.02]" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col gap-4 text-center md:text-left bg-background/50 p-8 rounded-3xl border border-border/50 shadow-soft backdrop-blur-md glassmorphism hover:-translate-y-2 transition-transform duration-300"
            >
              <Counter value={metric.value} suffix={metric.suffix} />
              <div className="w-12 h-1 bg-primary mx-auto md:mx-0" />
              <span className="text-sm md:text-base font-bold text-foreground tracking-widest">{metric.label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
