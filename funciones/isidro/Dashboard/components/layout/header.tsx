"use client";

import { UserNav } from "@/components/user-nav";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 pointer-events-none">
      <div className="flex items-center space-x-2 pointer-events-auto">
        <Button variant="ghost" size="icon" className="text-white hover:text-white">
          <Bell className="h-5 w-5 text-white" />
        </Button>
        <UserNav />
      </div>
    </div>
  );
}