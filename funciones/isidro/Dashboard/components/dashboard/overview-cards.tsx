import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Cursos Activos",
    value: "5",
    description: "Cursos en progreso",
    icon: "📚",
  },
  {
    title: "Tareas Pendientes",
    value: "3",
    description: "Tareas por entregar",
    icon: "📝",
  },
  {
    title: "Progreso General",
    value: "75%",
    description: "Promedio de avance",
    icon: "📊",
  },
  {
    title: "Próximos Exámenes",
    value: "2",
    description: "Exámenes programados",
    icon: "✏️",
  },
];

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-black/30 backdrop-blur-md border border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">
                {card.title}
              </CardTitle>
              <span className="text-2xl">{card.icon}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{card.value}</div>
              <p className="text-xs text-white/70">{card.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}