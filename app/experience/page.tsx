import { SiteNav } from "@/components/MenuBar";
import { KedantraFooter } from "@/components/KedantraFooter";
import { ExperiencePageClient } from "./ExperiencePageClient";

export const metadata = {
  title: "Customer Experiences | KEDANTRA",
  description: "Real stories from teams we work with. Share how KEDANTRA helped your project.",
};

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      <SiteNav />
      <div className="relative z-10 pt-20">
        <ExperiencePageClient />
      </div>
      <KedantraFooter />
    </main>
  );
}
