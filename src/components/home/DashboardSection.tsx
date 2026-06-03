"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  HiChat, HiDocumentText, HiClipboardList, HiCalendar, HiBookOpen,
  HiPhotograph, HiFilm, HiChartBar, HiAcademicCap, HiScale
} from "react-icons/hi";

export function DashboardSection() {
  return (
    <SectionWrapper id="dashboard" variant="dark">
      <SectionHeader
        badge="Student Dashboard"
        title="Your Personal Command Center"
        subtitle="Track everything in one place — chats, documents, study plans, flashcards, and more."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: HiChat, label: "Recent Chats", count: "12", color: "from-red-500 to-red-600" },
              { icon: HiDocumentText, label: "Documents", count: "8", color: "from-red-500 to-red-700" },
              { icon: HiClipboardList, label: "Flashcards", count: "45", color: "from-red-500 to-red-600" },
              { icon: HiCalendar, label: "Study Plans", count: "3", color: "from-red-500 to-red-700" },
              { icon: HiBookOpen, label: "Law Cases", count: "6", color: "from-red-500 to-red-600" },
              { icon: HiPhotograph, label: "Images", count: "24", color: "from-red-500 to-red-700" },
              { icon: HiFilm, label: "Videos", count: "5", color: "from-red-500 to-red-600" },
              { icon: HiChartBar, label: "Progress", count: "72%", color: "from-red-500 to-red-700" },
              { icon: HiAcademicCap, label: "Exams Prep", count: "4", color: "from-red-500 to-red-600" },
              { icon: HiScale, label: "IRAC Analyses", count: "9", color: "from-red-500 to-red-700" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <item.icon className="text-white" size={18} />
                </div>
                <p className="text-2xl font-bold text-primary-text">{item.count}</p>
                <p className="text-xs text-secondary-text mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
      <div className="text-center mt-10">
        <Link href="/dashboard">
          <Button variant="primary" size="lg">
            Open Dashboard
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
