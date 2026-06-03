"use client";

import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  HiChat, HiScale, HiAcademicCap, HiPhotograph, HiFilm, HiDocumentText,
  HiSearch, HiShieldCheck, HiLightningBolt, HiSparkles, HiBookOpen, HiCube
} from "react-icons/hi";

const features = [
  { icon: HiChat, title: "AI Chat", description: "Premium conversational AI with streaming responses and multiple modes.", color: "from-red-500 to-red-600" },
  { icon: HiScale, title: "Law Assistant", description: "IRAC analysis, case briefs, legal research, and exam preparation for law students.", color: "from-red-500 to-red-700" },
  { icon: HiAcademicCap, title: "Study Tools", description: "Generate quizzes, flashcards, notes, and study plans instantly.", color: "from-red-500 to-red-600" },
  { icon: HiDocumentText, title: "Document Analyzer", description: "Upload PDFs, DOCX, and TXT files for instant analysis and summaries.", color: "from-red-500 to-red-700" },
  { icon: HiPhotograph, title: "Image Generator", description: "Create premium images from text prompts with style control.", color: "from-red-500 to-red-600" },
  { icon: HiFilm, title: "Video Generator", description: "Generate cinematic videos from descriptions with AI.", color: "from-red-500 to-red-700" },
  { icon: HiSearch, title: "Research Hub", description: "Deep research capabilities with citation generation.", color: "from-red-500 to-red-600" },
  { icon: HiSparkles, title: "Creative Mode", description: "Unleash creativity with brainstorming, writing, and content generation.", color: "from-red-500 to-red-700" },
  { icon: HiShieldCheck, title: "Enterprise Security", description: "End-to-end encryption, secure uploads, and privacy-first architecture.", color: "from-red-500 to-red-600" },
  { icon: HiLightningBolt, title: "Lightning Fast", description: "Optimized for speed with instant streaming and 120 FPS animations.", color: "from-red-500 to-red-700" },
  { icon: HiBookOpen, title: "Legal Research", description: "Comprehensive legal database with comparative law analysis.", color: "from-red-500 to-red-600" },
  { icon: HiCube, title: "3D Dashboard", description: "Premium 3D student dashboard with real-time progress tracking.", color: "from-red-500 to-red-700" },
];

export function Features() {
  return (
    <SectionWrapper id="features" variant="dark">
      <SectionHeader
        badge="Features"
        title="Everything You Need in One Platform"
        subtitle="Premium AI tools designed for students, law professionals, researchers, and creators."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {features.map((feature, i) => (
          <GlassCard key={feature.title} delay={i * 0.05} className="p-6">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
              <feature.icon className="text-white" size={20} />
            </div>
            <h3 className="text-lg font-bold text-primary-text mb-2">{feature.title}</h3>
            <p className="text-sm text-secondary-text leading-relaxed">{feature.description}</p>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
