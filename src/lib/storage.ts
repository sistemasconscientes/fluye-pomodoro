const KEYS = {
  LAST_PERIOD: "fluye_last_period",
  CYCLE_LENGTH: "fluye_cycle_length",
  POMODOROS_TODAY: "fluye_pomodoros_today",
  POMODOROS_DATE: "fluye_pomodoros_date",
};

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
