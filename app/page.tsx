import { CustomerExperiencesSection } from "@/components/CustomerExperiencesSection";
import { DesktopHeader } from "@/components/DesktopHeader";
import { DevelopmentProcessSection } from "@/components/DevelopmentProcessSection";
import { HeroSection } from "@/components/HeroSection";
import { KedantraFooter } from "@/components/KedantraFooter";
import { MobileNav } from "@/components/MobileNav";
import { ProjectsSection } from "@/components/ProjectsSection";
import { VisionMissionSection } from "@/components/VisionMissionSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      <DesktopHeader />
      <MobileNav />
      <div className="relative z-10">
        <HeroSection />
        <VisionMissionSection />
        <ProjectsSection />
        <DevelopmentProcessSection />
        <CustomerExperiencesSection />
        <KedantraFooter />
      </div>
    </main>
  );
}
