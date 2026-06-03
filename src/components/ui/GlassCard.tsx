"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  variant?: "default" | "light" | "strong";
  hover?: boolean;
  glow?: boolean;
  delay?: number;
  className?: string;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onClick?: () => void;
}

export function GlassCard({
  children,
  variant = "default",
  hover = true,
  glow = false,
  delay = 0,
  className,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
}: GlassCardProps) {
  const variants = {
    default: "mv-glass",
    light: "mv-glass-light",
    strong: "mv-glass-strong",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "rounded-2xl",
        variants[variant],
        hover && "transition-all duration-300 hover:border-red-500/25 hover:shadow-2xl hover:shadow-red-900/10 hover:-translate-y-0.5",
        glow && "mv-red-glow",
        className
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
