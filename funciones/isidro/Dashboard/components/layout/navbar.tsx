"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  FileClock,
  LayoutDashboard,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import GlitchText from "@/components/ui/glitch-text";

// Dropdown de perfil elegante
const ProfileDropDown = (props: { className?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative ${props.className || ""}`}>
      <button
        className="w-10 h-10 rounded-full ring-2 ring-primary/40 transition-shadow duration-200 hover:ring-primary/80 focus:ring-primary/80"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir menú de perfil"
      >
        <img
          src="https://randomuser.me/api/portraits/men/46.jpg"
          className="w-full h-full rounded-full"
          alt="profile"
        />
      </button>
      <ul
        className={cn(
          "absolute right-0 mt-2 w-44 bg-black/90 text-white rounded-xl shadow-2xl border border-white/10 z-50 backdrop-blur-md origin-top-right transition-all duration-200",
          open ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <li>
          <Link
            href="/"
            className="block px-4 py-2 rounded-t-xl hover:bg-primary/10 transition"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="block px-4 py-2 hover:bg-primary/10 transition"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
            href="/logout"
            className="block px-4 py-2 rounded-b-xl hover:bg-primary/10 transition"
            onClick={() => setOpen(false)}
          >
            Log out
          </Link>
        </li>
      </ul>
    </div>
  );
};

const menuItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Cursos", href: "/courses", icon: BookOpen },
  { title: "Tareas", href: "/assignments", icon: FileClock },
  { title: "Calendario", href: "/calendar", icon: Calendar },
  { title: "Mensajes", href: "/messages", icon: MessageSquare },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full px-2 py-2">
      <div className="flex items-center py-2 px-4 max-w-screen-xl mx-auto
        bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">
        {/* Logo y nombre */}
        <Link href="/" className="flex items-center gap-2 flex-none">
          <BookOpen className="h-6 w-6 text-primary" />
          <GlitchText className="text-xl font-semibold text-white">EDUNEXUS</GlitchText>
        </Link>
        {/* Menú principal */}
        <div className="flex-1 flex items-center justify-center">
          <ul className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-white/80 hover:text-white px-4 py-2 rounded-xl transition-all duration-200",
                    pathname === item.href
                      ? "bg-primary/30 text-primary"
                      : ""
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Perfil y menú hamburguesa */}
        <div className="flex items-center gap-2">
          <ProfileDropDown className="hidden lg:block" />
          <button
            className="outline-none text-white/70 block lg:hidden p-2 rounded-full hover:bg-white/10 transition"
            onClick={() => setMenuState((v) => !v)}
            aria-label={menuState ? "Cerrar menú" : "Abrir menú"}
          >
            {menuState ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {/* Menú móvil */}
      <div
        className={cn(
          "lg:hidden bg-black/90 backdrop-blur-xl absolute z-40 w-[calc(100%-1rem)] left-2 p-4 border-b border-white/10 shadow-2xl rounded-b-2xl transition-all duration-300",
          menuState ? "top-[84px] opacity-100 scale-100 pointer-events-auto" : "top-0 opacity-0 scale-95 pointer-events-none"
        )}
      >
        <ul className="space-y-2">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-white/80 hover:text-white px-4 py-2 rounded-xl transition-all duration-200",
                  pathname === item.href
                    ? "bg-primary/30 text-primary"
                    : ""
                )}
                onClick={() => setMenuState(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <ProfileDropDown className="mt-5 pt-5 border-t border-white/10" />
      </div>
    </nav>
  );
} 