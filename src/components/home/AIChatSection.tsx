"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { HiChat, HiMicrophone, HiVolumeUp, HiClipboardCopy, HiRefresh, HiBookmark } from "react-icons/hi";

export function AIChatSection() {
  return (
    <SectionWrapper id="ai-chat">
      <SectionHeader
        badge="AI Chat"
        title="Premium Conversational Intelligence"
        subtitle="Multi-modal AI chat with streaming, voice, file uploads, and specialized modes."
      />
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-glow-pulse" />
              <span className="text-sm text-secondary-text">AI Chat · Ready</span>
              <div className="ml-auto flex gap-1">
                {["general", "law", "student", "creative", "research"].map((mode) => (
                  <span key={mode} className={`px-2.5 py-1 rounded-md text-[10px] font-medium uppercase tracking-wider ${mode === "general" ? "bg-red-500/20 text-accent-red border border-red-500/30" : "bg-white/5 text-muted-text"}`}>
                    {mode}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4 mb-4">
              {[
                { role: "user", content: "Explain the concept of consideration in contract law." },
                { role: "assistant", content: "Consideration is a fundamental element in contract law...", law: true },
              ].map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === "user" ? "bg-red-500/15 border border-red-500/20" : "mv-glass-light"}`}>
                    <p className="text-sm text-primary-text">{msg.content}</p>
                    {msg.law && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                        <span className="text-[10px] text-accent-red font-semibold uppercase">Law Mode</span>
                        <span className="text-[10px] text-muted-text">IRAC Ready</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 mv-glass-light rounded-2xl">
              <HiChat className="text-muted-text" size={18} />
              <span className="text-sm text-muted-text flex-1">Ask anything...</span>
              <div className="flex gap-1">
                <HiMicrophone className="text-muted-text hover:text-primary-text transition-colors cursor-pointer" size={16} />
                <HiVolumeUp className="text-muted-text hover:text-primary-text transition-colors cursor-pointer" size={16} />
              </div>
            </div>
          </GlassCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: HiMicrophone, label: "Voice Input" },
              { icon: HiVolumeUp, label: "Voice Output" },
              { icon: HiClipboardCopy, label: "Copy Response" },
              { icon: HiRefresh, label: "Regenerate" },
              { icon: HiBookmark, label: "Save Chats" },
              { icon: HiChat, label: "Follow-up Questions" },
            ].map((item) => (
              <GlassCard key={item.label} className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <item.icon className="text-accent-red" size={16} />
                </div>
                <span className="text-sm font-medium text-primary-text">{item.label}</span>
              </GlassCard>
            ))}
          </div>
          <Link href="/chat">
            <Button variant="primary" className="w-full">
              Open AI Chat
            </Button>
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
