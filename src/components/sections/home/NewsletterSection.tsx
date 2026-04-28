"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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
      setMessage("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setStatus("idle");
    trackEvent("button_click", { label: "newsletter_submit_clicked" });

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.message || data?.error || "Subscription failed. Please try again.");
      } else {
        setStatus("success");
        trackEvent("newsletter_signup", { source: "marketing_page_section" });
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[hsl(var(--background))]">
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center opacity-30 dark:opacity-20 mix-blend-screen">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-400/20 to-blue-600/30 blur-3xl absolute -translate-y-12 animate-pulse" />
      </div>

      {/* Floating particles (optional touch) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, -20, 0], opacity: [0, 0.4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[20%] w-2 h-2 rounded-full bg-cyan-400/40 blur-[1px]"
         />
         <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[60%] right-[25%] w-3 h-3 rounded-full bg-blue-500/40 blur-[2px]"
         />
      </div>

      <Container className="relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[600px] rounded-2xl border border-[hsl(var(--border))]/40 bg-[hsl(var(--card))]/30 dark:bg-black/40 backdrop-blur-xl shadow-2xl p-8 sm:p-12 overflow-hidden relative"
        >
          {/* Inner subtle glow line */}
          <div className="absolute top-0 inset-x-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

          <div className="text-center mb-8 flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 dark:from-blue-200 dark:to-cyan-400 leading-tight">
              Stay Ahead with CuraBotics AI
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Get insights on healthcare technology, AI, and medical innovation.
            </p>
          </div>

          <div className="w-full relative min-h-[50px]">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
                >
                  <CheckCircle2 size={40} className="text-emerald-500 mb-3" />
                  <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    You're subscribed!
                  </h3>
                  <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80 text-center">
                    Check your email to confirm your subscription.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 group">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]/50 group-focus-within:text-cyan-500 transition-colors duration-300 pointer-events-none"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        placeholder="Enter your email address"
                        disabled={loading}
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-black/5 dark:bg-white/5 border border-[hsl(var(--border))]/50 text-[hsl(var(--foreground))] text-sm sm:text-base placeholder:text-[hsl(var(--muted-foreground))]/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 hover:border-[hsl(var(--border))] transition-all duration-300 disabled:opacity-50"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-12 px-8 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center min-w-[140px]"
                    >
                      {loading ? (
                        <Loader2 size={18} className="animate-spin text-white/80" />
                      ) : (
                        <span className="tracking-wide">Subscribe</span>
                      )}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-2 text-sm text-red-500 font-medium px-2 py-1">
                          <AlertCircle size={14} />
                          <span>{message}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 text-center border-t border-[hsl(var(--border))]/30 pt-6">
             <p className="text-xs text-[hsl(var(--muted-foreground))]/70 font-medium tracking-wide">
                No spam. Unsubscribe anytime.
             </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
