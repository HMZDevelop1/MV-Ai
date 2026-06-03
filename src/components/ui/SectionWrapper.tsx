"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "hero" | "dark";
}

export function SectionWrapper({ children, className, id, variant = "default" }: SectionWrapperProps) {
  const variants = {
    default: "py-20 md:py-28",
    hero: "pt-28 pb-20 md:pt-36 md:pb-28",
    dark: "py-20 md:py-28 bg-secondary-bg/30",
  };

  return (
    <section id={id} className={cn("relative", variants[variant], className)}>
      <div className="container-mv">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "max-w-3xl mb-16",
        align === "center" && "mx-auto text-center"
      )}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase text-glow-red bg-red-500/10 border border-red-500/20 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold text-primary-text mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-secondary-text max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
