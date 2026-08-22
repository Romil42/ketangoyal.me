"use client";

import { useState, type FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqpznegp";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ recipient }: { recipient: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const fieldClassName =
    "mt-2 w-full rounded-xl border border-mist bg-paper px-4 py-3 text-ink placeholder:text-dust transition-colors hover:border-dust focus:border-signal focus:outline-none";

  return (
    <form
      action={FORMSPREE_ENDPOINT}
      method="POST"
      onSubmit={handleSubmit}
      className="rounded-2xl border border-mist bg-fog p-6 sm:p-8"
    >
      <input type="hidden" name="_subject" value="New message from ketangoyal.me" />
      <label className="sr-only" aria-hidden="true">
        Leave this field empty
        <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="text-sm font-semibold text-ink">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            className={fieldClassName}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className={fieldClassName}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-topic" className="text-sm font-semibold text-ink">
          What would you like to discuss?
        </label>
        <select id="contact-topic" name="topic" className={fieldClassName} defaultValue="Kraftt Digital enquiry">
          <option>Kraftt Digital enquiry</option>
          <option>Collaboration</option>
          <option>Software and systems</option>
          <option>Something else</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="text-sm font-semibold text-ink">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          minLength={10}
          maxLength={5000}
          className={`${fieldClassName} resize-y`}
          placeholder="A little context helps me reply properly."
        />
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-paper transition-colors hover:bg-signal disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <div className="text-sm" aria-live="polite">
          {status === "success" ? (
            <p className="font-semibold text-signal">Message sent. Thanks—I&rsquo;ll reply by email.</p>
          ) : status === "error" ? (
            <p className="text-slate">
              Something went wrong. Please email{" "}
              <a href={`mailto:${recipient}`} className="font-semibold text-ink underline hover:text-signal">
                {recipient}
              </a>
              .
            </p>
          ) : (
            <p className="text-dust">Your message will be sent securely through this form.</p>
          )}
        </div>
      </div>
    </form>
  );
}
