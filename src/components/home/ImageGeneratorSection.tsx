"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { HiPhotograph, HiSparkles, HiDownload, HiCollection } from "react-icons/hi";

export function ImageGeneratorSection() {
  return (
    <SectionWrapper id="image-generator">
      <SectionHeader
        badge="Image Generator"
        title="Create Stunning Images with AI"
        subtitle="Generate premium images from text prompts with full style control."
      />
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <HiPhotograph className="text-accent-red" size={24} />
              <span className="text-lg font-bold text-primary-text">Prompt</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-4">
              <p className="text-sm text-primary-text">&ldquo;A cinematic Ferrari in red, studio lighting, dramatic shadows, photorealistic&rdquo;</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Photorealistic", "Cinematic", "3D Render", "Anime", "Oil Painting"].map((style) => (
                <span key={style} className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-accent-red border border-red-500/20">
                  {style}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="primary" icon={<HiSparkles />}>
                Generate
              </Button>
              <Button variant="secondary" icon={<HiDownload />}>
                Download
              </Button>
            </div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-text">
              <HiCollection />
              <span>Last generated: 3 images today</span>
            </div>
          </GlassCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <GlassCard key={i} className="aspect-square overflow-hidden group cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-red-900/30 to-black/50 flex items-center justify-center relative">
                  <HiPhotograph className="text-red-500/30" size={48} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-xs text-primary-text">Sample {i}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="text-center mt-10">
        <Link href="/image-generator">
          <Button variant="primary" size="lg" icon={<HiPhotograph />}>
            Open Image Generator
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
