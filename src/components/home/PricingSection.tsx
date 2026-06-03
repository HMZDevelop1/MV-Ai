"use client";

import Link from "next/link";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { HiCheck, HiChip, HiAcademicCap, HiScale, HiStar } from "react-icons/hi";
import type { PricingPlan } from "@/types";

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Get started with basic AI features.",
    features: [
      "100 messages per day",
      "Basic AI chat",
      "Document upload (3/month)",
      "Standard response speed",
      "Community support",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Student Pro",
    price: 9.99,
    period: "month",
    description: "Everything a student needs to excel.",
    features: [
      "Unlimited messages",
      "All AI modes",
      "Document analyzer (50/month)",
      "Study tools & flashcards",
      "Quiz generator",
      "Image generator (30/month)",
      "Priority support",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Law Pro",
    price: 19.99,
    period: "month",
    description: "Advanced legal research and analysis tools.",
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
    highlighted: false,
    cta: "Start Free Trial",
  },
  {
    name: "Ultimate",
    price: 29.99,
    period: "month",
    description: "Full platform access with premium features.",
    features: [
      "Everything in Law Pro",
      "Unlimited image generation",
      "Unlimited video generation",
      "Advanced research hub",
      "Custom AI training",
      "API access",
      "Dedicated account manager",
      "White-label options",
    ],
    highlighted: false,
    cta: "Start Free Trial",
  },
];

const planIcons = [HiChip, HiAcademicCap, HiScale, HiStar] as const;

export function PricingSection() {
  return (
    <SectionWrapper id="pricing" variant="dark">
      <SectionHeader
        badge="Pricing"
        title="Choose Your Plan"
        subtitle="Start free and upgrade as you grow. All plans include premium features."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan, i) => {
          const Icon = planIcons[i];
          return (
            <GlassCard
              key={plan.name}
              className={`p-6 flex flex-col ${plan.highlighted ? "relative border-red-500/40 shadow-2xl shadow-red-900/20 scale-[1.02]" : ""}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-[10px] font-bold text-white uppercase tracking-wider">
                  Recommended
                </div>
              )}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.highlighted ? "from-red-500 to-red-700" : "from-red-500/50 to-red-700/50"} flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-extrabold text-primary-text">${plan.price}</span>
                <span className="text-sm text-muted-text">/{plan.period}</span>
              </div>
              <p className="text-sm text-secondary-text mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-secondary-text">
                    <HiCheck className="text-success mt-0.5 flex-shrink-0" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={plan.price === 0 ? "/chat" : "/pricing"}>
                <Button
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </GlassCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
