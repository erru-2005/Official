export function HeroSection() {
  return (
    <section
      id="home"
      className="section-full bg-dots relative flex flex-col items-center justify-center overflow-hidden pad-section"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--ternary)_18%,transparent)_0%,transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(80px,15vh,160px)] bg-gradient-to-t from-primary to-transparent"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="animate-fade-up text-clamp-small mb-[clamp(0.75rem,2vw,1.5rem)] font-medium uppercase tracking-[0.35em] text-white/60">
          Intelligent Digital Systems
        </p>
        <h1 className="animate-fade-up-delay font-heading text-clamp-hero logo-shadow font-extrabold uppercase text-white">
          KEDANTRA
        </h1>
        <div
          aria-hidden
          className="animate-fade-up-delay mt-[clamp(1rem,3vw,2rem)] h-px w-[clamp(4rem,20vw,10rem)] bg-gradient-to-r from-transparent via-ternary to-transparent"
        />
        <p className="animate-fade-up-delay-2 text-clamp-body mt-[clamp(0.75rem,2vw,1.5rem)] max-w-[clamp(18rem,55vw,36rem)] text-white/75">
          Next-generation AI, autonomous technologies, and secure
          infrastructure for complex real-world challenges.
        </p>
      </div>

      <a
        href="#vision"
        aria-label="Scroll to vision and mission"
        className="absolute bottom-[clamp(1.5rem,5vh,3rem)] flex flex-col items-center gap-2 text-white/50 transition-colors hover:text-ternary"
      >
        <span className="text-clamp-small tracking-widest uppercase">Explore</span>
        <span className="block h-[clamp(1.5rem,3vh,2.5rem)] w-px animate-pulse bg-gradient-to-b from-white/60 to-transparent" />
      </a>
    </section>
  );
}
