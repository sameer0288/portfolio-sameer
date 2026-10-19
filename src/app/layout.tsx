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
  title: "Sameer Ali — Software Engineer",
  description:
    "Sameer Ali is a software engineer (SDE-1) with 2.5+ years building full-stack products, PostgreSQL backends, and applied AI systems including Milvus vector search.",
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
    title: "Sameer Ali — Software Engineer",
    description:
      "Software engineer with 2.5+ years across EMR platforms, vector search, and banking systems.",
    siteName: "Sameer Ali Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameer Ali — Software Engineer",
    description: "Full-stack software engineer. EMR, vector search, and banking systems.",
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
      <body className="min-h-screen font-sans selection:bg-[var(--accent)] selection:text-[var(--accent-ink)] antialiased relative">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("sameer-portfolio-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?"#f4f7f5":"#090d16");}}catch(e){}`,
          }}
        />
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
