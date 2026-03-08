export interface CyclePhase {
  name: string;
  emoji: string;
  daysRemaining: number;
  recommendedPomodoros: number;
  dayInCycle: number;
  description: string;
}

const MENSTRUATION_POMODOROS = [4, 4, 6, 6, 8];

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
      recommendedPomodoros: MENSTRUATION_POMODOROS[dayInCycle - 1],
      dayInCycle,
      description: "Descansa y sé amable contigo",
    };
  }

  if (dayInCycle >= 6 && dayInCycle <= 13) {
    return {
      name: "Folicular",
      emoji: "🌱",
      daysRemaining: 13 - dayInCycle,
      recommendedPomodoros: 8,
      dayInCycle,
      description: "Tu energía crece, aprovéchala",
    };
  }

  if (dayInCycle >= 14 && dayInCycle <= 16) {
    return {
      name: "Ovulación",
      emoji: "🌸",
      daysRemaining: 16 - dayInCycle,
      recommendedPomodoros: 10,
      dayInCycle,
      description: "Máxima energía y claridad mental",
    };
  }

  if (dayInCycle >= 17 && dayInCycle <= 21) {
    return {
      name: "Lútea temprana",
      emoji: "🍂",
      daysRemaining: 21 - dayInCycle,
      recommendedPomodoros: 10,
      dayInCycle,
      description: "Aún con buena energía, organiza",
    };
  }

  if (dayInCycle >= 22 && dayInCycle <= 25) {
    return {
      name: "Lútea media",
      emoji: "🌾",
      daysRemaining: 25 - dayInCycle,
      recommendedPomodoros: 8,
      dayInCycle,
      description: "Empieza a bajar el ritmo",
    };
  }

  // Days 26 to cycleLength
  return {
    name: "Lútea tardía",
    emoji: "🕯️",
    daysRemaining: cycleLength - dayInCycle,
    recommendedPomodoros: 6,
    dayInCycle,
    description: "Prioriza lo esencial, descansa",
  };
}

export function getDefaultPhase(): CyclePhase {
  return {
    name: "Sin datos",
    emoji: "✨",
    daysRemaining: 0,
    recommendedPomodoros: 8,
    dayInCycle: 0,
    description: "Configura tu ciclo para personalizar",
  };
}
