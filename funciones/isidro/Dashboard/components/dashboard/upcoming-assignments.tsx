"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Proyecto Final de Programación",
    course: "Introducción a la Programación",
    dueDate: "2024-03-25",
    time: "23:59",
  },
  {
    id: 2,
    title: "Diseño de Interfaz de Usuario",
    course: "Diseño Web Moderno",
    dueDate: "2024-03-28",
    time: "23:59",
  },
  {
    id: 3,
    title: "Examen de Bases de Datos",
    course: "Bases de Datos",
    dueDate: "2024-03-30",
    time: "14:00",
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

export function UpcomingAssignments() {
  return (
    <Card className="bg-black/30 backdrop-blur-md border border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Tareas Pendientes</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          {assignments.map((assignment) => (
            <motion.div key={assignment.id} variants={item}>
              <Card className="bg-black/30 backdrop-blur-md border border-white/10 mb-4">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-white/70 mt-1">
                    {assignment.course}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {assignment.dueDate}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {assignment.time}
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