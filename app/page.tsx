import { ContactSection } from "@/components/ContactSection";
import { DesktopHeader } from "@/components/DesktopHeader";
import { HeroSection } from "@/components/HeroSection";
import { MobileNav } from "@/components/MobileNav";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SectionNav } from "@/components/SectionNav";
import { VisionMissionSection } from "@/components/VisionMissionSection";

export default function Home() {
  return (
    <main className="relative">
      <DesktopHeader />
      <MobileNav />
      <SectionNav />
      <HeroSection />
      <VisionMissionSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
