"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiMail, HiLocationMarker, HiPhone, HiPaperAirplane, HiChat } from "react-icons/hi";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Contact"
          title="Get In Touch"
          subtitle="Have questions, feedback, or need help? We're here for you."
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-primary-text mb-6">Contact Information</h3>
              <div className="space-y-4">
                {[
                  { icon: HiMail, label: "Email", value: "hello@mvai.com", desc: "We reply within 24 hours" },
                  { icon: HiLocationMarker, label: "Location", value: "San Francisco, CA", desc: "Remote-first team" },
                  { icon: HiPhone, label: "Phone", value: "+1 (555) 123-4567", desc: "Mon-Fri, 9AM-6PM PST" },
                  { icon: HiChat, label: "Live Chat", value: "Available on platform", desc: "Instant support for users" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-accent-red" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-text uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-medium text-primary-text">{item.value}</p>
                      <p className="text-xs text-secondary-text">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-primary-text mb-6">Send us a message</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-xl mv-input text-sm" />
                  <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-xl mv-input text-sm" />
                </div>
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl mv-input text-sm" />
                <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-xl mv-input text-sm" />
                <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-3 rounded-xl mv-input text-sm resize-none" />
                <Button variant="primary" className="w-full" icon={<HiPaperAirplane />}>
                  Send Message
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
