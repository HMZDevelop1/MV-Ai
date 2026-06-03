"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import {
  HiScale, HiDocumentText, HiBookOpen, HiAcademicCap, HiClipboardList,
  HiShieldCheck, HiGlobe, HiLibrary, HiBriefcase, HiHome,
  HiLightningBolt, HiChat, HiPresentationChartBar, HiDocumentReport,
  HiMenu, HiSearch
} from "react-icons/hi";

const legalTools = [
  { icon: HiScale, title: "IRAC Analysis Generator", desc: "Generate comprehensive Issue, Rule, Application, and Conclusion analyses for any legal scenario." },
  { icon: HiDocumentText, title: "Case Brief Generator", desc: "Create detailed case briefs with facts, issues, holdings, reasoning, and dissents." },
  { icon: HiBookOpen, title: "Legal Concept Explanation", desc: "Understand complex legal concepts explained in clear, structured language." },
  { icon: HiLibrary, title: "Court Decision Summarizer", desc: "Summarize court decisions with key holdings and legal significance." },
  { icon: HiDocumentReport, title: "Contract Explanation", desc: "Upload contracts for clause-by-clause explanation and risk identification." },
  { icon: HiSearch, title: "Legal Document Analyzer", desc: "Analyze legal documents for key terms, obligations, and potential issues." },
  { icon: HiMenu, title: "Legal Terminology Assistant", desc: "Definitions and explanations of legal terms and phrases." },
  { icon: HiGlobe, title: "Comparative Law Assistant", desc: "Compare legal approaches across different jurisdictions and legal systems." },
  { icon: HiHome, title: "Civil Law Assistant", desc: "Focused assistance on civil law topics including obligations, property, and family law." },
  { icon: HiBriefcase, title: "Criminal Law Assistant", desc: "Criminal law concepts, defenses, procedures, and case analysis." },
  { icon: HiLibrary, title: "Constitutional Law Assistant", desc: "Constitutional principles, rights, doctrines, and landmark cases." },
  { icon: HiAcademicCap, title: "Business Law Assistant", desc: "Corporate law, contracts, partnerships, agency, and commercial transactions." },
];

const practiceModes = [
  { icon: HiClipboardList, title: "Exam Preparation", desc: "Practice exams, essay questions, and multiple-choice tests." },
  { icon: HiPresentationChartBar, title: "Oral Presentation", desc: "Generate structured oral arguments and presentation scripts." },
  { icon: HiDocumentReport, title: "Research Plan", desc: "Create comprehensive legal research plans and methodologies." },
  { icon: HiDocumentText, title: "Essay Structure", desc: "Generate structured essay outlines for legal topics." },
  { icon: HiMenu, title: "Legal Flashcards", desc: "Generate flashcards for legal terms, cases, and concepts." },
  { icon: HiLightningBolt, title: "Quiz Generator", desc: "Create custom quizzes for law exam preparation." },
];

export default function LawPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Law Assistant"
          title="Your Premium Legal Research Platform"
          subtitle="Purpose-built for law students with comprehensive legal analysis, research, and exam preparation tools."
        />

        {/* Hero CTA */}
        <div className="max-w-3xl mx-auto mb-16">
          <GlassCard className="p-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6">
              <HiScale className="text-white" size={40} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-text mb-4">
              How can I help with your legal studies?
            </h2>
            <p className="text-secondary-text mb-6 max-w-xl mx-auto">
              Select a tool below or ask a legal question directly. I provide structured legal analysis with proper disclaimers.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" icon={<HiChat />}>
                Start Legal Chat
              </Button>
              <Button variant="secondary" size="lg" icon={<HiDocumentText />}>
                Upload Document
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* Legal Tools Grid */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-primary-text mb-6">Legal Analysis Tools</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {legalTools.map((tool, i) => (
              <GlassCard key={tool.title} delay={i * 0.03} className="p-5 group cursor-pointer" onClick={() => setActiveTool(tool.title)}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <tool.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary-text">{tool.title}</h4>
                    <p className="text-xs text-secondary-text mt-1">{tool.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Practice & Exam Prep */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-primary-text mb-6">Practice & Exam Preparation</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practiceModes.map((tool, i) => (
              <GlassCard key={tool.title} delay={i * 0.03} className="p-5 group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <tool.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary-text">{tool.title}</h4>
                    <p className="text-xs text-secondary-text mt-1">{tool.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <GlassCard className="p-6 max-w-3xl mx-auto border-yellow-500/20">
          <div className="flex items-start gap-3">
            <HiShieldCheck className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-bold text-yellow-400 mb-2">Important Legal Notice</h4>
              <p className="text-xs text-secondary-text leading-relaxed">
                MV AI is designed as a study aid and research tool. It does not provide legal advice. 
                Always verify legal information with official sources, updated legislation, court websites, 
                professor materials, or university documents. Legal information may vary by jurisdiction 
                and may become outdated. For specific legal matters, consult a qualified attorney.
              </p>
            </div>
          </div>
        </GlassCard>
      </SectionWrapper>
    </div>
  );
}
