"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Nuevo Curso Disponible",
    content: "Se ha agregado un nuevo curso de Inteligencia Artificial. ¡Inscríbete ahora!",
    date: "2024-03-20",
  },
  {
    id: 2,
    title: "Mantenimiento Programado",
    content: "El sistema estará en mantenimiento el próximo sábado de 2:00 AM a 4:00 AM.",
    date: "2024-03-19",
  },
  {
    id: 3,
    title: "Concurso de Programación",
    content: "Participa en nuestro concurso de programación y gana premios increíbles.",
    date: "2024-03-18",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Announcements() {
  return (
    <Card className="bg-black/30 backdrop-blur-md border border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Anuncios</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          {announcements.map((announcement) => (
            <motion.div key={announcement.id} variants={item}>
              <Card className="bg-black/30 backdrop-blur-md border border-white/10 mb-4">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {announcement.title}
                      </h3>
                      <p className="text-sm text-white/70 mt-1">
                        {announcement.content}
                      </p>
                      <p className="text-xs text-white/50 mt-2">
                        {announcement.date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}