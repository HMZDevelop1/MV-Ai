"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiFilm, HiSparkles, HiClock, HiAdjustments, HiDownload, HiVolumeUp, HiPhotograph } from "react-icons/hi";

const styles = ["Cinematic", "Documentary", "Anime", "Cyberpunk", "3D Animation", "Stop Motion", "Vintage Film", "Nature"];
const durations = ["15s", "30s", "60s", "90s", "120s"];
const ratios = ["16:9", "9:16", "1:1", "4:3", "21:9"];

export default function VideoGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Cinematic");
  const [selectedDuration, setSelectedDuration] = useState("30s");
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2500);
  };

  return (
    <div className="min-h-screen pt-24 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Video Generator"
          title="Create Cinematic AI Videos"
          subtitle="Transform your ideas into stunning videos with AI-powered generation."
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-primary-text mb-4 flex items-center gap-2">
                <HiFilm className="text-accent-red" />
                Create Video
              </h3>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the video you want to create..."
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

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-text mb-2">Duration</p>
                  <div className="flex flex-wrap gap-1">
                    {durations.map((dur) => (
                      <button
                        key={dur}
                        onClick={() => setSelectedDuration(dur)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                          selectedDuration === dur
                            ? "bg-red-500/20 text-accent-red border border-red-500/30"
                            : "bg-white/5 text-muted-text border border-white/10"
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-text mb-2">Ratio</p>
                  <div className="flex flex-wrap gap-1">
                    {ratios.map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setSelectedRatio(ratio)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                          selectedRatio === ratio
                            ? "bg-red-500/20 text-accent-red border border-red-500/30"
                            : "bg-white/5 text-muted-text border border-white/10"
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-text mb-2">Voiceover</p>
                  <div className="flex gap-1">
                    <button className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-red-500/20 text-accent-red border border-red-500/30">On</button>
                    <button className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/5 text-muted-text border border-white/10">Off</button>
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
                {isGenerating ? "Generating..." : "Generate Video"}
              </Button>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <GlassCard key={i} className="aspect-video overflow-hidden group cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-red-900/20 to-black/60 flex items-center justify-center relative">
                  <HiFilm className="text-red-500/30" size={32} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                    <span className="text-[10px] text-primary-text">Sample {i}</span>
                    <HiDownload className="text-primary-text" size={12} />
                  </div>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
