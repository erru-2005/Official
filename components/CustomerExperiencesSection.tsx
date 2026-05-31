"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageSquareQuote,
  Plus,
  X,
} from "lucide-react";
import type { CustomerExperienceCard } from "@/lib/types/customer-experience";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function CustomerExperiencesSection() {
  const [experiences, setExperiences] = useState<CustomerExperienceCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const response = await fetch("/api/customer-experiences");
      const result = (await response.json()) as {
        experiences?: CustomerExperienceCard[];
        error?: string;
      };

      if (!response.ok) {
        setLoadError(result.error ?? "Could not load experiences.");
        setExperiences([]);
        return;
      }

      setExperiences(result.experiences ?? []);
      setActive(0);
    } catch {
      setLoadError("Network error. Please refresh the page.");
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchExperiences();
  }, [fetchExperiences]);

  useEffect(() => {
    if (experiences.length > 0 && active >= experiences.length) {
      setActive(experiences.length - 1);
    }
  }, [experiences.length, active]);

  const handleChange = (index: number) => {
    if (index === active || isTransitioning || experiences.length === 0) return;
    setIsTransitioning(true);
    window.setTimeout(() => {
      setActive(index);
      window.setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handlePrev = () => {
    if (experiences.length === 0) return;
    const newIndex = active === 0 ? experiences.length - 1 : active - 1;
    handleChange(newIndex);
  };

  const handleNext = () => {
    if (experiences.length === 0) return;
    const newIndex = active === experiences.length - 1 ? 0 : active + 1;
    handleChange(newIndex);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("submitting");
    setFormError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      quote: String(formData.get("quote") ?? ""),
      author: String(formData.get("author") ?? ""),
      role: String(formData.get("role") ?? ""),
      company: String(formData.get("company") ?? ""),
      image_url: String(formData.get("image_url") ?? ""),
    };

    try {
      const response = await fetch("/api/customer-experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        experience?: CustomerExperienceCard;
        error?: string;
      };

      if (!response.ok) {
        setFormError(result.error ?? "Something went wrong. Please try again.");
        setFormStatus("error");
        return;
      }

      if (result.experience) {
        setExperiences((prev) => [result.experience!, ...prev]);
        setActive(0);
      } else {
        await fetchExperiences();
      }

      form.reset();
      setFormStatus("success");
      window.setTimeout(() => {
        setAddOpen(false);
        setFormStatus("idle");
      }, 900);
    } catch {
      setFormError("Network error. Check your connection and try again.");
      setFormStatus("error");
    }
  }

  const current = experiences[active];
  const total = experiences.length;
  const indexLabel = total > 0 ? String(active + 1).padStart(2, "0") : "00";

  return (
    <section
      id="contact"
      className="section-full relative flex flex-col justify-center bg-transparent pad-section"
    >

      <div className="relative z-10 mx-auto w-full max-w-[clamp(20rem,92vw,48rem)] py-[clamp(0.5rem,2vh,2rem)]">
        <header className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-clamp-small mb-2 font-semibold tracking-[0.25em] text-ternary uppercase">
              Customer Experiences
            </p>
            <h2 className="font-heading text-clamp-h2 font-bold text-white">
              What partners say
            </h2>
            <p className="text-clamp-body mt-3 max-w-xl text-white/65">
              Real stories from teams we work with. Add yours to share how
              KEDANTRA helped your project.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setAddOpen(true);
              setFormStatus("idle");
              setFormError(null);
            }}
            className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-hover hover:bg-hover/20 hover:text-white sm:mx-0"
            aria-label="Add customer experience"
          >
            <Plus className="size-5" strokeWidth={1.75} />
          </button>
        </header>

        {loading ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 text-white/50">
            <Loader2 className="size-8 animate-spin" aria-hidden />
            <p className="text-clamp-small">Loading experiences…</p>
          </div>
        ) : loadError ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 text-center">
            <MessageSquareQuote
              className="size-12 text-white/25"
              strokeWidth={1.25}
            />
            <p className="text-clamp-body max-w-sm text-white/55">{loadError}</p>
            <button
              type="button"
              onClick={() => void fetchExperiences()}
              className="text-clamp-small font-medium text-secondary underline-offset-2 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : total === 0 ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 text-center">
            <div className="flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <MessageSquareQuote
                className="size-8 text-white/30"
                strokeWidth={1.25}
              />
            </div>
            <div>
              <p className="font-heading text-clamp-h3 font-semibold text-white/80">
                No experiences yet
              </p>
              <p className="text-clamp-body mt-2 max-w-sm text-white/45">
                Be the first to share feedback. Tap the add button above to
                publish your story.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="text-clamp-small inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-medium text-white/80 transition-colors hover:border-hover hover:text-white"
            >
              <Plus className="size-4" />
              Add experience
            </button>
          </div>
        ) : (
          <div className="w-full px-2 sm:px-6">
            <div className="flex items-start gap-4 sm:gap-8">
              <span
                className="hidden select-none text-[clamp(4rem,12vw,7.5rem)] leading-none font-light text-white/10 sm:block"
                style={{ fontFeatureSettings: '"tnum"' }}
              >
                {indexLabel}
              </span>

              <div className="min-w-0 flex-1 sm:pt-6">
                <blockquote
                  className={`text-clamp-h3 font-light leading-relaxed tracking-tight text-white transition-all duration-300 ${
                    isTransitioning
                      ? "translate-x-4 opacity-0"
                      : "translate-x-0 opacity-100"
                  }`}
                >
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div
                  className={`mt-8 transition-all duration-300 delay-100 sm:mt-10 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="group flex cursor-default items-center gap-4">
                    <div className="relative size-12 overflow-hidden rounded-full ring-2 ring-white/10 transition-all duration-300 group-hover:ring-white/30">
                      <Image
                        src={current.image}
                        alt={current.author}
                        fill
                        className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-white">{current.author}</p>
                      <p className="text-clamp-small text-white/50">
                        {current.role || "Partner"}
                        {current.company ? (
                          <>
                            <span className="mx-2 text-white/20">/</span>
                            <span className="transition-colors duration-300 group-hover:text-white/80">
                              {current.company}
                            </span>
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between sm:mt-16">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  {experiences.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleChange(index)}
                      className="group relative py-4"
                      aria-label={`View experience ${index + 1}`}
                    >
                      <span
                        className={`block h-px transition-all duration-500 ease-out ${
                          index === active
                            ? "w-12 bg-white"
                            : "w-6 bg-white/20 group-hover:w-8 group-hover:bg-white/40"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs tracking-widest text-white/40 uppercase">
                  {indexLabel} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="rounded-full p-2 text-white/40 transition-all duration-300 hover:bg-white/5 hover:text-white"
                  aria-label="Previous experience"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full p-2 text-white/40 transition-all duration-300 hover:bg-white/5 hover:text-white"
                  aria-label="Next experience"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {addOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-experience-title"
        >
          <div className="card-premium card-dark relative w-full max-w-lg rounded-2xl p-6 sm:p-8">
            <button
              type="button"
              onClick={() => {
                if (formStatus !== "submitting") setAddOpen(false);
              }}
              className="absolute top-4 right-4 rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <h3
              id="add-experience-title"
              className="font-heading text-clamp-h3 pr-8 font-semibold text-white"
            >
              Add customer experience
            </h3>
            <p className="text-clamp-small mt-2 text-white/55">
              Your story is saved to our database and appears in the carousel
              right away.
            </p>

            {formStatus === "success" ? (
              <p className="text-clamp-body mt-8 text-hover">
                Thank you — your experience has been published.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-4"
              >
                {formError ? (
                  <p
                    role="alert"
                    className="text-clamp-small rounded-lg border border-secondary/40 bg-secondary/10 px-3 py-2 text-secondary"
                  >
                    {formError}
                  </p>
                ) : null}

                <label className="flex flex-col gap-1.5">
                  <span className="text-clamp-small font-medium text-white/90">
                    Your experience
                  </span>
                  <textarea
                    required
                    name="quote"
                    rows={4}
                    minLength={10}
                    maxLength={2000}
                    disabled={formStatus === "submitting"}
                    placeholder="What was it like working with KEDANTRA?"
                    className="text-clamp-body resize-y rounded-lg border border-white/15 bg-black/50 px-3 py-2.5 text-white outline-none placeholder:text-white/35 focus:border-hover focus:ring-2 focus:ring-hover/20 disabled:opacity-60"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-clamp-small font-medium text-white/90">
                    Your name
                  </span>
                  <input
                    required
                    type="text"
                    name="author"
                    minLength={2}
                    maxLength={120}
                    disabled={formStatus === "submitting"}
                    placeholder="Sarah Chen"
                    className="text-clamp-body rounded-lg border border-white/15 bg-black/50 px-3 py-2.5 text-white outline-none placeholder:text-white/35 focus:border-hover focus:ring-2 focus:ring-hover/20 disabled:opacity-60"
                  />
                </label>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-clamp-small font-medium text-white/90">
                      Role
                    </span>
                    <input
                      type="text"
                      name="role"
                      maxLength={120}
                      disabled={formStatus === "submitting"}
                      placeholder="Creative Director"
                      className="text-clamp-body rounded-lg border border-white/15 bg-black/50 px-3 py-2.5 text-white outline-none placeholder:text-white/35 focus:border-hover focus:ring-2 focus:ring-hover/20 disabled:opacity-60"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-clamp-small font-medium text-white/90">
                      Company
                    </span>
                    <input
                      type="text"
                      name="company"
                      maxLength={120}
                      disabled={formStatus === "submitting"}
                      placeholder="Studio Forma"
                      className="text-clamp-body rounded-lg border border-white/15 bg-black/50 px-3 py-2.5 text-white outline-none placeholder:text-white/35 focus:border-hover focus:ring-2 focus:ring-hover/20 disabled:opacity-60"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="text-clamp-small font-medium text-white/90">
                    Photo URL{" "}
                    <span className="font-normal text-white/40">(optional)</span>
                  </span>
                  <input
                    type="url"
                    name="image_url"
                    disabled={formStatus === "submitting"}
                    placeholder="https://images.unsplash.com/..."
                    className="text-clamp-body rounded-lg border border-white/15 bg-black/50 px-3 py-2.5 text-white outline-none placeholder:text-white/35 focus:border-hover focus:ring-2 focus:ring-hover/20 disabled:opacity-60"
                  />
                </label>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="text-clamp-body mt-2 w-full rounded-lg bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {formStatus === "submitting" ? "Saving…" : "Publish experience"}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
