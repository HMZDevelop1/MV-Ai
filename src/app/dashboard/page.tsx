"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineDocumentText,
  HiOutlineMagnifyingGlass,
  HiOutlinePhoto,
  HiOutlineFilm,
  HiOutlineScale,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineClipboardDocumentList,
  HiOutlineCog6Tooth,
  HiOutlinePlus,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineArrowRight,
  HiOutlineTrash,
  HiOutlineGlobeAlt,
  HiOutlineCommandLine,
  HiOutlineSparkles,
  HiOutlineUser,
} from "react-icons/hi2";
import { cn } from "@/lib/utils";

const tools = [
  { icon: HiOutlineChatBubbleLeftRight, label: "AI Chat", desc: "Ask anything", href: "/chat", color: "bg-blue-500/10 text-blue-400" },
  { icon: HiOutlineScale, label: "Law Pro", desc: "Legal analysis & IRAC", href: "/law-pro", color: "bg-amber-500/10 text-amber-400" },
  { icon: HiOutlineAcademicCap, label: "Student Hub", desc: "Study smarter", href: "/student-hub", color: "bg-emerald-500/10 text-emerald-400" },
  { icon: HiOutlineDocumentText, label: "Documents", desc: "Analyze & summarize", href: "/documents", color: "bg-purple-500/10 text-purple-400" },
  { icon: HiOutlineMagnifyingGlass, label: "Research", desc: "Deep analysis", href: "/research", color: "bg-cyan-500/10 text-cyan-400" },
  { icon: HiOutlinePhoto, label: "Image Studio", desc: "Generate images", href: "/image-studio", color: "bg-pink-500/10 text-pink-400" },
  { icon: HiOutlineFilm, label: "Video Studio", desc: "Generate videos", href: "/video-studio", color: "bg-orange-500/10 text-orange-400" },
  { icon: HiOutlineCommandLine, label: "AI Router", desc: "Smart model routing", href: "/router", color: "bg-violet-500/10 text-violet-400" },
  { icon: HiOutlineBookOpen, label: "Memory", desc: "Your knowledge base", href: "/memory", color: "bg-teal-500/10 text-teal-400" },
  { icon: HiOutlineGlobeAlt, label: "Vision", desc: "Image understanding", href: "/vision", color: "bg-rose-500/10 text-rose-400" },
  { icon: HiOutlineClipboardDocumentList, label: "Productivity", desc: "Tasks & planning", href: "/productivity", color: "bg-lime-500/10 text-lime-400" },
  { icon: HiOutlineSparkles, label: "Study Tools", desc: "Flashcards & more", href: "/student-hub", color: "bg-indigo-500/10 text-indigo-400" },
];

const recentChats = [
  { id: 1, title: "Explain the elements of a valid contract", time: "2h ago" },
  { id: 2, title: "Analyze this case brief for negligence", time: "5h ago" },
  { id: 3, title: "Create flashcards for Constitutional Law", time: "Yesterday" },
  { id: 4, title: "Summarize my research paper on tort law", time: "2 days ago" },
  { id: 5, title: "Study plan for final exams", time: "3 days ago" },
  { id: 6, title: "IRAC analysis for Smith v. Jones", time: "4 days ago" },
];

const suggestions = [
  "Create a study plan for my finals",
  "Analyze this contract for issues",
  "Generate flashcards from my notes",
  "Summarize this legal document",
  "Explain the Rule Against Perpetuities",
  "Help me brief a court case",
];

const sidebarLinks = [
  { icon: HiOutlineChatBubbleLeftRight, label: "AI Chat", href: "/chat" },
  { icon: HiOutlineScale, label: "Law Pro", href: "/law-pro" },
  { icon: HiOutlineAcademicCap, label: "Student Hub", href: "/student-hub" },
  { icon: HiOutlineDocumentText, label: "Documents", href: "/documents" },
  { icon: HiOutlineMagnifyingGlass, label: "Research", href: "/research" },
  { icon: HiOutlinePhoto, label: "Image Studio", href: "/image-studio" },
  { icon: HiOutlineFilm, label: "Video Studio", href: "/video-studio" },
  { icon: HiOutlineCommandLine, label: "AI Router", href: "/router" },
  { icon: HiOutlineBookOpen, label: "Memory", href: "/memory" },
  { icon: HiOutlineGlobeAlt, label: "Vision", href: "/vision" },
  { icon: HiOutlineClipboardDocumentList, label: "Productivity", href: "/productivity" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex h-screen bg-[#0c0c0c] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-[#111111] transition-all duration-300 ease-in-out shrink-0",
          sidebarOpen ? "w-[260px]" : "w-[60px]"
        )}
      >
        {/* Logo */}
        <div className={cn("flex items-center border-b border-white/[0.06] shrink-0", sidebarOpen ? "px-3 py-3" : "px-3 py-3 justify-center")}>
          {sidebarOpen ? (
            <div className="flex items-center justify-between w-full">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black text-xs shrink-0">
                  MV
                </div>
                <span className="font-heading text-base font-bold text-white tracking-tight truncate">
                  MV AI
                </span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/[0.06] text-[#888] hover:text-white transition-colors"
              >
                <HiOutlineBars3 size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-lg hover:bg-white/[0.06] text-[#888] hover:text-white transition-colors"
            >
              <HiOutlineBars3 size={18} />
            </button>
          )}
        </div>

        {/* New Chat */}
        {sidebarOpen && (
          <div className="px-3 pt-3 pb-1">
            <Link
              href="/chat"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-white/[0.08] hover:bg-white/[0.06] text-[#ccc] hover:text-white transition-all text-[13px]"
            >
              <HiOutlinePlus size={16} />
              <span>New chat</span>
            </Link>
          </div>
        )}

        {/* Recent */}
        {sidebarOpen && (
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[#666]">
              Recent
            </p>
            {recentChats.map((chat) => (
              <Link
                key={chat.id}
                href="/chat"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-[#999] hover:text-white hover:bg-white/[0.05] transition-colors group"
              >
                <HiOutlineChatBubbleLeftRight size={15} className="shrink-0 text-[#555]" />
                <span className="truncate flex-1">{chat.title}</span>
                <button className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10 transition-all">
                  <HiOutlineTrash size={13} className="text-[#666]" />
                </button>
              </Link>
            ))}
          </div>
        )}

        {/* User */}
        {sidebarOpen && (
          <div className="px-3 py-3 border-t border-white/[0.06]">
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-[#999] hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#222] border border-white/[0.08] flex items-center justify-center shrink-0">
                <HiOutlineUser size={14} className="text-[#888]" />
              </div>
              <span>User</span>
            </Link>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[280px] bg-[#111111] flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-3 py-3 border-b border-white/[0.06]">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black text-xs">
                    MV
                  </div>
                  <span className="font-heading text-base font-bold text-white tracking-tight">
                    MV AI
                  </span>
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/[0.06] text-[#888]"
                >
                  <HiOutlineXMark size={20} />
                </button>
              </div>

              <div className="px-3 pt-3 pb-1">
                <Link
                  href="/chat"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-white/[0.08] hover:bg-white/[0.06] text-[#ccc] text-[13px]"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <HiOutlinePlus size={16} />
                  <span>New chat</span>
                </Link>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-2">
                <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[#666]">
                  Recent
                </p>
                {recentChats.map((chat) => (
                  <Link
                    key={chat.id}
                    href="/chat"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-[#999] hover:text-white hover:bg-white/[0.05] transition-colors"
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <HiOutlineChatBubbleLeftRight size={15} className="shrink-0 text-[#555]" />
                    <span className="truncate">{chat.title}</span>
                  </Link>
                ))}
              </div>

              <div className="px-3 py-3 border-t border-white/[0.06]">
                <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[#666] mb-1">
                  Tools
                </p>
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-[#999] hover:text-white hover:bg-white/[0.05] transition-colors"
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <link.icon size={16} className="text-[#666]" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="flex items-center px-3 h-12 shrink-0 border-b border-white/[0.06]">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/[0.06] text-[#888] mr-2"
          >
            <HiOutlineBars3 size={20} />
          </button>
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/[0.06] text-[#888] mr-2"
            >
              <HiOutlineBars3 size={18} />
            </button>
          )}
          <span className="text-[13px] text-[#888]">MV AI</span>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            {/* Centered Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-10"
            >
              <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-2 tracking-tight">
                How can I help you today?
              </h1>
              <p className="text-[15px] text-[#888]">
                Your AI-powered study, law, and research companion
              </p>
            </motion.div>

            {/* Tools Grid */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-10"
            >
              {tools.map((tool, i) => (
                <Link key={tool.label} href={tool.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                    className="group p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all cursor-pointer"
                  >
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2.5", tool.color)}>
                      <tool.icon size={18} />
                    </div>
                    <p className="text-[13px] font-medium text-white mb-0.5">{tool.label}</p>
                    <p className="text-[11px] text-[#666]">{tool.desc}</p>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            {/* Suggestion Chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="mb-10"
            >
              <p className="text-[13px] text-[#666] mb-3 text-center">Try asking</p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((s, i) => (
                  <Link key={i} href="/chat">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[12px] text-[#aaa] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer">
                      <HiOutlineSparkles size={12} className="text-[#666]" />
                      {s}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Input Area */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
            >
              <Link href="/chat">
                <div className="relative group cursor-text">
                  <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-white/[0.08] bg-[#1a1a1a] group-hover:border-white/[0.15] transition-all">
                    <HiOutlineChatBubbleLeftRight size={18} className="text-[#555] shrink-0" />
                    <span className="text-[#666] text-[14px] flex-1">Message MV AI...</span>
                    <div className="p-1.5 rounded-lg bg-white/[0.06] group-hover:bg-white/[0.1] transition-colors">
                      <HiOutlineArrowRight size={14} className="text-[#888] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
              <p className="text-center text-[11px] text-[#444] mt-3">
                MV AI can make mistakes. Check important information.
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
