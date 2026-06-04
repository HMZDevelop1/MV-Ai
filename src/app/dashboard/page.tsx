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
} from "react-icons/hi2";
import { cn } from "@/lib/utils";

const recentChats = [
  { id: 1, title: "Explain the elements of a valid contract", time: "2h ago", tool: "AI Chat" },
  { id: 2, title: "Analyze this case brief for negligence", time: "5h ago", tool: "Law Pro" },
  { id: 3, title: "Create flashcards for Constitutional Law", time: "Yesterday", tool: "Student Hub" },
  { id: 4, title: "Generate a diagram of the IRAC method", time: "Yesterday", tool: "Image Studio" },
  { id: 5, title: "Summarize my research paper on tort law", time: "2 days ago", tool: "Documents" },
  { id: 6, title: "Study plan for final exams", time: "3 days ago", tool: "Productivity" },
];

const quickActions = [
  { icon: HiOutlineChatBubbleLeftRight, label: "AI Chat", href: "/chat", color: "text-blue-400" },
  { icon: HiOutlineScale, label: "Law Pro", href: "/law-pro", color: "text-amber-400" },
  { icon: HiOutlineAcademicCap, label: "Student Hub", href: "/student-hub", color: "text-emerald-400" },
  { icon: HiOutlineDocumentText, label: "Documents", href: "/documents", color: "text-purple-400" },
  { icon: HiOutlineMagnifyingGlass, label: "Research", href: "/research", color: "text-cyan-400" },
  { icon: HiOutlinePhoto, label: "Image Studio", href: "/image-studio", color: "text-pink-400" },
  { icon: HiOutlineFilm, label: "Video Studio", href: "/video-studio", color: "text-orange-400" },
  { icon: HiOutlineClipboardDocumentList, label: "Study Tools", href: "/student-hub", color: "text-teal-400" },
];

const sidebarLinks = [
  { icon: HiOutlineChatBubbleLeftRight, label: "AI Chat", href: "/chat" },
  { icon: HiOutlineScale, label: "Law Pro", href: "/law-pro" },
  { icon: HiOutlineAcademicCap, label: "Student Hub", href: "/student-hub" },
  { icon: HiOutlineDocumentText, label: "Documents", href: "/documents" },
  { icon: HiOutlineMagnifyingGlass, label: "Research", href: "/research" },
  { icon: HiOutlinePhoto, label: "Image Studio", href: "/image-studio" },
  { icon: HiOutlineFilm, label: "Video Studio", href: "/video-studio" },
  { icon: HiOutlineBookOpen, label: "Memory", href: "/memory" },
  { icon: HiOutlineCog6Tooth, label: "Settings", href: "/settings" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-white/[0.06] bg-[#0d0d0d] transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-[260px]" : "w-[70px]"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black text-xs">
                MV
              </div>
              <span className="font-heading text-lg font-bold text-primary-text tracking-tight">
                MV <span className="text-red-400">AI</span>
              </span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/[0.06] text-secondary-text hover:text-primary-text transition-colors"
          >
            <HiOutlineBars3 size={18} />
          </button>
        </div>

        {/* New Chat Button */}
        {sidebarOpen && (
          <div className="p-3">
            <Link
              href="/chat"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.06] text-secondary-text hover:text-primary-text transition-all group"
            >
              <HiOutlinePlus size={18} />
              <span className="text-sm font-medium">New Chat</span>
            </Link>
          </div>
        )}

        {/* Recent Chats */}
        {sidebarOpen && (
          <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
            <p className="px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-text">
              Recent
            </p>
            {recentChats.map((chat) => (
              <Link
                key={chat.id}
                href="/chat"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-secondary-text hover:text-primary-text hover:bg-white/[0.06] transition-colors group"
              >
                <HiOutlineChatBubbleLeftRight size={16} className="shrink-0 text-muted-text" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px]">{chat.title}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 transition-all">
                  <HiOutlineTrash size={14} className="text-muted-text" />
                </button>
              </Link>
            ))}
          </div>
        )}

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="p-3 border-t border-white/[0.06]">
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-secondary-text hover:text-primary-text hover:bg-white/[0.06] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 border border-red-500/20 flex items-center justify-center">
                <span className="text-xs font-bold text-red-400">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-primary-text">User</p>
                <p className="text-[11px] text-muted-text">Free Plan</p>
              </div>
            </Link>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[280px] bg-[#0d0d0d] border-r border-white/[0.06] flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black text-xs">
                    MV
                  </div>
                  <span className="font-heading text-lg font-bold text-primary-text tracking-tight">
                    MV <span className="text-red-400">AI</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/[0.06] text-secondary-text"
                >
                  <HiOutlineXMark size={20} />
                </button>
              </div>

              <div className="p-3">
                <Link
                  href="/chat"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.06] text-secondary-text hover:text-primary-text transition-all"
                >
                  <HiOutlinePlus size={18} />
                  <span className="text-sm font-medium">New Chat</span>
                </Link>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
                <p className="px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-text">
                  Recent
                </p>
                {recentChats.map((chat) => (
                  <Link
                    key={chat.id}
                    href="/chat"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-secondary-text hover:text-primary-text hover:bg-white/[0.06] transition-colors"
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <HiOutlineChatBubbleLeftRight size={16} className="shrink-0 text-muted-text" />
                    <p className="truncate text-[13px] flex-1">{chat.title}</p>
                  </Link>
                ))}
              </div>

              <div className="p-3 border-t border-white/[0.06]">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-secondary-text hover:text-primary-text hover:bg-white/[0.06] transition-colors"
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <link.icon size={18} />
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
        <header className="flex items-center justify-between px-4 lg:px-6 h-14 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/[0.06] text-secondary-text"
            >
              <HiOutlineBars3 size={20} />
            </button>
            <h1 className="text-sm font-medium text-primary-text">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/chat"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-secondary-text hover:text-primary-text text-sm transition-colors"
            >
              <HiOutlineChatBubbleLeftRight size={16} />
              <span className="hidden sm:inline">New Chat</span>
            </Link>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-text mb-3 tracking-tight">
                What can I help with?
              </h1>
              <p className="text-secondary-text text-base sm:text-lg">
                Your AI-powered study, law, and research companion
              </p>
            </motion.div>

            {/* Quick Actions Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12"
            >
              {quickActions.map((action, i) => (
                <Link key={action.label} href={action.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.04 }}
                    className="group p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer"
                  >
                    <action.icon className={cn("w-6 h-6 mb-3", action.color)} />
                    <p className="text-sm font-medium text-primary-text">{action.label}</p>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            {/* Recent Chats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-primary-text">Recent</h2>
                <Link
                  href="/chat"
                  className="text-sm text-secondary-text hover:text-primary-text transition-colors flex items-center gap-1"
                >
                  View all <HiOutlineArrowRight size={14} />
                </Link>
              </div>

              <div className="space-y-2">
                {recentChats.map((chat, i) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                  >
                    <Link
                      href="/chat"
                      className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
                        <HiOutlineChatBubbleLeftRight size={18} className="text-secondary-text" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-primary-text truncate group-hover:text-white transition-colors">
                          {chat.title}
                        </p>
                        <p className="text-xs text-muted-text mt-0.5">
                          {chat.tool} · {chat.time}
                        </p>
                      </div>
                      <HiOutlineArrowRight
                        size={16}
                        className="text-muted-text opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Input Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-12"
            >
              <Link href="/chat">
                <div className="relative group cursor-text">
                  <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] group-hover:bg-white/[0.06] group-hover:border-white/[0.15] transition-all">
                    <HiOutlineChatBubbleLeftRight size={20} className="text-muted-text shrink-0" />
                    <span className="text-secondary-text text-sm flex-1">
                      Ask me anything...
                    </span>
                    <div className="p-2 rounded-xl bg-white/[0.06] group-hover:bg-red-500/20 transition-colors">
                      <HiOutlineArrowRight size={16} className="text-secondary-text group-hover:text-red-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
