import { CustomerExperiencesSection } from "@/components/CustomerExperiencesSection";
import { DevelopmentProcessSection } from "@/components/DevelopmentProcessSection";
import { HeroSection } from "@/components/HeroSection";
import { KedantraFooter } from "@/components/KedantraFooter";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SiteNav } from "@/components/MenuBar";
import { VisionMissionSection } from "@/components/VisionMissionSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      <SiteNav />
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
