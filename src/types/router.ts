export type ModelProvider = "ollama" | "huggingface" | "transformers" | "local" | "openai-compatible" | "fallback";

export type ModelCategory =
  | "reasoning"
  | "coding"
  | "vision"
  | "documents"
  | "research"
  | "language"
  | "math"
  | "embedding"
  | "image"
  | "video"
  | "voice"
  | "creative";

export type TaskCategory =
  | "general"
  | "law"
  | "research"
  | "coding"
  | "math"
  | "pdf-analysis"
  | "image-analysis"
  | "translation"
  | "writing"
  | "studying"
  | "presentation"
  | "summarization"
  | "exam-prep"
  | "creative"
  | "analysis";

export interface AIModel {
  id: string;
  name: string;
  provider: ModelProvider;
  category: ModelCategory[];
  contextLength: number;
  strength: number; // 1-10
  isAvailable: boolean;
  description: string;
  endpoint?: string;
}

export interface RouterDecision {
  task: TaskCategory;
  detectedIntent: string;
  confidence: number;
  selectedModel: AIModel;
  fallbackModel?: AIModel;
  executionTime?: number;
}

export interface MemoryEntry {
  id: string;
  type: "preference" | "subject" | "course" | "project" | "note" | "conversation" | "study-plan" | "fact";
  content: string;
  metadata?: Record<string, string>;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentAnalysis {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  pages?: number;
  summary: string;
  keyPoints: string[];
  entities: string[];
  language: string;
  readabilityScore?: number;
  analyzedAt: Date;
}

export interface VisionAnalysis {
  id: string;
  description: string;
  objects: string[];
  text: string;
  labels: string[];
  confidence: number;
  analyzedAt: Date;
}

export interface ResearchResult {
  id: string;
  query: string;
  sources: { title: string; url: string; relevance: number }[];
  summary: string;
  keyFindings: string[];
  analyzedAt: Date;
}

export interface ProductivityTask {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in-progress" | "done";
  dueDate?: Date;
  category: string;
  createdAt: Date;
}

export interface StudyPlanItem {
  id: string;
  subject: string;
  topic: string;
  date: Date;
  duration: number; // minutes
  completed: boolean;
  resources?: string[];
}

export interface VoiceSession {
  id: string;
  inputLanguage: string;
  outputLanguage: string;
  transcript: string;
  response: string;
  timestamp: Date;
}
