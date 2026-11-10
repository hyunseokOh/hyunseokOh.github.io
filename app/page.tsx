import { SiteNav } from "@/components/site-nav"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ResearchSection } from "@/components/research-section"
import { EducationSection } from "@/components/education-section"
import { PublicationsSection } from "@/components/publications-section"
import { PresentationsSection } from "@/components/presentations-section"
import { HonorsSection } from "@/components/honors-section"
import { ContactSection } from "@/components/contact-section"

export default function Page() {
  return (
    <main className="relative min-h-svh overflow-x-clip bg-background text-foreground">
      <SiteNav />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ResearchSection />
      <PublicationsSection />
      <PresentationsSection />
      <EducationSection />
      <HonorsSection />
      <ContactSection />
    </main>
  )
}
