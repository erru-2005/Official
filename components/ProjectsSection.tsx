"use client";

import React, { useState, useEffect, useRef } from "react";
import { BrainCircuit, Lock, Smartphone, Network, ChevronLeft, ChevronRight } from "lucide-react";
import { FlippingCard } from "@/components/ui/flipping-card";

type ProjectDetail = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  icon: React.ReactNode;
};

const projectsWithDetails: ProjectDetail[] = [
  {
    id: "ai-analytics",
    title: "Nexus AI Analytics",
    category: "Enterprise Platform",
    description: "Real-time intelligence dashboard with predictive insights, secure multi-tenant access, and automated reporting.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    icon: <BrainCircuit className="size-4 text-white" />
  },
  {
    id: "secure-portal",
    title: "Fortis Client Portal",
    category: "Web Application",
    description: "Encrypted document workflows, role-based permissions, and seamless integrations for modern organizations.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    icon: <Lock className="size-4 text-white" />
  },
  {
    id: "mobile-automation",
    title: "Pulse Mobile Suite",
    category: "Mobile Application",
    description: "Cross-platform app with intelligent task automation, offline sync, and performance-optimized native experiences.",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80",
    icon: <Smartphone className="size-4 text-white" />
  },
  {
    id: "infra-dashboard",
    title: "Atlas Infrastructure",
    category: "Systems Monitoring",
    description: "High-performance observability stack with autonomous alerting, scalable metrics, and infrastructure health scoring.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    icon: <Network className="size-4 text-white" />
  }
];

const getFeaturesForProject = (id: string) => {
  switch (id) {
    case "ai-analytics":
      return ["Predictive Analytics Engine", "Multi-tenant Architecture", "Automated PDF Reporting"];
    case "secure-portal":
      return ["End-to-End Encryption", "Granular Access Roles", "Audit Trail Logs"];
    case "mobile-automation":
      return ["Offline-first Local DB", "Background Sync Tasks", "Native Performance"];
    case "infra-dashboard":
      return ["Real-time Grafana Feed", "Custom Webhook Alerts", "Health Scoring Logic"];
    default:
      return ["Scalable Core Architecture", "Modern API Endpoints", "Clean UI/UX Design"];
  }
};

export function ProjectsSection() {
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;

      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft < maxScroll - 5);
      }
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    projectsWithDetails.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 150 * i);
      timers.push(timer);
    });

    // Run initial scroll check after component mounts and slides in
    setTimeout(handleScroll, 200);

    // Initial automated preview flip focus hint on the first card
    const hintTimer1 = setTimeout(() => {
      setFlippedCardId(projectsWithDetails[0].id);
    }, 1500);
    const hintTimer2 = setTimeout(() => {
      setFlippedCardId(current => current === projectsWithDetails[0].id ? null : current);
    }, 2800);

    window.addEventListener("resize", handleScroll);
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearTimeout(hintTimer1);
      clearTimeout(hintTimer2);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 340 + 24; // Card width + gap
      const targetScroll = container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="projects"
      className="section-full relative flex flex-col justify-center pad-section overflow-hidden"
    >
      <div className="mx-auto flex w-full max-w-[clamp(20rem,92vw,76rem)] flex-col gap-section items-center">
        {/* Header Section */}
        <header className="text-center w-full max-w-2xl px-4 mb-4">
          <p className="text-clamp-small mb-2 font-semibold tracking-[0.25em] text-ternary uppercase">
            Portfolio
          </p>
          <h2 className="font-heading text-clamp-h4 font-bold text-white mb-3">
            Demo Projects
          </h2>
          
        </header>

        {/* Flipping Cards Horizontal Scroll Row */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex flex-row gap-6 w-full overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {projectsWithDetails.map((project, index) => (
            <div
              key={project.id}
              className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-center transition-all duration-700 ease-out"
              style={{
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? "translateY(0)" : "translateY(30px)",
              }}
            >
              <FlippingCard
                height={350}
                isFlipped={flippedCardId === project.id}
                onFlipToggle={() => {
                  setFlippedCardId(current => current === project.id ? null : project.id);
                }}
                frontContent={
                  <div
                    className="relative h-full w-full flex flex-col justify-end p-5 rounded-xl overflow-hidden"
                    style={{
                      backgroundImage: `url('${project.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Overlay shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-ternary bg-black/60 px-2 py-0.5 rounded-full w-fit border border-white/5">
                        {project.category}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-white">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] text-white/40 mt-1 font-medium">
                        <span>Hover to Flip</span>
                        <span className="animate-pulse">→</span>
                      </div>
                    </div>

                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 size-8 rounded-full bg-black/75 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      {project.icon}
                    </div>
                  </div>
                }
                backContent={
                  <div className="h-full w-full flex flex-col justify-between p-5 bg-[#0c0c0c]/95 border border-white/5 rounded-xl relative overflow-hidden">
                    {/* Subtle glowing orb in background */}
                    <div className="absolute -top-10 -right-10 size-20 rounded-full bg-ternary/15 blur-xl pointer-events-none" />
                    
                    <div className="flex flex-col gap-2 text-left">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          {project.icon}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-ternary">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-base text-white mt-1">
                        {project.title}
                      </h3>

                      <p className="text-xs text-white/70 leading-relaxed mt-1">
                        {project.description}
                      </p>

                      {/* Features list */}
                      <ul className="flex flex-col gap-1 mt-2.5">
                        {getFeaturesForProject(project.id).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-[10px] text-white/50">
                            <span className="size-1 rounded-full bg-secondary shrink-0" />
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Action can be handled here without causing a flip
                      }}
                      className="w-full py-2 mt-4 text-[11px] font-bold rounded-lg bg-white text-black hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                      Explore Project
                    </button>
                  </div>
                }
              />
            </div>
          ))}
        </div>

        {/* Custom Mover Controls */}
        <div className="flex items-center gap-4 mt-6 select-none">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border transition-all duration-300 ${
              canScrollLeft
                ? "border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 active:scale-95"
                : "border-white/5 bg-transparent text-white/20 cursor-not-allowed"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* Progress Bar Track */}
          <div className="relative w-28 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-secondary to-ternary rounded-full transition-transform duration-150 ease-out"
              style={{
                width: "40%",
                transform: `translateX(${scrollProgress * 150}%)`,
              }}
            />
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border transition-all duration-300 ${
              canScrollRight
                ? "border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 active:scale-95"
                : "border-white/5 bg-transparent text-white/20 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

