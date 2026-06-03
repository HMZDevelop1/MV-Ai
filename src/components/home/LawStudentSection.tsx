"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { HiScale, HiDocumentText, HiBookOpen, HiAcademicCap, HiClipboardList, HiShieldCheck } from "react-icons/hi";

const lawTools = [
  { icon: HiScale, title: "IRAC Analysis", desc: "Generate Issue, Rule, Application, Conclusion analysis for any case." },
  { icon: HiDocumentText, title: "Case Briefs", desc: "Instant case briefs with facts, issues, holdings, and reasoning." },
  { icon: HiBookOpen, title: "Legal Research", desc: "Deep legal research with comparative law analysis across jurisdictions." },
  { icon: HiAcademicCap, title: "Exam Prep", desc: "AI-generated practice exams, essay structures, and oral presentations." },
  { icon: HiClipboardList, title: "Flashcards & Quizzes", desc: "Generate legal term flashcards and multiple-choice quizzes." },
  { icon: HiShieldCheck, title: "Contract Analysis", desc: "Upload contracts for clause explanation and risk identification." },
];

export function LawStudentSection() {
  return (
    <SectionWrapper id="law-assistant" variant="dark">
      <SectionHeader
        badge="Law Assistant"
        title="Your Premium Legal Research Partner"
        subtitle="Purpose-built for law students with IRAC analysis, case briefs, exam prep, and comprehensive legal tools."
      />
      <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {lawTools.map((tool, i) => (
            <GlassCard key={tool.title} delay={i * 0.05} className="p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <tool.icon className="text-white" size={20} />
              </div>
              <div>
                <h4 className="text-base font-bold text-primary-text">{tool.title}</h4>
                <p className="text-sm text-secondary-text mt-1">{tool.desc}</p>
              </div>
            </GlassCard>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <HiScale className="text-accent-red" size={24} />
              <h3 className="text-xl font-bold text-primary-text">IRAC Generator</h3>
            </div>
            <div className="space-y-3 mb-6">
              {[
                { label: "Issue", content: "Whether a contract exists without consideration?" },
                { label: "Rule", content: "Consideration is an essential element for a valid contract..." },
                { label: "Application", content: "In this case, the promise was made without any exchange of value..." },
                { label: "Conclusion", content: "No valid contract exists due to lack of consideration." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-red">{item.label}</span>
                  <p className="text-sm text-primary-text mt-1">{item.content}</p>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-400">
              <HiShieldCheck className="inline mr-1" size={14} />
              Always verify legal information with official sources.
            </div>
          </GlassCard>
        </motion.div>
      </div>
      <div className="text-center">
        <Link href="/law">
          <Button variant="primary" size="lg" icon={<HiScale />}>
            Open Law Assistant
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
