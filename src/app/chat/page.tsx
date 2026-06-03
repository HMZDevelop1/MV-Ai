"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionWrapper";
import { HiChat, HiMicrophone, HiVolumeUp, HiClipboardCopy, HiRefresh, HiBookmark, HiPaperAirplane, HiCog, HiMenu, HiX, HiSparkles, HiAcademicCap, HiScale, HiSearch, HiLightningBolt } from "react-icons/hi";
import type { AIMode, Message } from "@/types";
import { generateId } from "@/lib/utils";

const suggestedPrompts = [
  "Explain the concept of consideration in contract law",
  "Create a study plan for my final exams",
  "Summarize this legal case for me",
  "Generate flashcards for constitutional law",
  "Help me write an IRAC analysis",
  "Explain quantum computing simply",
];

const modes: { mode: AIMode; label: string; icon: typeof HiChat; color: string }[] = [
  { mode: "general", label: "General", icon: HiChat, color: "from-red-500 to-red-600" },
  { mode: "law", label: "Law", icon: HiScale, color: "from-red-500 to-red-700" },
  { mode: "student", label: "Student", icon: HiAcademicCap, color: "from-red-500 to-red-600" },
  { mode: "creative", label: "Creative", icon: HiSparkles, color: "from-red-500 to-red-700" },
  { mode: "research", label: "Research", icon: HiSearch, color: "from-red-500 to-red-600" },
];

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0">
        <HiLightningBolt className="text-white" size={16} />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 px-4 py-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0 mt-0.5">
          <HiChat className="text-white" size={16} />
        </div>
      )}
      <div className={`max-w-[80%] md:max-w-[70%] ${isUser ? "order-1" : "order-2"}`}>
        <div
          className={`p-4 rounded-2xl ${
            isUser
              ? "bg-red-500/15 border border-red-500/20 rounded-tr-md"
              : "mv-glass-light rounded-tl-md"
          }`}
        >
          <p className="text-sm text-primary-text leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className={`flex items-center gap-2 mt-1.5 ${isUser ? "justify-end" : "justify-start"}`}>
          {!isUser && (
            <>
              <button className="p-1 rounded-md text-muted-text hover:text-primary-text hover:bg-white/5 transition-colors">
                <HiClipboardCopy size={14} />
              </button>
              <button className="p-1 rounded-md text-muted-text hover:text-primary-text hover:bg-white/5 transition-colors">
                <HiRefresh size={14} />
              </button>
              <button className="p-1 rounded-md text-muted-text hover:text-primary-text hover:bg-white/5 transition-colors">
                <HiVolumeUp size={14} />
              </button>
              <button className="p-1 rounded-md text-muted-text hover:text-primary-text hover:bg-white/5 transition-colors">
                <HiBookmark size={14} />
              </button>
            </>
          )}
        </div>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-xs font-bold text-primary-text">U</span>
        </div>
      )}
    </motion.div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<AIMode>("general");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: generateId(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setShowSuggestions(false);

    setTimeout(() => {
      const assistantMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: generateResponse(input.trim(), mode),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <div className="container-mv h-full">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col w-64 space-y-3">
            <GlassCard className="p-4">
              <div className="space-y-1">
                {modes.map((m) => {
                  const Icon = m.icon;
                  const isActive = mode === m.mode;
                  return (
                    <button
                      key={m.mode}
                      onClick={() => setMode(m.mode)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-red-500/10 border border-red-500/20 text-primary-text"
                          : "text-secondary-text hover:text-primary-text hover:bg-white/5"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                        <Icon className="text-white" size={12} />
                      </div>
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </GlassCard>
            <GlassCard className="p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-text mb-3">Saved Chats</h4>
              <p className="text-xs text-muted-text">No saved conversations yet.</p>
            </GlassCard>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <GlassCard className="flex-1 flex flex-col overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium text-primary-text">AI Chat</span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="hidden md:inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-red-500/20 text-accent-red border border-red-500/30">
                    {mode} mode
                  </span>
                  <button className="p-2 rounded-lg text-muted-text hover:text-primary-text hover:bg-white/5 transition-colors">
                    <HiCog size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto py-4 space-y-1">
                {messages.length === 0 && !isTyping && showSuggestions && (
                  <div className="px-6 py-8">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-4">
                        <HiChat className="text-white" size={32} />
                      </div>
                      <h2 className="text-2xl font-bold text-primary-text mb-2">
                        How can I help you today?
                      </h2>
                      <p className="text-sm text-secondary-text">
                        Choose a mode and start asking questions.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                      {suggestedPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => {
                            setInput(prompt);
                            inputRef.current?.focus();
                          }}
                          className="text-left p-3 rounded-xl text-sm text-secondary-text bg-white/5 border border-white/5 hover:bg-white/10 hover:text-primary-text transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <AnimatePresence>
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                </AnimatePresence>
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-4 py-4 border-t border-white/5">
                <div className="flex items-end gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={`Ask anything in ${mode} mode...`}
                      rows={1}
                      className="w-full px-4 py-3 rounded-2xl mv-input text-sm resize-none max-h-32"
                      style={{ minHeight: "48px" }}
                    />
                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                      <button className="p-1.5 rounded-lg text-muted-text hover:text-primary-text hover:bg-white/5 transition-colors">
                        <HiMicrophone size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg text-muted-text hover:text-primary-text hover:bg-white/5 transition-colors">
                        <HiVolumeUp size={16} />
                      </button>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    icon={<HiPaperAirplane />}
                    className="!px-4 !py-3"
                  >
                    Send
                  </Button>
                </div>
                <p className="text-[10px] text-muted-text mt-2 text-center">
                  AI responses may not always be accurate. Verify critical information.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateResponse(input: string, mode: AIMode): string {
  const lower = input.toLowerCase();

  if (mode === "law") {
    if (lower.includes("consideration")) {
      return "**Consideration in Contract Law**\n\nConsideration is a fundamental element of a valid contract under common law. It refers to something of value exchanged between the parties.\n\n**Key Points:**\n- Each party must give, or promise to give, something of value\n- Consideration must be sufficient but need not be adequate\n- Past consideration is not valid consideration\n- Performance of an existing duty is generally not valid consideration\n\n*Example:* If A promises to pay B $100, and B promises to deliver goods worth $100, the mutual promises constitute consideration.\n\n> **Note:** This is a general explanation. For specific legal questions, please consult official legal sources or your professor.";
    }
    if (lower.includes("irac")) {
      return "**IRAC Analysis Framework**\n\n**I - Issue:** Identify the legal issue(s) presented by the facts.\n\n**R - Rule:** State the relevant legal rule(s) that apply.\n\n**A - Application:** Apply the rule(s) to the specific facts.\n\n**C - Conclusion:** Reach a conclusion based on your analysis.\n\nWould you like me to generate an IRAC analysis for a specific case or scenario?";
    }
    if (lower.includes("case brief")) {
      return "**Case Brief Template**\n\n**Case Name:** [Case Name] v. [Opposing Party]\n**Court:** [Court Name]\n**Year:** [Year]\n**Facts:** [Key facts of the case]\n**Issue:** [Legal question before the court]\n**Holding:** [Court's decision]\n**Reasoning:** [Court's legal reasoning]\n**Rule:** [Legal rule established]\n**Dissent:** [If applicable]\n\nPlease provide the case details, and I'll generate a comprehensive brief.";
    }
    return "I'm your **Law Assistant**. I can help with:\n\n- IRAC analysis generation\n- Case briefs\n- Legal concept explanations\n- Contract analysis\n- Court decision summaries\n- Exam preparation\n- Legal research plans\n- Flashcards and quizzes\n\nWhat legal topic would you like to explore?";
  }

  if (mode === "student") {
    if (lower.includes("study plan")) {
      return "**Study Plan Generator**\n\nTo create your personalized study plan, I need:\n1. Your subject(s)\n2. Exam dates\n3. Hours available per day\n4. Your current understanding level\n\nPlease provide these details and I'll generate an optimized study schedule with spaced repetition built in!";
    }
    if (lower.includes("flashcard")) {
      return "**Flashcard Generator**\n\nI can generate flashcards on any topic. Just tell me:\n- The subject/topic\n- Number of cards\n- Specific areas to focus on\n\nExample: 'Generate 10 flashcards on constitutional law principles'";
    }
    return "**Student Tools Ready**\n\nI can help you with:\n- Creating study plans\n- Generating flashcards\n- Making quizzes\n- Explaining concepts\n- Summarizing notes\n- Essay assistance\n\nWhat would you like to work on?";
  }

  if (mode === "creative") {
    return "**Creative Mode Active**\n\nI'm ready to help you create! I can assist with:\n- Creative writing and storytelling\n- Brainstorming ideas\n- Content creation\n- Poetry and prose\n- Marketing copy\n- Script writing\n\nWhat would you like to create today?";
  }

  if (mode === "research") {
    return "**Research Mode Active**\n\nI can help with:\n- Deep research on any topic\n- Literature reviews\n- Citation generation (APA, MLA, Chicago)\n- Source analysis\n- Research methodology\n- Paper outlines\n\nWhat would you like to research?";
  }

  return `Hello! I'm **MV AI**. I can help you with questions, analysis, study tools, legal research, creative projects, and more.

**Try asking about:**
- Complex concepts or topics
- Legal questions (switch to Law mode)
- Study assistance (switch to Student mode)
- Creative projects (switch to Creative mode)
- Research topics (switch to Research mode)

How can I assist you today?`;
}
