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
    // Weighted: 60% feeling, 40% phase
    return Math.round(0.4 * phaseBase + 0.6 * feelingValue);
  }
  return phaseBase;
}

interface PhaseDefinition {
  name: string;
  emoji: string;
  description: string;
  /** Proportion of cycle length (sums to 1.0) */
  proportion: number;
}

/**
 * Phases defined as proportions of total cycle length.
 * Luteal phase is relatively fixed (~14 days), so for longer cycles
 * the follicular phase stretches. We use proportions based on a 28-day model
 * then adjust dynamically.
 */
function getPhaseRanges(cycleLength: number) {
  // Luteal phase is biologically fixed at ~14 days
  const lutealTotal = 14;
  // Ovulation ~2-3 days
  const ovulationDays = Math.max(2, Math.round(cycleLength * 0.08));
  // Menstruation ~5 days, scales slightly
  const menstruationDays = Math.max(3, Math.min(7, Math.round(cycleLength * 0.18)));
  // Follicular fills the gap
  const follicularDays = Math.max(2, cycleLength - menstruationDays - ovulationDays - lutealTotal);

  // Split luteal into 3 sub-phases
  const lutealEarly = Math.round(lutealTotal * 0.36); // ~5 days
  const lutealMid = Math.round(lutealTotal * 0.29);   // ~4 days
  const lutealLate = lutealTotal - lutealEarly - lutealMid; // ~5 days

  return [
    { name: "Menstruación", emoji: "🌙", description: "Descansa y sé amable contigo", days: menstruationDays },
    { name: "Folicular", emoji: "🌱", description: "Tu energía crece, aprovéchala", days: follicularDays },
    { name: "Ovulación", emoji: "🌸", description: "Máxima energía y claridad mental", days: ovulationDays },
    { name: "Lútea temprana", emoji: "🍂", description: "Aún con buena energía, organiza", days: lutealEarly },
    { name: "Lútea media", emoji: "🌾", description: "Empieza a bajar el ritmo", days: lutealMid },
    { name: "Lútea tardía", emoji: "🕯️", description: "Prioriza lo esencial, descansa", days: lutealLate },
  ];
}

export function getCyclePhase(lastPeriodDate: string, cycleLength: number): CyclePhase {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastPeriod = new Date(lastPeriodDate);
  lastPeriod.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - lastPeriod.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dayInCycle = (diffDays % cycleLength) + 1;

  const phases = getPhaseRanges(cycleLength);
  let cumulative = 0;

  for (const phase of phases) {
    const start = cumulative + 1;
    const end = cumulative + phase.days;

    if (dayInCycle >= start && dayInCycle <= end) {
      return {
        name: phase.name,
        emoji: phase.emoji,
        daysRemaining: end - dayInCycle,
        recommendedPomodoros: resolvePomodoros(phase.name),
        dayInCycle,
        description: phase.description,
      };
    }
    cumulative = end;
  }

  // Fallback (shouldn't happen)
  const lastPhase = phases[phases.length - 1];
  return {
    name: lastPhase.name,
    emoji: lastPhase.emoji,
    daysRemaining: cycleLength - dayInCycle,
    recommendedPomodoros: resolvePomodoros(lastPhase.name),
    dayInCycle,
    description: lastPhase.description,
  };
}

export function getDefaultPhase(): CyclePhase {
  const feeling = getFeeling();
  return {
    name: "Tu ritmo",
    emoji: "✨",
    daysRemaining: 0,
    recommendedPomodoros: feeling ? getFeelingPomodoros(feeling) : 8,
    dayInCycle: 0,
    description: feeling ? "Basado en tu energía de hoy" : "Configura cómo te sientes para personalizar",
  };
}
