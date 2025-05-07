"use client";
import { useSidebar } from "@/components/layout/sidebar-context";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import React from "react";

export default function ClientMainLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <Header />
        <main className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 