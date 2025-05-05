"use client";

import { useEffect, useRef } from "react";

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajustar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Crear nodos (neuronas)
    const NODE_COUNT = 90;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];
    const colors = [
      "#7f7fff", "#a259f7", "#5ad1e6", "#b388ff", "#6ec6ff",
      "#f7b2ff", "#ffb347", "#ff6f91", "#6fffbf", "#ffe156"
    ];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 4 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Conexiones entre nodos
    const MAX_DIST = 220;
    const CURVE_CHANCE = 0.4; // 40% de las conexiones serán curvas

    // Animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Dibujar conexiones
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.save();
            ctx.globalAlpha = 0.10 + 0.25 * (1 - dist / MAX_DIST);
            ctx.strokeStyle = nodes[i].color;
            ctx.lineWidth = 1 + Math.random() * 1.2;
            ctx.beginPath();
            if (Math.random() < CURVE_CHANCE) {
              // Línea curva (bezier)
              const mx = (nodes[i].x + nodes[j].x) / 2 + (Math.random() - 0.5) * 60;
              const my = (nodes[i].y + nodes[j].y) / 2 + (Math.random() - 0.5) * 60;
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.quadraticCurveTo(mx, my, nodes[j].x, nodes[j].y);
            } else {
              // Línea recta
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
            }
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      // Dibujar nodos
      for (const node of nodes) {
        ctx.save();
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.restore();
      }
      // Actualizar posiciones
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        // Rebote en los bordes
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
} 