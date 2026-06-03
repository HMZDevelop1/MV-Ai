export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  mode: "general" | "law" | "student" | "creative" | "research";
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx" | "txt" | "image";
  size: number;
  uploadedAt: Date;
  content?: string;
  summary?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StudyPlan {
  id: string;
  title: string;
  subject: string;
  date: Date;
  duration: number;
  completed: boolean;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  url: string;
  style: string;
  createdAt: Date;
}

export interface GeneratedVideo {
  id: string;
  prompt: string;
  url: string;
  duration: number;
  style: string;
  createdAt: Date;
}

export interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface LawCase {
  id: string;
  title: string;
  court: string;
  year: number;
  summary: string;
  issues: string[];
  ruling: string;
  irac?: IRACAnalysis;
}

export interface IRACAnalysis {
  issue: string;
  rule: string;
  application: string;
  conclusion: string;
}

export type AIMode = "general" | "law" | "student" | "creative" | "research";
