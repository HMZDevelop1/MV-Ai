import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MV AI — Your Premium Artificial Intelligence Universe",
  description:
    "The ultimate AI platform for students, law professionals, researchers, creators, and productivity. Chat, analyze documents, generate images and videos, study smarter.",
  keywords: [
    "AI",
    "artificial intelligence",
    "law assistant",
    "student tools",
    "IRAC",
    "document analysis",
    "image generation",
    "video generation",
    "study tools",
    "legal research",
  ],
  openGraph: {
    title: "MV AI — Your Premium Artificial Intelligence Universe",
    description:
      "The ultimate AI platform for students, law professionals, researchers, creators, and productivity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#050505] text-primary-text antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
