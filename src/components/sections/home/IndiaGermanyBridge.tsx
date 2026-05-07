"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Globe2, HeartPulse, Hospital, Navigation, ShieldCheck, Stethoscope, BriefcaseMedical } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

export function IndiaGermanyBridge() {
  const { t } = useLanguage();

  return (
    <section className="py-32 relative overflow-hidden bg-[#0a0f1c] text-white" id="india-germany-bridge">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center gap-4 mb-20 mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <Globe2 size={14} className="text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-100">{t("indiaGermanyBridge.badge")}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight"
          >
            {t("indiaGermanyBridge.titleLine1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
              {t("indiaGermanyBridge.titleGradient")}
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            {t("indiaGermanyBridge.subtitle")}
          </motion.p>
        </div>

        {/* 3-Column Bridge Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          
          {/* GERMANY SIDE */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 p-8 md:p-10 rounded-3xl border border-blue-500/20 bg-[#0d1526] shadow-[0_0_40px_rgba(59,130,246,0.1)] relative"
          >
            <div className="absolute top-0 right-8 h-1 w-20 bg-gradient-to-r from-transparent to-blue-500 rounded-b-full"></div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <ShieldCheck size={32} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-white">{t("indiaGermanyBridge.deTitle")}</h3>
                <p className="text-blue-300/80 text-sm">{t("indiaGermanyBridge.deSubtitle")}</p>
              </div>
            </div>

            <ul className="flex flex-col gap-4 mt-2">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded flex items-center justify-center bg-blue-500/20 text-blue-400 shrink-0"><Navigation size={12} /></div>
                <div>
                  <span className="block text-slate-200 font-medium">{t("indiaGermanyBridge.deFeat1")}</span>
                  <span className="text-sm text-slate-400">{t("indiaGermanyBridge.deFeat1Desc")}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                 <div className="mt-1 w-5 h-5 rounded flex items-center justify-center bg-blue-500/20 text-blue-400 shrink-0"><Navigation size={12} /></div>
                <div>
                  <span className="block text-slate-200 font-medium">{t("indiaGermanyBridge.deFeat2")}</span>
                  <span className="text-sm text-slate-400">{t("indiaGermanyBridge.deFeat2Desc")}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                 <div className="mt-1 w-5 h-5 rounded flex items-center justify-center bg-blue-500/20 text-blue-400 shrink-0"><Navigation size={12} /></div>
                <div>
                  <span className="block text-slate-200 font-medium">{t("indiaGermanyBridge.deFeat3")}</span>
                  <span className="text-sm text-slate-400">{t("indiaGermanyBridge.deFeat3Desc")}</span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* THE BRIDGE (CENTER) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex lg:flex-col items-center justify-center gap-6 py-12 relative"
          >
            {/* Animated Connector Lines for Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-gradient-to-r from-blue-500/0 via-slate-500/30 to-emerald-500/0 -z-10" />
            <motion.div 
              animate={{ x: ['-200%', '200%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="hidden lg:block absolute top-1/2 left-1/4 w-16 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_10px_#7dd3fc] -z-10" 
            />

            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all duration-500" />
              <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-700 p-2 relative z-10 flex items-center justify-center shadow-2xl">
                <Image
                  src="/logo/curabotics-logo.png"
                  alt="CuraBotics AI"
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain brightness-0 invert"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">{t("indiaGermanyBridge.centerTag")}</span>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-sky-300 whitespace-nowrap">Distributor Access</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-emerald-300 whitespace-nowrap">GeM Tenders</span>
              </div>
            </div>
          </motion.div>

          {/* INDIA SIDE */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-6 p-8 md:p-10 rounded-3xl border border-emerald-500/20 bg-[#0d1a19] shadow-[0_0_40px_rgba(16,185,129,0.05)] relative"
          >
            <div className="absolute top-0 left-8 h-1 w-20 bg-gradient-to-r from-emerald-500 to-transparent rounded-b-full"></div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Hospital size={32} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-white">{t("indiaGermanyBridge.inTitle")}</h3>
                <p className="text-emerald-300/80 text-sm">{t("indiaGermanyBridge.inSubtitle")}</p>
              </div>
            </div>

            <ul className="flex flex-col gap-4 mt-2">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded flex items-center justify-center bg-emerald-500/20 text-emerald-400 shrink-0"><HeartPulse size={12} /></div>
                <div>
                  <span className="block text-slate-200 font-medium">{t("indiaGermanyBridge.inFeat1")}</span>
                  <span className="text-sm text-slate-400">{t("indiaGermanyBridge.inFeat1Desc")}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                 <div className="mt-1 w-5 h-5 rounded flex items-center justify-center bg-emerald-500/20 text-emerald-400 shrink-0"><HeartPulse size={12} /></div>
                <div>
                  <span className="block text-slate-200 font-medium">{t("indiaGermanyBridge.inFeat2")}</span>
                  <span className="text-sm text-slate-400">{t("indiaGermanyBridge.inFeat2Desc")}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                 <div className="mt-1 w-5 h-5 rounded flex items-center justify-center bg-emerald-500/20 text-emerald-400 shrink-0"><HeartPulse size={12} /></div>
                <div>
                  <span className="block text-slate-200 font-medium">{t("indiaGermanyBridge.inFeat3")}</span>
                  <span className="text-sm text-slate-400">{t("indiaGermanyBridge.inFeat3Desc")}</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 mx-auto max-w-4xl p-8 md:p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold text-white mb-2">{t("indiaGermanyBridge.ctaTitle")}</h4>
            <p className="text-slate-400">{t("indiaGermanyBridge.ctaDesc")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0a0f1c] font-bold hover:bg-slate-200 transition-colors">
              <BriefcaseMedical size={18} />
              {t("indiaGermanyBridge.btn1")}
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors font-medium">
              {t("indiaGermanyBridge.btn2")}
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
