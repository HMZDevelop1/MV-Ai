"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiSearch, HiGlobe, HiBookOpen, HiDocumentText, HiAcademicCap, HiLightningBolt, HiSparkles, HiLink, HiCheck, HiStar } from "react-icons/hi";

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{
    summary: string;
    sources: { title: string; url: string; relevance: number }[];
    findings: string[];
  } | null>(null);
  const [isResearching, setIsResearching] = useState(false);

  const handleResearch = async () => {
    if (!query.trim() || isResearching) return;
    setIsResearching(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2000));
    setResult({
      summary: `Research results for "${query}". This is a comprehensive analysis of the topic based on available sources. The research covers key aspects, recent developments, and important considerations. Multiple perspectives have been examined to provide a balanced overview.`,
      sources: [
        { title: `${query} - Academic Overview`, url: "#", relevance: 95 },
        { title: `${query} - Recent Developments`, url: "#", relevance: 88 },
        { title: `${query} - Comprehensive Guide`, url: "#", relevance: 82 },
        { title: `${query} - Expert Analysis`, url: "#", relevance: 76 },
      ],
      findings: [
        "Comprehensive analysis completed across multiple sources",
        "Key themes and patterns identified in the research",
        "Contrasting perspectives documented and evaluated",
        "Recent developments and updates incorporated",
        "Practical implications and applications identified",
      ],
    });
    setIsResearching(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Research Hub"
          title="Deep AI-Powered Research"
          subtitle="Comprehensive research with source gathering, analysis, and citation support."
        />

        <div className="max-w-4xl mx-auto">
          {/* Research Query */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <HiSearch className="text-accent-red" size={20} />
                <h3 className="text-lg font-bold text-primary-text">Research Query</h3>
              </div>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What would you like to research? Describe your topic..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl mv-input text-sm resize-none mb-4"
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Impact of AI on legal education",
                  "Climate change policy 2026",
                  "Quantum computing advances",
                  "International human rights law",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/5 text-muted-text border border-white/10 hover:bg-white/10 hover:text-primary-text transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={handleResearch}
                disabled={!query.trim() || isResearching}
                loading={isResearching}
                icon={<HiGlobe />}
              >
                Research
              </Button>
            </GlassCard>
          </motion.div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Summary */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-primary-text mb-3 flex items-center gap-2">
                  <HiBookOpen className="text-accent-red" size={20} />
                  Research Summary
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed">{result.summary}</p>
              </GlassCard>

              {/* Sources */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-primary-text mb-3 flex items-center gap-2">
                  <HiLink className="text-accent-red" size={20} />
                  Sources
                </h3>
                <div className="space-y-3">
                  {result.sources.map((source, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-accent-red">{source.relevance}%</span>
                        <div>
                          <p className="text-sm font-medium text-primary-text">{source.title}</p>
                          <p className="text-xs text-muted-text">{source.url}</p>
                        </div>
                      </div>
                      <HiCheck className="text-success" size={18} />
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Key Findings */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-primary-text mb-3 flex items-center gap-2">
                  <HiStar className="text-accent-red" size={20} />
                  Key Findings
                </h3>
                <ul className="space-y-2">
                  {result.findings.map((finding, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-secondary-text">
                      <HiCheck className="text-success mt-0.5 flex-shrink-0" size={16} />
                      {finding}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}
