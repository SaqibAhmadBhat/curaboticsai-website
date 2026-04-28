"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return; // Prevent multiple clicks

    /* Basic email validation */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setStatus("idle");

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
        setMessage(data?.message || "Please check your email to confirm your subscription.");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm tracking-tight mb-1.5">
          Join our Newsletter
        </h4>
        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-sm">
          Get the latest in healthcare technology, AI advancements, and CuraBotics updates delivered completely free.
        </p>
      </div>

      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-sm">
        <div className="relative flex-1">
          <Mail
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]/50 peer-focus:text-[hsl(var(--primary))] transition-colors"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="your@email.com"
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[hsl(var(--background))]/80 border border-[hsl(var(--border))]/60 text-[hsl(var(--foreground))] text-sm placeholder:text-[hsl(var(--muted-foreground))]/50 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/40 transition-all peer"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="h-11 px-5 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center min-w-[130px] gap-2 shadow-sm"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Subscribe</span>
              <ArrowRight size={16} className="opacity-80" />
            </>
          )}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className={`flex items-start gap-2.5 text-sm px-4 py-3 rounded-xl border ${
                status === "success"
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400"
              }`}
            >
              {status === "success" ? (
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
              )}
              <span className="leading-snug font-medium">{message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-xs text-[hsl(var(--muted-foreground))]/70">
        You can unsubscribe at any time. We respect your privacy.
      </p>
    </div>
  );
}

