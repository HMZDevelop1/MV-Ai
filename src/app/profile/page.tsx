"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { HiUserCircle, HiMail, HiAcademicCap, HiScale, HiChip, HiShieldCheck, HiCalendar, HiLightningBolt } from "react-icons/hi";

export default function ProfilePage() {
  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8 text-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-extrabold text-white">S</span>
              </div>
              <h1 className="text-2xl font-extrabold text-primary-text mb-1">Student</h1>
              <p className="text-sm text-secondary-text mb-4">student@mvai.com</p>
              <div className="flex justify-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-accent-red border border-red-500/20">Student Pro</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">Active</span>
              </div>
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { icon: HiAcademicCap, label: "Level", value: "Law Student" },
                { icon: HiMail, label: "Email", value: "student@mvai.com" },
                { icon: HiCalendar, label: "Member Since", value: "January 2026" },
                { icon: HiScale, label: "Plan", value: "Student Pro" },
                { icon: HiChip, label: "AI Model", value: "DeepSeek R1" },
                { icon: HiShieldCheck, label: "Security", value: "2FA Enabled" },
              ].map((item) => (
                <GlassCard key={item.label} className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <item.icon className="text-accent-red" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-text">{item.label}</p>
                    <p className="text-sm font-medium text-primary-text">{item.value}</p>
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-primary-text mb-4 flex items-center gap-2">
                <HiLightningBolt className="text-accent-red" />
                Quick Stats
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "Chats", value: "47" },
                  { label: "Documents", value: "12" },
                  { label: "Flashcards", value: "156" },
                  { label: "Quizzes", value: "23" },
                  { label: "Images", value: "34" },
                  { label: "Study Hours", value: "28" },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 rounded-xl bg-white/5">
                    <p className="text-lg font-bold text-primary-text">{stat.value}</p>
                    <p className="text-[10px] text-muted-text">{stat.label}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
