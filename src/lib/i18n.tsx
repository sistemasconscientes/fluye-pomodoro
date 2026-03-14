import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { dictionaries, type Locale } from "@/locales";

export type { Locale };

const STORAGE_KEY = "fluye_locale";

function getInitialLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "es") return saved;
  const browserLang = navigator.language.slice(0, 2);
  return browserLang === "en" ? "en" : "es";
}

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let value = dictionaries[locale][key] || dictionaries["es"][key] || key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = value.split(`{${k}}`).join(String(v));
        });
      }
      return value;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

// Helper to get translated feeling options
export function getFeelingOptionsTranslated(t: (key: string) => string) {
  return [
    { level: "very_low" as const, emoji: "😴", label: t("feeling.veryLow.label"), description: t("feeling.veryLow.desc"), pomodoros: 4 },
    { level: "low" as const, emoji: "🌧️", label: t("feeling.low.label"), description: t("feeling.low.desc"), pomodoros: 6 },
    { level: "medium" as const, emoji: "☁️", label: t("feeling.medium.label"), description: t("feeling.medium.desc"), pomodoros: 7 },
    { level: "high" as const, emoji: "☀️", label: t("feeling.high.label"), description: t("feeling.high.desc"), pomodoros: 8 },
    { level: "very_high" as const, emoji: "🔥", label: t("feeling.veryHigh.label"), description: t("feeling.veryHigh.desc"), pomodoros: 10 },
  ];
}

// Helper to get translated regularity options
export function getRegularityOptionsTranslated(t: (key: string) => string) {
  return [
    { value: "regular" as const, emoji: "🔄", label: t("regularity.regular.label"), description: t("regularity.regular.desc") },
    { value: "irregular" as const, emoji: "🌀", label: t("regularity.irregular.label"), description: t("regularity.irregular.desc") },
  ];
}

// Phase name key mapping (internal name → i18n key prefix)
export const PHASE_KEY_MAP: Record<string, string> = {
  "Menstruación": "menstruation",
  "Folicular": "follicular",
  "Ovulación": "ovulation",
  "Lútea temprana": "earlyLuteal",
  "Lútea media": "midLuteal",
  "Lútea tardía": "lateLuteal",
  "Tu ritmo": "yourRhythm",
  "Sin datos": "noData",
};
