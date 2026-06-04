"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiUpload, HiDocumentText, HiDocumentSearch, HiDocumentReport, HiScale, HiClipboardList, HiLightningBolt, HiPhotograph, HiCheck, HiDownload } from "react-icons/hi";
import { parseFileName, formatFileSize, generateDocumentSummary, extractKeyPoints, generateFlashcards, generateQuizQuestions } from "@/lib/document-parser";

export default function DocumentsPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState<{ name: string; type: string; size: number } | null>(null);
  const [analysis, setAnalysis] = useState<{
    summary: string;
    keyPoints: string[];
    flashcards: { front: string; back: string }[];
    quizzes: { question: string; options: string[]; answer: number }[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "points" | "flashcards" | "quiz">("summary");

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const { valid } = parseFileName(droppedFile.name);
      if (valid) {
        setFile({ name: droppedFile.name, type: droppedFile.type, size: droppedFile.size });
        analyzeFile(droppedFile);
      }
    }
  }, []);

  const analyzeFile = async (f: File) => {
    setIsAnalyzing(true);
    const text = await f.text();
    // Simulate processing
    await new Promise((r) => setTimeout(r, 1500));
    setAnalysis({
      summary: generateDocumentSummary(text),
      keyPoints: extractKeyPoints(text),
      flashcards: generateFlashcards(text),
      quizzes: generateQuizQuestions(text),
    });
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Document Intelligence"
          title="Advanced Document Analysis"
          subtitle="Upload any document for instant AI-powered analysis, summarization, and study material generation."
        />

        <div className="max-w-4xl mx-auto">
          {/* Upload Area */}
          {!file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard
                className={`p-12 text-center border-2 border-dashed transition-all cursor-pointer ${
                  isDragOver ? "border-red-500 bg-red-500/5" : "border-red-500/20 hover:border-red-500/40"
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6">
                  <HiUpload className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-primary-text mb-2">Drop your document here</h3>
                <p className="text-secondary-text mb-2">or click to browse files</p>
                <p className="text-xs text-muted-text mb-6">Supports PDF, DOCX, PPTX, XLSX, TXT, CSV, Images</p>
                <Button variant="primary" icon={<HiUpload />}>Choose File</Button>
              </GlassCard>
            </motion.div>
          )}

          {/* File Loaded */}
          {file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard className="p-5 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <HiDocumentText className="text-accent-red" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary-text">{file.name}</h4>
                      <p className="text-xs text-muted-text">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => { setFile(null); setAnalysis(null); }}>
                    New File
                  </Button>
                </div>
              </GlassCard>

              {isAnalyzing && (
                <GlassCard className="p-8 text-center">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                    <HiLightningBolt className="text-accent-red animate-pulse" size={24} />
                  </div>
                  <p className="text-sm text-secondary-text">Analyzing document...</p>
                </GlassCard>
              )}

              {analysis && (
                <>
                  {/* Tabs */}
                  <div className="flex gap-2 mb-4">
                    {([
                      { id: "summary", label: "Summary", icon: HiDocumentReport },
                      { id: "points", label: "Key Points", icon: HiDocumentSearch },
                      { id: "flashcards", label: "Flashcards", icon: HiClipboardList },
                      { id: "quiz", label: "Quiz", icon: HiScale },
                    ] as const).map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                            activeTab === tab.id
                              ? "bg-red-500/10 border border-red-500/20 text-primary-text"
                              : "bg-white/5 text-muted-text hover:text-primary-text"
                          }`}
                        >
                          <Icon size={14} />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Content */}
                  <GlassCard className="p-6">
                    {activeTab === "summary" && (
                      <div>
                        <h3 className="text-lg font-bold text-primary-text mb-3">Document Summary</h3>
                        <p className="text-sm text-secondary-text leading-relaxed">{analysis.summary}</p>
                      </div>
                    )}
                    {activeTab === "points" && (
                      <div>
                        <h3 className="text-lg font-bold text-primary-text mb-3">Key Points</h3>
                        <ul className="space-y-2">
                          {analysis.keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-secondary-text">
                              <HiCheck className="text-success mt-0.5 flex-shrink-0" size={16} />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {activeTab === "flashcards" && (
                      <div>
                        <h3 className="text-lg font-bold text-primary-text mb-3">Generated Flashcards</h3>
                        <div className="grid gap-3">
                          {analysis.flashcards.map((card, i) => (
                            <GlassCard key={i} variant="light" className="p-4">
                              <p className="text-xs text-muted-text mb-1">Front:</p>
                              <p className="text-sm text-primary-text mb-3">{card.front}</p>
                              <p className="text-xs text-muted-text mb-1">Back:</p>
                              <p className="text-sm text-secondary-text">{card.back}</p>
                            </GlassCard>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeTab === "quiz" && (
                      <div>
                        <h3 className="text-lg font-bold text-primary-text mb-3">Generated Quiz</h3>
                        <div className="space-y-4">
                          {analysis.quizzes.map((quiz, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/5">
                              <p className="text-sm font-medium text-primary-text mb-3">{i + 1}. {quiz.question}</p>
                              <div className="space-y-2">
                                {quiz.options.map((opt, j) => (
                                  <label key={j} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                                    <input type="radio" name={`quiz-${i}`} className="accent-red-500" />
                                    <span className="text-xs text-secondary-text">{opt}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </GlassCard>
                </>
              )}
            </motion.div>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}
