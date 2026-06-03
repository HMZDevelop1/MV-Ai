"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { HiDocumentText, HiUpload, HiDocumentSearch, HiDocumentReport, HiPhotograph, HiScale, HiClipboardList } from "react-icons/hi";

export function DocumentAnalyzerSection() {
  return (
    <SectionWrapper id="document-analyzer" variant="dark">
      <SectionHeader
        badge="Document Analyzer"
        title="Intelligent Document Analysis"
        subtitle="Upload PDFs, DOCX, TXT files and get instant AI-powered analysis, summaries, and insights."
      />
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-8 text-center group cursor-pointer border-2 border-dashed border-red-500/20 hover:border-red-500/40 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <HiUpload className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-primary-text mb-2">Drop Files Here</h3>
            <p className="text-sm text-secondary-text mb-6">or click to browse files</p>
            <p className="text-xs text-muted-text">Supports PDF, DOCX, TXT, and images with text</p>
          </GlassCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {[
            { icon: HiDocumentReport, label: "Summarize", desc: "Get concise summaries of any document" },
            { icon: HiDocumentSearch, label: "Extract Key Ideas", desc: "Identify main concepts and arguments" },
            { icon: HiScale, label: "Legal Analysis", desc: "IRAC, contract review, court decisions" },
            { icon: HiClipboardList, label: "Generate Notes", desc: "Create study notes and flashcards" },
            { icon: HiPhotograph, label: "Image Text", desc: "Extract and analyze text from images" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                <item.icon className="text-accent-red" size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-primary-text">{item.label}</h4>
                <p className="text-xs text-secondary-text">{item.desc}</p>
              </div>
            </div>
          ))}
          <Link href="/document-analyzer">
            <Button variant="primary" className="w-full">
              Open Document Analyzer
            </Button>
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
