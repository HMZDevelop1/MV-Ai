"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiShieldCheck, HiLightningBolt, HiCube, HiHeart, HiUserGroup, HiGlobe } from "react-icons/hi";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="About"
          title="Building the Future of AI"
          subtitle="MV AI was founded with a mission to make premium artificial intelligence accessible to everyone — students, law professionals, researchers, and creators."
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-primary-text mb-4">Our Mission</h3>
              <p className="text-secondary-text leading-relaxed mb-4">
                We believe AI should be powerful, beautiful, and accessible. MV AI combines cutting-edge 
                artificial intelligence with premium design to create a platform that feels as good as it performs.
              </p>
              <p className="text-secondary-text leading-relaxed">
                Built specifically for students and legal professionals, MV AI provides specialized tools 
                that go beyond generic chatbots — including IRAC analysis, legal research, study planning, 
                and multi-modal content generation.
              </p>
            </GlassCard>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-primary-text mb-4">Our Values</h3>
              <div className="space-y-4">
                {[
                  { icon: HiShieldCheck, label: "Privacy First", desc: "Your data belongs to you. We never train on your conversations." },
                  { icon: HiLightningBolt, label: "Performance", desc: "Optimized for speed with instant responses and smooth 120 FPS animations." },
                  { icon: HiCube, label: "Premium Design", desc: "Ferrari-inspired luxury meets Apple-level polish and Tesla minimalism." },
                  { icon: HiUserGroup, label: "User Focused", desc: "Built for students, law professionals, researchers, and creators." },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-accent-red" size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary-text">{item.label}</h4>
                      <p className="text-xs text-secondary-text">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <div className="text-center">
          <Link href="/chat">
            <Button variant="primary" size="lg">
              Get Started Free
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </div>
  );
}
