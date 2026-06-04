"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiEye, HiUpload, HiPhotograph, HiDocumentText, HiChartBar, HiTable, HiLightningBolt, HiCheck, HiClipboardList, HiSearch } from "react-icons/hi";

export default function VisionPage() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{
    description: string;
    objects: string[];
    text: string;
    labels: string[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        setImage(ev.target?.result as string);
        setIsAnalyzing(true);
        await new Promise((r) => setTimeout(r, 1500));
        setAnalysis({
          description: "This image appears to contain visual elements that can be analyzed. Based on the content, I can identify key components, extract any visible text, and provide a comprehensive analysis.",
          objects: ["Document", "Text block", "Header", "Footer", "Content area"],
          text: "Sample extracted text from the image would appear here...",
          labels: ["document", "text", "content", "analysis", "information"],
        });
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Vision AI"
          title="Intelligent Image Analysis"
          subtitle="Upload any image for AI-powered analysis — documents, charts, forms, photos, and more."
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Upload & Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-primary-text mb-4 flex items-center gap-2">
                <HiEye className="text-accent-red" />
                Upload Image
              </h3>

              {!image ? (
                <label className="block p-12 text-center border-2 border-dashed border-red-500/20 hover:border-red-500/40 rounded-2xl cursor-pointer transition-all group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <HiUpload className="text-white" size={28} />
                  </div>
                  <p className="text-sm text-primary-text mb-1">Click to upload image</p>
                  <p className="text-xs text-muted-text">PNG, JPG, GIF, WebP</p>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden bg-white/5">
                    <img src={image} alt="Uploaded" className="w-full h-64 object-contain" />
                    <button
                      onClick={() => { setImage(null); setAnalysis(null); }}
                      className="absolute top-2 right-2 px-3 py-1 rounded-lg bg-black/60 text-xs text-primary-text hover:bg-black/80 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>

          {/* Analysis Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {isAnalyzing ? (
              <GlassCard className="p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  <HiLightningBolt className="text-accent-red animate-pulse" size={24} />
                </div>
                <p className="text-sm text-secondary-text">Analyzing image...</p>
                <div className="flex gap-1 justify-center mt-3">
                  {[1, 2, 3].map((i) => (
                    <span key={i} className="typing-dot" />
                  ))}
                </div>
              </GlassCard>
            ) : analysis ? (
              <div className="space-y-4">
                <GlassCard className="p-5">
                  <h4 className="text-sm font-bold text-primary-text mb-2 flex items-center gap-2">
                    <HiEye className="text-accent-red" size={16} />
                    Description
                  </h4>
                  <p className="text-sm text-secondary-text">{analysis.description}</p>
                </GlassCard>

                <GlassCard className="p-5">
                  <h4 className="text-sm font-bold text-primary-text mb-2 flex items-center gap-2">
                    <HiSearch className="text-accent-red" size={16} />
                    Detected Objects
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.objects.map((obj) => (
                      <span key={obj} className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-accent-red border border-red-500/20">
                        {obj}
                      </span>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-5">
                  <h4 className="text-sm font-bold text-primary-text mb-2 flex items-center gap-2">
                    <HiDocumentText className="text-accent-red" size={16} />
                    Extracted Text
                  </h4>
                  <p className="text-sm text-secondary-text">{analysis.text}</p>
                </GlassCard>

                <GlassCard className="p-5">
                  <h4 className="text-sm font-bold text-primary-text mb-2 flex items-center gap-2">
                    <HiClipboardList className="text-accent-red" size={16} />
                    Labels
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.labels.map((label) => (
                      <span key={label} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-muted-text border border-white/10">
                        {label}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            ) : (
              <GlassCard className="p-8 text-center">
                <HiPhotograph className="text-muted-text mx-auto mb-3" size={40} />
                <p className="text-sm text-secondary-text">Upload an image to see analysis results.</p>
                <p className="text-xs text-muted-text mt-1">Analyze photos, screenshots, charts, contracts, forms, and diagrams.</p>
              </GlassCard>
            )}
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
