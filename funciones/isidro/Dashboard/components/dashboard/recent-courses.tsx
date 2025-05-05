"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

const courses = [
  {
    id: 1,
    title: "Introducción a la Programación",
    progress: 75,
    image: "https://images.unsplash.com/photo-1517694712202-14dd4018dce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    title: "Diseño Web Moderno",
    progress: 45,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
  },
  {
    id: 3,
    title: "Bases de Datos",
    progress: 30,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
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

export function RecentCourses() {
  return (
    <Card className="bg-black/30 backdrop-blur-md border border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Cursos Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          {courses.map((course) => (
            <motion.div key={course.id} variants={item}>
              <Card className="overflow-hidden transition-all hover:shadow-md bg-black/30 backdrop-blur-md border border-white/10 mb-4">
                <div className="relative h-40 w-full">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover w-full h-full rounded-t-md"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={course.id === 1}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white drop-shadow-md">
                      {course.title}
                    </h3>
                    <div className="mt-2 w-full bg-white/30 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-white/80 mt-1">
                      {course.progress}% completado
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}