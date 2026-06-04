import type { AIModel, ModelCategory, TaskCategory, RouterDecision } from "@/types/router";

// ─── Free/Open Models Registry ───────────────────────────────────────────────

const modelRegistry: AIModel[] = [
  // Reasoning
  { id: "deepseek-r1", name: "DeepSeek R1", provider: "ollama", category: ["reasoning", "math", "coding"], contextLength: 131072, strength: 9, isAvailable: true, description: "Strong reasoning & math" },
  { id: "deepseek-v3", name: "DeepSeek V3", provider: "ollama", category: ["reasoning", "language", "coding"], contextLength: 65536, strength: 9, isAvailable: true, description: "General purpose reasoning" },
  { id: "qwen-2.5-32b", name: "Qwen 2.5 32B", provider: "ollama", category: ["reasoning", "coding", "language"], contextLength: 32768, strength: 8, isAvailable: true, description: "Strong general model" },

  // Language
  { id: "llama-3.3-70b", name: "Llama 3.3 70B", provider: "ollama", category: ["language", "reasoning"], contextLength: 131072, strength: 9, isAvailable: true, description: "Meta's flagship" },
  { id: "llama-3.2-8b", name: "Llama 3.2 8B", provider: "ollama", category: ["language", "reasoning"], contextLength: 32768, strength: 7, isAvailable: true, description: "Fast & efficient" },
  { id: "mistral-7b", name: "Mistral 7B", provider: "ollama", category: ["language", "coding"], contextLength: 32768, strength: 7, isAvailable: true, description: "Strong small model" },
  { id: "mixtral-8x7b", name: "Mixtral 8x7B", provider: "ollama", category: ["language", "reasoning"], contextLength: 32768, strength: 8, isAvailable: true, description: "Mixture of experts" },
  { id: "phi-4", name: "Phi-4", provider: "ollama", category: ["language", "math", "coding"], contextLength: 16384, strength: 7, isAvailable: true, description: "Microsoft's efficient model" },
  { id: "gemma-2-27b", name: "Gemma 2 27B", provider: "ollama", category: ["language", "reasoning"], contextLength: 8192, strength: 8, isAvailable: true, description: "Google's open model" },

  // Coding
  { id: "qwen-2.5-coder-32b", name: "Qwen 2.5 Coder 32B", provider: "ollama", category: ["coding", "reasoning"], contextLength: 32768, strength: 9, isAvailable: true, description: "Top coding model" },
  { id: "deepseek-coder-v2", name: "DeepSeek Coder V2", provider: "ollama", category: ["coding", "reasoning"], contextLength: 65536, strength: 9, isAvailable: true, description: "Strong code intelligence" },

  // Vision
  { id: "llama-3.2-11b-vision", name: "Llama 3.2 Vision 11B", provider: "ollama", category: ["vision", "language"], contextLength: 32768, strength: 8, isAvailable: true, description: "Vision & language" },
  { id: "qwen-2.5-vl-32b", name: "Qwen 2.5 VL 32B", provider: "ollama", category: ["vision", "documents"], contextLength: 32768, strength: 8, isAvailable: true, description: "Vision & document understanding" },
  { id: "minicpm-llama3-v-2.5", name: "MiniCPM-Llama3-V 2.5", provider: "ollama", category: ["vision", "documents"], contextLength: 8192, strength: 7, isAvailable: true, description: "Lightweight vision model" },

  // Documents
  { id: "nomic-embed-text", name: "Nomic Embed Text", provider: "ollama", category: ["embedding", "documents"], contextLength: 8192, strength: 7, isAvailable: true, description: "Text embeddings" },
  { id: "qwen-2.5-14b", name: "Qwen 2.5 14B", provider: "ollama", category: ["documents", "language"], contextLength: 32768, strength: 7, isAvailable: true, description: "Document understanding" },
];

// ─── Task → Model Category Mapping ──────────────────────────────────────────

const taskModelPriority: Record<TaskCategory, ModelCategory[]> = {
  "general": ["language", "reasoning"],
  "law": ["reasoning", "language", "documents"],
  "research": ["reasoning", "research", "language"],
  "coding": ["coding", "reasoning"],
  "math": ["math", "reasoning"],
  "pdf-analysis": ["documents", "vision", "reasoning"],
  "image-analysis": ["vision", "language"],
  "translation": ["language"],
  "writing": ["language", "creative"],
  "studying": ["reasoning", "language", "documents"],
  "presentation": ["language", "reasoning"],
  "summarization": ["language", "reasoning"],
  "exam-prep": ["reasoning", "language"],
  "creative": ["language"],
  "analysis": ["reasoning", "language", "documents"],
};

// ─── Intent Detection ────────────────────────────────────────────────────────

function detectTask(input: string): { task: TaskCategory; confidence: number; intent: string } {
  const lower = input.toLowerCase();

  const patterns: { keywords: string[]; task: TaskCategory; weight: number }[] = [
    { keywords: ["irac", "case brief", "legal", "law", "contract", "court", "constitutional", "criminal law", "civil law"], task: "law", weight: 0.9 },
    { keywords: ["code", "program", "function", "debug", "algorithm", "react", "python", "javascript", "typescript", "api"], task: "coding", weight: 0.85 },
    { keywords: ["math", "equation", "calculate", "solve", "integral", "derivative", "statistics", "probability", "algebra"], task: "math", weight: 0.85 },
    { keywords: ["research", "study", "paper", "journal", "citation", "source", "reference", "academic", "literature review"], task: "research", weight: 0.8 },
    { keywords: ["summarize", "summary", "tl;dr", "key points", "brief"], task: "summarization", weight: 0.85 },
    { keywords: ["translate", "translation", "in french", "in arabic", "in spanish"], task: "translation", weight: 0.9 },
    { keywords: ["write", "essay", "article", "blog", "content", "story", "poem"], task: "writing", weight: 0.75 },
    { keywords: ["study plan", "flashcard", "quiz", "exam", "test", "revision", "study", "homework"], task: "studying", weight: 0.8 },
    { keywords: ["presentation", "slides", "powerpoint", "pitch", "deck"], task: "presentation", weight: 0.8 },
    { keywords: ["exam prep", "practice test", "multiple choice", "study guide"], task: "exam-prep", weight: 0.85 },
    { keywords: ["creative", "brainstorm", "idea", "imagine", "design", "art"], task: "creative", weight: 0.7 },
    { keywords: ["pdf", "document", "file", "upload", "analyze", "extract"], task: "pdf-analysis", weight: 0.8 },
    { keywords: ["image", "photo", "picture", "screenshot", "diagram", "chart", "graph", "see"], task: "image-analysis", weight: 0.8 },
    { keywords: ["analyze", "compare", "contrast", "evaluate", "assess", "examine"], task: "analysis", weight: 0.7 },
  ];

  let bestMatch: { task: TaskCategory; confidence: number; intent: string } = {
    task: "general",
    confidence: 0.5,
    intent: "general conversation",
  };

  for (const pattern of patterns) {
    const matchCount = pattern.keywords.filter((kw) => lower.includes(kw)).length;
    if (matchCount > 0) {
      const confidence = Math.min(0.5 + (matchCount / pattern.keywords.length) * 0.5, pattern.weight);
      if (confidence > bestMatch.confidence) {
        bestMatch = { task: pattern.task, confidence, intent: pattern.keywords.find((kw) => lower.includes(kw)) || "detected" };
      }
    }
  }

  return bestMatch;
}

// ─── Model Selection ─────────────────────────────────────────────────────────

function selectBestModel(
  task: TaskCategory,
  preferredCategories: ModelCategory[]
): AIModel | null {
  const available = modelRegistry.filter(
    (m) =>
      m.isAvailable &&
      preferredCategories.some((cat) => m.category.includes(cat))
  );

  if (available.length === 0) return null;

  // Sort by strength descending, then by context length
  available.sort((a, b) => {
    if (b.strength !== a.strength) return b.strength - a.strength;
    return b.contextLength - a.contextLength;
  });

  return available[0];
}

// ─── MV AI Router Engine ─────────────────────────────────────────────────────

export class MVAIRouter {
  private history: RouterDecision[] = [];

  route(input: string): RouterDecision {
    const { task, confidence, intent } = detectTask(input);
    const preferredCategories = taskModelPriority[task] || ["language"];
    const selected = selectBestModel(task, preferredCategories);

    if (!selected) {
      const fallback = modelRegistry.find((m) => m.id === "llama-3.2-8b");
      const decision: RouterDecision = {
        task,
        detectedIntent: intent,
        confidence,
        selectedModel: fallback || {
          id: "fallback",
          name: "Fallback Model",
          provider: "fallback",
          category: ["language"],
          contextLength: 4096,
          strength: 5,
          isAvailable: true,
          description: "Default fallback",
        },
      };
      this.history.push(decision);
      return decision;
    }

    // Find a fallback model from different provider
    const fallback = modelRegistry.find(
      (m) => m.id !== selected.id && m.category.some((c) => preferredCategories.includes(c)) && m.isAvailable
    );

    const decision: RouterDecision = {
      task,
      detectedIntent: intent,
      confidence,
      selectedModel: selected,
      fallbackModel: fallback,
    };

    this.history.push(decision);
    return decision;
  }

  getHistory(): RouterDecision[] {
    return this.history;
  }

  getAvailableModels(): AIModel[] {
    return modelRegistry;
  }

  getModelsByCategory(category: ModelCategory): AIModel[] {
    return modelRegistry.filter((m) => m.category.includes(category) && m.isAvailable);
  }
}

export const router = new MVAIRouter();

// ─── Generate Smart Response (local simulation) ──────────────────────────────

export function generateSmartResponse(input: string, task: TaskCategory): string {
  const lower = input.toLowerCase();

  // Law responses
  if (task === "law") {
    if (lower.includes("irac")) return generateIRACResponse(input);
    if (lower.includes("case brief")) return "**Case Brief Generator**\n\nTo generate a case brief, please provide:\n- Case name and citation\n- Court and year\n- Key facts\n- Procedural history\n\nI'll generate a complete brief with:\n- Facts\n- Issue\n- Holding\n- Reasoning\n- Rule of Law\n- Dissent (if applicable)\n- Significance";
    if (lower.includes("contract")) return "**Contract Analysis**\n\nKey elements to examine in any contract:\n\n1. **Parties** – Are all parties clearly identified?\n2. **Consideration** – What is being exchanged?\n3. **Terms & Conditions** – Key obligations\n4. **Termination** – How can the contract end?\n5. **Liability** – Limitation clauses\n6. **Governing Law** – Which jurisdiction?\n7. **Signatures** – Properly executed?\n\n> Please upload the contract document for clause-by-clause analysis.\n\n*Always verify contract interpretations with a qualified legal professional.*";
    if (lower.includes("constitutional")) return "**Constitutional Law Assistant**\n\nI can help with:\n- Fundamental rights analysis\n- Constitutional interpretation methods\n- Landmark constitutional cases\n- Separation of powers\n- Judicial review\n- Federal vs state powers\n- Constitutional amendments\n\nWhich constitutional topic would you like to explore?\n\n> Note: Constitutional law varies by jurisdiction. Please specify your country/region.";
    return "**Law Mode Pro Activated**\n\nI'm ready to assist with:\n\n**Legal Analysis:**\n- IRAC / FIRAC analysis\n- Case briefs\n- Contract review\n- Court decision summaries\n\n**Subject Areas:**\n- Constitutional Law\n- Criminal Law\n- Civil Law\n- Business Law\n- Administrative Law\n- International Law\n\n**Exam Preparation:**\n- Practice questions\n- Legal flashcards\n- Essay structures\n- Oral presentations\n\nWhat legal topic would you like to explore today?";
  }

  // Student responses
  if (task === "studying" || task === "exam-prep") {
    if (lower.includes("flashcard")) return "**Flashcard Generator**\n\nI'll create flashcards for you. Just tell me:\n1. Subject/Topic\n2. Number of cards\n3. Specific focus areas\n\n**Example Request:**\n\"Generate 10 flashcards on the elements of a contract\"\n\nI'll create cards with:\n- Front: Key term/question\n- Back: Definition/answer\n- Topic tags for organization";
    if (lower.includes("quiz")) return "**Quiz Generator**\n\nI can create customized quizzes:\n\n**Options:**\n- Multiple choice\n- True/False\n- Short answer\n- Fill in the blank\n\n**Difficulty Levels:**\n- Basic (recall)\n- Intermediate (understanding)\n- Advanced (application)\n\n**Example:**\n\"Create a 10-question multiple choice quiz on constitutional law\"";
    if (lower.includes("study plan")) return "**Study Plan Generator**\n\nTo create your personalized study plan, I need:\n\n📚 **Subjects** – What are you studying?\n📅 **Exam Dates** – When are your exams?\n⏰ **Available Time** – Hours per day\n📊 **Current Level** – Beginner / Intermediate / Advanced\n\n**Example:**\n\"I have 3 subjects: Constitutional Law (exam June 15), Contracts (June 22), and Criminal Law (June 30). I can study 4 hours daily.\"";
    return "**Student Super Mode Ready**\n\nI can help you with:\n\n📚 **Study Tools**\n- Quiz Generator\n- Flashcard Generator\n- Study Planner\n- Homework Assistant\n- Notes Generator\n\n📝 **Writing & Research**\n- Essay Assistant\n- Citation Generator\n- Research Assistant\n- Summary Generator\n\n🎯 **Exam Preparation**\n- Practice Questions\n- Study Guides\n- Topic Reviews\n- Progress Tracking\n\nWhat subject are you studying today?";
  }

  // Coding responses
  if (task === "coding") {
    return "**Coding Assistant Active**\n\nI can help with:\n- Code generation and review\n- Debugging and optimization\n- Algorithm design\n- API integration\n- Framework guidance (React, Next.js, Node.js, Python)\n- Best practices and patterns\n\nWhat would you like me to help you build or debug?";
  }

  // Research responses
  if (task === "research") {
    return "**Research Hub Active**\n\nI can assist with:\n\n🔍 **Deep Research**\n- Topic exploration\n- Source gathering\n- Literature reviews\n\n📄 **Paper Analysis**\n- Methodology review\n- Key findings extraction\n- Critical analysis\n\n📝 **Writing Support**\n- Citation generation (APA, MLA, Chicago)\n- Research outlines\n- Abstract writing\n\nWhat topic are you researching?";
  }

  // PDF analysis
  if (task === "pdf-analysis") {
    return "**Document Intelligence System**\n\nUpload your document and I can:\n\n📄 **Analyze**\n- Summarize content\n- Extract key points\n- Identify main arguments\n- Detect entities and terms\n\n🔬 **Deep Analysis**\n- Question answering\n- Comparative analysis\n- Citation detection\n- Legal clause extraction\n\n📚 **Generate**\n- Study notes\n- Flashcards\n- Quiz questions\n- Exam revision sheets\n\n**Supported formats:** PDF, DOCX, PPTX, XLSX, TXT, CSV, Images";
  }

  // Image analysis
  if (task === "image-analysis") {
    return "**Vision AI Active**\n\nUpload an image and I can:\n\n👁️ **Describe** – Detailed image description\n📝 **Extract Text** – OCR text extraction\n📊 **Analyze Charts** – Data interpretation\n🔍 **Detect Objects** – Object recognition\n⚖️ **Legal Docs** – Document image analysis\n📋 **Forms** – Form field extraction\n\n**Supported:** Photos, screenshots, charts, graphs, contracts, tables, diagrams";
  }

  // General / default
  if (lower.includes("hello") || lower.includes("hi ")) return "Hello! I'm **MV AI Router** — your intelligent AI operating system. I can help with:\n\n- 💬 **General Chat**\n- ⚖️ **Legal Analysis** (Law Mode)\n- 📚 **Studying** (Student Mode)\n- 💻 **Coding**\n- 🔬 **Research**\n- 📄 **Document Analysis**\n- 🖼️ **Image Analysis**\n- 🌐 **Translation**\n- ✍️ **Writing**\n\nWhat would you like help with today?";
  if (lower.includes("who are you") || lower.includes("what are you")) return "I'm **MV AI Router**, the intelligent routing engine powering the MV AI platform. I automatically detect your task and route it to the best available AI model.\n\n**My capabilities include:**\n- Smart task detection (15+ categories)\n- Multi-model routing (20+ free models)\n- Automatic fallback if a model is unavailable\n- Streaming responses\n- Multi-modal support (text, images, documents)\n\nHow can I assist you today?";

  return `I understand you're asking about: "${input.slice(0, 100)}"\n\n**Task Detected:** ${task}\n**Mode:** ${getModeLabel(task)}\n\n${generateDetailedResponse(input, task)}`;

function getModeLabel(task: TaskCategory): string {
  if (task === "law") return "Law Pro";
  if (task === "studying" || task === "exam-prep") return "Student Super";
  return (task as string).charAt(0).toUpperCase() + (task as string).slice(1).replace("-", " ");
}
}

function generateIRACResponse(input: string): string {
  return `**IRAC Analysis Generator**

I can help you structure your legal analysis using the IRAC framework.

**I – Issue**
State the legal question presented by the facts.
*Example:* Whether a contract formed without consideration is enforceable?

**R – Rule**
State the relevant legal rule(s).
*Example:* Consideration is a fundamental element of a valid contract. A promise without consideration is generally unenforceable (except under seal or promissory estoppel).

**A – Application**
Apply the rule to the specific facts.
*Example:* In this case, Party A made a promise without receiving anything in return from Party B. No consideration was exchanged. The facts do not indicate a seal or reliance that would support promissory estoppel.

**C – Conclusion**
Reach a conclusion.
*Example:* The promise is unenforceable due to lack of consideration.

**To generate a specific IRAC analysis, please provide:**
1. The legal scenario/facts
2. The legal question
3. The jurisdiction (if applicable)

> ⚠️ *Always verify IRAC analyses with your professor and official legal sources.*`;
}

function generateDetailedResponse(input: string, task: TaskCategory): string {
  return `I'll provide you with a comprehensive response based on your query.

**Key Approach:**
1. Understanding your question thoroughly
2. Identifying the core concepts
3. Providing structured information
4. Highlighting important points
5. Suggesting next steps

**How would you like me to proceed?**
- Provide a detailed explanation
- Give examples
- Create structured notes
- Generate practice questions
- Summarize key points

Let me know and I'll tailor my response accordingly.`;
}
