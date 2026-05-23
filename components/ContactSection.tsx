"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      type: String(formData.get("type") ?? "feedback"),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok) {
        setErrorMessage(
          result.error ?? "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="section-full bg-diagonal relative flex flex-col justify-center pad-section pb-[clamp(3.5rem,8vh,5rem)]"
    >
      <div className="mx-auto grid w-full max-w-[clamp(20rem,92vw,72rem)] grid-cols-1 items-center gap-section py-[clamp(0.5rem,2vh,2rem)] lg:grid-cols-[1fr_1.1fr]">
        <header className="text-center lg:text-left">
          <p className="text-clamp-small mb-2 font-semibold uppercase tracking-[0.25em] text-ternary">
            Get in Touch
          </p>
          <h2 className="font-heading text-clamp-h2 font-bold text-white">
            Contact &amp; Feedback
          </h2>
          <p className="text-clamp-body mt-4 max-w-[clamp(16rem,40vw,28rem)] text-white/75">
            Share feedback, ask a question, or send a complaint. We keep it
            simple — tell us what you need and we will respond.
          </p>
          <ul className="text-clamp-small mt-6 hidden flex-col gap-2 text-white/60 lg:flex">
            <li>hello@kedantra.com</li>
            <li>Secure · Responsive · AI-Ready</li>
          </ul>
        </header>

        <div className="card-premium rounded-[clamp(0.75rem,1.5vw,1.25rem)] bg-white p-[clamp(1.25rem,3vw,2rem)]">
          {status === "success" ? (
            <div className="flex min-h-[clamp(12rem,30vh,18rem)] flex-col items-center justify-center text-center">
              <span className="mb-4 flex size-[clamp(2.5rem,6vw,3.5rem)] items-center justify-center rounded-full bg-hover/15 text-hover">
                ✓
              </span>
              <p className="font-heading text-clamp-h3 font-semibold text-primary">
                Thank you
              </p>
              <p className="text-clamp-body mt-2 text-muted">
                Your message has been saved securely. We will get back to you
                soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-clamp-small mt-6 font-medium text-secondary underline-offset-2 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[clamp(0.75rem,2vw,1.25rem)]"
            >
              {errorMessage ? (
                <p
                  role="alert"
                  className="text-clamp-small rounded-lg border border-secondary/30 bg-secondary/5 px-3 py-2 text-secondary"
                >
                  {errorMessage}
                </p>
              ) : null}

              <label className="flex flex-col gap-1.5">
                <span className="text-clamp-small font-medium text-primary">
                  Name / Organization Name
                </span>
                <input
                  required
                  disabled={status === "submitting"}
                  type="text"
                  name="name"
                  minLength={2}
                  maxLength={120}
                  placeholder="Your name"
                  className="text-clamp-body rounded-lg border border-primary/15 bg-surface px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.6rem,1.5vw,0.75rem)] outline-none transition-colors focus:border-hover focus:ring-2 focus:ring-hover/20 disabled:opacity-60"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-clamp-small font-medium text-primary">
                  Type
                </span>
                <select
                  name="type"
                  disabled={status === "submitting"}
                  defaultValue="feedback"
                  className="text-clamp-body rounded-lg border border-primary/15 bg-surface px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.6rem,1.5vw,0.75rem)] outline-none transition-colors focus:border-hover focus:ring-2 focus:ring-hover/20 disabled:opacity-60"
                >
                  <option value="feedback">Feedback</option>
                  <option value="query">Query</option>
                  <option value="complaint">Complaint</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-clamp-small font-medium text-primary">
                  Message
                </span>
                <textarea
                  required
                  disabled={status === "submitting"}
                  name="message"
                  rows={4}
                  minLength={10}
                  maxLength={5000}
                  placeholder="Your message..."
                  className="text-clamp-body resize-y rounded-lg border border-primary/15 bg-surface px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.6rem,1.5vw,0.75rem)] outline-none transition-colors focus:border-hover focus:ring-2 focus:ring-hover/20 disabled:opacity-60"
                />
              </label>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="text-clamp-body mt-1 w-full rounded-lg bg-secondary px-6 py-[clamp(0.7rem,1.8vw,0.9rem)] font-semibold text-white transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:self-start"
              >
                {status === "submitting" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="absolute inset-x-0 bottom-0 py-[clamp(0.75rem,2vh,1.25rem)] text-center">
        <p className="text-clamp-small text-white/40">
          © {new Date().getFullYear()} KEDANTRA. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
