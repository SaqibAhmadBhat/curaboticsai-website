"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { trackEvent } from "@/lib/analytics";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");
    trackEvent("button_click", { label: "newsletter_submit_clicked" });

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let data: { success?: boolean; message?: string; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        /* empty body — handle gracefully */
      }

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.message ?? data?.error ?? "Subscription failed. Please try again.");
      } else {
        setStatus("success");
        setEmail("");
        trackEvent("newsletter_signup", { source: "inline_section" });
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="relative py-20 sm:py-28 overflow-hidden bg-[hsl(var(--background))]"
    >
      {/* ── Background atmosphere ──────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Primary glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-gradient-to-br from-sky-500/10 via-blue-600/8 to-cyan-400/10 blur-[100px]" />
        {/* Accent glow */}
        <div className="absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="absolute -top-20 -left-20 h-[250px] w-[250px] rounded-full bg-cyan-500/5 blur-[80px]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-2xl"
        >
          {/* ── Card ──────────────────────────────────────────────── */}
          <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border))]/40 bg-[hsl(var(--card))]/40 dark:bg-white/[0.03] backdrop-blur-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_32px_64px_-16px_rgba(0,0,0,0.5)] p-8 sm:p-12">
            {/* Top highlight line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

            {/* Icon badge */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-500/10 text-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.15)]">
                <Sparkles size={22} strokeWidth={1.75} />
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-2xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-3xl">
                Stay ahead in{" "}
                <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                  healthcare AI
                </span>
              </h2>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-base">
                Exclusive insights on medical technology, AI automation, and global procurement — delivered to your inbox.
              </p>
            </div>

            {/* Form / Success */}
            <div className="relative min-h-[56px]">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/8 px-6 py-6 text-center"
                  >
                    <CheckCircle2 size={36} className="text-emerald-500" />
                    <div>
                      <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
                        Check your inbox!
                      </p>
                      <p className="mt-1 text-sm text-emerald-600/80 dark:text-emerald-400/70">
                        We've sent a confirmation link. Click it to activate your subscription.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubscribe}
                    className="flex flex-col gap-3"
                    noValidate
                  >
                    <div className="flex flex-col gap-3 sm:flex-row">
                      {/* Email input */}
                      <div className="group relative flex-1">
                        <Mail
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]/50 transition-colors duration-200 group-focus-within:text-sky-400"
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") { setStatus("idle"); setMessage(""); }
                          }}
                          placeholder="Enter your email address"
                          disabled={loading}
                          aria-label="Email address for newsletter"
                          className="h-[52px] w-full rounded-xl border border-[hsl(var(--border))]/60 bg-[hsl(var(--background))]/80 pl-11 pr-4 text-[15px] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]/50 transition-all duration-200 focus:border-sky-400/60 focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-50"
                        />
                      </div>

                      {/* Subscribe button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex h-[52px] min-w-[140px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(6,182,212,0.3)] transition-all duration-300 hover:shadow-[0_6px_28px_rgba(6,182,212,0.45)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-[0_4px_20px_rgba(6,182,212,0.3)]"
                      >
                        {loading ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <>
                            <span>Subscribe</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                      {status === "error" && message && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/8 px-3 py-2 text-sm font-medium text-red-500">
                            <AlertCircle size={14} className="shrink-0" />
                            <span>{message}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Footer note */}
            <p className="mt-5 text-center text-xs text-[hsl(var(--muted-foreground))]/60">
              No spam, ever. Unsubscribe with one click at any time.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
