function VisionCard() {
  return (
    <article className="card-premium flex flex-col gap-section rounded-[clamp(0.75rem,1.5vw,1.25rem)] bg-white p-[clamp(1.25rem,3vw,2rem)]">
      <div className="flex items-center gap-3">
        <span className="h-[clamp(2rem,4vw,2.75rem)] w-1 rounded-full bg-secondary" />
        <h3 className="font-heading text-clamp-h3 font-semibold text-primary">
          Startup Vision
        </h3>
      </div>
      <p className="text-clamp-body text-primary/90">
        To build advanced, secure, and intelligent digital systems powered by
        next-generation AI, autonomous technologies, and high-performance
        infrastructure that can solve complex real-world problems.
      </p>
      <p className="text-clamp-body border-l-2 border-ternary/40 pl-[clamp(0.75rem,2vw,1rem)] text-muted italic">
        To create powerful AI-driven and autonomous systems with world-class
        security, scalability, and innovation.
      </p>
    </article>
  );
}

function MissionCard() {
  return (
    <article className="card-premium flex flex-col gap-section rounded-[clamp(0.75rem,1.5vw,1.25rem)] bg-white p-[clamp(1.25rem,3vw,2rem)]">
      <div className="flex items-center gap-3">
        <span className="h-[clamp(2rem,4vw,2.75rem)] w-1 rounded-full bg-ternary" />
        <h3 className="font-heading text-clamp-h3 font-semibold text-primary">
          Startup Mission
        </h3>
      </div>
      <p className="text-clamp-body text-primary/90">
        We develop high-quality, secure, and scalable websites, mobile
        applications, and digital platforms for organizations. We provide
        advanced feature integration, AI-powered solutions, and intelligent
        system automation while ensuring strong data security and reliable
        performance.
      </p>
      <p className="text-clamp-body border-l-2 border-hover/50 pl-[clamp(0.75rem,2vw,1rem)] text-muted italic">
        To deliver secure and modern web, mobile, and enterprise solutions
        integrated with AI technologies, helping organizations improve
        efficiency, automation, and digital transformation.
      </p>
    </article>
  );
}

export function VisionMissionSection() {
  return (
    <section
      id="vision"
      className="section-full bg-lines relative flex flex-col justify-center pad-section"
    >
      <div className="mx-auto flex w-full max-w-[clamp(20rem,90vw,72rem)] flex-col gap-section">
        <header className="text-center md:text-left">
          <p className="text-clamp-small mb-2 font-semibold uppercase tracking-[0.25em] text-secondary">
            Who We Are
          </p>
          <h2 className="font-heading text-clamp-h2 font-bold text-primary">
            Vision &amp; Mission
          </h2>
          <p className="text-clamp-body mx-auto mt-3 max-w-[clamp(18rem,50vw,40rem)] text-muted md:mx-0">
            Building the future of secure, intelligent, and scalable digital
            ecosystems.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-section lg:grid-cols-2">
          <VisionCard />
          <MissionCard />
        </div>
      </div>
    </section>
  );
}
