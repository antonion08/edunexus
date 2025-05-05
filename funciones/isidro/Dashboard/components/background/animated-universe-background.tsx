"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

const IMAGE_URL = "https://www.nationalgeographic.com.es/medio/2023/01/19/galaxia-espiral_00000000_230119124012_800x400.jpg";

export function AnimatedUniverseBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [xy, setXY] = useState({ x: 0, y: 0 });

  useAnimationFrame((t) => {
    // Movimiento diagonal suave y continuo
    setXY((prev) => ({
      x: (prev.x + 0.02) % 100,
      y: (prev.y + 0.01) % 100,
    }));
  });

  return (
    <motion.div
      ref={ref}
      className="fixed inset-0 -z-10 w-full h-full"
      style={{
        backgroundImage: `url(${IMAGE_URL})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${xy.x}% ${xy.y}%`,
        transition: "background-position 0.1s linear",
      }}
      aria-hidden="true"
    />
  );
} 