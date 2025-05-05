"use client";

import { UserNav } from "@/components/user-nav";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <div className="border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:text-white">
            <Bell className="h-5 w-5 text-white" />
          </Button>
          <UserNav />
        </div>
      </div>
    </div>
  );
}