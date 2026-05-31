"use client";

export function MobileNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-black/85 px-[clamp(1rem,4vw,2rem)] py-[clamp(0.65rem,1.5vw,0.9rem)] backdrop-blur-md md:hidden">
      <span className="font-heading text-[clamp(0.875rem,2.5vw,1rem)] font-bold tracking-[0.2em] text-white">
        KEDANTRA
      </span>
    </header>
  );
}
