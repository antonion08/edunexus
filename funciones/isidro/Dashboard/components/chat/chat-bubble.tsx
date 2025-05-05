"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 1
            }}
            className="fixed bottom-20 right-4 w-96 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl shadow-soft-xl z-50 overflow-hidden"
          >
            <Card className="border-0 bg-transparent">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 p-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="bg-white/20 p-2 rounded-full"
                    >
                      <MessageCircle className="h-5 w-5 text-white" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <CardTitle className="text-lg font-semibold text-white">Asistente Virtual</CardTitle>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white/20"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4 text-white" />
                    </Button>
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-2">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-white/10 p-3 rounded-2xl rounded-tl-none shadow-soft-sm"
                    >
                      <p className="text-sm text-white/90">¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?</p>
                    </motion.div>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-4 flex gap-2"
                >
                  <Input
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 rounded-xl border-0 bg-white/10 text-white placeholder:text-white/50 shadow-soft-sm focus:ring-2 focus:ring-primary/20"
                  />
                  <Button 
                    size="icon" 
                    className="rounded-xl bg-primary hover:bg-primary/90 shadow-soft-sm"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-soft-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </Button>
      </motion.div>
    </div>
  );
}