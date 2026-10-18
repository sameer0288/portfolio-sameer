import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ResumeModal } from "@/components/ResumeModal";
import { ResumeModalProvider } from "@/context/ResumeModalContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sameer Ali — Software Engineer × GenAI Builder",
  description:
    "Production portfolio of Sameer Ali, SDE-1 and GenAI Developer. 2.5+ years building full-stack applications, vector-search systems (Milvus), and high-reliability platforms.",
  keywords: [
    "Sameer Ali",
    "Software Development Engineer",
    "GenAI Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "FastAPI",
    "Milvus",
    "PostgreSQL",
    "JourneyWise AI",
    "Kuanta",
    "Techdome",
  ],
  authors: [{ name: "Sameer Ali" }],
  creator: "Sameer Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sameerali.dev",
    title: "Sameer Ali — Software Engineer × GenAI Builder",
    description: "I build software that works. AI that delivers. SDE & GenAI developer portfolio.",
    siteName: "Sameer Ali Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameer Ali — Software Engineer × GenAI Builder",
    description: "I build software that works. AI that delivers.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#090d16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={`${spaceGrotesk.variable} ${dmMono.variable}`}>
      <body className="min-h-screen font-sans selection:bg-[var(--accent)] selection:text-[var(--accent-dark)] antialiased relative">
        <ResumeModalProvider>
          {/* Subtle ambient lighting radiance */}
          <div className="ambient-glow" aria-hidden="true" />

          {/* Subtle tech grid mesh */}
          <div className="tech-grid" aria-hidden="true" />

          {/* Global sticky navigation bar */}
          <Navbar />

          {/* Main application content with mobile safe bottom spacing */}
          <main id="main-content" tabIndex={-1} className="pb-20 md:pb-0">
            {children}
          </main>

          {/* Global footer */}
          <Footer />

          {/* Ergonomic Mobile Bottom Navigation Dock */}
          <MobileBottomNav />

          {/* Interactive Global Résumé & Credentials Modal */}
          <ResumeModal />

          {/* Floating AI portfolio assistant */}
          <ChatAssistant />
        </ResumeModalProvider>
      </body>
    </html>
  );
}
