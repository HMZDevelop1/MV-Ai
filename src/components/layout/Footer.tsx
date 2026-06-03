"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const footerLinks = {
  Platform: [
    { href: "/chat", label: "AI Chat" },
    { href: "/law", label: "Law Assistant" },
    { href: "/study-tools", label: "Study Tools" },
    { href: "/document-analyzer", label: "Document Analyzer" },
    { href: "/image-generator", label: "Image Generator" },
    { href: "/video-generator", label: "Video Generator" },
  ],
  Resources: [
    { href: "/research-hub", label: "Research Hub" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Cookie Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-secondary-bg/50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
      <div className="container-mv relative py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black text-sm">
                MV
              </div>
              <span className="font-heading text-xl font-extrabold text-primary-text tracking-tight">
                MV <span className="text-glow-red">AI</span>
              </span>
            </Link>
            <p className="text-sm text-secondary-text leading-relaxed mb-6 max-w-xs">
              Your premium artificial intelligence universe for students, law professionals, creators, and researchers.
            </p>
            <Link href="/chat">
              <Button variant="primary" size="sm">
                Get Started Free
              </Button>
            </Link>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-text mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary-text hover:text-primary-text transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-text">
            &copy; {new Date().getFullYear()} MV AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "LinkedIn", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-muted-text hover:text-primary-text transition-colors duration-200 text-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
