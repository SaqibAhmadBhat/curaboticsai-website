"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  User,
  Globe,
  MapPin,
  CheckCircle2,
  Loader2,
  Send,
  MessageSquare,
  AlertCircle,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

interface Toast {
  type: "success" | "error";
  message: string;
}

const ORG_TYPES = [
  "Hospital",
  "Clinic",
  "Laboratory",
  "Distributor",
  "Government",
  "Private Buyer",
  "Manufacturer",
  "Other",
];

const ASSISTANCE_OPTIONS = [
  "Medical Equipment Procurement",
  "Manufacturer/Supplier Connection",
  "AI Automation Integration",
  "Robotics Solutions",
  "Equipment Maintenance/Repair",
  "Diagnostic Setup",
  "Hospital Infrastructure Planning",
  "Business Partnership / Deal Negotiation",
];

const INTENT_OPTIONS = [
  "Purchase Equipment",
  "Find Manufacturer/Supplier",
  "Build Partnership",
  "Integrate Technology",
  "Service Existing Equipment",
];

const STEP_LABELS = [
  "Contact Details",
  "Organization",
  "Requirements",
  "Review & Submit",
];

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  orgType: string;
  assistance: string[];
  equipmentNeeded: string;
  intent: string;
  projectDetails: string;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  orgType: "",
  assistance: [],
  equipmentNeeded: "",
  intent: "",
  projectDetails: "",
};

export function ContactCta() {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ ...INITIAL_FORM });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [toast, setToast] = useState<Toast | null>(null);

  const set = (key: keyof FormData, val: string | string[]) =>
    setForm((p) => ({ ...p, [key]: val }));

  const toggleAssistance = (item: string) => {
    setForm((p) => ({
      ...p,
      assistance: p.assistance.includes(item)
        ? p.assistance.filter((a) => a !== item)
        : [...p.assistance, item],
    }));
  };

  /* ---------- Validation ---------- */
  const validateStep = (): boolean => {
    const e: typeof errors = {};
    if (step === 0) {
      if (!form.fullName.trim()) e.fullName = "Required";
      if (!form.companyName.trim()) e.companyName = "Required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
        e.email = "Valid email required";
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

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 3));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  /* ---------- Submission ---------- */
  const buildWhatsAppMsg = () => {
    const lines = [
      `🏥 *CuraBotics AI — New Enterprise Inquiry*`,
      ``,
      `👤 *Name:* ${form.fullName}`,
      `🏢 *Company:* ${form.companyName}`,
      `📧 *Email:* ${form.email}`,
      `📞 *Phone:* ${form.phone}`,
      `🌍 *Location:* ${form.city}, ${form.country}`,
      `🏛️ *Organization Type:* ${form.orgType}`,
      ``,
      `🔧 *Assistance Needed:*`,
      ...form.assistance.map((a) => `  • ${a}`),
      ``,
      `🎯 *Intent:* ${form.intent}`,
      form.equipmentNeeded ? `🔬 *Equipment/Tech:* ${form.equipmentNeeded}` : "",
      ``,
      `📋 *Project Details:*`,
      form.projectDetails,
    ];
    return encodeURIComponent(lines.filter(Boolean).join("\n"));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setToast(null);

    try {
      /* 1. Submit to backend API */
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({ type: "error", message: data.error || "Submission failed. Please try again." });
        setSubmitting(false);
        return;
      }

      /* 2. Open WhatsApp with prefilled message */
      const waMsg = buildWhatsAppMsg();
      window.open(`https://wa.me/917006557535?text=${waMsg}`, "_blank");

      setToast({ type: "success", message: "Inquiry submitted successfully! Check WhatsApp to confirm." });
      setSubmitting(false);
      setSubmitted(true);
    } catch {
      setToast({ type: "error", message: "Network error. Please check your connection and try again." });
      setSubmitting(false);
    }
  };

  /* ---------- Field helpers ---------- */
  const fieldCls = (key: keyof FormData) =>
    `w-full h-14 px-5 rounded-xl bg-background/80 border ${
      errors[key] ? "border-red-500" : "border-border/60"
    } text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all`;

  const chipCls = (active: boolean) =>
    `px-4 py-2.5 rounded-full text-sm font-medium border cursor-pointer transition-all select-none ${
      active
        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
        : "bg-background/60 border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
    }`;

  /* ---------- Render ---------- */
  if (submitted)
    return (
      <section className="py-24 bg-background relative border-t border-border/50 overflow-hidden">
        <Container className="relative z-10 max-w-3xl text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold">
              Inquiry Received
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Thank you. CuraBotics AI has received your inquiry. Our enterprise
              healthcare solutions and procurement team will contact you within
              24–48 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setForm({ ...INITIAL_FORM });
              }}
              className="btn-primary h-12 px-8 rounded-full mt-4"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        </Container>
      </section>
    );

  return (
    <section
      className="py-20 md:py-28 bg-background relative border-t border-border/50 overflow-hidden"
      id="contact"
    >
      {/* BG Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-16 h-1 bg-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight leading-tight">
            Enterprise Healthcare{" "}
            <span className="text-primary">Consultation</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you need to procure advanced medical equipment, connect with
            global manufacturers, integrate AI automation, or structure
            partnership deals — our team is standing by.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ---- LEFT: Info Panel ---- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="glassmorphism rounded-2xl border border-border/50 p-6 md:p-8 flex flex-col gap-5">
              <h3 className="text-xl font-heading font-bold">
                How CuraBotics AI Helps You
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                {[
                  "Source & purchase medical equipment from manufacturers",
                  "Connect with trusted global MedTech suppliers",
                  "Negotiate & manage procurement deals",
                  "AI automation & robotics integration",
                  "Equipment servicing & maintenance",
                  "Hospital infrastructure consulting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact */}
            <div className="glassmorphism rounded-2xl border border-border/50 p-6 flex flex-col gap-4">
              <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-muted-foreground">
                Direct Contact
              </h4>
              <a
                href="https://wa.me/917006557535"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    WhatsApp
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    +91 7006557535
                  </p>
                </div>
              </a>
              <a
                href="mailto:er.swt.saqibahmad@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    er.swt.saqibahmad@gmail.com
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* ---- RIGHT: Multi-step Form ---- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glassmorphism rounded-3xl border border-border/50 p-6 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

              {/* Progress */}
              <div className="relative z-10 flex items-center justify-between mb-10">
                {STEP_LABELS.map((label, i) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 flex-1"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        i <= step
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : "bg-muted/40 text-muted-foreground border border-border/60"
                      }`}
                    >
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-[10px] font-medium text-center hidden sm:block ${
                        i <= step ? "text-primary" : "text-muted-foreground/60"
                      }`}
                    >
                      {label}
                    </span>
                    {i < STEP_LABELS.length - 1 && (
                      <div
                        className={`absolute top-4 h-0.5 transition-colors ${
                          i < step ? "bg-primary" : "bg-border/40"
                        }`}
                        style={{
                          left: `${(100 / STEP_LABELS.length) * i + 100 / STEP_LABELS.length / 2}%`,
                          width: `${100 / STEP_LABELS.length - 8}%`,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Steps */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10 flex flex-col gap-5"
                >
                  {/* ------ STEP 0: Contact Details ------ */}
                  {step === 0 && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User
                              size={16}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                            />
                            <input
                              className={`${fieldCls("fullName")} pl-10`}
                              placeholder="Your full name"
                              value={form.fullName}
                              onChange={(e) => set("fullName", e.target.value)}
                            />
                          </div>
                          {errors.fullName && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.fullName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
                            Company / Organization *
                          </label>
                          <div className="relative">
                            <Building2
                              size={16}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                            />
                            <input
                              className={`${fieldCls("companyName")} pl-10`}
                              placeholder="Hospital, Clinic, Company"
                              value={form.companyName}
                              onChange={(e) =>
                                set("companyName", e.target.value)
                              }
                            />
                          </div>
                          {errors.companyName && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.companyName}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail
                              size={16}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                            />
                            <input
                              type="email"
                              className={`${fieldCls("email")} pl-10`}
                              placeholder="your@company.com"
                              value={form.email}
                              onChange={(e) => set("email", e.target.value)}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
                            Phone / WhatsApp *
                          </label>
                          <div className="relative">
                            <Phone
                              size={16}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                            />
                            <input
                              type="tel"
                              className={`${fieldCls("phone")} pl-10`}
                              placeholder="+91 XXXXX XXXXX"
                              value={form.phone}
                              onChange={(e) => set("phone", e.target.value)}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
                            Country *
                          </label>
                          <div className="relative">
                            <Globe
                              size={16}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                            />
                            <input
                              className={`${fieldCls("country")} pl-10`}
                              placeholder="India, Germany, UAE..."
                              value={form.country}
                              onChange={(e) => set("country", e.target.value)}
                            />
                          </div>
                          {errors.country && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.country}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
                            City / Location *
                          </label>
                          <div className="relative">
                            <MapPin
                              size={16}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                            />
                            <input
                              className={`${fieldCls("city")} pl-10`}
                              placeholder="Mumbai, Berlin, Dubai..."
                              value={form.city}
                              onChange={(e) => set("city", e.target.value)}
                            />
                          </div>
                          {errors.city && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.city}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* ------ STEP 1: Organization ------ */}
                  {step === 1 && (
                    <>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                          Type of Organization *
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {ORG_TYPES.map((o) => (
                            <button
                              key={o}
                              type="button"
                              className={chipCls(form.orgType === o)}
                              onClick={() => set("orgType", o)}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                        {errors.orgType && (
                          <p className="text-xs text-red-500 mt-2">
                            {errors.orgType}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                          What do you need assistance with? *
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {ASSISTANCE_OPTIONS.map((a) => (
                            <button
                              key={a}
                              type="button"
                              className={chipCls(form.assistance.includes(a))}
                              onClick={() => toggleAssistance(a)}
                            >
                              {a}
                            </button>
                          ))}
                        </div>
                        {errors.assistance && (
                          <p className="text-xs text-red-500 mt-2">
                            {errors.assistance}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* ------ STEP 2: Requirements ------ */}
                  {step === 2 && (
                    <>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                          Are you looking to *
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {INTENT_OPTIONS.map((o) => (
                            <button
                              key={o}
                              type="button"
                              className={chipCls(form.intent === o)}
                              onClick={() => set("intent", o)}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                        {errors.intent && (
                          <p className="text-xs text-red-500 mt-2">
                            {errors.intent}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
                          Equipment / Technology / Products Needed
                        </label>
                        <textarea
                          rows={2}
                          className={`${fieldCls("equipmentNeeded")} h-auto py-3 resize-none`}
                          placeholder="e.g. MRI Machine, CT Scanner, Surgical Robotics..."
                          value={form.equipmentNeeded}
                          onChange={(e) =>
                            set("equipmentNeeded", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
                          Full Requirements / Project Details *
                        </label>
                        <textarea
                          rows={4}
                          className={`${fieldCls("projectDetails")} h-auto py-3 resize-none`}
                          placeholder="Describe your complete requirements, budget range, timeline, quantity, or any specific manufacturer preferences..."
                          value={form.projectDetails}
                          onChange={(e) =>
                            set("projectDetails", e.target.value)
                          }
                        />
                        {errors.projectDetails && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.projectDetails}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* ------ STEP 3: Review ------ */}
                  {step === 3 && (
                    <div className="flex flex-col gap-4">
                      <h4 className="text-lg font-heading font-bold">
                        Review Your Inquiry
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <ReviewItem label="Name" value={form.fullName} />
                        <ReviewItem label="Company" value={form.companyName} />
                        <ReviewItem label="Email" value={form.email} />
                        <ReviewItem label="Phone" value={form.phone} />
                        <ReviewItem
                          label="Location"
                          value={`${form.city}, ${form.country}`}
                        />
                        <ReviewItem label="Org Type" value={form.orgType} />
                        <ReviewItem
                          label="Assistance"
                          value={form.assistance.join(", ")}
                        />
                        <ReviewItem label="Intent" value={form.intent} />
                      </div>
                      {form.equipmentNeeded && (
                        <ReviewItem
                          label="Equipment"
                          value={form.equipmentNeeded}
                        />
                      )}
                      <div className="bg-muted/30 p-4 rounded-xl border border-border/40">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                          Project Details
                        </p>
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {form.projectDetails}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        By submitting, your inquiry will be sent via email and
                        WhatsApp to our procurement team for immediate
                        processing.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t border-border/40">
                {step > 0 ? (
                  <button
                    onClick={prev}
                    className="flex items-center gap-2 h-12 px-6 rounded-full text-sm font-medium border border-border/60 text-foreground hover:bg-muted transition-colors"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={next}
                    className="btn-primary h-12 px-8 rounded-full flex items-center gap-2 text-sm font-bold"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="btn-primary h-12 px-8 rounded-full flex items-center gap-2 text-sm font-bold disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />{" "}
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Submit Inquiry
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className="fixed bottom-6 right-6 z-50 max-w-md"
          >
            <div
              className={`flex items-start gap-3 px-5 py-4 rounded-xl shadow-2xl border ${
                toast.type === "success"
                  ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-100"
                  : "bg-red-950/90 border-red-500/30 text-red-100"
              } backdrop-blur-lg`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
              )}
              <p className="text-sm font-medium leading-relaxed">{toast.message}</p>
              <button
                onClick={() => setToast(null)}
                className="shrink-0 ml-2 hover:opacity-70 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm text-foreground">{value || "—"}</p>
    </div>
  );
}
