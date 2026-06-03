"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiCheck, HiChip, HiAcademicCap, HiScale, HiStar, HiLightningBolt } from "react-icons/hi";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    desc: "Get started with basic AI features.",
    icon: HiChip,
    color: "from-red-500 to-red-600",
    features: [
      "100 messages per day",
      "Basic AI chat",
      "Document upload (3/month)",
      "Standard response speed",
      "Community support",
    ],
    cta: "Get Started",
    href: "/chat",
  },
  {
    name: "Student Pro",
    price: 9.99,
    period: "month",
    desc: "Everything a student needs to excel.",
    icon: HiAcademicCap,
    color: "from-red-500 to-red-700",
    features: [
      "Unlimited messages",
      "All AI modes",
      "Document analyzer (50/month)",
      "Study tools & flashcards",
      "Quiz generator",
      "Image generator (30/month)",
      "Priority support",
    ],
    cta: "Start Free Trial",
    href: "/chat",
    recommended: true,
  },
  {
    name: "Law Pro",
    price: 19.99,
    period: "month",
    desc: "Advanced legal research and analysis tools.",
    icon: HiScale,
    color: "from-red-600 to-red-800",
    features: [
      "Everything in Student Pro",
      "Unlimited IRAC analysis",
      "Case brief generator",
      "Contract analysis",
      "Legal research tools",
      "Exam preparation mode",
      "Citation generator",
      "Priority legal support",
    ],
    cta: "Start Free Trial",
    href: "/chat",
  },
  {
    name: "Ultimate",
    price: 29.99,
    period: "month",
    desc: "Full platform access with premium features.",
    icon: HiStar,
    color: "from-red-500 to-red-600",
    features: [
      "Everything in Law Pro",
      "Unlimited image generation",
      "Unlimited video generation",
      "Advanced research hub",
      "Custom AI training",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Start Free Trial",
    href: "/chat",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Pricing"
          title="Choose Your Plan"
          subtitle="Start free and upgrade as you grow. All plans include premium features and security."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard
                  className={`p-6 h-full flex flex-col relative ${
                    plan.recommended
                      ? "border-red-500/40 shadow-2xl shadow-red-900/20 scale-[1.02]"
                      : ""
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                    <Icon className="text-white" size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-primary-text mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-extrabold text-primary-text">${plan.price}</span>
                    <span className="text-sm text-muted-text">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-secondary-text mb-6">{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm text-secondary-text">
                        <HiCheck className="text-success mt-0.5 flex-shrink-0" size={16} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button variant={plan.recommended ? "primary" : "secondary"} className="w-full">
                      {plan.cta}
                    </Button>
                  </Link>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <GlassCard className="p-6 max-w-2xl mx-auto mt-12 text-center">
          <HiLightningBolt className="text-accent-red mx-auto mb-3" size={24} />
          <h3 className="text-lg font-bold text-primary-text mb-2">Need a custom plan?</h3>
          <p className="text-sm text-secondary-text mb-4">Contact us for enterprise pricing, team plans, or custom requirements.</p>
          <Link href="/contact">
            <Button variant="secondary">Contact Sales</Button>
          </Link>
        </GlassCard>
      </SectionWrapper>
    </div>
  );
}
