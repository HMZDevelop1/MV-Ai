"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { HiChevronDown } from "react-icons/hi";

const faqs = [
  {
    q: "What is MV AI?",
    a: "MV AI is a premium artificial intelligence platform designed for students, law professionals, researchers, creators, and anyone who needs powerful AI tools. It combines chat, document analysis, image/video generation, study tools, and legal research in one seamless experience.",
  },
  {
    q: "Is MV AI free to use?",
    a: "Yes! We offer a generous free plan that includes 100 messages per day, basic AI chat, and limited document uploads. For power users, we offer Student Pro, Law Pro, and Ultimate plans with unlimited access and advanced features.",
  },
  {
    q: "Can MV AI help with legal studies?",
    a: "Absolutely. MV AI's Law Assistant mode is specifically built for law students. It includes IRAC analysis, case brief generation, legal concept explanations, contract analysis, court decision summarization, and exam preparation tools. Always verify legal information with official sources.",
  },
  {
    q: "What file types does the Document Analyzer support?",
    a: "The Document Analyzer supports PDF, DOCX, TXT files, and images containing text. You can upload documents for summarization, key idea extraction, legal analysis, note generation, and flashcard creation.",
  },
  {
    q: "How does MV AI protect my privacy?",
    a: "We take privacy seriously. All data is encrypted in transit and at rest (AES-256). We never train on your data. Your conversations are completely private. You can export or delete your data at any time.",
  },
  {
    q: "Can I generate images and videos with MV AI?",
    a: "Yes! MV AI includes both an Image Generator and a Video Generator. You can create stunning images and cinematic videos from text prompts with full control over style, quality, and aspect ratio.",
  },
  {
    q: "Does MV AI support voice input and output?",
    a: "Yes, our AI Chat interface supports both voice input (microphone) and voice output (text-to-speech), making it easy to interact hands-free.",
  },
  {
    q: "What makes MV AI different from other AI platforms?",
    a: "MV AI combines premium design, Ferrari-inspired luxury aesthetics, Tesla-level performance, and comprehensive tools for both general and specialized use cases — especially legal education. It's not just a chatbot; it's a complete AI ecosystem.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq">
      <SectionHeader
        badge="FAQ"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about MV AI."
      />
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <GlassCard
            key={i}
            className="overflow-hidden cursor-pointer"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="p-5 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-primary-text pr-4">{faq.q}</h3>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <HiChevronDown className="text-muted-text flex-shrink-0" size={20} />
              </motion.div>
            </div>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="px-5 pb-5 text-sm text-secondary-text leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
