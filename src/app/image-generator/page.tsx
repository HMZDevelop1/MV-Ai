"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiPhotograph, HiSparkles, HiDownload, HiCollection, HiAdjustments, HiPhotograph as HiPhoto } from "react-icons/hi";

const styles = ["Photorealistic", "Cinematic", "3D Render", "Anime", "Oil Painting", "Watercolor", "Pixel Art", "Cyberpunk", "Minimalist", "Vintage"];
const ratios = ["1:1", "16:9", "9:16", "4:3", "3:2", "21:9"];

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Photorealistic");
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Image Generator"
          title="Create Stunning AI Images"
          subtitle="Turn your imagination into reality with premium AI image generation."
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-primary-text mb-4 flex items-center gap-2">
                <HiPhotograph className="text-accent-red" />
                Create Image
              </h3>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl mv-input text-sm resize-none mb-4"
              />

              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-text mb-2">Style</p>
                <div className="flex flex-wrap gap-2">
                  {styles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedStyle === style
                          ? "bg-red-500/20 text-accent-red border border-red-500/30"
                          : "bg-white/5 text-muted-text border border-white/10 hover:border-white/20"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-text mb-2">Aspect Ratio</p>
                <div className="flex flex-wrap gap-2">
                  {ratios.map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setSelectedRatio(ratio)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedRatio === ratio
                          ? "bg-red-500/20 text-accent-red border border-red-500/30"
                          : "bg-white/5 text-muted-text border border-white/10 hover:border-white/20"
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full"
                icon={isGenerating ? undefined : <HiSparkles />}
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                loading={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Image"}
              </Button>
            </GlassCard>

            <GlassCard className="p-4 mt-4">
              <div className="flex items-center gap-2 text-xs text-muted-text">
                <HiCollection />
                <span>35 images generated today</span>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <GlassCard key={i} className="aspect-square overflow-hidden group cursor-pointer">
                  <div className="w-full h-full bg-gradient-to-br from-red-900/30 to-black/50 flex items-center justify-center relative">
                    <HiPhoto className="text-red-500/30" size={36} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <span className="text-xs text-primary-text">Sample {i}</span>
                      <HiDownload className="text-primary-text" size={14} />
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
