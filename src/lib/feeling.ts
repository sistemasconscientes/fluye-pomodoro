export type FeelingLevel = "very_low" | "low" | "medium" | "high" | "very_high";

export interface FeelingOption {
  level: FeelingLevel;
  label: string;
  emoji: string;
  description: string;
  pomodoros: number;
}

export const FEELING_OPTIONS: FeelingOption[] = [
  {
    level: "very_low",
    label: "Bajísima",
    emoji: "😴",
    description: "Solo puedo con cosas muy simples / administrativas",
    pomodoros: 4,
  },
  {
    level: "low",
    label: "Baja",
    emoji: "🌧️",
    description: "Puedo avanzar, pero necesito descansos frecuentes y tareas ligeras",
    pomodoros: 6,
  },
  {
    level: "medium",
    label: "Media",
    emoji: "☁️",
    description: "Puedo hacer trabajo normal, con pomodoros estándar",
    pomodoros: 8,
  },
  {
    level: "high",
    label: "Alta",
    emoji: "☀️",
    description: "Me siento enfocada y con ganas de retos",
    pomodoros: 8,
  },
  {
    level: "very_high",
    label: "Muy alta",
    emoji: "🔥",
    description: "Hoy es día de atacar tareas difíciles / profundas",
    pomodoros: 10,
  },
];

export function getFeeling(): FeelingLevel | null {
  const saved = localStorage.getItem("fluye_feeling");
  const savedDate = localStorage.getItem("fluye_feeling_date");
  const today = new Date().toISOString().split("T")[0];
  if (savedDate !== today || !saved) return null;
  return saved as FeelingLevel;
}

export function setFeeling(level: FeelingLevel) {
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem("fluye_feeling", level);
  localStorage.setItem("fluye_feeling_date", today);
}

export function getFeelingPomodoros(level: FeelingLevel): number {
  const option = FEELING_OPTIONS.find((o) => o.level === level);
  return option?.pomodoros ?? 8;
}
