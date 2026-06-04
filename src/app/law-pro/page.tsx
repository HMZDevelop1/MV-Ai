"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import {
  HiScale, HiDocumentText, HiBookOpen, HiAcademicCap, HiClipboardList,
  HiShieldCheck, HiGlobe, HiHome, HiBriefcase, HiLibrary,
  HiLightningBolt, HiChat, HiPresentationChartBar, HiDocumentReport,
  HiSearch, HiStar
} from "react-icons/hi";
import { generateSmartResponse } from "@/lib/router-engine";

const legalTools = [
  { icon: HiScale, title: "IRAC Generator", desc: "Issue, Rule, Application, Conclusion framework analysis.", color: "from-red-500 to-red-600" },
  { icon: HiDocumentText, title: "Case Briefs", desc: "Facts, issues, holdings, reasoning, and dissents.", color: "from-red-500 to-red-700" },
  { icon: HiBookOpen, title: "Legal Research", desc: "Deep legal research with structured analysis.", color: "from-red-500 to-red-600" },
  { icon: HiDocumentReport, title: "Contract Analyzer", desc: "Clause-by-clause contract review.", color: "from-red-500 to-red-700" },
  { icon: HiSearch, title: "Legal Explainer", desc: "Complex legal concepts explained clearly.", color: "from-red-500 to-red-600" },
  { icon: HiLibrary, title: "Court Summarizer", desc: "Court decisions condensed with key holdings.", color: "from-red-500 to-red-700" },
  { icon: HiGlobe, title: "Comparative Law", desc: "Cross-jurisdiction legal comparison.", color: "from-red-500 to-red-600" },
  { icon: HiHome, title: "Civil Law", desc: "Obligations, property, family law assistance.", color: "from-red-500 to-red-700" },
  { icon: HiBriefcase, title: "Criminal Law", desc: "Criminal concepts, defenses, procedures.", color: "from-red-500 to-red-600" },
  { icon: HiLibrary, title: "Constitutional", desc: "Constitutional principles and landmark cases.", color: "from-red-500 to-red-700" },
  { icon: HiAcademicCap, title: "Business Law", desc: "Corporate, contracts, partnerships, agency.", color: "from-red-500 to-red-600" },
  { icon: HiPresentationChartBar, title: "Admin Law", desc: "Administrative procedures and judicial review.", color: "from-red-500 to-red-700" },
];

const quickLegalQueries = [
  "Generate an IRAC analysis for a contract dispute",
  "Summarize the key elements of negligence",
  "Explain the doctrine of precedent",
  "Create a case brief template",
  "What is the difference between civil and criminal law?",
  "Analyze this contract clause",
];

export default function LawProPage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLegalQuery = async () => {
    if (!query.trim() || isLoading) return;
    setIsLoading(true);
    setResponse("");
    await new Promise((r) => setTimeout(r, 1000));
    setResponse(generateSmartResponse(query, "law"));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Law Mode Pro"
          title="Premium Legal Research & Analysis"
          subtitle="Comprehensive legal tools for law students — IRAC, case briefs, contract analysis, exam prep, and more."
        />

        {/* Legal Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {legalTools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <GlassCard className="p-5 group cursor-pointer h-full">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="text-white" size={20} />
                </div>
                <h4 className="text-sm font-bold text-primary-text">{tool.title}</h4>
                <p className="text-xs text-secondary-text mt-1">{tool.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Legal Query */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <HiScale className="text-accent-red" size={20} />
                <h3 className="text-lg font-bold text-primary-text">Legal Query</h3>
              </div>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask any legal question or request an IRAC analysis..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl mv-input text-sm resize-none mb-4"
              />
              <Button
                variant="primary"
                className="w-full"
                onClick={handleLegalQuery}
                disabled={!query.trim() || isLoading}
                loading={isLoading}
                icon={<HiScale />}
              >
                Analyze
              </Button>
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-secondary-text whitespace-pre-wrap"
                >
                  {response}
                </motion.div>
              )}
            </GlassCard>
          </motion.div>

          {/* Quick Queries */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <HiStar className="text-accent-red" size={20} />
                <h3 className="text-lg font-bold text-primary-text">Quick Legal Queries</h3>
              </div>
              <div className="space-y-2">
                {quickLegalQueries.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(q)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-red-500/20 transition-all text-left group"
                  >
                    <HiLightningBolt className="text-accent-red group-hover:scale-110 transition-transform flex-shrink-0" size={14} />
                    <span className="text-xs text-secondary-text group-hover:text-primary-text transition-colors">{q}</span>
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Legal Disclaimer */}
            <GlassCard className="p-5 mt-4 border-yellow-500/20">
              <div className="flex items-start gap-3">
                <HiShieldCheck className="text-yellow-400 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="text-xs font-bold text-yellow-400 mb-1">Legal Accuracy Notice</h4>
                  <p className="text-[11px] text-secondary-text leading-relaxed">
                    MV AI is a study aid. Always verify legal information with official legislation, 
                    court decisions, government sources, university materials, or your professor. 
                    For specific legal matters, consult a qualified attorney.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
