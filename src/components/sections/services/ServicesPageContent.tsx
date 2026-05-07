"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCart, Brain, Bot, Building2, Wrench, BarChart3,
  CheckCircle2, ArrowRight, Globe2
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { useConsultation } from "@/contexts/ConsultationContext";

const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const SERVICES = [
  {
    icon: ShoppingCart,
    title: "Medical Equipment Procurement",
    tagline: "Source. Negotiate. Deliver.",
    desc: "End-to-end procurement of medical devices, diagnostic equipment, and consumables from verified global manufacturers — primarily Germany's precision MedTech ecosystem.",
    features: [
      "Direct manufacturer access (no middlemen)",
      "MRI, CT, Ultrasound, Surgical systems & more",
      "Full regulatory compliance support",
      "Logistics & customs clearance management",
      "After-sales service coordination",
    ],
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    gradientFrom: "from-sky-500/20",
  },
  {
    icon: Brain,
    title: "AI Healthcare Automation",
    tagline: "Automate. Diagnose. Optimise.",
    desc: "AI-powered systems that automate hospital workflows, streamline diagnostics, and reduce operational overhead — improving both efficiency and patient outcomes.",
    features: [
      "Intelligent patient flow management",
      "Computer vision diagnostic support",
      "Automated inventory & supply chain",
      "Predictive maintenance for equipment",
      "Clinical decision support systems",
    ],
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    gradientFrom: "from-violet-500/20",
  },
  {
    icon: Bot,
    title: "Robotics Integration",
    tagline: "Precision. Reliability. Scale.",
    desc: "Seamless integration of surgical robotics, service robots, and automated lab systems into existing hospital infrastructure — with full staff training and technical support.",
    features: [
      "Surgical assistance robotics",
      "Hospital logistics & service robots",
      "Rehabilitation robotics",
      "Laboratory automation systems",
      "Remote monitoring & teleoperation",
    ],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    gradientFrom: "from-emerald-500/20",
  },
  {
    icon: Building2,
    title: "Hospital Infrastructure Consulting",
    tagline: "Plan. Design. Build.",
    desc: "Strategic consulting for greenfield hospital builds, department upgrades, and technology modernisation — from equipment layout to workflow design.",
    features: [
      "Department infrastructure planning",
      "Technology stack architecture",
      "Equipment lifecycle management",
      "Vendor evaluation & selection",
      "Project management & oversight",
    ],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    gradientFrom: "from-amber-500/20",
  },
  {
    icon: Wrench,
    title: "Equipment Maintenance & Service",
    tagline: "Uptime. Support. Trust.",
    desc: "Preventive maintenance contracts, emergency repair services, and spare parts procurement to keep your medical equipment running at peak performance.",
    features: [
      "Preventive maintenance programmes",
      "24/7 emergency support (on-call)",
      "Genuine OEM spare parts supply",
      "Annual maintenance contracts (AMC)",
      "Calibration & quality validation",
    ],
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    gradientFrom: "from-rose-500/20",
  },
  {
    icon: BarChart3,
    title: "Strategic Partnership & Deal Management",
    tagline: "Connect. Negotiate. Grow.",
    desc: "We act as your trusted intermediary — connecting hospitals with manufacturers, managing negotiations, structuring deals, and building long-term partnerships.",
    features: [
      "Manufacturer–hospital matchmaking",
      "Deal structuring & negotiation",
      "GeM portal tender assistance (India)",
      "Import/export documentation support",
      "Long-term partnership management",
    ],
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    gradientFrom: "from-cyan-500/20",
  },
];

export function ServicesPageContent() {
  const { openConsultation } = useConsultation();

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <Container className="relative z-10">
          <motion.div {...FADE_UP} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Globe2 size={14} />
              Healthcare Technology Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[1.08] text-foreground mb-6">
              Everything your hospital{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-cyan-400">
                needs to scale
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
              From medical equipment procurement to AI automation and robotics integration — CuraBotics AI delivers end-to-end healthcare technology solutions for modern medical facilities worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={openConsultation}
                className="btn-primary h-12 px-8 rounded-full text-sm font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(26,115,181,0.2)]"
              >
                Request a Service Quote <ArrowRight size={16} />
              </button>
              <Link
                href="/contact"
                className="h-12 px-8 rounded-full border border-border text-sm font-medium inline-flex items-center gap-2 hover:bg-muted transition-colors glassmorphism"
              >
                Talk to an Expert
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Services Grid ─────────────────────────────────────────────── */}
      <section className="py-20">
        <Container>
          <motion.div {...FADE_UP} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="w-12 h-1 bg-primary mx-auto mb-6 rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mb-4">
              Our Service Portfolio
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Six integrated service areas designed to modernise healthcare delivery — from supply chain to AI-powered automation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                {...FADE_UP}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`rounded-3xl border ${svc.border} bg-background p-8 flex flex-col gap-5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-shadow duration-300 group relative overflow-hidden`}
              >
                {/* Subtle gradient bg on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${svc.gradientFrom} to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none rounded-3xl`} />

                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${svc.bg} border ${svc.border} shrink-0`}>
                    <svc.icon size={22} className={svc.color} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${svc.color} mb-1`}>{svc.tagline}</p>
                    <h3 className="text-xl font-heading font-bold text-foreground">{svc.title}</h3>
                  </div>
                </div>

                <p className="relative z-10 text-muted-foreground text-sm leading-relaxed">{svc.desc}</p>

                <ul className="relative z-10 flex flex-col gap-2">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={15} className={`${svc.color} mt-0.5 shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="relative z-10 pt-2">
                  <button
                    onClick={openConsultation}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${svc.color} hover:opacity-70 transition-opacity`}
                  >
                    Request this service <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/20">
        <Container>
          <motion.div
            {...FADE_UP}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mb-4">
              Not sure which service fits your needs?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our team will assess your requirements and design a tailored solution. Book a free consultation and speak directly with our healthcare technology experts.
            </p>
            <button
              onClick={openConsultation}
              className="btn-primary h-12 px-10 rounded-full text-sm font-bold inline-flex items-center gap-2"
            >
              Book Free Consultation <ArrowRight size={16} />
            </button>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
