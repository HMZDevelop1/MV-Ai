"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiUpload, HiDocumentText, HiDocumentSearch, HiDocumentReport, HiScale, HiClipboardList, HiPhotograph, HiLightningBolt, HiMenu } from "react-icons/hi";

export default function DocumentAnalyzerPage() {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div className="min-h-screen pt-24 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Document Analyzer"
          title="Intelligent Document Analysis"
          subtitle="Upload any document and get instant AI-powered analysis, summaries, and insights."
        />

        <div className="max-w-4xl mx-auto">
          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard
              className={`p-12 text-center border-2 border-dashed transition-all cursor-pointer ${
                isDragOver ? "border-red-500 bg-red-500/5" : "border-red-500/20 hover:border-red-500/40"
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6">
                <HiUpload className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-primary-text mb-2">
                Drop your document here
              </h3>
              <p className="text-secondary-text mb-2">or click to browse files</p>
              <p className="text-xs text-muted-text mb-6">
                Supports PDF, DOCX, TXT, and images with text (max 50MB)
              </p>
              <Button variant="primary" icon={<HiUpload />}>
                Choose File
              </Button>
            </GlassCard>
          </motion.div>

          {/* Analysis Options */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {[
              { icon: HiDocumentReport, title: "Summarize", desc: "Get a concise summary of the document's key points." },
              { icon: HiDocumentSearch, title: "Extract Ideas", desc: "Identify main concepts, arguments, and themes." },
              { icon: HiScale, title: "Legal Analysis", desc: "IRAC analysis, contract review, court decisions." },
              { icon: HiClipboardList, title: "Generate Notes", desc: "Create structured study notes from content." },
              { icon: HiMenu, title: "Create Flashcards", desc: "Auto-generate flashcards for review." },
              { icon: HiLightningBolt, title: "Quick Quiz", desc: "Generate quiz questions based on content." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard className="p-5 cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <item.icon className="text-white" size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-primary-text">{item.title}</h4>
                  <p className="text-xs text-secondary-text mt-1">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Recent Analyses */}
          <GlassCard className="p-6 mt-8">
            <h3 className="text-lg font-bold text-primary-text mb-4 flex items-center gap-2">
              <HiDocumentText className="text-accent-red" />
              Recent Analyses
            </h3>
            <p className="text-sm text-muted-text">No documents analyzed yet. Upload a document to get started.</p>
          </GlassCard>
        </div>
      </SectionWrapper>
    </div>
  );
}
