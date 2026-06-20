"use client";

import {
  Calendar,
  Code,
  FileText,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import RadialOrbitalTimeline, {
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline";

const developmentTimeline: TimelineItem[] = [
  {
    id: 1,
    title: "Discovery",
    date: "Phase 01",
    content:
      "Requirements gathering, stakeholder workshops, and success metrics for your web or mobile product.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Phase 02",
    content:
      "UX flows, UI systems, and technical architecture — aligned with KEDANTRA’s secure, scalable standards.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Build",
    date: "Phase 03",
    content:
      "Iterative development: APIs, front-end, AI integrations, and automation with continuous feedback loops.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 65,
  },
  {
    id: 4,
    title: "QA & Security",
    date: "Phase 04",
    content:
      "Testing, performance tuning, penetration checks, and compliance validation before release.",
    category: "Quality",
    icon: ShieldCheck,
    relatedIds: [3, 5],
    status: "pending",
    energy: 35,
  },
  {
    id: 5,
    title: "Launch",
    date: "Phase 05",
    content:
      "Deployment, monitoring, handover, and post-launch optimization for long-term reliability.",
    category: "Release",
    icon: Rocket,
    relatedIds: [4],
    status: "pending",
    energy: 15,
  },
];

export function DevelopmentProcessSection() {
  return (
    <section
      id="process"
      className="section-full bg-transparent relative flex flex-col"
    >
      <header className="relative z-20 shrink-0 px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(1.5rem,4vh,3rem)] pb-[clamp(0.25rem,1vh,0.75rem)] text-center">
        <p className="text-clamp-small mb-2 font-semibold tracking-[0.25em] text-white/50 uppercase">
          How We Deliver
        </p>
        <h2 className="font-heading text-clamp-h2 font-bold text-white">
          Iterative Development Process
        </h2>
       
      </header>

      <div className="relative min-h-0 flex-1 px-[clamp(0.5rem,2vw,1rem)] pb-[clamp(0.5rem,2vw,1rem)]">
        <RadialOrbitalTimeline timelineData={developmentTimeline} />
      </div>
    </section>
  );
}
