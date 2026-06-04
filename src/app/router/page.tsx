"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { router, generateSmartResponse } from "@/lib/router-engine";
import type { AIModel, TaskCategory, RouterDecision } from "@/types/router";
import { HiChip, HiLightningBolt, HiScale, HiAcademicCap, HiCode, HiSearch, HiPhotograph, HiDocumentText, HiGlobe, HiPencil, HiChartBar, HiSparkles, HiBeaker, HiEye, HiMenu } from "react-icons/hi";

const taskIcons: Record<TaskCategory, typeof HiChip> = {
  general: HiChip,
  law: HiScale,
  research: HiSearch,
  coding: HiCode,
  math: HiChartBar,
  "pdf-analysis": HiDocumentText,
  "image-analysis": HiEye,
  translation: HiGlobe,
  writing: HiPencil,
  studying: HiAcademicCap,
  presentation: HiChartBar,
  summarization: HiDocumentText,
  "exam-prep": HiAcademicCap,
  creative: HiSparkles,
  analysis: HiBeaker,
};

const taskLabels: Record<TaskCategory, string> = {
  general: "General",
  law: "Law",
  research: "Research",
  coding: "Coding",
  math: "Math",
  "pdf-analysis": "PDF Analysis",
  "image-analysis": "Image Analysis",
  translation: "Translation",
  writing: "Writing",
  studying: "Studying",
  presentation: "Presentation",
  summarization: "Summarization",
  "exam-prep": "Exam Prep",
  creative: "Creative",
  analysis: "Analysis",
};

export default function RouterPage() {
  const [input, setInput] = useState("");
  const [routingResult, setRoutingResult] = useState<RouterDecision | null>(null);
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<"route" | "models" | "history">("route");
  const [history, setHistory] = useState<RouterDecision[]>([]);
  const [models] = useState<AIModel[]>(router.getAvailableModels());
  const [modelFilter, setModelFilter] = useState<string>("all");

  const handleRoute = async () => {
    if (!input.trim() || isProcessing) return;
    setIsProcessing(true);
    setRoutingResult(null);
    setResponse("");

    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 800));

    const decision = router.route(input);
    const smartResponse = generateSmartResponse(input, decision.task);

    setRoutingResult(decision);
    setResponse(smartResponse);
    setHistory((prev) => [decision, ...prev]);
    setIsProcessing(false);
  };

  const filteredModels = modelFilter === "all" 
    ? models 
    : models.filter(m => m.category.includes(modelFilter as any));

  const modelCategories = [...new Set(models.flatMap(m => m.category))];

  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-sm text-accent-red mb-4">
              <HiChip size={16} />
              <span>MV AI Router v2.0</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-text mb-3">
              Intelligent <span className="mv-text-gradient">AI Router</span>
            </h1>
            <p className="text-secondary-text text-lg max-w-2xl">
              Automatically detects your task and routes it to the best available free AI model.
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 max-w-4xl mx-auto">
          {([
            { id: "route", label: "Route", icon: HiLightningBolt },
            { id: "models", label: "Models", icon: HiMenu },
            { id: "history", label: "History", icon: HiBeaker },
          ] as const).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-red-500/10 border border-red-500/20 text-primary-text"
                    : "text-secondary-text hover:text-primary-text hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "route" && (
              <motion.div
                key="route"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Input */}
                <GlassCard className="p-6 mb-6">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleRoute(); }}}
                    placeholder="Type anything — MV AI Router will detect the task and route to the best AI model..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl mv-input text-sm resize-none mb-4"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "IRAC analysis contract law", task: "law" },
                        { label: "Generate study plan for exams", task: "studying" },
                        { label: "Explain quantum computing", task: "general" },
                        { label: "Write Python code for sorting", task: "coding" },
                      ].map((suggestion) => (
                        <button
                          key={suggestion.label}
                          onClick={() => setInput(suggestion.label)}
                          className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/5 text-secondary-text border border-white/10 hover:bg-white/10 hover:text-primary-text transition-all"
                        >
                          {suggestion.label}
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="primary"
                      onClick={handleRoute}
                      disabled={!input.trim() || isProcessing}
                      loading={isProcessing}
                      icon={<HiLightningBolt />}
                    >
                      Route
                    </Button>
                  </div>
                </GlassCard>

                {/* Routing Result */}
                {routingResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {/* Decision Card */}
                    <GlassCard className="p-5 mb-4">
                      <div className="flex items-center flex-wrap gap-3 mb-4 pb-4 border-b border-white/5">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                          {(() => {
                            const Icon = taskIcons[routingResult.task] || HiChip;
                            return <Icon className="text-accent-red" size={16} />;
                          })()}
                          <span className="text-sm font-medium text-primary-text">
                            {taskLabels[routingResult.task]}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-text">
                          <HiLightningBolt className="text-success" size={14} />
                          <span>Confidence: {Math.round(routingResult.confidence * 100)}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-text ml-auto">
                          <HiChip size={14} />
                          <span>Router: {routingResult.selectedModel.name}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div className="p-2 rounded-lg bg-white/5">
                          <span className="text-muted-text block">Detected Intent</span>
                          <span className="text-primary-text font-medium">{routingResult.detectedIntent}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/5">
                          <span className="text-muted-text block">Selected Model</span>
                          <span className="text-primary-text font-medium">{routingResult.selectedModel.name}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/5">
                          <span className="text-muted-text block">Provider</span>
                          <span className="text-primary-text font-medium capitalize">{routingResult.selectedModel.provider}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/5">
                          <span className="text-muted-text block">Model Strength</span>
                          <span className="text-primary-text font-medium">{routingResult.selectedModel.strength}/10</span>
                        </div>
                      </div>
                    </GlassCard>

                    {/* Response */}
                    <GlassCard className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-success" />
                        <span className="text-xs font-medium text-muted-text uppercase tracking-wider">
                          Response via {routingResult.selectedModel.name}
                        </span>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <div className="text-sm text-primary-text leading-relaxed whitespace-pre-wrap">
                          {response.split("\n").map((line, i) => {
                            if (line.startsWith("**") && line.endsWith("**")) {
                              return <h4 key={i} className="text-base font-bold text-primary-text mt-4 mb-2">{line.replace(/\*\*/g, "")}</h4>;
                            }
                            if (line.startsWith("- ")) {
                              return <li key={i} className="text-sm text-secondary-text ml-4 list-disc">{line.slice(2)}</li>;
                            }
                            if (line.startsWith("> ")) {
                              return <blockquote key={i} className="border-l-2 border-red-500/30 pl-4 text-sm text-muted-text italic my-2">{line.slice(2)}</blockquote>;
                            }
                            if (line.trim() === "") return <br key={i} />;
                            return <p key={i} className="text-sm text-secondary-text">{line}</p>;
                          })}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "models" && (
              <motion.div
                key="models"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Filter */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setModelFilter("all")}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      modelFilter === "all"
                        ? "bg-red-500/20 text-accent-red border border-red-500/30"
                        : "bg-white/5 text-muted-text border border-white/10"
                    }`}
                  >
                    All Models
                  </button>
                  {modelCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setModelFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
                        modelFilter === cat
                          ? "bg-red-500/20 text-accent-red border border-red-500/30"
                          : "bg-white/5 text-muted-text border border-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid gap-3">
                  {filteredModels.map((model, i) => (
                    <motion.div
                      key={model.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <GlassCard className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                              model.strength >= 9
                                ? "bg-gradient-to-br from-red-500 to-red-700 text-white"
                                : model.strength >= 7
                                ? "bg-red-500/20 text-accent-red"
                                : "bg-white/10 text-muted-text"
                            }`}>
                              {model.strength}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-primary-text">{model.name}</h4>
                              <p className="text-xs text-muted-text">{model.description} · {model.provider} · {model.contextLength.toLocaleString()} ctx</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {model.category.map((cat) => (
                              <span key={cat} className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-muted-text capitalize">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {history.length === 0 ? (
                  <GlassCard className="p-8 text-center">
                    <HiBeaker className="text-muted-text mx-auto mb-3" size={32} />
                    <p className="text-sm text-secondary-text">No routing history yet. Try routing a query above.</p>
                  </GlassCard>
                ) : (
                  <div className="space-y-3">
                    {history.map((entry, i) => {
                      const Icon = taskIcons[entry.task] || HiChip;
                      return (
                        <GlassCard key={i} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Icon className="text-accent-red" size={18} />
                              <div>
                                <p className="text-sm font-medium text-primary-text">{taskLabels[entry.task]}</p>
                                <p className="text-xs text-muted-text">{entry.detectedIntent} · {entry.selectedModel.name}</p>
                              </div>
                            </div>
                            <span className="text-xs text-muted-text">{Math.round(entry.confidence * 100)}%</span>
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SectionWrapper>
    </div>
  );
}
