"use client";

import Image from "next/image";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  meta?: { label: string; value: string }[];
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  rotate?: number;
  depth?: number;
  perspective?: number;
  falloff?: number;
  fade?: number;
  cardWidth?: string;
  cardAspect?: number;
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  label?: string;
  className?: string;
  cardClassName?: string;
}

export function CoverflowCarousel({
  slides,
  rotate = 42,
  depth = 0.52,
  perspective = 3.2,
  falloff = 0.56,
  fade = 0.12,
  cardWidth = "clamp(250px, 62vw, 700px)",
  cardAspect = 16 / 10,
  gap = 0.06,
  loop = true,
  showCaption = true,
  showPagination = true,
  showNavigation = true,
  label = "Project screenshot carousel",
  className,
  cardClassName,
}: CoverflowCarouselProps) {
  const count = slides.length;
  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const posRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    pos: number;
    velocity: number;
    time: number;
  } | null>(null);
  const [selected, setSelected] = React.useState(0);

  const indexAt = React.useCallback(
    (position: number) => ((Math.round(position) % count) + count) % count,
    [count],
  );

  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width || count === 0) return;

    const pitch = width * (1 + gap);
    const position = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - position;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);
      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
      card.style.pointerEvents = distance < 0.55 ? "auto" : "none";
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const clamp = React.useCallback(
    (position: number) => (loop ? position : Math.max(0, Math.min(count - 1, position))),
    [count, loop],
  );

  const settle = React.useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        posRef.current = target;
        paint();
        rafRef.current = null;
        return;
      }

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }

        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint],
  );

  const goTo = React.useCallback(
    (index: number) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );

  const nudge = React.useCallback(
    (amount: number) => settle(clamp(Math.round(targetRef.current) + amount)),
    [clamp, settle],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      velocity: 0,
      time: performance.now(),
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.velocity = ((posRef.current - previous) / Math.max(now - drag.time, 1)) * 1000;
    drag.time = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    dragRef.current = null;
    const carried = Math.max(-2, Math.min(2, drag.velocity * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  if (count === 0) return null;
  const active = slides[selected];
  const atStart = !loop && selected === 0;
  const atEnd = !loop && selected === count - 1;

  return (
    <div
      className={cn("w-full", className)}
      style={
        {
          "--cf-card": cardWidth,
          "--cf-aspect": String(cardAspect),
        } as React.CSSProperties
      }
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            } else if (event.key === "Home") {
              event.preventDefault();
              goTo(0);
            } else if (event.key === "End") {
              event.preventDefault();
              goTo(count - 1);
            }
          }}
          className="cursor-grab overflow-hidden py-10 outline-none focus-visible:ring-2 focus-visible:ring-signal active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none"
            style={{
              height: "calc(var(--cf-card) / var(--cf-aspect))",
              transformStyle: "preserve-3d",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.src}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                aria-hidden={index !== selected}
                className={cn(
                  "absolute left-1/2 top-0 overflow-hidden rounded-2xl border border-mist bg-paper shadow-[0_24px_70px_rgba(20,22,27,0.18)] will-change-transform",
                  cardClassName,
                )}
                style={{
                  width: "var(--cf-card)",
                  height: "calc(var(--cf-card) / var(--cf-aspect))",
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  draggable={false}
                  sizes="(min-width: 1280px) 700px, (min-width: 768px) 62vw, 90vw"
                  className="select-none object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {showNavigation ? (
          <>
            <button
              type="button"
              aria-label="Previous screenshot"
              onClick={() => nudge(-1)}
              disabled={atStart}
              className="absolute left-2 top-1/2 z-[200] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-mist bg-paper/90 text-ink shadow-lg backdrop-blur transition hover:border-signal hover:text-signal disabled:cursor-not-allowed disabled:opacity-30 sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next screenshot"
              onClick={() => nudge(1)}
              disabled={atEnd}
              className="absolute right-2 top-1/2 z-[200] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-mist bg-paper/90 text-ink shadow-lg backdrop-blur transition hover:border-signal hover:text-signal disabled:cursor-not-allowed disabled:opacity-30 sm:right-4"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      {showCaption && active?.title ? (
        <div className="mx-auto mt-2 min-h-32 max-w-3xl px-6 text-center" aria-live="polite">
          <p className="font-display text-2xl text-ink sm:text-3xl">{active.title}</p>
          {active.subtitle ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate sm:text-base">
              {active.subtitle}
            </p>
          ) : null}
          {active.meta && active.meta.length > 0 ? (
            <dl className="mt-4 flex items-center justify-center gap-6 text-xs">
              {active.meta.map((row) => (
                <div key={row.label} className="flex items-center gap-2">
                  <dt className="meta-mono text-dust">{row.label}</dt>
                  <dd className="meta-mono text-signal">{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      ) : null}

      {showPagination ? (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Go to screenshot ${index + 1}`}
              aria-current={index === selected ? "true" : undefined}
              onClick={() => goTo(index)}
              className={cn(
                "h-2 rounded-full bg-ink transition-[width,opacity]",
                index === selected ? "w-6 opacity-100" : "w-2 opacity-25 hover:opacity-60",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
