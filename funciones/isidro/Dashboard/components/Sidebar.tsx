"use client";

import { Home, BookOpen, Calendar, MessageSquare, Settings, LogOut, ClipboardList } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const appsMenu = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: BookOpen, label: "Cursos", href: "/cursos" },
  { icon: ClipboardList, label: "Tareas", href: "/tareas" },
  { icon: Calendar, label: "Calendario", href: "/calendario" },
  { icon: MessageSquare, label: "Mensajes", href: "/mensajes" },
];

const configMenu = [
  { icon: Settings, label: "Configuración", href: "/configuracion" },
];

/**
 * Sidebar - Barra lateral de navegación principal.
 *
 * Muestra el logo, el menú de navegación dividido en secciones (Apps y Configuración)
 * y la información del usuario en la parte inferior.
 *
 * - El menú se resalta según la ruta activa.
 * - Usa íconos de Lucide.
 * - Estilo translúcido y gradiente.
 *
 * @component
 */
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between h-screen shadow-xl">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/90">
          <BookOpen className="w-6 h-6 text-white" />
        </span>
        <span className="text-2xl font-bold text-white tracking-tight">EDUNEXUS</span>
      </div>

      {/* Menú principal */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto">
        <ul className="space-y-1">
          <li className="px-2 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider">Apps</li>
          {appsMenu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-base font-medium ${
                    isActive
                      ? "bg-primary/90 text-white shadow-md"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li className="mt-6 mb-2 px-2 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider">Configuración</li>
          {configMenu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-base font-medium ${
                    isActive
                      ? "bg-primary/90 text-white shadow-md"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Usuario */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white font-medium">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">Juan Doe</p>
            <p className="text-white/60 text-sm truncate">Estudiante</p>
          </div>
          <button className="text-white/70 hover:text-white">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
} 