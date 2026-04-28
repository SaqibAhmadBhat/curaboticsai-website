"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    // Determine if popup already showed today
    const POPUP_SEEN_KEY = "curabotics_exit_intent_seen";
    const lastSeen = localStorage.getItem(POPUP_SEEN_KEY);
    
    if (lastSeen) {
      const timeSince = Date.now() - parseInt(lastSeen, 10);
      if (timeSince < 1000 * 60 * 60 * 24) return; // Wait 24 hours
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
        showPopup();
      }
    };

    const timer = setTimeout(() => {
      showPopup();
    }, 15000); // 15 seconds fallback

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const showPopup = () => {
    setIsVisible(true);
    localStorage.setItem("curabotics_exit_intent_seen", Date.now().toString());
    trackEvent("popup_impression", { category: "exit_intent" });
  };

  const closePopup = () => {
    setIsVisible(false);
    trackEvent("button_click", { label: "close_exit_popup" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || status === "success") return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setStatus("success");
        trackEvent("newsletter_signup", { source: "exit_intent_popup" });
        setTimeout(() => setIsVisible(false), 3500); // auto close after success
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closePopup}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[hsl(var(--card))]/90 dark:bg-[#09090b]/90 backdrop-blur-2xl border border-[hsl(var(--border))]/50 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

            <button
              onClick={closePopup}
              className="absolute top-4 right-4 p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-10 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-[hsl(var(--foreground))] bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-cyan-400">
                Don't miss the future of healthcare AI
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] mb-8 leading-relaxed">
                Join top medical professionals reading our exclusive insights on AI, robotics, and global procurement.
              </p>

              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
                >
                  <CheckCircle2 size={48} className="text-emerald-500 mb-4" />
                  <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">Subscription Confirmed</p>
                  <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80">Please check your email!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative group">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]/50 group-focus-within:text-cyan-500 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full h-14 pl-12 pr-4 rounded-xl bg-black/5 dark:bg-white/5 border border-[hsl(var(--border))]/60 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-14 w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70 disabled:active:scale-100"
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : "Subscribe Now"}
                  </button>
                  {status === "error" && (
                     <p className="text-sm text-red-500 text-center mt-2 font-medium">Failed to subscribe. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
