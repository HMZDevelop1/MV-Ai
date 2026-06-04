"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiPhotograph, HiSparkles, HiDownload, HiCollection, HiAdjustments, HiPhotograph as HiPhoto } from "react-icons/hi";

const styles = ["Photorealistic", "Cinematic", "3D Render", "Anime", "Oil Painting", "Watercolor", "Pixel Art", "Cyberpunk", "Minimalist", "Vintage", "Logo Design", "Poster Art"];
const ratios = ["1:1", "16:9", "9:16", "4:3", "3:2", "21:9"];
const qualities = ["Standard", "HD", "4K"];

export default function ImageStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Photorealistic");
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [selectedQuality, setSelectedQuality] = useState("HD");
  const [isGenerating, setIsGenerating] = useState(false);
  const [gallery, setGallery] = useState<number[]>([]);

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGallery((prev) => [Date.now(), ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Image Studio"
          title="Create Premium AI Images"
          subtitle="Professional image generation for logos, posters, social media, branding, and more."
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-text mb-2">Ratio</p>
                  <div className="flex flex-wrap gap-1">
                    {ratios.map((r) => (
                      <button
                        key={r}
                        onClick={() => setSelectedRatio(r)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                          selectedRatio === r
                            ? "bg-red-500/20 text-accent-red border border-red-500/30"
                            : "bg-white/5 text-muted-text border border-white/10"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-text mb-2">Quality</p>
                  <div className="flex gap-1">
                    {qualities.map((q) => (
                      <button
                        key={q}
                        onClick={() => setSelectedQuality(q)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                          selectedQuality === q
                            ? "bg-red-500/20 text-accent-red border border-red-500/30"
                            : "bg-white/5 text-muted-text border border-white/10"
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
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
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary-text flex items-center gap-2">
                  <HiCollection className="text-accent-red" />
                  Gallery
                </h3>
                <span className="text-xs text-muted-text">{gallery.length} images</span>
              </div>
              {gallery.length === 0 ? (
                <div className="text-center py-12">
                  <HiPhoto className="text-muted-text mx-auto mb-3" size={36} />
                  <p className="text-sm text-secondary-text">No images generated yet.</p>
                  <p className="text-xs text-muted-text mt-1">Your creations will appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {gallery.map((id) => (
                    <GlassCard key={id} className="aspect-square overflow-hidden group cursor-pointer">
                      <div className="w-full h-full bg-gradient-to-br from-red-900/30 to-black/50 flex items-center justify-center relative">
                        <HiPhoto className="text-red-500/30" size={32} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                          <span className="text-[10px] text-primary-text">{selectedStyle}</span>
                          <HiDownload className="text-primary-text" size={14} />
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
