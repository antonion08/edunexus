"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative flex items-center justify-center w-10 h-10 text-white hover:text-white"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: theme === "light" ? 1 : 0,
          opacity: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : 180
        }}
        transition={spring}
      >
        <Sun className="h-5 w-5 text-white" />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : -180
        }}
        transition={spring}
      >
        <Moon className="h-5 w-5 text-white" />
      </motion.div>
    </Button>
  );
} 