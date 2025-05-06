"use client";

import { BookOpen, FileClock, Calendar, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 md:p-10 w-full bg-black/1 backdrop-blur-md">
      {/* Sección de bienvenida */}
      <div className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">¡Bienvenido a EDUNEXUS!</h1>
        <p className="text-lg text-white/70">Tu espacio para aprender, organizar y conectar.</p>
      </div>

      {/* Tarjetas resumen */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-black/1 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center shadow-lg border border-white/10 hover:scale-[1.03] transition-transform">
          <BookOpen className="h-8 w-8 text-primary mb-2" />
          <span className="text-2xl font-bold text-white">8</span>
          <span className="text-white/80">Cursos activos</span>
        </div>
        <div className="bg-black/1 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center shadow-lg border border-white/10 hover:scale-[1.03] transition-transform">
          <FileClock className="h-8 w-8 text-primary mb-2" />
          <span className="text-2xl font-bold text-white">3</span>
          <span className="text-white/80">Tareas pendientes</span>
        </div>
        <div className="bg-black/1 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center shadow-lg border border-white/10 hover:scale-[1.03] transition-transform">
          <Calendar className="h-8 w-8 text-primary mb-2" />
          <span className="text-2xl font-bold text-white">2</span>
          <span className="text-white/80">Eventos hoy</span>
        </div>
        <div className="bg-black/1 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center shadow-lg border border-white/10 hover:scale-[1.03] transition-transform">
          <MessageSquare className="h-8 w-8 text-primary mb-2" />
          <span className="text-2xl font-bold text-white">5</span>
          <span className="text-white/80">Mensajes nuevos</span>
        </div>
      </div>

      {/* Sección de cursos destacados */}
      <div className="w-full max-w-6xl mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Tus cursos destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ejemplo de tarjeta de curso */}
          <div className="bg-black/1 backdrop-blur-md rounded-xl p-5 shadow-md border border-white/10 flex flex-col items-center hover:scale-[1.02] transition-transform">
            <span className="text-lg font-bold text-white mb-1">Matemáticas Avanzadas</span>
            <span className="text-white/70 mb-2">Prof. Juan Pérez</span>
            <span className="text-xs text-primary bg-primary/10 rounded px-2 py-1 w-fit mb-2">En curso</span>
            <p className="text-white/60 text-sm text-center">Explora los conceptos clave del álgebra y el cálculo diferencial.</p>
          </div>
          <div className="bg-black/1 backdrop-blur-md rounded-xl p-5 shadow-md border border-white/10 flex flex-col items-center hover:scale-[1.02] transition-transform">
            <span className="text-lg font-bold text-white mb-1">Historia Universal</span>
            <span className="text-white/70 mb-2">Prof. Ana Gómez</span>
            <span className="text-xs text-primary bg-primary/10 rounded px-2 py-1 w-fit mb-2">En curso</span>
            <p className="text-white/60 text-sm text-center">Viaja a través de los eventos más importantes de la humanidad.</p>
          </div>
          <div className="bg-black/1 backdrop-blur-md rounded-xl p-5 shadow-md border border-white/10 flex flex-col items-center hover:scale-[1.02] transition-transform">
            <span className="text-lg font-bold text-white mb-1">Programación Web</span>
            <span className="text-white/70 mb-2">Prof. Carlos Ruiz</span>
            <span className="text-xs text-primary bg-primary/10 rounded px-2 py-1 w-fit mb-2">En curso</span>
            <p className="text-white/60 text-sm text-center">Aprende a crear sitios web modernos y responsivos con React y Next.js.</p>
          </div>
        </div>
      </div>
    </div>
  );
}