"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiFilm, HiSparkles, HiClock, HiAdjustments, HiDownload, HiVolumeUp, HiPhotograph, HiCollection } from "react-icons/hi";

const styles = ["Cinematic", "Educational", "Documentary", "Anime", "Explainer", "Social Media", "Presentation", "Motion Graphics"];
const durations = ["15s", "30s", "60s", "90s", "120s", "180s"];
const ratios = ["16:9", "9:16", "1:1", "4:3", "21:9"];

export default function VideoStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Cinematic");
  const [selectedDuration, setSelectedDuration] = useState("30s");
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [voiceover, setVoiceover] = useState(true);
  const [subtitles, setSubtitles] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [gallery, setGallery] = useState<number[]>([]);

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGallery((prev) => [Date.now(), ...prev]);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Video Studio"
          title="Cinematic AI Video Creation"
          subtitle="Professional video generation for education, social media, presentations, and more."
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
                        className={`px-2 py-1 rounded-full text-[10px] font-medium transition-all ${
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
                    {ratios.map((r) => (
                      <button
                        key={r}
                        onClick={() => setSelectedRatio(r)}
                        className={`px-2 py-1 rounded-full text-[10px] font-medium transition-all ${
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
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={voiceover} onChange={() => setVoiceover(!voiceover)} className="accent-red-500" />
                    <span className="text-xs text-muted-text">Voiceover</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={subtitles} onChange={() => setSubtitles(!subtitles)} className="accent-red-500" />
                    <span className="text-xs text-muted-text">Subtitles</span>
                  </label>
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
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary-text flex items-center gap-2">
                  <HiCollection className="text-accent-red" />
                  Video Gallery
                </h3>
                <span className="text-xs text-muted-text">{gallery.length} videos</span>
              </div>
              {gallery.length === 0 ? (
                <div className="text-center py-12">
                  <HiFilm className="text-muted-text mx-auto mb-3" size={36} />
                  <p className="text-sm text-secondary-text">No videos generated yet.</p>
                  <p className="text-xs text-muted-text mt-1">Your creations will appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {gallery.map((id) => (
                    <GlassCard key={id} className="aspect-video overflow-hidden group cursor-pointer">
                      <div className="w-full h-full bg-gradient-to-br from-red-900/20 to-black/60 flex items-center justify-center relative">
                        <HiFilm className="text-red-500/30" size={28} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                          <span className="text-[10px] text-primary-text">{selectedDuration}</span>
                          <HiDownload className="text-primary-text" size={12} />
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
