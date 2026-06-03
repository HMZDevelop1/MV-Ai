"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AIOrbScene } from "@/components/three/AIOrb";
import { HiSparkles, HiAcademicCap, HiScale, HiDocumentText, HiLightningBolt } from "react-icons/hi";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mv-bg-radial-hero">
      <div className="absolute inset-0 mv-grid-bg pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] pointer-events-none" />

      <div className="container-mv relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-sm text-accent-red mb-6"
            >
              <HiSparkles />
              <span>Premium AI Platform v2.0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-text leading-[1.05] mb-6"
            >
              Your Personal{" "}
              <span className="mv-text-gradient">Artificial Intelligence</span>{" "}
              Universe.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-secondary-text max-w-xl mb-8 leading-relaxed"
            >
              The ultimate AI platform for students, law professionals, researchers, creators, and productivity. Ask, analyze, generate, and study smarter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/chat">
                <Button variant="primary" size="lg" icon={<HiLightningBolt />}>
                  Start Free
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="secondary" size="lg">
                  Explore Features
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 mt-10 text-sm text-muted-text"
            >
              {[
                { icon: HiAcademicCap, label: "Students" },
                { icon: HiScale, label: "Law" },
                { icon: HiDocumentText, label: "Research" },
                { icon: HiLightningBolt, label: "Fast" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2">
                  <item.icon className="text-glow-red" size={16} />
                  {item.label}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 via-transparent to-red-500/10 blur-3xl animate-glow-pulse" />
              <div className="relative w-full h-full">
                <AIOrbScene />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-20 mv-glass-light rounded-2xl p-3 animate-float">
                <p className="text-xs text-accent-red font-semibold">AI Chat</p>
                <p className="text-[10px] text-secondary-text mt-1">Ready to help</p>
              </div>
              <div className="absolute -bottom-2 -left-4 w-36 h-20 mv-glass-light rounded-2xl p-3 animate-float" style={{ animationDelay: "-3s" }}>
                <p className="text-xs text-accent-red font-semibold">Law Mode</p>
                <p className="text-[10px] text-secondary-text mt-1">IRAC Ready</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
