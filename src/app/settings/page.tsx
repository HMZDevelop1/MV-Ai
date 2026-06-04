"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { HiCog, HiShieldCheck, HiBell, HiGlobe, HiColorSwatch, HiVolumeUp, HiEye, HiTrash } from "react-icons/hi";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: "dark",
    language: "en",
    autoSpeak: true,
    streamResponses: true,
    saveHistory: true,
    notifications: true,
    reducedMotion: false,
    highContrast: false,
  });

  const toggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === "boolean") {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-sm text-accent-red mb-4">
              <HiCog size={16} />
              <span>Settings</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-text mb-8">Preferences</h1>

            <div className="space-y-4">
              {/* Appearance */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-primary-text mb-4 flex items-center gap-2">
                  <HiColorSwatch className="text-accent-red" />
                  Appearance
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-primary-text">Dark Mode</p>
                      <p className="text-xs text-muted-text">Premium dark theme</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${settings.theme === "dark" ? "bg-red-500" : "bg-white/20"}`}
                      onClick={() => setSettings((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }))}>
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform mt-0.5 ${settings.theme === "dark" ? "translate-x-6" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-primary-text">Reduced Motion</p>
                      <p className="text-xs text-muted-text">Minimize animations</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${settings.reducedMotion ? "bg-red-500" : "bg-white/20"}`}
                      onClick={() => toggle("reducedMotion")}>
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform mt-0.5 ${settings.reducedMotion ? "translate-x-6" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Language & Voice */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-primary-text mb-4 flex items-center gap-2">
                  <HiGlobe className="text-accent-red" />
                  Language & Voice
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-primary-text">Language</p>
                      <p className="text-xs text-muted-text">Interface and AI language</p>
                    </div>
                    <select className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-primary-text">
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-primary-text">Auto-speak responses</p>
                      <p className="text-xs text-muted-text">TTS for AI responses</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${settings.autoSpeak ? "bg-red-500" : "bg-white/20"}`}
                      onClick={() => toggle("autoSpeak")}>
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform mt-0.5 ${settings.autoSpeak ? "translate-x-6" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Privacy */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-primary-text mb-4 flex items-center gap-2">
                  <HiShieldCheck className="text-accent-red" />
                  Privacy & Data
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-primary-text">Save chat history</p>
                      <p className="text-xs text-muted-text">Store conversations</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${settings.saveHistory ? "bg-red-500" : "bg-white/20"}`}
                      onClick={() => toggle("saveHistory")}>
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform mt-0.5 ${settings.saveHistory ? "translate-x-6" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-primary-text">Notifications</p>
                      <p className="text-xs text-muted-text">Push notifications</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${settings.notifications ? "bg-red-500" : "bg-white/20"}`}
                      onClick={() => toggle("notifications")}>
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform mt-0.5 ${settings.notifications ? "translate-x-6" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                  <Button variant="secondary" icon={<HiTrash />} className="w-full mt-2">
                    Clear All Data
                  </Button>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
