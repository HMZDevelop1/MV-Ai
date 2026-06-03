"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { HiSearch, HiGlobe, HiBookOpen, HiDocumentText, HiAcademicCap, HiLightningBolt } from "react-icons/hi";

export function ResearchHubSection() {
  return (
    <SectionWrapper id="research-hub">
      <SectionHeader
        badge="Research Hub"
        title="Deep Research Capabilities"
        subtitle="Comprehensive research tools with source verification, citation generation, and multi-disciplinary analysis."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {[
          { icon: HiSearch, title: "Deep Research", desc: "In-depth research with verified sources and citations across multiple disciplines." },
          { icon: HiGlobe, title: "Multi-Language", desc: "Research and analyze content in multiple languages with translation support." },
          { icon: HiBookOpen, title: "Literature Review", desc: "Generate comprehensive literature reviews with source synthesis." },
          { icon: HiDocumentText, title: "Paper Analysis", desc: "Analyze academic papers with methodology review and critique." },
          { icon: HiAcademicCap, title: "Citation Generator", desc: "Generate accurate citations in APA, MLA, Chicago, IEEE, and Harvard." },
          { icon: HiLightningBolt, title: "Fast Extraction", desc: "Extract key findings, methodologies, and conclusions from any research paper." },
        ].map((item, i) => (
          <GlassCard key={item.title} delay={i * 0.05} className="p-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4">
              <item.icon className="text-white" size={20} />
            </div>
            <h3 className="text-base font-bold text-primary-text mb-2">{item.title}</h3>
            <p className="text-sm text-secondary-text">{item.desc}</p>
          </GlassCard>
        ))}
      </div>
      <div className="text-center">
        <Link href="/research-hub">
          <Button variant="primary" size="lg">
            Open Research Hub
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
