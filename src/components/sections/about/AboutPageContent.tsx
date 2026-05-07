"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe2, ShieldCheck, Zap, HeartPulse, Users, Target,
  Lightbulb, Award, ArrowRight, ExternalLink, Quote
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { useConsultation } from "@/contexts/ConsultationContext";

const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity First",
    desc: "We build relationships on trust — with hospitals, manufacturers, and partners. Every procurement deal is handled with complete transparency.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  {
    icon: Zap,
    title: "Speed & Precision",
    desc: "We move fast without cutting corners. From sourcing to delivery, we combine German engineering standards with India's operational agility.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: Lightbulb,
    title: "Innovation-Driven",
    desc: "We apply AI and robotics to problems that have long plagued healthcare procurement — manual bottlenecks, opaque supply chains, fragmented logistics.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: HeartPulse,
    title: "Patient-Centric",
    desc: "Every deal we close, every machine we source, every system we integrate — it's ultimately about better patient outcomes. That's our north star.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
];

const MILESTONES = [
  { year: "2024", title: "Founded", desc: "CuraBotics AI incorporated to bridge the India–Germany healthcare gap through technology." },
  { year: "2024", title: "First Partnerships", desc: "Established partnerships with MedTech distributors in India and began supplier outreach in Germany." },
  { year: "2025", title: "AI Platform Development", desc: "Began development of AI-powered procurement matching engine and hospital workflow automation systems." },
  { year: "2025", title: "Global Expansion", desc: "Extended reach to UAE, UK, and Southeast Asian markets. Actively engaging enterprise hospital groups." },
];

const TEAM = [
  {
    name: "Saqib Ahmad Bhat",
    role: "Founder & CEO",
    bio: "Engineer and entrepreneur passionate about bridging healthcare gaps through AI, robotics, and global supply chain innovation. Based across India and Germany.",
    portfolio: "https://saqibahmadbhat.github.io/Portfolio/",
    linkedin: "https://www.linkedin.com/company/curaboticsai",
    image: "/images/founder_portrait.png",
  },
];

export function AboutPageContent() {
  const { openConsultation } = useConsultation();

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <Container className="relative z-10">
          <motion.div {...FADE_UP} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Globe2 size={14} />
              Global Healthcare Technology
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[1.08] text-foreground mb-6">
              Bridging the world&apos;s best{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-cyan-400">
                healthcare technology
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
              CuraBotics AI was built on a single conviction: the world's best medical technology should be accessible to every hospital, clinic, and patient — regardless of geography.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={openConsultation} className="btn-primary h-12 px-8 rounded-full text-sm font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(26,115,181,0.2)]">
                Book a Consultation <ArrowRight size={16} />
              </button>
              <Link href="/contact" className="h-12 px-8 rounded-full border border-border text-sm font-medium inline-flex items-center gap-2 hover:bg-muted transition-colors glassmorphism">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────── */}
      <section className="py-20 bg-muted/20" id="vision">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div {...FADE_UP} transition={{ duration: 0.6 }}>
              <div className="w-12 h-1 bg-primary mb-6 rounded-full" />
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mb-5">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
                We connect hospitals and healthcare facilities with world-class medical equipment manufacturers — primarily from Germany's precision engineering ecosystem — enabling smarter procurement, faster delivery, and better patient outcomes.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                Simultaneously, we deploy AI automation and robotics to eliminate inefficiencies in hospital workflows, diagnostics pipelines, and supply chain management.
              </p>
            </motion.div>

            <motion.div {...FADE_UP} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="w-12 h-1 bg-accent mb-6 rounded-full" />
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mb-5">
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
                A world where every hospital — from a rural clinic in Rajasthan to a specialist centre in Dubai — has seamless access to precision medical equipment and intelligent automation systems.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                We envision CuraBotics AI as the defining global bridge between MedTech innovation and healthcare delivery — one procurement, one AI integration, one partnership at a time.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Values ───────────────────────────────────────────────────── */}
      <section className="py-20">
        <Container>
          <motion.div {...FADE_UP} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="w-12 h-1 bg-primary mx-auto mb-6 rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Four core values guide every decision, partnership, and product we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                {...FADE_UP}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`rounded-2xl border ${v.border} ${v.bg} p-6 flex flex-col gap-4`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${v.bg} border ${v.border}`}>
                  <v.icon size={20} className={v.color} />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/20" id="story">
        <Container>
          <motion.div {...FADE_UP} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="w-12 h-1 bg-primary mx-auto mb-6 rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From a single idea to a global healthcare technology platform.
            </p>
          </motion.div>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border/60" />
            <div className="flex flex-col gap-10">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={i}
                  {...FADE_UP}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 pl-14 relative"
                >
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-xs font-bold text-primary z-10 shrink-0">
                    {m.year}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-1">{m.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Team / Founder ───────────────────────────────────────────── */}
      <section className="py-20" id="founder">
        <Container>
          <motion.div {...FADE_UP} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="w-12 h-1 bg-primary mx-auto mb-6 rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mb-4">
              Meet the Team
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Builders, engineers, and healthcare advocates driving the CuraBotics AI mission.
            </p>
          </motion.div>

          <div className="flex justify-center">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                {...FADE_UP}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="max-w-lg w-full rounded-3xl border border-border/50 bg-background p-8 md:p-10 flex flex-col items-center text-center shadow-soft relative overflow-hidden"
              >
                <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/8 rotate-180" />
                <Quote className="absolute bottom-6 right-6 w-12 h-12 text-primary/8" />

                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg mb-6 shrink-0">
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    fill
                    className="object-cover"
                    sizes="112px"
                    priority
                  />
                </div>

                <h3 className="text-xl font-heading font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{member.bio}</p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    Portfolio <ExternalLink size={13} />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors"
                  >
                    LinkedIn <ExternalLink size={13} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/20">
        <Container>
          <motion.div
            {...FADE_UP}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mb-4">
              Ready to work with us?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Whether you&apos;re a hospital looking to procure equipment, a manufacturer seeking distribution, or a partner exploring collaboration — we&apos;d love to connect.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={openConsultation}
                className="btn-primary h-12 px-8 rounded-full text-sm font-bold flex items-center gap-2"
              >
                Book a Consultation <ArrowRight size={16} />
              </button>
              <Link
                href="/contact"
                className="h-12 px-8 rounded-full border border-border text-sm font-medium inline-flex items-center gap-2 hover:bg-muted transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
