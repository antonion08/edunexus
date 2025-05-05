"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-white/10 h-8 w-8 overflow-hidden text-white hover:text-white"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="User" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <span className="sr-only">Perfil</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/30 backdrop-blur-md border border-white/10">
        <DropdownMenuItem className="text-white hover:bg-white/10">
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white hover:bg-white/10">
          Configuración
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white hover:bg-white/10">
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 