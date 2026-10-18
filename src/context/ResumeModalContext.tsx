"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ResumeTab = "resume" | "ats" | "markoknow" | "pdf";

interface ResumeModalContextType {
  isOpen: boolean;
  activeTab: ResumeTab;
  openResume: (tab?: ResumeTab) => void;
  closeResume: () => void;
  setActiveTab: (tab: ResumeTab) => void;
}

const ResumeModalContext = createContext<ResumeModalContextType | undefined>(undefined);

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ResumeTab>("resume");

  const openResume = (tab: ResumeTab = "resume") => {
    setActiveTab(tab);
    setIsOpen(true);
  };

  const closeResume = () => {
    setIsOpen(false);
  };

  return (
    <ResumeModalContext.Provider
      value={{
        isOpen,
        activeTab,
        openResume,
        closeResume,
        setActiveTab,
      }}
    >
      {children}
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  const context = useContext(ResumeModalContext);
  if (!context) {
    throw new Error("useResumeModal must be used within a ResumeModalProvider");
  }
  return context;
}
