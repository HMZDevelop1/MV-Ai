"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import {
  HiClipboardList, HiMenu, HiCalendar, HiPencil, HiDocumentText,
  HiBookmark, HiSearch, HiAcademicCap, HiPresentationChartBar, HiDocumentReport
} from "react-icons/hi";
import Link from "next/link";

const tools = [
  {
    icon: HiClipboardList,
    title: "Quiz Generator",
    desc: "Generate custom quizzes on any subject with multiple-choice questions and instant scoring.",
    color: "from-red-500 to-red-600",
    features: ["Multiple choice questions", "Instant scoring", "Difficulty levels", "Topic specific"],
  },
  {
    icon: HiMenu,
    title: "Flashcard Generator",
    desc: "Create digital flashcards with spaced repetition for efficient memorization.",
    color: "from-red-500 to-red-700",
    features: ["Spaced repetition", "Rich text support", "Categories", "Progress tracking"],
  },
  {
    icon: HiCalendar,
    title: "Study Planner",
    desc: "AI-powered study schedule that optimizes your time based on exam dates and subjects.",
    color: "from-red-500 to-red-600",
    features: ["Smart scheduling", "Exam countdown", "Subject prioritization", "Progress tracking"],
  },
  {
    icon: HiPencil,
    title: "Essay Assistant",
    desc: "Outline, write, and refine essays with AI-powered structure suggestions.",
    color: "from-red-500 to-red-700",
    features: ["Essay outlines", "Thesis generation", "Argument structuring", "Citation support"],
  },
  {
    icon: HiDocumentText,
    title: "Notes Generator",
    desc: "Transform lectures, readings, and research into organized, easy-to-review notes.",
    color: "from-red-500 to-red-600",
    features: ["Auto-summarization", "Key point extraction", "Structured format", "Export options"],
  },
  {
    icon: HiBookmark,
    title: "Citation Generator",
    desc: "Generate accurate citations in APA, MLA, Chicago, IEEE, Harvard, and more.",
    color: "from-red-500 to-red-700",
    features: ["Multiple formats", "Auto-detection", "Bibliography generation", "Export to paper"],
  },
  {
    icon: HiSearch,
    title: "Research Assistant",
    desc: "Deep research with source verification, literature reviews, and comprehensive analysis.",
    color: "from-red-500 to-red-600",
    features: ["Source verification", "Literature review", "Cross-referencing", "Executive summaries"],
  },
  {
    icon: HiAcademicCap,
    title: "Exam Prep Mode",
    desc: "Comprehensive exam preparation with practice tests, review sheets, and confidence tracking.",
    color: "from-red-500 to-red-700",
    features: ["Practice exams", "Topic review", "Performance analytics", "Weak spot detection"],
  },
  {
    icon: HiPresentationChartBar,
    title: "Presentation Generator",
    desc: "Create structured presentations from any topic with slide-by-slide content.",
    color: "from-red-500 to-red-600",
    features: ["Slide generation", "Visual suggestions", "Speaker notes", "Export options"],
  },
  {
    icon: HiDocumentReport,
    title: "Summary Generator",
    desc: "Instant summaries of articles, papers, chapters, and any text content.",
    color: "from-red-500 to-red-700",
    features: ["Length control", "Key points", "Bullet format", "Paragraph format"],
  },
];

export default function StudyToolsPage() {
  return (
    <div className="min-h-screen pt-24 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Study Tools"
          title="Everything You Need to Excel"
          subtitle="Ten powerful AI-powered study tools designed to help you learn faster, understand deeper, and perform better."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="p-6 h-full group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-primary-text mb-2">{tool.title}</h3>
                <p className="text-sm text-secondary-text mb-4">{tool.desc}</p>
                <ul className="space-y-1.5">
                  {tool.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-muted-text">
                      <span className="w-1 h-1 rounded-full bg-red-500" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <Button variant="secondary" size="sm" className="w-full">
                    Open {tool.title}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard className="p-6 max-w-2xl mx-auto text-center">
          <h3 className="text-lg font-bold text-primary-text mb-2">Need a custom study plan?</h3>
          <p className="text-sm text-secondary-text mb-4">Let AI create a personalized study schedule based on your subjects, exam dates, and available time.</p>
          <Link href="/chat">
            <Button variant="primary">
              Start Planning
            </Button>
          </Link>
        </GlassCard>
      </SectionWrapper>
    </div>
  );
}
