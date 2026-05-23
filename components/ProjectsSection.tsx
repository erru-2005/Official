import { demoProjects } from "@/lib/projects";

function ProjectCard({
  title,
  category,
  description,
  tags,
  index,
}: {
  title: string;
  category: string;
  description: string;
  tags: string[];
  index: number;
}) {
  const accents = ["bg-secondary", "bg-ternary", "bg-hover", "bg-secondary"];

  return (
    <article className="card-premium group relative flex flex-col overflow-hidden rounded-[clamp(0.75rem,1.5vw,1.25rem)] bg-white transition-transform duration-300 hover:-translate-y-1">
      <div
        className={`h-[clamp(0.25rem,0.5vw,0.35rem)] ${accents[index % accents.length]}`}
      />
      <div className="flex flex-1 flex-col gap-[clamp(0.75rem,2vw,1.25rem)] p-[clamp(1rem,2.5vw,1.75rem)]">
        <span
          aria-hidden
          className="font-heading absolute right-[clamp(0.75rem,2vw,1.25rem)] top-[clamp(0.75rem,2vw,1.25rem)] text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-none text-primary/[0.06]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="text-clamp-small font-semibold uppercase tracking-wider text-ternary">
            {category}
          </p>
          <h3 className="font-heading text-clamp-h3 mt-1 font-semibold text-primary transition-colors group-hover:text-secondary">
            {title}
          </h3>
        </div>
        <p className="text-clamp-body flex-1 text-muted">{description}</p>
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="text-clamp-small rounded-full border border-primary/10 bg-surface px-[clamp(0.5rem,1.5vw,0.875rem)] py-1 font-medium text-primary/80"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section-full bg-dots-light relative flex flex-col justify-center pad-section"
    >
      <div className="mx-auto flex w-full max-w-[clamp(20rem,92vw,76rem)] flex-col gap-section">
        <header className="text-center">
          <p className="text-clamp-small mb-2 font-semibold uppercase tracking-[0.25em] text-ternary">
            Portfolio
          </p>
          <h2 className="font-heading text-clamp-h2 font-bold text-primary">
            Demo Projects
          </h2>
          <p className="text-clamp-body mx-auto mt-3 max-w-[clamp(18rem,55vw,38rem)] text-muted">
            A glimpse of the secure, scalable, and AI-powered solutions we
            deliver.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-section sm:grid-cols-2">
          {demoProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              category={project.category}
              description={project.description}
              tags={project.tags}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
