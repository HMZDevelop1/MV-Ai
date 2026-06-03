"use client";

import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { HiMail, HiLocationMarker, HiPhone, HiPaperAirplane } from "react-icons/hi";

export function ContactSection() {
  return (
    <SectionWrapper id="contact" variant="dark">
      <SectionHeader
        badge="Contact"
        title="Get In Touch"
        subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond promptly."
      />
      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-6 md:p-8">
            <div className="space-y-4">
              {[
                { icon: HiMail, label: "Email", value: "hello@mvai.com" },
                { icon: HiLocationMarker, label: "Location", value: "San Francisco, CA" },
                { icon: HiPhone, label: "Phone", value: "+1 (555) 123-4567" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <item.icon className="text-accent-red" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-text uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-medium text-primary-text">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="p-6 md:p-8">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl mv-input text-sm"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl mv-input text-sm"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-xl mv-input text-sm"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-xl mv-input text-sm resize-none"
              />
              <Button variant="primary" className="w-full" icon={<HiPaperAirplane />}>
                Send Message
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
