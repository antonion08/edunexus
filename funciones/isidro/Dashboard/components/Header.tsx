"use client";

import { Bell, Search } from "lucide-react";

/**
 * Header - Barra superior del dashboard.
 *
 * Incluye un buscador y un botón de notificaciones.
 *
 * @component
 */
export default function Header() {
  return (
    <header className="h-16 border-b border-white/10 bg-black/10 backdrop-blur-md">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Buscador */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Notificaciones */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-white/70 hover:text-white">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
} 