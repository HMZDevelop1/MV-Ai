"use client";

import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { HiShieldCheck, HiLockClosed, HiKey, HiEye, HiServer, HiDocumentText } from "react-icons/hi";

export function SecuritySection() {
  return (
    <SectionWrapper id="security">
      <SectionHeader
        badge="Security & Privacy"
        title="Enterprise-Grade Security"
        subtitle="Your data is encrypted, protected, and private. Built with security-first architecture."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: HiLockClosed, title: "End-to-End Encryption", desc: "All data encrypted in transit and at rest using AES-256." },
          { icon: HiKey, title: "Secure Authentication", desc: "Multi-factor authentication with session protection." },
          { icon: HiEye, title: "Privacy First", desc: "We never train on your data. Your conversations are yours." },
          { icon: HiServer, title: "Secure Infrastructure", desc: "SOC 2 compliant infrastructure with regular audits." },
          { icon: HiDocumentText, title: "Data Portability", desc: "Export or delete your data anytime. Full control." },
          { icon: HiShieldCheck, title: "Rate Limiting", desc: "Protected against abuse with intelligent rate limiting." },
        ].map((item, i) => (
          <GlassCard key={item.title} delay={i * 0.05} className="p-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4">
              <item.icon className="text-white" size={20} />
            </div>
            <h3 className="text-base font-bold text-primary-text mb-2">{item.title}</h3>
            <p className="text-sm text-secondary-text">{item.desc}</p>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
