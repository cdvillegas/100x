"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#b7ff45", "#d8ff8f", "#f7f4ec", "#8fd62e"];

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  color: string;
  life: number;
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

    for (let i = 0; i < 90; i += 1) {
      pieces.push({
        x: Math.random() * window.innerWidth,
        y: -12 - Math.random() * 220,
        vx: (Math.random() - 0.5) * 1.8,
        vy: 1.6 + Math.random() * 2.4,
        w: 4 + Math.random() * 5,
        h: 8 + Math.random() * 8,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.18,
        color: COLORS[i % COLORS.length],
        life: 1,
      });
    }

    const tick = () => {
      if (!running) return;
      frame += 1;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const piece of pieces) {
        piece.vy += 0.07;
        piece.vx += Math.sin((frame + piece.x) * 0.035) * 0.05;
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.rot += piece.vr;
        piece.life = piece.y > window.innerHeight - 80 ? Math.max(0, 1 - (piece.y - (window.innerHeight - 80)) / 120) : 1;
        if (piece.life <= 0) continue;
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rot);
        ctx.globalAlpha = piece.life;
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
        ctx.restore();
      }
      if (frame < 200) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);

    return () => {
      running = false;
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
