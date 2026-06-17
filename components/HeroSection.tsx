"use client";

import { PixelHero } from "@/components/PixelHero";

export function HeroSection() {
  return (
    <section id="home" className="relative w-full">
      <PixelHero
        word1="KEDANTRA"
        word2=""
        description="Minimalist interfaces driven by refined motion. Every calculated detail delivers an elevated digital experience."
      />
    </section>
  );
}
