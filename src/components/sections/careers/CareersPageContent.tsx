"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket, Globe2, HeartPulse, Code2, BarChart3, Users,
  Mail, ArrowRight, Sparkles, MapPin, Clock, Briefcase
} from "lucide-react";
import { Container } from "@/components/ui/container";

const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const PERKS = [
  {
    icon: Globe2,
    title: "Work Globally",
    desc: "Collaborate with teams and clients across India, Germany, UAE, and beyond. Remote-first culture.",
  },
  {
    icon: Rocket,
    title: "Real Impact",
    desc: "Your work directly shapes how hospitals procure equipment and deliver care to millions of patients.",
  },
  {
    icon: Sparkles,
    title: "Cutting-Edge Tech",
    desc: "Work with AI, robotics, and the latest healthcare automation technologies from day one.",
  },
  {
    icon: HeartPulse,
    title: "Mission-Driven",
    desc: "We're not just building a company — we're building infrastructure for a healthier world.",
  },
];

const OPEN_ROLES = [
  {
    title: "Business Development Manager",
    department: "Sales & Partnerships",
    type: "Full-time",
    location: "Remote / India / Germany",
    icon: BarChart3,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    desc: "Drive B2B partnerships with hospitals, distributors, and MedTech manufacturers. Own the full sales cycle from lead to close.",
    skills: ["Healthcare sales", "Enterprise B2B", "Negotiation", "CRM tools"],
  },
  {
    title: "AI / ML Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    icon: Code2,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    desc: "Build AI models for hospital workflow automation, medical image analysis, and intelligent procurement matching.",
    skills: ["Python", "PyTorch / TensorFlow", "Computer Vision", "MLOps"],
  },
  {
    title: "Medical Equipment Procurement Specialist",
    department: "Procurement",
    type: "Full-time",
    location: "India (Hybrid)",
    icon: Briefcase,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    desc: "Manage end-to-end procurement of medical devices. Coordinate with manufacturers, handle documentation, and ensure regulatory compliance.",
    skills: ["Medical devices", "Supply chain", "Import/export", "Vendor relations"],
  },
  {
    title: "Full-Stack Developer (Next.js)",
    department: "Engineering",
    type: "Full-time / Contract",
    location: "Remote",
    icon: Code2,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    desc: "Build and scale our customer-facing platform — from procurement dashboards to partner portals and AI integration interfaces.",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "API design"],
  },
  {
    title: "Healthcare Partnerships Lead (Germany)",
    department: "Partnerships",
    type: "Full-time",
    location: "Germany (On-site / Hybrid)",
    icon: Users,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    desc: "Build and manage relationships with German MedTech manufacturers and distributors. Bridge the India–Germany supply chain.",
    skills: ["German language (B2+)", "MedTech", "Account management", "B2B sales"],
  },
];

export function CareersPageContent() {
  const handleApply = (role: string) => {
    const subject = encodeURIComponent(`Job Application: ${role} — CuraBotics AI`);
    const body = encodeURIComponent(
      `Hi CuraBotics AI team,\n\nI'd like to apply for the ${role} position.\n\nName: \nLinkedIn / Portfolio: \nAvailability: \n\nBrief intro:\n`
    );
    window.open(`mailto:er.swt.saqibahmad@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-500/8 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <Container className="relative z-10">
          <motion.div {...FADE_UP} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Rocket size={14} />
              We&apos;re Hiring
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[1.08] text-foreground mb-6">
              Build the future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-violet-400">
                global healthcare
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
              Join a small, ambitious team that&apos;s reimagining how hospitals source equipment, automate workflows, and integrate AI. We&apos;re remote-first, mission-driven, and growing fast.
            </p>
            <a
              href="mailto:er.swt.saqibahmad@gmail.com?subject=Career%20Inquiry%20%E2%80%94%20CuraBotics%20AI"
              className="btn-primary h-12 px-8 rounded-full text-sm font-bold inline-flex items-center gap-2"
            >
              <Mail size={16} /> Send Open Application
            </a>
          </motion.div>
        </Container>
      </section>

      {/* ── Perks ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/20">
        <Container>
          <motion.div {...FADE_UP} transition={{ duration: 0.6 }} className="text-center mb-12">
            <div className="w-12 h-1 bg-primary mx-auto mb-6 rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mb-4">
              Why join CuraBotics AI?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((p, i) => (
              <motion.div
                key={p.title}
                {...FADE_UP}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-border/50 bg-background p-6 flex flex-col gap-3 hover:shadow-soft transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <p.icon size={20} />
                </div>
                <h3 className="font-heading font-bold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Open Roles ────────────────────────────────────────────────── */}
      <section className="py-20">
        <Container>
          <motion.div {...FADE_UP} transition={{ duration: 0.6 }} className="mb-12">
            <div className="w-12 h-1 bg-primary mb-6 rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mb-4">
              Open Positions
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              We&apos;re a lean team and every hire matters. If you see a role that excites you, apply — even if you don&apos;t meet every requirement.
            </p>
          </motion.div>

          <div className="flex flex-col gap-5">
            {OPEN_ROLES.map((role, i) => (
              <motion.div
                key={role.title}
                {...FADE_UP}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`rounded-2xl border ${role.border} bg-background p-6 md:p-8 flex flex-col lg:flex-row lg:items-start gap-5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-shadow`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${role.bg} border ${role.border} shrink-0`}>
                  <role.icon size={22} className={role.color} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-heading font-bold text-lg text-foreground">{role.title}</h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${role.bg} ${role.color} border ${role.border}`}>
                      {role.department}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Clock size={12} />{role.type}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} />{role.location}</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{role.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((s) => (
                      <span key={s} className="text-xs px-3 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border/50">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleApply(role.title)}
                    className="btn-primary h-10 px-6 rounded-full text-sm font-bold whitespace-nowrap flex items-center gap-2"
                  >
                    Apply <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Open Application CTA ─────────────────────────────────────── */}
      <section className="py-20 bg-muted/20">
        <Container>
          <motion.div {...FADE_UP} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mb-4">
              Don&apos;t see your role listed?
            </h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re always looking for exceptional people. Send us your CV and a short note on how you&apos;d contribute to the mission.
            </p>
            <a
              href="mailto:er.swt.saqibahmad@gmail.com?subject=Open%20Application%20%E2%80%94%20CuraBotics%20AI"
              className="btn-primary h-11 px-8 rounded-full text-sm font-bold inline-flex items-center gap-2"
            >
              <Mail size={16} /> Send Open Application
            </a>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
