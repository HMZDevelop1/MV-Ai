"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import {
  HiClipboardList, HiMenu, HiCalendar, HiPencil, HiDocumentText,
  HiBookmark, HiSearch, HiAcademicCap, HiPresentationChartBar, HiDocumentReport,
  HiLightningBolt, HiSparkles, HiCheck, HiStar
} from "react-icons/hi";
import Link from "next/link";
import { generateSmartResponse } from "@/lib/router-engine";

const tools = [
  { icon: HiClipboardList, title: "Quiz Generator", desc: "Custom quizzes on any subject with adaptive difficulty.", color: "from-red-500 to-red-600" },
  { icon: HiMenu, title: "Flashcard Generator", desc: "Smart flashcards with spaced repetition.", color: "from-red-500 to-red-700" },
  { icon: HiCalendar, title: "Study Planner", desc: "AI-powered optimized study schedules.", color: "from-red-500 to-red-600" },
  { icon: HiPencil, title: "Essay Assistant", desc: "Outline, write, and refine essays.", color: "from-red-500 to-red-700" },
  { icon: HiDocumentText, title: "Notes Generator", desc: "Transform content into structured notes.", color: "from-red-500 to-red-600" },
  { icon: HiBookmark, title: "Citation Generator", desc: "APA, MLA, Chicago, IEEE, Harvard.", color: "from-red-500 to-red-700" },
  { icon: HiSearch, title: "Research Assistant", desc: "Deep research with source verification.", color: "from-red-500 to-red-600" },
  { icon: HiAcademicCap, title: "Exam Prep", desc: "Practice tests + performance tracking.", color: "from-red-500 to-red-700" },
  { icon: HiPresentationChartBar, title: "Presentation Generator", desc: "Slide-by-slide content creation.", color: "from-red-500 to-red-600" },
  { icon: HiDocumentReport, title: "Summary Generator", desc: "Instant text summarization.", color: "from-red-500 to-red-700" },
];

const quickActions = [
  { label: "Create 10 flashcards on contract law", icon: HiMenu },
  { label: "Generate a quiz on constitutional law", icon: HiClipboardList },
  { label: "Build a study plan for finals week", icon: HiCalendar },
  { label: "Summarize this chapter on torts", icon: HiDocumentReport },
  { label: "Write an essay on criminal justice reform", icon: HiPencil },
  { label: "Generate citations for my research paper", icon: HiBookmark },
];

export default function StudentHubPage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStudy = async () => {
    if (!query.trim() || isLoading) return;
    setIsLoading(true);
    setResponse("");
    await new Promise((r) => setTimeout(r, 1000));
    setResponse(generateSmartResponse(query, "studying"));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Student Super Mode"
          title="Your Ultimate Study Companion"
          subtitle="Ten powerful AI tools designed to help you learn faster, understand deeper, and excel in your exams."
        />

        {/* Study Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <GlassCard className="p-5 text-center group cursor-pointer h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="text-white" size={22} />
                </div>
                <h3 className="text-sm font-bold text-primary-text mb-2">{tool.title}</h3>
                <p className="text-xs text-secondary-text">{tool.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Quick Study */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <HiLightningBolt className="text-accent-red" size={20} />
                <h3 className="text-lg font-bold text-primary-text">Ask Your Study Buddy</h3>
              </div>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask any question about your studies..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl mv-input text-sm resize-none mb-4"
              />
              <Button
                variant="primary"
                className="w-full"
                onClick={handleStudy}
                disabled={!query.trim() || isLoading}
                loading={isLoading}
                icon={<HiSparkles />}
              >
                Study Now
              </Button>
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-secondary-text whitespace-pre-wrap"
                >
                  {response}
                </motion.div>
              )}
            </GlassCard>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <HiStar className="text-accent-red" size={20} />
                <h3 className="text-lg font-bold text-primary-text">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                {quickActions.map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => setQuery(action.label)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-red-500/20 transition-all text-left group"
                    >
                      <Icon className="text-accent-red group-hover:scale-110 transition-transform flex-shrink-0" size={16} />
                      <span className="text-xs text-secondary-text group-hover:text-primary-text transition-colors">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </GlassCard>

            {/* Study Progress */}
            <GlassCard className="p-5 mt-4">
              <h4 className="text-sm font-bold text-primary-text mb-3">Today&apos;s Study Stats</h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Flashcards", value: "12", icon: HiMenu },
                  { label: "Quiz Score", value: "85%", icon: HiClipboardList },
                  { label: "Study Time", value: "2.5h", icon: HiCalendar },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="p-3 rounded-xl bg-white/5">
                      <Icon className="text-accent-red mx-auto mb-1" size={16} />
                      <p className="text-lg font-bold text-primary-text">{stat.value}</p>
                      <p className="text-[10px] text-muted-text">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
