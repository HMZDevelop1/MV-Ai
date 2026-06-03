"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { HiFilm, HiSparkles, HiClock, HiAdjustments } from "react-icons/hi";

export function VideoGeneratorSection() {
  return (
    <SectionWrapper id="video-generator" variant="dark">
      <SectionHeader
        badge="Video Generator"
        title="Cinematic AI Video Creation"
        subtitle="Generate professional videos from text descriptions with style, duration, and voiceover control."
      />
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <HiFilm className="text-accent-red" size={24} />
              <span className="text-lg font-bold text-primary-text">Create Video</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-4">
              <p className="text-sm text-primary-text">&ldquo;A cinematic aerial view of a futuristic city at sunset, neon red lights, flying cars, cyberpunk style&rdquo;</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Duration", value: "15s", icon: HiClock },
                { label: "Style", value: "Cinematic", icon: HiAdjustments },
                { label: "Quality", value: "4K", icon: HiSparkles },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-white/5 text-center">
                  <item.icon className="text-accent-red mx-auto mb-1" size={16} />
                  <p className="text-[10px] text-muted-text uppercase">{item.label}</p>
                  <p className="text-xs font-bold text-primary-text">{item.value}</p>
                </div>
              ))}
            </div>
            <Button variant="primary" className="w-full" icon={<HiSparkles />}>
              Generate Video
            </Button>
          </GlassCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {[1, 2, 3, 4].map((i) => (
            <GlassCard key={i} className="aspect-video overflow-hidden group cursor-pointer">
              <div className="w-full h-full bg-gradient-to-br from-red-900/20 to-black/60 flex items-center justify-center relative">
                <HiFilm className="text-red-500/30" size={36} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-xs text-primary-text">Sample {i}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
      <div className="text-center mt-10">
        <Link href="/video-generator">
          <Button variant="primary" size="lg" icon={<HiFilm />}>
            Open Video Generator
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
