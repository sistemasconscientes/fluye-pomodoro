const KEYS = {
  LAST_PERIOD: "fluye_last_period",
  CYCLE_LENGTH: "fluye_cycle_length",
  REGULARITY: "fluye_regularity",
  POMODOROS_TODAY: "fluye_pomodoros_today",
  POMODOROS_DATE: "fluye_pomodoros_date",
  MENSTRUATES: "fluye_menstruates",
};

export type CycleRegularity = "regular" | "irregular" | "none";

const REGULARITY_CYCLE_LENGTHS: Record<CycleRegularity, number> = {
  regular: 28,
  irregular: 32,
  none: 28,
};

export function getMenstruates(): boolean | null {
  const val = localStorage.getItem(KEYS.MENSTRUATES);
  if (val === null) return null;
  return val === "true";
}

export function setMenstruates(value: boolean) {
  localStorage.setItem(KEYS.MENSTRUATES, String(value));
}

export function getLastPeriod(): string | null {
  return localStorage.getItem(KEYS.LAST_PERIOD);
}

export function setLastPeriod(date: string) {
  localStorage.setItem(KEYS.LAST_PERIOD, date);
}

export function getCycleLength(): number {
  const val = localStorage.getItem(KEYS.CYCLE_LENGTH);
  return val ? parseInt(val, 10) : 28;
}

export function setCycleLength(length: number) {
  localStorage.setItem(KEYS.CYCLE_LENGTH, String(length));
}

export function getRegularity(): CycleRegularity | null {
  const val = localStorage.getItem(KEYS.REGULARITY);
  return val as CycleRegularity | null;
}

export function setRegularity(regularity: CycleRegularity) {
  localStorage.setItem(KEYS.REGULARITY, regularity);
  setCycleLength(REGULARITY_CYCLE_LENGTHS[regularity]);
}

export function getCompletedPomodoros(): number {
  const savedDate = localStorage.getItem(KEYS.POMODOROS_DATE);
  const today = new Date().toISOString().split("T")[0];
  if (savedDate !== today) {
    localStorage.setItem(KEYS.POMODOROS_DATE, today);
    localStorage.setItem(KEYS.POMODOROS_TODAY, "0");
    return 0;
  }
  return parseInt(localStorage.getItem(KEYS.POMODOROS_TODAY) || "0", 10);
}

export function incrementPomodoros(): number {
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem(KEYS.POMODOROS_DATE, today);
  const current = getCompletedPomodoros();
  const next = current + 1;
  localStorage.setItem(KEYS.POMODOROS_TODAY, String(next));
  return next;
}
