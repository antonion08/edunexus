"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { analyticsData } from "@/lib/dashboard-data";
import { EngagementChart } from "@/components/dashboard/engagement-chart";
import { GradeDistribution } from "@/components/dashboard/grade-distribution";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Análisis</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <CardHeader>
              <CardTitle>Compromiso Diario</CardTitle>
              <CardDescription>
                Horas de estudio por día
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EngagementChart data={analyticsData.engagementByDay} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Calificaciones</CardTitle>
              <CardDescription>
                Distribución de calificaciones en todos los cursos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GradeDistribution data={analyticsData.gradeDistribution} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 