"use client";

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface PhysicsNode {
  curr: Vector3;
  prev: Vector3;
  base: Vector3;
  proj: { x: number; y: number; scale: number; alpha: number };
  pinned: boolean;
  excitation: number;
}

interface StructuralConstraint {
  p1: number;
  p2: number;
  length: number;
}

export interface KineticFabricProps {
  headline?: string;
  tagline?: string;
  className?: string;
  showControls?: boolean;
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function KineticFabric({
  headline = "",
  tagline = "INTERACTIVE / BUILD FIELD",
  className = "",
  showControls = true,
}: KineticFabricProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [motionPreference, setMotionPreference] = useState<"auto" | "running" | "paused">("auto");
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const isRunning =
    motionPreference === "running" ||
    (motionPreference === "auto" && !prefersReducedMotion);

  const pointerRef = useRef({
    x: -2000,
    y: -2000,
    prevX: -2000,
    prevY: -2000,
    vx: 0,
    vy: 0,
    targetAngleX: 0.15,
    targetAngleY: 0,
    angleX: 0.15,
    angleY: 0,
    radius: 190,
    isDown: false,
    shockwaves: [] as {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      strength: number;
    }[],
  });

  const nodesRef = useRef<PhysicsNode[]>([]);
  const linksRef = useRef<StructuralConstraint[]>([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const buildMesh = useCallback(() => {
    const { width, height } = dimensionsRef.current;
    if (width === 0 || height === 0) return;

    const spacing = 38;
    const cols = Math.ceil((width * 1.2) / spacing) + 1;
    const rows = Math.ceil((height * 1.2) / spacing) + 1;
    const nodes: PhysicsNode[] = [];
    const links: StructuralConstraint[] = [];
    const grid: number[][] = [];
    const startX = -(cols * spacing) / 2;
    const startY = -(rows * spacing) / 2;
    let index = 0;

    for (let row = 0; row < rows; row++) {
      grid[row] = [];
      for (let col = 0; col < cols; col++) {
        const x = startX + col * spacing;
        const y = startY + row * spacing;
        const pinned = col === 0 || col === cols - 1 || row === 0 || row === rows - 1;

        nodes.push({
          curr: { x, y, z: 0 },
          prev: { x, y, z: 0 },
          base: { x, y, z: 0 },
          proj: { x: 0, y: 0, scale: 1, alpha: 1 },
          pinned,
          excitation: 0,
        });
        grid[row][col] = index++;
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const current = grid[row][col];
        if (col < cols - 1) {
          links.push({ p1: current, p2: grid[row][col + 1], length: spacing });
        }
        if (row < rows - 1) {
          links.push({ p1: current, p2: grid[row + 1][col], length: spacing });
        }
        if (col < cols - 1 && row < rows - 1) {
          links.push({
            p1: current,
            p2: grid[row + 1][col + 1],
            length: Math.SQRT2 * spacing,
          });
        }
      }
    }

    nodesRef.current = nodes;
    linksRef.current = links;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        dimensionsRef.current = { width: rect.width, height: rect.height };
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(dpr, dpr);
        buildMesh();
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [buildMesh]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    let animationId = 0;
    let time = 0;

    const loop = () => {
      if (isRunning) time += 0.016;
      const { width, height } = dimensionsRef.current;
      const nodes = nodesRef.current;
      const links = linksRef.current;
      const pointer = pointerRef.current;

      pointer.vx = (pointer.x - pointer.prevX) * 0.4;
      pointer.vy = (pointer.y - pointer.prevY) * 0.4;
      pointer.prevX = pointer.x;
      pointer.prevY = pointer.y;
      const pointerSpeed = Math.min(Math.hypot(pointer.vx, pointer.vy), 40);

      pointer.angleX += (pointer.targetAngleX - pointer.angleX) * 0.05;
      pointer.angleY += (pointer.targetAngleY - pointer.angleY) * 0.05;

      const cosX = Math.cos(pointer.angleX);
      const sinX = Math.sin(pointer.angleX);
      const cosY = Math.cos(pointer.angleY);
      const sinY = Math.sin(pointer.angleY);

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);

      for (let i = pointer.shockwaves.length - 1; i >= 0; i--) {
        const shockwave = pointer.shockwaves[i];
        shockwave.radius += 12;
        shockwave.strength *= 0.94;
        if (shockwave.radius > shockwave.maxRadius || shockwave.strength < 0.01) {
          pointer.shockwaves.splice(i, 1);
        }
      }

      for (const node of nodes) {
        if (node.pinned) continue;

        const velocityX = (node.curr.x - node.prev.x) * 0.955;
        const velocityY = (node.curr.y - node.prev.y) * 0.955;
        const velocityZ = (node.curr.z - node.prev.z) * 0.955;

        node.prev.x = node.curr.x;
        node.prev.y = node.curr.y;
        node.prev.z = node.curr.z;
        node.curr.x += velocityX;
        node.curr.y += velocityY;
        node.curr.z += velocityZ;

        const fluidZ =
          Math.sin(node.base.x * 0.009 + time) * 16 +
          Math.cos(node.base.y * 0.011 + time * 1.2) * 12;

        node.curr.x += (node.base.x - node.curr.x) * 0.038;
        node.curr.y += (node.base.y - node.curr.y) * 0.038;
        node.curr.z += (node.base.z + fluidZ - node.curr.z) * 0.038;
        node.excitation *= 0.92;
      }

      const fieldOfView = 620;
      const centerX = width / 2;
      const centerY = height / 2;

      for (const node of nodes) {
        const rotatedX = node.curr.x * cosY + node.curr.z * sinY;
        const rotatedY = node.curr.y;
        const rotatedZ = -node.curr.x * sinY + node.curr.z * cosY;
        const projectedY = rotatedY * cosX - rotatedZ * sinX;
        const projectedZ = rotatedY * sinX + rotatedZ * cosX + 460;
        const scale = fieldOfView / Math.max(1, projectedZ);

        node.proj.x = centerX + rotatedX * scale;
        node.proj.y = centerY + projectedY * scale;
        node.proj.scale = scale;
        node.proj.alpha = Math.min(1, Math.max(0.08, (scale - 0.45) * 1.4));

        if (node.pinned) continue;

        const deltaX = node.proj.x - pointer.x;
        const deltaY = node.proj.y - pointer.y;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance < pointer.radius && distance > 0) {
          const ratio = 1 - distance / pointer.radius;
          const force = ratio * (pointer.isDown ? 42 : 22) + pointerSpeed * 0.4;
          const angle = Math.atan2(deltaY, deltaX);

          node.curr.x += (Math.cos(angle) * force * 0.8) / node.proj.scale;
          node.curr.y += (Math.sin(angle) * force * 0.8) / node.proj.scale;
          node.curr.z -= (force * 2.8) / node.proj.scale;
          node.excitation = Math.max(node.excitation, ratio);
        }

        for (const shockwave of pointer.shockwaves) {
          const shockwaveDistance = Math.hypot(
            node.proj.x - shockwave.x,
            node.proj.y - shockwave.y,
          );
          const ringDelta = Math.abs(shockwaveDistance - shockwave.radius);

          if (ringDelta < 45) {
            const impulse = (1 - ringDelta / 45) * shockwave.strength * 28;
            node.curr.z += impulse / node.proj.scale;
            node.excitation = Math.max(node.excitation, 0.8);
          }
        }
      }

      for (let pass = 0; pass < 3; pass++) {
        for (const link of links) {
          const first = nodes[link.p1];
          const second = nodes[link.p2];
          const deltaX = second.curr.x - first.curr.x;
          const deltaY = second.curr.y - first.curr.y;
          const deltaZ = second.curr.z - first.curr.z;
          const distance = Math.hypot(deltaX, deltaY, deltaZ);
          const difference = (distance - link.length) / (distance || 1);

          if (!first.pinned) {
            first.curr.x += deltaX * 0.5 * difference;
            first.curr.y += deltaY * 0.5 * difference;
            first.curr.z += deltaZ * 0.5 * difference;
          }
          if (!second.pinned) {
            second.curr.x -= deltaX * 0.5 * difference;
            second.curr.y -= deltaY * 0.5 * difference;
            second.curr.z -= deltaZ * 0.5 * difference;
          }
        }
      }

      for (const link of links) {
        const first = nodes[link.p1];
        const second = nodes[link.p2];
        const scale = (first.proj.scale + second.proj.scale) / 2;
        const alpha = (first.proj.alpha + second.proj.alpha) / 2;
        const glow = Math.max(first.excitation, second.excitation);

        context.strokeStyle =
          glow > 0.1
            ? `rgba(47, 76, 209, ${Math.min(0.72, 0.2 + glow * 0.52)})`
            : `rgba(47, 76, 209, ${0.075 * alpha})`;
        context.lineWidth = (glow > 0.1 ? 0.8 + glow : 0.65) * scale;
        context.beginPath();
        context.moveTo(first.proj.x, first.proj.y);
        context.lineTo(second.proj.x, second.proj.y);
        context.stroke();
      }

      for (const node of nodes) {
        if (node.excitation <= 0.25) continue;
        const radius = Math.min(2.6, 1.2 + node.excitation * 2) * node.proj.scale;
        context.fillStyle = "#2f4cd1";
        context.beginPath();
        context.arc(node.proj.x, node.proj.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      if (isRunning) animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [isRunning]);

  const updatePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    pointerRef.current.x = x;
    pointerRef.current.y = y;
    pointerRef.current.targetAngleY = (x / rect.width - 0.5) * 0.76;
    pointerRef.current.targetAngleX = -(y / rect.height - 0.5) * 0.56 + 0.15;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    updatePointer(event);
    pointerRef.current.isDown = true;
    pointerRef.current.shockwaves.push({
      x: pointerRef.current.x,
      y: pointerRef.current.y,
      radius: 10,
      maxRadius: 360,
      strength: 1,
    });
  };

  const handlePointerLeave = () => {
    pointerRef.current.x = -2000;
    pointerRef.current.y = -2000;
    pointerRef.current.isDown = false;
    pointerRef.current.targetAngleX = 0.15;
    pointerRef.current.targetAngleY = 0;
  };

  const triggerImpulse = () => {
    const { width, height } = dimensionsRef.current;
    pointerRef.current.shockwaves.push({
      x: width / 2,
      y: height / 2,
      radius: 10,
      maxRadius: Math.max(width, height) * 0.8,
      strength: 1.2,
    });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={updatePointer}
      onPointerDown={handlePointerDown}
      onPointerUp={() => {
        pointerRef.current.isDown = false;
      }}
      onPointerCancel={() => {
        pointerRef.current.isDown = false;
      }}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "group relative flex h-full w-full select-none flex-col justify-between overflow-hidden bg-paper",
        className,
      )}
      aria-label="Interactive kinetic fabric background"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full cursor-crosshair" aria-hidden="true" />

      {showControls || headline ? (
        <div className="pointer-events-none relative z-20 flex h-full w-full flex-col justify-between p-5 md:p-8">
          {showControls ? (
            <header className="flex w-full items-center justify-between font-mono text-[10px] text-dust">
              <div className="flex items-center gap-3">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-40" />
                  <span className="relative inline-flex size-2 rounded-full bg-signal" />
                </span>
                <span className="font-semibold tracking-[0.14em] text-slate">{tagline}</span>
              </div>

              <div className="pointer-events-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={triggerImpulse}
                  className="flex items-center gap-1 rounded-lg border border-mist bg-paper/90 px-2.5 py-1.5 transition-colors hover:border-signal hover:text-signal"
                  aria-label="Send a pulse through the background"
                  title="Send pulse"
                >
                  <Sparkles className="size-3" />
                  <span className="hidden sm:inline">PULSE</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMotionPreference(isRunning ? "paused" : "running")}
                  className="flex items-center gap-1.5 rounded-lg border border-mist bg-paper/90 px-2.5 py-1.5 transition-colors hover:border-signal hover:text-signal"
                  aria-label={isRunning ? "Pause background motion" : "Resume background motion"}
                >
                  {isRunning ? <Pause className="size-3" /> : <Play className="size-3" />}
                  <span>{isRunning ? "FREEZE" : "RUN"}</span>
                </button>
              </div>
            </header>
          ) : null}

          {headline ? (
            <div className="pointer-events-none flex flex-1 items-center justify-center text-center">
              <p className="font-mono text-5xl font-black tracking-tighter text-ink uppercase sm:text-7xl md:text-9xl">
                {headline}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default KineticFabric;
