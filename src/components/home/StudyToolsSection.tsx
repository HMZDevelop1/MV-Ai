"use client";

import Link from "next/link";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  HiClipboardList, HiMenu, HiCalendar, HiPencil, HiDocumentText,
  HiBookmark, HiSearch, HiAcademicCap, HiPresentationChartBar, HiDocumentReport
} from "react-icons/hi";

const tools = [
  { icon: HiClipboardList, title: "Quiz Generator", desc: "Generate custom quizzes on any topic with instant feedback." },
  { icon: HiMenu, title: "Flashcard Generator", desc: "Create study flashcards with spaced repetition support." },
  { icon: HiCalendar, title: "Study Planner", desc: "AI-powered study schedule optimized for your exams." },
  { icon: HiPencil, title: "Essay Assistant", desc: "Outline, write, and refine essays with AI guidance." },
  { icon: HiDocumentText, title: "Notes Generator", desc: "Transform content into structured, easy-to-review notes." },
  { icon: HiBookmark, title: "Citation Generator", desc: "Generate citations in APA, MLA, Chicago, and more." },
  { icon: HiSearch, title: "Research Assistant", desc: "Deep research with source verification and analysis." },
  { icon: HiAcademicCap, title: "Exam Prep", desc: "Comprehensive exam preparation with practice questions." },
  { icon: HiPresentationChartBar, title: "Presentation Generator", desc: "Create structured presentations from any topic." },
  { icon: HiDocumentReport, title: "Summary Generator", desc: "Instant summaries of articles, papers, and documents." },
];

export function StudyToolsSection() {
  return (
    <SectionWrapper id="study-tools">
      <SectionHeader
        badge="Study Tools"
        title="Accelerate Your Learning"
        subtitle="Ten powerful tools designed to help students study faster, understand deeper, and perform better."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
        {tools.map((tool, i) => (
          <GlassCard key={tool.title} delay={i * 0.03} className="p-5 text-center group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <tool.icon className="text-white" size={22} />
            </div>
            <h3 className="text-sm font-bold text-primary-text mb-2">{tool.title}</h3>
            <p className="text-xs text-secondary-text leading-relaxed">{tool.desc}</p>
          </GlassCard>
        ))}
      </div>
      <div className="text-center">
        <Link href="/study-tools">
          <Button variant="primary" size="lg">
            Explore All Study Tools
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
