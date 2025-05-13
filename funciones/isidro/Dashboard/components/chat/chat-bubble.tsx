/**
 * ChatBubble - Componente de chat flotante.
 *
 * Permite enviar y recibir mensajes en tiempo real usando Socket.io.
 * - Fondo y borde con gradiente translúcido.
 * - Burbujas de mensaje opacas solo cuando hay mensajes.
 * - Animaciones con Framer Motion.
 * - Accesible y responsivo.
 *
 * @component
 */

"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import io from "socket.io-client";
import React from "react";

const socket = io("http://localhost:3000");

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

/**
 * ChatBubble Component
 * 
 * @returns {JSX.Element} Un componente de chat flotante con animaciones
 */
export function ChatBubble() {
  // Estado para controlar la visibilidad del chat
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Recibir mensajes del servidor
    socket.on("chat message", (msg: { text: string; timestamp: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + Math.random(),
          text: msg.text,
          isUser: false,
          timestamp: new Date(msg.timestamp)
        }
      ]);
    });
    return () => {
      socket.off("chat message");
    };
  }, []);

  // Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    // Enviar mensaje al servidor
    socket.emit("chat message", {
      text: inputMessage,
      timestamp: new Date().toISOString()
    });
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random(),
        text: inputMessage,
        isUser: true,
        timestamp: new Date()
      }
    ]);
    setInputMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
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
            className="fixed bottom-20 right-4 w-[calc(100%-2rem)] sm:w-96 z-[9999] overflow-hidden p-[2px] rounded-2xl bg-gradient-to-br from-black/60 via-black/30 to-black/60"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              position: "fixed",
              bottom: "5rem",
              right: "1rem"
            }}
            role="dialog"
            aria-label="Chat del asistente virtual"
          >
            <div className="rounded-2xl bg-gradient-to-br from-black/60 via-primary/30 to-black/60 backdrop-blur-xl border border-white/10 h-[500px] flex flex-col">
              <Card className="border-0 bg-transparent h-full flex flex-col">
                <CardHeader className="bg-gradient-to-r from-primary to-primary/80 p-4 rounded-t-2xl flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="bg-white/20 p-2 rounded-full"
                      >
                        <MessageCircle className="h-5 w-5 text-white" aria-hidden="true" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <CardTitle className="text-lg font-semibold text-white">Chat en tiempo real</CardTitle>
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
                        aria-label="Cerrar chat"
                      >
                        <X className="h-4 w-4 text-white" aria-hidden="true" />
                      </Button>
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4 flex-1 overflow-y-auto pr-2"
                  >
                    {messages.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full text-white/60 select-none">
                        <MessageCircle className="w-10 h-10 mb-2 opacity-30" />
                        <span className="text-base">¡Empieza la conversación!</span>
                      </div>
                    )}
                    {messages.map((message) => (
                      <div key={message.id} className={`flex items-start gap-2 ${message.isUser ? 'justify-end' : ''}`}>
                        <motion.div
                          initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className={`p-3 rounded-2xl shadow-soft-sm max-w-[80%] ${
                            message.isUser
                              ? 'bg-primary text-white rounded-tr-none'
                              : 'bg-black/80 text-white/90 rounded-tl-none'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <span className="text-xs opacity-50 mt-1 block">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </motion.div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-4 flex-shrink-0"
                  >
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        className="flex-1 rounded-xl border-0 bg-black/80 text-white placeholder:text-white/50 shadow-soft-sm focus:ring-2 focus:ring-primary/20"
                        aria-label="Mensaje"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="rounded-xl bg-primary hover:bg-primary/90 shadow-soft-sm"
                        aria-label="Enviar mensaje"
                        disabled={!inputMessage.trim()}
                      >
                        <Send className="h-4 w-4 text-white" aria-hidden="true" />
                      </Button>
                    </form>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 z-[9999]"
        style={{
          filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))",
          position: "fixed",
          bottom: "1rem",
          right: "1rem"
        }}
      >
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-soft-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
          aria-expanded={isOpen}
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
          }}
        >
          <MessageCircle className="h-7 w-7 text-white" aria-hidden="true" />
        </Button>
      </motion.div>
    </div>
  );
}

export default ChatBubble;