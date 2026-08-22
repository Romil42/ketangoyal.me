"use client";

import * as React from "react";

export default function JourneyTimeline({ children }: { children: React.ReactNode }) {
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const timeline = timelineRef.current;
    const progressLine = progressRef.current;
    if (!timeline || !progressLine) return;

    const entries = Array.from(
      timeline.querySelectorAll<HTMLElement>("[data-journey-scroll-item]"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      entries.forEach((entry) => entry.classList.add("is-visible"));
      progressLine.style.transform = "scaleY(1)";
      return;
    }

    timeline.classList.add("is-animated");

    const observer = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    entries.forEach((entry) => observer.observe(entry));

    let animationFrame: number | null = null;
    const updateProgress = () => {
      const bounds = timeline.getBoundingClientRect();
      const viewportAnchor = window.innerHeight * 0.55;
      const travelled = viewportAnchor - bounds.top;
      const distance = Math.max(bounds.height - window.innerHeight * 0.15, 1);
      const progress = Math.min(1, Math.max(0, travelled / distance));
      progressLine.style.transform = `scaleY(${progress})`;
      animationFrame = null;
    };

    const scheduleProgressUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleProgressUpdate, { passive: true });
    window.addEventListener("resize", scheduleProgressUpdate);

    return () => {
      observer.disconnect();
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleProgressUpdate);
      window.removeEventListener("resize", scheduleProgressUpdate);
    };
  }, []);

  return (
    <div ref={timelineRef} className="journey-timeline relative">
      <div
        className="absolute bottom-5 left-5 top-5 w-px bg-mist lg:left-[10.5rem]"
        aria-hidden="true"
      />
      <div
        ref={progressRef}
        className="journey-timeline__progress absolute bottom-5 left-5 top-5 z-[1] w-px bg-signal lg:left-[10.5rem]"
        aria-hidden="true"
      />

      {React.Children.map(children, (child, index) => (
        <div
          data-journey-scroll-item
          className="journey-scroll-item relative z-[2]"
          style={{ "--journey-delay": `${Math.min(index, 3) * 45}ms` } as React.CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
