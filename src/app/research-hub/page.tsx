"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiSearch, HiGlobe, HiBookOpen, HiDocumentText, HiAcademicCap, HiLightningBolt, HiSparkles, HiCollection } from "react-icons/hi";

export default function ResearchHubPage() {
  return (
    <div className="min-h-screen pt-24 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Research Hub"
          title="Deep Research Powered by AI"
          subtitle="Comprehensive research tools with source verification, citation generation, and multi-disciplinary analysis."
        />

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {[
            { icon: HiSearch, title: "Deep Research", desc: "In-depth research with verified sources across multiple disciplines.", color: "from-red-500 to-red-600" },
            { icon: HiGlobe, title: "Multi-Language", desc: "Research in multiple languages with translation support.", color: "from-red-500 to-red-700" },
            { icon: HiBookOpen, title: "Literature Review", desc: "Generate comprehensive literature reviews with source synthesis.", color: "from-red-500 to-red-600" },
            { icon: HiDocumentText, title: "Paper Analysis", desc: "Analyze academic papers with methodology review.", color: "from-red-500 to-red-700" },
            { icon: HiAcademicCap, title: "Citation Generator", desc: "Generate citations in APA, MLA, Chicago, IEEE, and more.", color: "from-red-500 to-red-600" },
            { icon: HiLightningBolt, title: "Fast Extraction", desc: "Extract key findings and conclusions from any paper.", color: "from-red-500 to-red-700" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="p-6 group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-primary-text mb-2">{item.title}</h3>
                <p className="text-sm text-secondary-text">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard className="p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-primary-text mb-4 flex items-center gap-2">
            <HiSparkles className="text-accent-red" />
            Start a Research Query
          </h3>
          <textarea
            placeholder="What would you like to research? Describe your topic..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl mv-input text-sm resize-none mb-4"
          />
          <div className="flex gap-2">
            <Button variant="primary" icon={<HiSearch />}>
              Research
            </Button>
            <Button variant="secondary" icon={<HiCollection />}>
              Recent
            </Button>
          </div>
        </GlassCard>
      </SectionWrapper>
    </div>
  );
}
