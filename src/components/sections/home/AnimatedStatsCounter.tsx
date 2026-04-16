"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

interface AnimatedValueProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedValue({ value, suffix = "", prefix = "" }: AnimatedValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 50,
    damping: 15,
    duration: 2.5,
  });

  const display = useTransform(spring, (current) => 
    Math.round(current).toString()
  );

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  return (
    <span ref={ref} className="font-heading font-black tracking-tight text-white inline-flex">
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export function AnimatedStatsCounter() {
  const { t } = useLanguage();

  const stats = [
    { value: 30, suffix: "+", label: "Global Manufacturers" },
    { value: 500, suffix: "+", label: "Equipment Solutions" },
    { value: 24, suffix: "/7", label: "Technical Support" },
    { value: 15, suffix: "+", label: "Countries Served" },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-slate-900 dark:bg-black/40 border-y border-border/10">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none" />
      
      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col items-center justify-center text-center px-4"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 mb-2 drop-shadow-sm">
                <AnimatedValue value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm md:text-base font-medium text-white/60 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
