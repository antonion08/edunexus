"use client";

import { useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";
import { useTheme } from "next-themes";

const IMAGE_URL_DARK = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1500&q=80";
const IMAGE_URL_LIGHT = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80";

export function AnimeParticlesBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();

  useAnimationFrame(() => {
    setXY((prev) => ({
      x: (prev.x + 0.01) % 100,
      y: (prev.y + 0.005) % 100,
    }));
  });

  const imageUrl = resolvedTheme === "light" ? IMAGE_URL_LIGHT : IMAGE_URL_DARK;

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10 w-full h-full transition-all duration-1000"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${xy.x}% ${xy.y}%`,
        transition: "background-position 0.1s linear",
      }}
      aria-hidden="true"
    />
  );
} 