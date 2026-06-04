export interface ParsedDocument {
  name: string;
  type: string;
  size: number;
  content: string;
  pages?: number;
  text: string;
}

export function parseFileName(name: string): { ext: string; valid: boolean } {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  const valid = ["pdf", "docx", "txt", "csv", "pptx", "xlsx", "png", "jpg", "jpeg", "gif", "webp"].includes(ext);
  return { ext, valid };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function generateDocumentSummary(text: string): string {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const wordCount = text.split(/\s+/).length;

  if (sentences.length === 0) return "No content to summarize.";

  // Take first 3 sentences as summary
  const summary = sentences.slice(0, 3).join(". ") + ".";
  
  return summary;
}

export function extractKeyPoints(text: string): string[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 30);
  const points: string[] = [];

  // Look for bullet points, numbered lists, or key sentences
  const lines = text.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("-") || trimmed.startsWith("•") || trimmed.startsWith("*")) {
      points.push(trimmed.replace(/^[-•*\s]+/, ""));
    }
    if (/^\d+[.)]/.test(trimmed)) {
      points.push(trimmed.replace(/^\d+[.)]\s*/, ""));
    }
  }

  // If no bullet points found, extract key sentences
  if (points.length === 0) {
    const keySentences = sentences.filter(s => {
      const lower = s.toLowerCase();
      return (
        lower.includes("important") ||
        lower.includes("key") ||
        lower.includes("significant") ||
        lower.includes("critical") ||
        lower.includes("essential") ||
        lower.includes("therefore") ||
        lower.includes("conclusion")
      );
    });
    return keySentences.slice(0, 5).map(s => s.trim());
  }

  return points.slice(0, 8);
}

export function generateFlashcards(text: string): { front: string; back: string }[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 40);
  const cards: { front: string; back: string }[] = [];

  for (const sentence of sentences.slice(0, 10)) {
    const trimmed = sentence.trim();
    // Use first half as question, second half as answer
    const mid = Math.floor(trimmed.length / 2);
    const front = trimmed.slice(0, mid).trim() + "...";
    const back = trimmed.slice(mid).trim();
    if (front.length > 10 && back.length > 10) {
      cards.push({ front, back });
    }
  }

  return cards;
}

export function generateQuizQuestions(text: string): { question: string; options: string[]; answer: number }[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 50);
  const quizzes: { question: string; options: string[]; answer: number }[] = [];

  for (const sentence of sentences.slice(0, 5)) {
    const trimmed = sentence.trim().split(" ");
    const keyWord = trimmed[Math.floor(Math.random() * trimmed.length)];
    const question = `According to the document, what is the significance of "${keyWord}"?`;
    const options = [
      trimmed.slice(0, 5).join(" ") + "...",
      "This concept is not mentioned in the document",
      trimmed.slice(3, 8).join(" ") + "...",
      "There is insufficient information to determine this",
    ];
    quizzes.push({ question, options, answer: 0 });
  }

  return quizzes;
}
