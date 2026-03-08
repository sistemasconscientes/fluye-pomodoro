import { getFeeling, getFeelingPomodoros } from "@/lib/feeling";

export interface CyclePhase {
  name: string;
  emoji: string;
  daysRemaining: number;
  recommendedPomodoros: number;
  dayInCycle: number;
  description: string;
}

const PHASE_BASE_POMODOROS: Record<string, number> = {
  "Menstruación": 4,
  "Folicular": 8,
  "Ovulación": 10,
  "Lútea temprana": 10,
  "Lútea media": 8,
  "Lútea tardía": 6,
};

function resolvePomodoros(phaseName: string): number {
  const phaseBase = PHASE_BASE_POMODOROS[phaseName] ?? 8;
  const feeling = getFeeling();
  if (feeling) {
    const feelingValue = getFeelingPomodoros(feeling);
    return Math.round((phaseBase + feelingValue) / 2);
  }
  return phaseBase;
}

export function getCyclePhase(lastPeriodDate: string, cycleLength: number): CyclePhase {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastPeriod = new Date(lastPeriodDate);
  lastPeriod.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - lastPeriod.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dayInCycle = (diffDays % cycleLength) + 1;

  if (dayInCycle >= 1 && dayInCycle <= 5) {
    return {
      name: "Menstruación",
      emoji: "🌙",
      daysRemaining: 5 - dayInCycle,
      recommendedPomodoros: resolvePomodoros("Menstruación"),
      dayInCycle,
      description: "Descansa y sé amable contigo",
    };
  }

  if (dayInCycle >= 6 && dayInCycle <= 13) {
    return {
      name: "Folicular",
      emoji: "🌱",
      daysRemaining: 13 - dayInCycle,
      recommendedPomodoros: resolvePomodoros("Folicular"),
      dayInCycle,
      description: "Tu energía crece, aprovéchala",
    };
  }

  if (dayInCycle >= 14 && dayInCycle <= 16) {
    return {
      name: "Ovulación",
      emoji: "🌸",
      daysRemaining: 16 - dayInCycle,
      recommendedPomodoros: resolvePomodoros("Ovulación"),
      dayInCycle,
      description: "Máxima energía y claridad mental",
    };
  }

  if (dayInCycle >= 17 && dayInCycle <= 21) {
    return {
      name: "Lútea temprana",
      emoji: "🍂",
      daysRemaining: 21 - dayInCycle,
      recommendedPomodoros: resolvePomodoros("Lútea temprana"),
      dayInCycle,
      description: "Aún con buena energía, organiza",
    };
  }

  if (dayInCycle >= 22 && dayInCycle <= 25) {
    return {
      name: "Lútea media",
      emoji: "🌾",
      daysRemaining: 25 - dayInCycle,
      recommendedPomodoros: resolvePomodoros("Lútea media"),
      dayInCycle,
      description: "Empieza a bajar el ritmo",
    };
  }

  return {
    name: "Lútea tardía",
    emoji: "🕯️",
    daysRemaining: cycleLength - dayInCycle,
    recommendedPomodoros: resolvePomodoros("Lútea tardía"),
    dayInCycle,
    description: "Prioriza lo esencial, descansa",
  };
}

export function getDefaultPhase(): CyclePhase {
  const feeling = getFeeling();
  return {
    name: "Sin datos",
    emoji: "✨",
    daysRemaining: 0,
    recommendedPomodoros: feeling ? getFeelingPomodoros(feeling) : 8,
    dayInCycle: 0,
    description: "Configura tu ciclo para personalizar",
  };
}
