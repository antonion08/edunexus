/**
 * ChatBubble Component
 * 
 * Un componente de chat flotante que proporciona una interfaz de chat interactiva.
 * Utiliza Framer Motion para animaciones suaves y un diseño moderno con efectos de cristal (glassmorphism).
 */

"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Función para simular la respuesta del asistente
  const simulateAssistantResponse = async (userMessage: string) => {
    setIsTyping(true);
    // Simular un delay para que parezca que el asistente está "pensando"
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = {
      id: Date.now().toString(),
      text: `Entiendo que dices: "${userMessage}". ¿En qué más puedo ayudarte?`,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, response]);
    setIsTyping(false);
  };

  // Función para manejar el envío de mensajes
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    await simulateAssistantResponse(inputMessage);
  };

  // Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* AnimatePresence maneja las animaciones de entrada/salida */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Animaciones para la apertura del chat
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 1
            }}
            className="fixed bottom-20 right-4 w-[calc(100%-2rem)] sm:w-96 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-soft-xl z-50 overflow-hidden"
            role="dialog"
            aria-label="Chat del asistente virtual"
          >
            <Card className="border-0 bg-transparent">
              {/* Encabezado del chat con gradiente */}
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 p-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Icono del chat con animación */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="bg-white/20 p-2 rounded-full"
                    >
                      <MessageCircle className="h-5 w-5 text-white" aria-hidden="true" />
                    </motion.div>
                    {/* Título del chat con animación */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <CardTitle className="text-lg font-semibold text-white">Asistente Virtual</CardTitle>
                    </motion.div>
                  </div>
                  {/* Botón de cierre con animación */}
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
              <CardContent className="p-4">
                {/* Contenido del chat con mensajes */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4 max-h-[300px] overflow-y-auto pr-2"
                >
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
                  {isTyping && (
                    <div className="flex items-start gap-2">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/10 p-3 rounded-2xl rounded-tl-none shadow-soft-sm"
                      >
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                            className="w-2 h-2 bg-white/50 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                            className="w-2 h-2 bg-white/50 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                            className="w-2 h-2 bg-white/50 rounded-full"
                          />
                        </div>
                      </motion.div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </motion.div>
                {/* Área de entrada de mensajes */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-4"
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
                      disabled={!inputMessage.trim() || isTyping}
                    >
                      <Send className="h-4 w-4 text-white" aria-hidden="true" />
                    </Button>
                  </form>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante para abrir/cerrar el chat */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-soft-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
          aria-expanded={isOpen}
        >
          <MessageCircle className="h-7 w-7 text-white" aria-hidden="true" />
        </Button>
      </motion.div>
    </div>
  );
}