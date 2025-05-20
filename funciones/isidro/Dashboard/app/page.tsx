"use client";

import { BookOpen, FileClock, Calendar, MessageSquare } from "lucide-react";
import GlitchText from "@/components/ui/glitch-text";

/**
 * Home - Página principal del dashboard.
 *
 * Muestra:
 * - Sección de bienvenida.
 * - Tarjetas resumen (cursos, tareas, eventos, mensajes).
 * - Cursos destacados.
 * - Gráfica de progreso de materias.
 *
 * @page
 */

export default function Home() {
  return (
    <>
      
      <div className="w-full max-w-6xl mx-auto">
        {/* Sección de bienvenida */}
        <div className="w-full text-center mb-8">
          <GlitchText 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
          >
            ¡Bienvenido a EDUNEXUS!
          </GlitchText>
          <p className="text-base sm:text-lg text-white/70">Tu espacio para aprender, organizar y conectar.</p>
        </div>

        {/* Tarjetas resumen */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Cursos activos */}
          <div className="relative bg-black/10 backdrop-blur-md rounded-2xl p-6 flex flex-col shadow-lg hover:scale-[1.03] transition-transform min-h-[170px]">
            <div className="flex items-start justify-between w-full">
              <div className="icon icon-shape bg-white shadow flex items-center justify-center rounded-2xl h-12 w-12">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <button className="text-white/70 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path></svg>
              </button>
            </div>
            <h5 className="text-white font-bold text-2xl mt-4 mb-1">8</h5>
            <span className="text-white/80 text-sm">Cursos activos</span>
          </div>
          {/* Tareas pendientes */}
          <div className="relative bg-black/10 backdrop-blur-md rounded-2xl p-6 flex flex-col shadow-lg hover:scale-[1.03] transition-transform min-h-[170px]">
            <div className="flex items-start justify-between w-full">
              <div className="icon icon-shape bg-white shadow flex items-center justify-center rounded-2xl h-12 w-12">
                <FileClock className="h-7 w-7 text-primary" />
              </div>
              <button className="text-white/70 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path></svg>
              </button>
            </div>
            <h5 className="text-white font-bold text-2xl mt-4 mb-1">3</h5>
            <span className="text-white/80 text-sm">Tareas pendientes</span>
          </div>
          {/* Eventos hoy */}
          <div className="relative bg-black/10 backdrop-blur-md rounded-2xl p-6 flex flex-col shadow-lg hover:scale-[1.03] transition-transform min-h-[170px]">
            <div className="flex items-start justify-between w-full">
              <div className="icon icon-shape bg-white shadow flex items-center justify-center rounded-2xl h-12 w-12">
                <Calendar className="h-7 w-7 text-primary" />
              </div>
              <button className="text-white/70 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path></svg>
              </button>
            </div>
            <h5 className="text-white font-bold text-2xl mt-4 mb-1">2</h5>
            <span className="text-white/80 text-sm">Eventos hoy</span>
          </div>
          {/* Mensajes nuevos */}
          <div className="relative bg-black/10 backdrop-blur-md rounded-2xl p-6 flex flex-col shadow-lg hover:scale-[1.03] transition-transform min-h-[170px]">
            <div className="flex items-start justify-between w-full">
              <div className="icon icon-shape bg-white shadow flex items-center justify-center rounded-2xl h-12 w-12">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
              <button className="text-white/70 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path></svg>
              </button>
            </div>
            <h5 className="text-white font-bold text-2xl mt-4 mb-1">5</h5>
            <span className="text-white/80 text-sm">Mensajes nuevos</span>
          </div>
        </div>

        {/* Sección de cursos destacados */}
        <div className="w-full max-w-6xl mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">Tus cursos destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ejemplo de tarjeta de curso */}
            <div className="bg-black/10 backdrop-blur-md rounded-xl p-5 shadow-md flex flex-col items-center hover:scale-[1.02] transition-transform">
              <span className="text-lg font-bold text-white mb-1">Matemáticas Avanzadas</span>
              <span className="text-white/70 mb-2">Prof. Juan Pérez</span>
              <span className="text-xs text-primary bg-primary/10 rounded px-2 py-1 w-fit mb-2">En curso</span>
              <p className="text-white/60 text-sm text-center">Explora los conceptos clave del álgebra y el cálculo diferencial.</p>
            </div>
            <div className="bg-black/10 backdrop-blur-md rounded-xl p-5 shadow-md flex flex-col items-center hover:scale-[1.02] transition-transform">
              <span className="text-lg font-bold text-white mb-1">Historia Universal</span>
              <span className="text-white/70 mb-2">Prof. Ana Gómez</span>
              <span className="text-xs text-primary bg-primary/10 rounded px-2 py-1 w-fit mb-2">En curso</span>
              <p className="text-white/60 text-sm text-center">Viaja a través de los eventos más importantes de la humanidad.</p>
            </div>
            <div className="bg-black/10 backdrop-blur-md rounded-xl p-5 shadow-md flex flex-col items-center hover:scale-[1.02] transition-transform">
              <span className="text-lg font-bold text-white mb-1">Programación Web</span>
              <span className="text-white/70 mb-2">Prof. Carlos Ruiz</span>
              <span className="text-xs text-primary bg-primary/10 rounded px-2 py-1 w-fit mb-2">En curso</span>
              <p className="text-white/60 text-sm text-center">Aprende a crear sitios web modernos y responsivos con React y Next.js.</p>
            </div>
          </div>
        </div>

        {/* Gráfica de progreso de materias */}
        <div className="w-full max-w-xl bg-black/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg mb-10 mx-auto">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">Progreso de tus materias</h2>
          <div className="space-y-4">
            {/* Ejemplo de materias y progreso */}
            {[
              { nombre: "Matemáticas", progreso: 85, color: "bg-primary" },
              { nombre: "Historia", progreso: 60, color: "bg-blue-500" },
              { nombre: "Programación", progreso: 95, color: "bg-green-500" },
              { nombre: "Ciencias", progreso: 70, color: "bg-yellow-400" },
            ].map((materia) => (
              <div key={materia.nombre}>
                <div className="flex flex-col sm:flex-row sm:justify-between mb-1 gap-1 sm:gap-0">
                  <span className="text-white/90 font-medium">{materia.nombre}</span>
                  <span className="text-white/60 text-sm">{materia.progreso}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${materia.color}`}
                    style={{ width: `${materia.progreso}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}