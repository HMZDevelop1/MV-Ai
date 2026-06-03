"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { AIChatSection } from "@/components/home/AIChatSection";
import { LawStudentSection } from "@/components/home/LawStudentSection";
import { StudyToolsSection } from "@/components/home/StudyToolsSection";
import { DocumentAnalyzerSection } from "@/components/home/DocumentAnalyzerSection";
import { ImageGeneratorSection } from "@/components/home/ImageGeneratorSection";
import { VideoGeneratorSection } from "@/components/home/VideoGeneratorSection";
import { ResearchHubSection } from "@/components/home/ResearchHubSection";
import { DashboardSection } from "@/components/home/DashboardSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { PricingSection } from "@/components/home/PricingSection";
import { FAQSection } from "@/components/home/FAQSection";
import { ContactSection } from "@/components/home/ContactSection";

const FloatingParticlesScene = dynamic(
  () => import("@/components/three/FloatingParticles").then((m) => ({ default: m.FloatingParticlesScene })),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <FloatingParticlesScene />
      </div>
      <div className="relative z-10">
        <Hero />
        <Features />
        <AIChatSection />
        <LawStudentSection />
        <StudyToolsSection />
        <DocumentAnalyzerSection />
        <ImageGeneratorSection />
        <VideoGeneratorSection />
        <ResearchHubSection />
        <DashboardSection />
        <SecuritySection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </div>
    </>
  );
}
