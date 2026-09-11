"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BANDS } from "@/lib/types";

const YEAR_FACE = [
  "1999",
  "2000",
  "2001",
  "2003",
  "2004",
  "2007",
  "2008",
  "2009",
  "2012",
  "2013",
  "2016",
  "2019",
  "2020",
  "2022",
  "2023",
  "2024",
];

const BAND_FACE = BANDS.map((band) => band.label);

function buildStrip(face: string[], target: string, loops = 18) {
  const strip: string[] = [];
  for (let i = 0; i < loops; i += 1) {
    strip.push(face[i % face.length]);
  }
  strip.push(target);
  return strip;
}

function Reel({
  label,
  tone,
  value,
  placeholder,
  spinning,
  duration,
  delay,
  reducedMotion,
  itemHeight = 112,
}: {
  label: string;
  tone: "year" | "band";
  value: string | null;
  placeholder: string;
  spinning: boolean;
  duration: number;
  delay: number;
  reducedMotion: boolean;
  itemHeight?: number;
}) {
  const face = tone === "year" ? YEAR_FACE : BAND_FACE;
  const strip = useMemo(
    () => (value ? buildStrip(face, value) : [placeholder]),
    [placeholder, tone, value],
  );
  const [offset, setOffset] = useState(0);
  const [settled, setSettled] = useState(false);
  const [animate, setAnimate] = useState(false);
  const token = useRef(0);

  useEffect(() => {
    if (!spinning || !value) {
      setOffset(0);
      setAnimate(false);
      // Held reels (a respin of the other reel) should stay put without a land pulse.
      setSettled(false);
      return;
    }

    const id = ++token.current;
    const end = (strip.length - 1) * itemHeight;
    setSettled(false);
    setAnimate(false);
    setOffset(0);

    const start = window.setTimeout(() => {
      if (token.current !== id) return;
      if (reducedMotion) {
        setOffset(-end);
        setSettled(true);
        return;
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (token.current !== id) return;
          setAnimate(true);
          setOffset(-end);
        });
      });
    }, delay);

    const finish = window.setTimeout(() => {
      if (token.current !== id) return;
      setSettled(true);
    }, delay + duration + 40);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(finish);
    };
  }, [spinning, value, strip.length, itemHeight, delay, duration, reducedMotion]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`eyebrow ${tone === "year" ? "text-lime" : "text-amber"}`}
      >
        {label}
      </div>
      <div
        className={`reel ${tone} ${spinning ? "spinning" : ""} ${settled ? "settled" : ""}`}
        aria-live="off"
      >
        <div className="reel-window">
          {spinning && value ? (
            <div
              className="reel-strip"
              style={{
                transform: `translate3d(0, ${offset}px, 0)`,
                transition: animate
                  ? `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`
                  : "none",
              }}
            >
              {strip.map((item, index) => (
                <div className="reel-item" key={`${item}-${index}`}>
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <div className="reel-item">{value ?? placeholder}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Reels({
  year,
  band,
  yearSpinning,
  bandSpinning,
  reducedMotion,
}: {
  year: number | null;
  band: string | null;
  yearSpinning: boolean;
  bandSpinning: boolean;
  reducedMotion: boolean;
}) {
  const duration = reducedMotion ? 150 : 1240;

  return (
    <div className="reel-machine">
      <Reel
        label="YEAR"
        tone="year"
        value={year ? String(year) : null}
        placeholder="—"
        spinning={yearSpinning}
        duration={duration}
        delay={0}
        reducedMotion={reducedMotion}
      />
      <Reel
        label="MARKET CAP"
        tone="band"
        value={band}
        placeholder="—"
        spinning={bandSpinning}
        duration={duration}
        delay={0}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}
