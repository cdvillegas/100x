"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#b7ff45", "#d8ff8f", "#f7f4ec", "#8fd62e"];
const COUNT = 140;
const MAX_FRAMES = 360;

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  sway: number;
  color: string;
  born: number;
};

export default function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let running = true;
    const pieces: Piece[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const width = window.innerWidth;
    for (let i = 0; i < COUNT; i += 1) {
      pieces.push({
        x: Math.random() * width,
        y: -16 - Math.random() * 90,
        vx: (Math.random() - 0.5) * 2.4,
        vy: 0.85 + Math.random() * 0.7,
        w: 5 + Math.random() * 5,
        h: 8 + Math.random() * 8,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.12,
        sway: Math.random() * Math.PI * 2,
        color: COLORS[i % COLORS.length],
        born: Math.floor(Math.random() * 50),
      });
    }

    const stop = () => {
      running = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const tick = () => {
      if (!running) return;
      frame += 1;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let visible = 0;
      const fade = frame > 220 ? Math.max(0, 1 - (frame - 220) / 80) : 1;

      for (const piece of pieces) {
        if (frame < piece.born) continue;
        piece.vy = Math.min(piece.vy + 0.018, 2.15);
        piece.vx += Math.sin(frame * 0.045 + piece.sway) * 0.08;
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.rot += piece.vr;

        if (piece.y > window.innerHeight + 24 || piece.x < -24 || piece.x > width + 24) {
          continue;
        }

        visible += 1;
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rot);
        ctx.globalAlpha = fade;
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
        ctx.restore();
      }

      if (visible > 0 && fade > 0 && frame < MAX_FRAMES) {
        requestAnimationFrame(tick);
      } else {
        stop();
      }
    };
    requestAnimationFrame(tick);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      aria-hidden
    />
  );
}
