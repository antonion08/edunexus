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
import { cn } from "@/lib/utils";

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessageText = inputMessage;
    // Enviar mensaje del usuario al servidor Socket.io (si aplica)
    socket.emit("chat message", {
      text: userMessageText,
      timestamp: new Date().toISOString()
    });

    // Añadir mensaje del usuario a la vista
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random(),
        text: userMessageText,
        isUser: true,
        timestamp: new Date()
      }
    ]);
    setInputMessage("");

    // --- Integración con la IA ---
    const OLLAMA_API_URL = "http://localhost:11434/api/generate"; // URL directa a Ollama
    const OLLAMA_MODEL = "llama3.2"; // Modelo especificado en scripts.js

    try {
      // Añadir un mensaje vacío inicial para la respuesta de la IA
       const aiMessageId = Date.now().toString() + Math.random();
       setMessages(prev => [...prev, { id: aiMessageId, text: "", isUser: false, timestamp: new Date() }]);

      const response = await fetch(OLLAMA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: userMessageText,
          model: OLLAMA_MODEL,
          stream: true
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error al comunicarse con la IA:', error);
        // Actualizar el mensaje de la IA con el error
        setMessages(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, text: `Error de la IA: ${error?.error || response.statusText}` } : msg));
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let partialResponse = '';
      let aiReply = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) {
          break;
        }
        partialResponse += decoder.decode(value, { stream: true });

        // Procesar las líneas JSON del stream
        const lines = partialResponse.split('\n');
        partialResponse = lines.pop() || ''; // Guarda la última línea incompleta

        for (const line of lines) {
          if (line.trim() === '') continue;
          try {
            const data = JSON.parse(line);
            if (data.response) {
              aiReply += data.response;
              // Actualizar el último mensaje de la IA en el estado
              setMessages(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, text: aiReply } : msg));
            }
          } catch (error) {
            console.warn('Error al parsear JSON de la IA:', line, error);
          }
        }
         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Desplazar mientras llega la respuesta
      }
       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Desplazamiento final

    } catch (error) {
      console.error('Error en la comunicación con la IA:', error);
      // Añadir un mensaje de error al chat
      setMessages(prev => [
          ...prev,
          {
              id: Date.now().toString() + Math.random(),
              text: 'Error al obtener la respuesta de la IA.',
              isUser: false,
              timestamp: new Date()
          }
      ]);
       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    // --- Fin Integración con la IA ---

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
            className="fixed bottom-20 right-4 w-[calc(100%-2rem)] sm:w-96 z-[9999] overflow-hidden p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              position: "fixed",
              bottom: "5rem",
              right: "1rem"
            }}
            role="dialog"
            aria-label="Chat del asistente virtual"
          >
            <div className="h-[500px] flex flex-col">
              <Card className="border-0 bg-transparent h-full flex flex-col">
                <CardHeader className="p-4 rounded-t-2xl flex-shrink-0">
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