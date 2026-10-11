import React from "react";
import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SkillsGrid } from "@/components/SkillsGrid";
import { EducationAchievements } from "@/components/EducationAchievements";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ProjectGrid />
      <ExperienceTimeline />
      <SkillsGrid />
      <EducationAchievements />
      <ContactSection />
    </>
  );
}
