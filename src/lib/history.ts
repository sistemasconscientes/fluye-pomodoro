import { toLocalDateStr } from "@/lib/utils";

const HISTORY_KEY = "fluye_history";

export interface DayRecord {
  date: string; // YYYY-MM-DD
  count: number;
}

export function getWeeklyHistory(): DayRecord[] {
  const raw = localStorage.getItem(HISTORY_KEY);
  let history: DayRecord[] = [];
  try {
    history = raw ? JSON.parse(raw) : [];
  } catch {
    history = [];
  }

  const today = new Date();
  const days: DayRecord[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = toLocalDateStr(d);
    const existing = history.find((h) => h.date === dateStr);
    days.push({ date: dateStr, count: existing?.count ?? 0 });
  }

  return days;
}

export function getMonthlyHistory(): DayRecord[] {
  const raw = localStorage.getItem(HISTORY_KEY);
  let history: DayRecord[] = [];
  try {
    history = raw ? JSON.parse(raw) : [];
  } catch {
    history = [];
  }

  const today = new Date();
  const days: DayRecord[] = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = toLocalDateStr(d);
    const existing = history.find((h) => h.date === dateStr);
    days.push({ date: dateStr, count: existing?.count ?? 0 });
  }

  return days;
}

export function getStreak(): number {
  const raw = localStorage.getItem(HISTORY_KEY);
  let history: DayRecord[] = [];
  try {
    history = raw ? JSON.parse(raw) : [];
  } catch {
    history = [];
  }

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = toLocalDateStr(d);
    const record = history.find((h) => h.date === dateStr);
    if (record && record.count > 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function getMonthlyAverage(): number {
  const days = getMonthlyHistory();
  const daysWithData = days.filter((d) => d.count > 0);
  if (daysWithData.length === 0) return 0;
  const total = daysWithData.reduce((sum, d) => sum + d.count, 0);
  return total / daysWithData.length;
}

export function recordPomodoro(): void {
  const raw = localStorage.getItem(HISTORY_KEY);
  let history: DayRecord[] = [];
  try {
    history = raw ? JSON.parse(raw) : [];
  } catch {
    history = [];
  }

  const today = toLocalDateStr();
  const idx = history.findIndex((h) => h.date === today);
  if (idx >= 0) {
    history[idx].count += 1;
  } else {
    history.push({ date: today, count: 1 });
  }

  // Keep only last 30 days
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const cutoffStr = cutoff.toISOString().split("T")[0];
  history = history.filter((h) => h.date >= cutoffStr);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
