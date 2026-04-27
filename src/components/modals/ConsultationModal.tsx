"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Mail, Phone, Building2, User, Globe, MapPin,
  CheckCircle2, Loader2, Send, AlertCircle, X
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConsultation } from "@/contexts/ConsultationContext";

interface Toast {
  type: "success" | "error";
  message: string;
}

const ORG_TYPES = ["Hospital", "Clinic", "Laboratory", "Distributor", "Government", "Private Buyer", "Manufacturer", "Other"];
const ASSISTANCE_OPTIONS = ["Medical Equipment Procurement", "Manufacturer/Supplier Connection", "AI Automation Integration", "Robotics Solutions", "Equipment Maintenance/Repair", "Diagnostic Setup", "Hospital Infrastructure Planning", "Business Partnership / Deal Negotiation"];
const INTENT_OPTIONS = ["Purchase Equipment", "Find Manufacturer/Supplier", "Build Partnership", "Integrate Technology", "Service Existing Equipment"];
const STEP_LABELS = ["Contact Details", "Organization", "Requirements", "Review & Submit"];

interface FormData {
  fullName: string; companyName: string; email: string; phone: string;
  country: string; city: string; orgType: string; assistance: string[];
  equipmentNeeded: string; intent: string; projectDetails: string;
}

const INITIAL_FORM: FormData = {
  fullName: "", companyName: "", email: "", phone: "", country: "", city: "",
  orgType: "", assistance: [], equipmentNeeded: "", intent: "", projectDetails: "",
};

export function ConsultationModal() {
  const { isOpen, closeConsultation } = useConsultation();
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ ...INITIAL_FORM });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [toast, setToast] = useState<Toast | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  // Reset form when modal fully closes completely
  useEffect(() => {
    if (!isOpen) { 
        setTimeout(() => {
            if(!isOpen){
                setStep(0); 
                setSubmitted(false); 
                setForm({...INITIAL_FORM}); 
                setErrors({});
            }
        }, 500); 
    }
  }, [isOpen]);

  const set = (key: keyof FormData, val: string | string[]) => setForm((p) => ({ ...p, [key]: val }));

  const toggleAssistance = (item: string) => {
    setForm((p) => ({
      ...p,
      assistance: p.assistance.includes(item)
        ? p.assistance.filter((a) => a !== item)
        : [...p.assistance, item],
    }));
  };

  const validateStep = (): boolean => {
    const e: typeof errors = {};
    if (step === 0) {
      if (!form.fullName.trim()) e.fullName = "Required";
      if (!form.companyName.trim()) e.companyName = "Required";
      if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
      if (!form.phone.trim()) e.phone = "Required";
      if (!form.country.trim()) e.country = "Required";
      if (!form.city.trim()) e.city = "Required";
    }
    if (step === 1) {
      if (!form.orgType) e.orgType = "Select one";
      if (form.assistance.length === 0) e.assistance = "Select at least one";
    }
    if (step === 2) {
      if (!form.intent) e.intent = "Select one";
      if (!form.projectDetails.trim()) e.projectDetails = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => Math.min(s + 1, 3)); };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const buildWhatsAppMsg = () => {
    const lines = [
      `🏥 *CuraBotics AI — New Enterprise Inquiry*`, ``,
      `👤 *Name:* ${form.fullName}`, `🏢 *Company:* ${form.companyName}`,
      `📧 *Email:* ${form.email}`, `📞 *Phone:* ${form.phone}`,
      `🌍 *Location:* ${form.city}, ${form.country}`, `🏛️ *Organization Type:* ${form.orgType}`, ``,
      `🔧 *Assistance Needed:*`, ...form.assistance.map((a) => `  • ${a}`), ``,
      `🎯 *Intent:* ${form.intent}`, form.equipmentNeeded ? `🔬 *Equipment/Tech:* ${form.equipmentNeeded}` : "", ``,
      `📋 *Project Details:*`, form.projectDetails,
    ];
    return encodeURIComponent(lines.filter(Boolean).join("\n"));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setToast(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setToast({ type: "error", message: data.error || "Submission failed. Please try again." });
        setSubmitting(false);
        return;
      }
      const waMsg = buildWhatsAppMsg();
      window.open(`https://wa.me/917006557535?text=${waMsg}`, "_blank");
      setToast({ type: "success", message: "Inquiry submitted! Check WhatsApp." });
      setSubmitting(false);
      setSubmitted(true);
    } catch {
      setToast({ type: "error", message: "Network error. Please try again." });
      setSubmitting(false);
    }
  };

  const fieldCls = (key: keyof FormData) =>
    `w-full h-12 md:h-14 px-5 rounded-xl bg-background/80 border ${errors[key] ? "border-red-500" : "border-border/60"} text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all`;

  const chipCls = (active: boolean) =>
    `px-4 py-2.5 rounded-full text-xs md:text-sm font-medium border cursor-pointer transition-all select-none ${active ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "bg-background/60 border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            onClick={closeConsultation}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden hide-scrollbar glassmorphism rounded-3xl border border-border/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col bg-background"
          >
            {/* Close Button */}
            <button onClick={closeConsultation} className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-background/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <X size={20} />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-6 p-10 md:p-20 text-center flex-1">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 size={40} className="text-primary" />
                </div>
                <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground">Inquiry Received</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                  Thank you. CuraBotics AI has received your consultation request. Our enterprise solutions team will contact you within 24–48 hours.
                </p>
                <button onClick={closeConsultation} className="btn-primary h-12 px-10 rounded-full mt-4 font-bold">
                  Return to Site
                </button>
              </div>
            ) : (
              <div className="flex flex-col p-6 md:p-10 flex-1">
                {/* Modal Header */}
                <div className="mb-8 md:mb-10 text-center md:text-left pr-8">
                  <h2 className="text-2xl md:text-4xl font-heading font-extrabold tracking-tight text-foreground">Enterprise <span className="text-primary">Consultation</span></h2>
                  <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-lg">Complete the enterprise intake form below to connect with our strategic medical technology and AI automation experts.</p>
                </div>

                {/* Progress Steps */}
                <div className="relative z-10 flex items-center justify-between mb-8 md:mb-12">
                  {STEP_LABELS.map((label, i) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 flex-1 relative">
                      <div className={`relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all ${i <= step ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-muted/40 text-muted-foreground border border-border/60"}`}>
                        {i < step ? "✓" : i + 1}
                      </div>
                      <span className={`text-[10px] md:text-xs font-medium text-center hidden sm:block whitespace-nowrap mt-1 ${i <= step ? "text-primary" : "text-muted-foreground/60"}`}>{label}</span>
                      {i < STEP_LABELS.length - 1 && (
                        <div className={`absolute top-4 md:top-5 h-0.5 transition-colors hidden sm:block ${i < step ? "bg-primary" : "bg-border/40"}`} style={{ left: "50%", width: "100%", zIndex: 0 }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="flex flex-col gap-5">
                      
                      {step === 0 && (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Full Name *</label>
                                <div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" /><input className={`${fieldCls("fullName")} pl-10`} placeholder="Full name" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} /></div>
                                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                            </div>
                            <div>
                                <label className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Company / Organization *</label>
                                <div className="relative"><Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" /><input className={`${fieldCls("companyName")} pl-10`} placeholder="Hospital, Clinic..." value={form.companyName} onChange={(e) => set("companyName", e.target.value)} /></div>
                                {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Email Address *</label>
                                <div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" /><input type="email" className={`${fieldCls("email")} pl-10`} placeholder="work@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Phone / WhatsApp *</label>
                                <div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" /><input type="tel" className={`${fieldCls("phone")} pl-10`} placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></div>
                                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Country *</label>
                                <div className="relative"><Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" /><input className={`${fieldCls("country")} pl-10`} placeholder="UAE, Germany, India..." value={form.country} onChange={(e) => set("country", e.target.value)} /></div>
                                {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
                            </div>
                            <div>
                                <label className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">City / Location *</label>
                                <div className="relative"><MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" /><input className={`${fieldCls("city")} pl-10`} placeholder="Dubai, Berlin, Mumbai..." value={form.city} onChange={(e) => set("city", e.target.value)} /></div>
                                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                            </div>
                          </div>
                        </>
                      )}

                      {step === 1 && (
                        <>
                          <div>
                            <label className="text-xs md:text-sm font-bold text-foreground mb-3 block">Type of Organization *</label>
                            <div className="flex flex-wrap gap-2">
                              {ORG_TYPES.map((o) => <button key={o} type="button" className={chipCls(form.orgType === o)} onClick={() => set("orgType", o)}>{o}</button>)}
                            </div>
                            {errors.orgType && <p className="text-xs text-red-500 mt-2">{errors.orgType}</p>}
                          </div>
                          <div className="mt-2">
                            <label className="text-xs md:text-sm font-bold text-foreground mb-3 block">What do you need assistance with? *</label>
                            <div className="flex flex-wrap gap-2">
                              {ASSISTANCE_OPTIONS.map((a) => <button key={a} type="button" className={chipCls(form.assistance.includes(a))} onClick={() => toggleAssistance(a)}>{a}</button>)}
                            </div>
                            {errors.assistance && <p className="text-xs text-red-500 mt-2">{errors.assistance}</p>}
                          </div>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <div>
                            <label className="text-xs md:text-sm font-bold text-foreground mb-3 block">Are you looking to *</label>
                            <div className="flex flex-wrap gap-2">
                              {INTENT_OPTIONS.map((o) => <button key={o} type="button" className={chipCls(form.intent === o)} onClick={() => set("intent", o)}>{o}</button>)}
                            </div>
                            {errors.intent && <p className="text-xs text-red-500 mt-2">{errors.intent}</p>}
                          </div>
                          <div>
                            <label className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block mt-2">Equipment / Technology Needed</label>
                            <input className={`${fieldCls("equipmentNeeded")}`} placeholder="e.g. MRI Machine, Surgical Robotics..." value={form.equipmentNeeded} onChange={(e) => set("equipmentNeeded", e.target.value)} />
                          </div>
                          <div>
                            <label className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Project Details & Requirements *</label>
                            <textarea rows={4} className={`${fieldCls("projectDetails")} py-3 resize-none`} placeholder="Describe requirements, budget range, timeline..." value={form.projectDetails} onChange={(e) => set("projectDetails", e.target.value)} />
                            {errors.projectDetails && <p className="text-xs text-red-500 mt-1">{errors.projectDetails}</p>}
                          </div>
                        </>
                      )}

                      {step === 3 && (
                        <div className="flex flex-col gap-5">
                          <div className="bg-muted/20 border border-border/50 rounded-xl p-5 md:p-6 shadow-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                                <ReviewItem label="Organization" value={`${form.companyName} (${form.orgType})`} />
                                <ReviewItem label="Contact" value={`${form.fullName} - ${form.phone}`} />
                                <ReviewItem label="Email" value={form.email} />
                                <ReviewItem label="Location" value={`${form.city}, ${form.country}`} />
                                <ReviewItem label="Intent" value={form.intent} />
                                <ReviewItem label="Equipment" value={form.equipmentNeeded || "—"} />
                            </div>
                            <div className="mt-4 pt-4 border-t border-border/40">
                                <ReviewItem label="Assistance Required" value={form.assistance.join(", ")} />
                            </div>
                            <div className="mt-4 pt-4 border-t border-border/40">
                                <ReviewItem label="Project Details" value={form.projectDetails} />
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Toast Notification */}
                <AnimatePresence>
                  {toast && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-medium mt-4 ${
                        toast.type === "success"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {toast.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                      <span>{toast.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Controls */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/40">
                  {step > 0 ? (
                    <button onClick={prev} type="button" className="flex items-center gap-2 h-10 md:h-12 px-4 md:px-6 rounded-full text-sm font-medium border border-border/60 text-foreground hover:bg-muted transition-colors">
                      <ArrowLeft size={16} /> <span className="hidden sm:inline">Back</span>
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <button onClick={next} type="button" className="btn-primary h-10 md:h-12 px-6 md:px-8 rounded-full flex items-center gap-2 text-sm font-bold">
                      Continue <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button onClick={handleSubmit} disabled={submitting} type="button" className="btn-primary h-10 md:h-12 px-6 md:px-8 rounded-full flex items-center gap-2 text-sm font-bold disabled:opacity-60">
                      {submitting ? <><Loader2 size={16} className="animate-spin" /> Processing</> : <><Send size={16} /> Submit Inquiry</>}
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p className="font-medium text-foreground text-sm leading-relaxed">{value}</p>
    </div>
  );
}
