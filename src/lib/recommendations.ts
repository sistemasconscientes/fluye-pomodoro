import type { CyclePhase } from "@/lib/cycle";

export interface PhaseRecommendation {
  phrase: string;
  tips: string[];
  nutritionTips: string[];
  bgClass: string;
}

const PHASE_RECOMMENDATIONS: Record<string, PhaseRecommendation> = {
  "Menstruación": {
    phrase: "Tu energía va hacia adentro. Procesa, descansa, no fuerces.",
    tips: [
      "Tareas repetitivas y sencillas",
      "Revisión y organización de archivos",
      "Journaling o reflexión personal",
    ],
    nutritionTips: [
      "🩸 Hierro + magnesio",
      "Espinacas, chocolate amargo, lentejas",
      "Semillas de girasol",
    ],
    bgClass: "bg-[hsl(14,67%,62%,0.12)]",
  },
  "Folicular": {
    phrase: "Tu mente está lista para aprender. Este es tu momento de planear.",
    tips: [
      "Planificación estratégica y brainstorming",
      "Aprender algo nuevo o tomar cursos",
      "Iniciar proyectos creativos",
    ],
    nutritionTips: [
      "🌱 Frescos + ligeros",
      "Cítricos, brócoli, avena, germinados",
      "Yogurt natural",
    ],
    bgClass: "bg-[hsl(100,19%,61%,0.15)]",
  },
  "Ovulación": {
    phrase: "Estás en tu pico. Crea, conecta, lidera.",
    tips: [
      "Presentaciones y reuniones clave",
      "Networking y colaboración",
      "Tareas que requieren liderazgo",
    ],
    nutritionTips: [
      "✨ Máxima energía",
      "Aguacate, quinoa, matcha, frutos rojos",
      "Almendras",
    ],
    bgClass: "bg-[hsl(40,80%,65%,0.15)]",
  },
  "Lútea temprana": {
    phrase: "El momentum sigue. Enfócate en los detalles.",
    tips: [
      "Revisión de proyectos en curso",
      "Trabajo detallado y de precisión",
      "Documentación y seguimiento",
    ],
    nutritionTips: [
      "🍂 Estabilizantes",
      "Camote, plátano, manzanilla",
      "Nueces, arroz integral",
    ],
    bgClass: "bg-[hsl(30,50%,60%,0.15)]",
  },
  "Lútea media": {
    phrase: "Empieza a cerrar ciclos. Revisa y consolida.",
    tips: [
      "Cerrar tareas pendientes",
      "Organizar y priorizar la semana",
      "Tareas administrativas ligeras",
    ],
    nutritionTips: [
      "🍂 Estabilizantes",
      "Camote, plátano, manzanilla",
      "Nueces, arroz integral",
    ],
    bgClass: "bg-[hsl(35,40%,55%,0.12)]",
  },
  "Lútea tardía": {
    phrase: "El cuerpo pide suavidad. Tareas simples, sin fricción.",
    tips: [
      "Tareas cortas y predecibles",
      "Limpieza de inbox y pendientes",
      "Autocuidado y pausas frecuentes",
    ],
    nutritionTips: [
      "🍂 Estabilizantes",
      "Camote, plátano, manzanilla",
      "Nueces, arroz integral",
    ],
    bgClass: "bg-[hsl(25,30%,60%,0.12)]",
  },
  "Sin datos": {
    phrase: "Configura tu ciclo para recomendaciones personalizadas.",
    tips: [
      "Usa el ícono ⚙️ para configurar",
      "Ingresa tu fecha de última menstruación",
      "Elige tu tipo de energía del día",
    ],
    nutritionTips: [],
    bgClass: "bg-secondary/50",
  },
};

export function getPhaseRecommendation(phase: CyclePhase): PhaseRecommendation {
  return PHASE_RECOMMENDATIONS[phase.name] || PHASE_RECOMMENDATIONS["Sin datos"];
}
