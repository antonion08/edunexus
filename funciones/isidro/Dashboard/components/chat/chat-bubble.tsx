/**
 * ChatBubble - Componente de chat flotante interactivo
 * 
 * Este componente implementa un chat flotante con las siguientes características:
 * - Interfaz de chat en tiempo real usando Socket.io
 * - Integración con IA usando Ollama
 * - Animaciones suaves usando Framer Motion
 * - Diseño responsivo y accesible
 * - Posicionamiento fijo en la esquina inferior derecha
 * - Efectos visuales modernos (backdrop blur, gradientes, sombras)
 * 
 * @component
 * @example
 * ```tsx
 * <ChatBubble />
 * ```
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

// Configuración del socket para comunicación en tiempo real
const socket = io("http://localhost:3000");

/**
 * Interfaz que define la estructura de un mensaje
 * @interface Message
 */
interface Message {
  id: string;        // Identificador único del mensaje
  text: string;      // Contenido del mensaje
  isUser: boolean;   // Indica si el mensaje es del usuario
  timestamp: Date;   // Fecha y hora del mensaje
}

/**
 * ChatBubble Component
 * 
 * Componente principal que renderiza un chat flotante con las siguientes funcionalidades:
 * - Botón flotante con animación
 * - Ventana de chat expandible
 * - Lista de mensajes con scroll automático
 * - Formulario para enviar mensajes
 * - Integración con Socket.io para mensajes en tiempo real
 * - Integración con Ollama para respuestas de IA
 * 
 * @returns {JSX.Element} Componente de chat flotante
 */
export function ChatBubble() {
  // Estados del componente
  const [isOpen, setIsOpen] = useState(false);           // Controla la visibilidad del chat
  const [messages, setMessages] = useState<Message[]>([]); // Almacena los mensajes
  const [inputMessage, setInputMessage] = useState("");   // Controla el input del mensaje
  const messagesEndRef = useRef<HTMLDivElement>(null);    // Referencia para scroll automático

  // Efecto para manejar mensajes del socket
  useEffect(() => {
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
      // Scroll to the bottom when a new message arrives from the socket
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => {
      socket.off("chat message");
    };
  }, []);

  /**
   * Maneja el envío de mensajes
   * @param {FormEvent} e - Evento del formulario
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessageText = inputMessage;
    // Envía mensaje al servidor Socket.io
    socket.emit("chat message", {
      text: userMessageText,
      timestamp: new Date().toISOString()
    });

    // Añade mensaje del usuario a la vista
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

    // Integración con Ollama para respuestas de IA
    const OLLAMA_API_URL = "http://localhost:11434/api/generate";
    const OLLAMA_MODEL = "llama3.2";

    try {
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
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, text: `Error de la IA: ${error?.error || response.statusText}` } 
            : msg
        ));
        return;
      }

      // Procesa la respuesta stream de la IA
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let partialResponse = '';
      let aiReply = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        
        partialResponse += decoder.decode(value, { stream: true });
        const lines = partialResponse.split('\n');
        partialResponse = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '') continue;
          try {
            const data = JSON.parse(line);
            if (data.response) {
              aiReply += data.response;
              setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId 
                  ? { ...msg, text: aiReply } 
                  : msg
              ));
            }
          } catch (error) {
            console.warn('Error al parsear JSON de la IA:', line, error);
          }
        }
      }
    } catch (error) {
      console.error('Error en la comunicación con la IA:', error);
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
  };

  return (
    <div className="sticky bottom-6 right-6 z-[9999] ml-auto w-fit">
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
            className="absolute bottom-16 right-0 w-[calc(100%-2rem)] sm:w-96 z-[9999] overflow-hidden p-4 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-3xl"
            style={{
              boxShadow: "0 8px 32px rgba(233, 0, 0, 0.2)"
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
                    className="space-y-4 flex-1 overflow-y-auto pr-2 max-h-[350px] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
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
                          className={`p-3 rounded-2xl shadow-soft-sm max-w-[80%] break-words ${
                            message.isUser
                              ? 'bg-primary text-white rounded-tr-none'
                              : 'bg-black/80 text-white/90 rounded-tl-none'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                          <span className="text-xs opacity-50 mt-1 block">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </motion.div>
                      </div>
                    ))
                    }
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
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="sticky bottom-4 right-4 z-[9999] ml-auto"
        style={{
          filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))"
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