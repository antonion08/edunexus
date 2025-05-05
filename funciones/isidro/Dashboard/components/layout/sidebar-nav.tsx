"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  FileClock,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  User,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface SidebarNavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: React.ReactNode;
    variant: "default" | "ghost";
    href: string;
  }[];
}

const IconWrapper = ({ children, isActive }: { children: React.ReactNode; isActive: boolean }) => (
  <motion.div
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    className={cn(
      "transition-colors",
      isActive ? "text-primary-foreground" : "text-muted-foreground"
    )}
  >
    {children}
  </motion.div>
);

export function SidebarNav({ links, isCollapsed }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div
      data-collapsed={isCollapsed}
      className="group py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={index}
              href={link.href}
              aria-label={isCollapsed ? link.title : undefined}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                size={isCollapsed ? "icon" : "default"}
                className={cn(
                  "h-12 w-full justify-start",
                  isCollapsed && "h-12 w-12 justify-center",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                <IconWrapper isActive={isActive}>
                  {React.cloneElement(link.icon as React.ReactElement, {
                    size: 24,
                    className: cn(
                      "transition-transform duration-200",
                      isActive && "transform"
                    )
                  })}
                </IconWrapper>
                {!isCollapsed && <span className="ml-3">{link.title}</span>}
                {!isCollapsed && link.label && (
                  <span className="ml-auto bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {link.label}
                  </span>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const mainLinks = [
    {
      title: "Vista General",
      icon: <LayoutDashboard size={24} />,
      variant: "default" as const,
      href: "/",
    },
    {
      title: "Análisis",
      icon: <LineChart size={24} />,
      variant: "ghost" as const,
      href: "/analytics",
    },
    {
      title: "Cursos",
      icon: <BookOpen size={24} />,
      variant: "ghost" as const,
      href: "/courses",
    },
    {
      title: "Tareas",
      icon: <FileClock size={24} />,
      label: "5",
      variant: "ghost" as const,
      href: "/assignments",
    },
    {
      title: "Calendario",
      icon: <Calendar size={24} />,
      variant: "ghost" as const,
      href: "/calendar",
    },
    {
      title: "Mensajes",
      icon: <MessageSquare size={24} />,
      label: "3",
      variant: "ghost" as const,
      href: "/messages",
    },
  ];

  return (
    <aside
      data-collapsed={isCollapsed}
      className="group relative flex flex-col h-full border-r bg-card pt-6 data-[collapsed=true]:pt-6"
    >
      <div className="flex h-[60px] items-center px-4">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="h-8 w-8 text-primary" />
            </motion.div>
            <span className="text-lg font-semibold">EduLearn</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="flex w-full justify-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="h-8 w-8 text-primary" />
            </motion.div>
          </div>
        )}
      </div>
      <ScrollArea className="flex-1 overflow-hidden">
        <SidebarNav links={mainLinks} isCollapsed={isCollapsed} />
      </ScrollArea>
      <div className="mt-auto mb-4 px-4">
        {!isCollapsed && (
          <div className="flex flex-col gap-2">
            <Button variant="ghost" size="sm" className="justify-start">
              <Settings className="mr-2 h-5 w-5" />
              Configuración
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <LogOut className="mr-2 h-5 w-5" />
              Cerrar Sesión
            </Button>
          </div>
        )}
        {isCollapsed && (
          <div className="flex flex-col items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}