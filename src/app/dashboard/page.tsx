"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import {
  HiChat, HiDocumentText, HiClipboardList, HiCalendar, HiBookOpen,
  HiPhotograph, HiFilm, HiChartBar, HiAcademicCap, HiScale,
  HiLightningBolt, HiCog, HiUserCircle, HiBell
} from "react-icons/hi";
import Link from "next/link";

const stats = [
  { icon: HiChat, label: "Total Chats", value: "12", change: "+3 this week", color: "from-red-500 to-red-600" },
  { icon: HiDocumentText, label: "Documents", value: "8", change: "2 analyzed", color: "from-red-500 to-red-700" },
  { icon: HiClipboardList, label: "Flashcards", value: "45", change: "15 new", color: "from-red-500 to-red-600" },
  { icon: HiCalendar, label: "Study Plans", value: "3", change: "1 upcoming", color: "from-red-500 to-red-700" },
  { icon: HiBookOpen, label: "Law Cases", value: "6", change: "2 briefs ready", color: "from-red-500 to-red-600" },
  { icon: HiPhotograph, label: "Images", value: "24", change: "8 this week", color: "from-red-500 to-red-700" },
  { icon: HiFilm, label: "Videos", value: "5", change: "1 in progress", color: "from-red-500 to-red-600" },
  { icon: HiChartBar, label: "Progress", value: "72%", change: "↑ 12%", color: "from-red-500 to-red-700" },
  { icon: HiAcademicCap, label: "Exams Prep", value: "4", change: "Next: May 15", color: "from-red-500 to-red-600" },
  { icon: HiScale, label: "IRAC Analyses", value: "9", change: "3 contract law", color: "from-red-500 to-red-700" },
];

const recentActivity = [
  { type: "chat", label: "Contract law discussion", time: "2 hours ago", icon: HiChat },
  { type: "document", label: "Uploaded case brief PDF", time: "5 hours ago", icon: HiDocumentText },
  { type: "flashcard", label: 'Created "Constitutional Law" deck', time: "Yesterday", icon: HiClipboardList },
  { type: "image", label: "Generated 3 study diagrams", time: "Yesterday", icon: HiPhotograph },
  { type: "irac", label: "Completed IRAC for Smith v. Jones", time: "2 days ago", icon: HiScale },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-text mb-2">Dashboard</h1>
            <p className="text-secondary-text">Welcome back, Student. Here&apos;s your overview.</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Link href="/chat">
              <Button variant="primary" size="sm" icon={<HiLightningBolt />}>
                New Chat
              </Button>
            </Link>
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-secondary-text hover:text-primary-text transition-colors relative">
              <HiBell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center">3</span>
            </button>
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-secondary-text hover:text-primary-text transition-colors">
              <HiCog size={20} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <GlassCard className="p-4 group cursor-pointer">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="text-white" size={18} />
                </div>
                <p className="text-2xl font-extrabold text-primary-text">{stat.value}</p>
                <p className="text-xs text-secondary-text mt-0.5">{stat.label}</p>
                <p className="text-[10px] text-muted-text mt-1">{stat.change}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-primary-text mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <Icon className="text-accent-red" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary-text truncate">{activity.label}</p>
                      <p className="text-xs text-muted-text">{activity.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-primary-text mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: HiChat, label: "New Chat", href: "/chat" },
                { icon: HiDocumentText, label: "Analyze Doc", href: "/document-analyzer" },
                { icon: HiClipboardList, label: "Flashcards", href: "/study-tools" },
                { icon: HiScale, label: "IRAC Analysis", href: "/law" },
                { icon: HiPhotograph, label: "Generate Image", href: "/image-generator" },
                { icon: HiFilm, label: "Generate Video", href: "/video-generator" },
                { icon: HiCalendar, label: "Study Plan", href: "/study-tools" },
                { icon: HiBookOpen, label: "Research", href: "/research-hub" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.label} href={action.href}>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 transition-all cursor-pointer text-center group">
                      <Icon className="text-accent-red mx-auto mb-1 group-hover:scale-110 transition-transform" size={20} />
                      <span className="text-xs text-primary-text">{action.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Study Progress */}
        <GlassCard className="p-6 mt-6">
          <h3 className="text-lg font-bold text-primary-text mb-4">Study Progress</h3>
          <div className="space-y-4">
            {[
              { subject: "Constitutional Law", progress: 75, nextExam: "May 15, 2026" },
              { subject: "Contracts", progress: 60, nextExam: "May 22, 2026" },
              { subject: "Criminal Law", progress: 45, nextExam: "June 1, 2026" },
              { subject: "Legal Research & Writing", progress: 90, nextExam: "May 10, 2026" },
            ].map((subject) => (
              <div key={subject.subject} className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-primary-text">{subject.subject}</h4>
                    <p className="text-xs text-muted-text">Exam: {subject.nextExam}</p>
                  </div>
                  <span className="text-sm font-bold text-primary-text">{subject.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.progress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </SectionWrapper>
    </div>
  );
}
