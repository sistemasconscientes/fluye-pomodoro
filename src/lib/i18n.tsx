import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Locale = "es" | "en";

const STORAGE_KEY = "fluye_locale";

function getInitialLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "es") return saved;
  // Detect browser language
  const browserLang = navigator.language.slice(0, 2);
  return browserLang === "en" ? "en" : "es";
}

// Flat dictionary type
type Dict = Record<string, string>;

const es: Dict = {
  // App
  "app.name": "Fluye",
  "app.tagline": "Productividad que respeta tus ritmos naturales",

  // Onboarding
  "onboarding.question.menstruating": "¿Eres persona menstruante?",
  "onboarding.question.menstruating.desc": "Esto nos ayuda a personalizar tus recomendaciones de productividad",
  "onboarding.yes": "Sí",
  "onboarding.no": "No",
  "onboarding.skip": "Saltar (usar defaults)",
  "onboarding.back": "← Volver",
  "onboarding.next": "Siguiente",
  "onboarding.start": "Empezar",
  "onboarding.lastPeriod": "Fecha de última menstruación",
  "onboarding.helpLabel": "Guía de Fluye",

  // Feeling selector
  "feeling.title": "¿Cómo sientes tu energía hoy para trabajar?",
  "feeling.subtitle": "Esto ajusta cuántos pomodoros te recomendamos",
  "feeling.veryLow.label": "Bajísima",
  "feeling.veryLow.desc": "Solo puedo con cosas muy simples / administrativas",
  "feeling.low.label": "Baja",
  "feeling.low.desc": "Puedo avanzar, pero necesito descansos frecuentes y tareas ligeras",
  "feeling.medium.label": "Media",
  "feeling.medium.desc": "Puedo hacer trabajo normal, con pomodoros estándar",
  "feeling.high.label": "Alta",
  "feeling.high.desc": "Me siento enfocada y con ganas de retos",
  "feeling.veryHigh.label": "Muy alta",
  "feeling.veryHigh.desc": "Hoy es día de atacar tareas difíciles / profundas",

  // Regularity selector
  "regularity.title": "¿Cómo es tu ciclo?",
  "regularity.subtitle": "Esto nos ayuda a estimar tus fases",
  "regularity.regular.label": "Regular",
  "regularity.regular.desc": "Mi ciclo dura más o menos lo mismo cada mes (~28 días)",
  "regularity.irregular.label": "Irregular",
  "regularity.irregular.desc": "Mi ciclo varía bastante de mes a mes",

  // Timer
  "timer.longBreak": "descanso largo",
  "timer.shortBreak": "descanso corto",
  "timer.focusing": "enfocándote",
  "timer.ready": "lista para fluir",
  "timer.longBreakLabel": "☕ Descanso largo",
  "timer.shortBreakLabel": "🧘 Descanso corto",

  // Phase card
  "phase.pomodorosToday": "Pomodoros hoy",
  "phase.daysRemaining": "{count} día{plural} restante{plural} en esta fase",

  // Phases
  "phase.menstruation": "Menstruación",
  "phase.menstruation.desc": "Descansa y sé amable contigo",
  "phase.follicular": "Folicular",
  "phase.follicular.desc": "Tu energía crece, aprovéchala",
  "phase.ovulation": "Ovulación",
  "phase.ovulation.desc": "Máxima energía y claridad mental",
  "phase.earlyLuteal": "Lútea temprana",
  "phase.earlyLuteal.desc": "Aún con buena energía, organiza",
  "phase.midLuteal": "Lútea media",
  "phase.midLuteal.desc": "Empieza a bajar el ritmo",
  "phase.lateLuteal": "Lútea tardía",
  "phase.lateLuteal.desc": "Prioriza lo esencial, descansa",
  "phase.yourRhythm": "Tu ritmo",
  "phase.basedOnEnergy": "Basado en tu energía de hoy",
  "phase.configureFeeling": "Configura cómo te sientes para personalizar",

  // Pomodoro descriptions
  "pomodoro.desc.4": "Tu cuerpo necesita descanso. Menos sesiones, más cuidado.",
  "pomodoro.desc.6": "Energía moderada. Avanza sin forzar.",
  "pomodoro.desc.8": "Buen balance entre productividad y descanso.",
  "pomodoro.desc.10": "Estás en tu pico de energía. ¡Aprovecha al máximo!",
  "pomodoro.desc.default": "Ajusta tu ritmo según cómo te sientas.",

  // Completion dialog
  "complete.goalReached": "¡Meta alcanzada!",
  "complete.pomodoroComplete": "¡Pomodoro completado!",
  "complete.goalReachedDesc": "Completaste {completed} de {recommended} pomodoros. ¡Excelente trabajo hoy!",
  "complete.keepGoingDesc": "Llevas {completed} de {recommended} pomodoros hoy. ¡Sigue así!",
  "complete.breakTip": "Toma un descanso de 5 minutos antes del siguiente bloque.",
  "complete.great": "¡Genial!",
  "complete.continue": "Continuar",

  // Tasks
  "tasks.title": "Tareas de hoy",
  "tasks.completed": "{done}/{total} completadas",
  "tasks.placeholder": "Agregar tarea...",
  "tasks.empty": "Agrega tareas para organizar tu día",

  // Weekly history
  "history.title": "Últimos 7 días",
  "history.days": "Dom,Lun,Mar,Mié,Jue,Vie,Sáb",

  // Setup
  "setup.title": "Configuración",
  "setup.subtitle": "Personaliza tus recomendaciones de productividad",
  "setup.save": "Guardar configuración",
  "setup.saved": "✅ Configuración guardada",

  // Recommendations
  "rec.idealToday": "Ideal para hoy",
  "rec.nutrition": "Nutrición recomendada",

  // Recommendations - Menstruation
  "rec.menstruation.phrase": "Tu energía va hacia adentro. Procesa, descansa, no fuerces.",
  "rec.menstruation.tip1": "Tareas repetitivas y sencillas",
  "rec.menstruation.tip2": "Revisión y organización de archivos",
  "rec.menstruation.tip3": "Journaling o reflexión personal",
  "rec.menstruation.nut1": "🩸 Hierro + magnesio",
  "rec.menstruation.nut2": "Espinacas, chocolate amargo, lentejas",
  "rec.menstruation.nut3": "Semillas de girasol",

  // Recommendations - Follicular
  "rec.follicular.phrase": "Tu mente está lista para aprender. Este es tu momento de planear.",
  "rec.follicular.tip1": "Planificación estratégica y brainstorming",
  "rec.follicular.tip2": "Aprender algo nuevo o tomar cursos",
  "rec.follicular.tip3": "Iniciar proyectos creativos",
  "rec.follicular.nut1": "🌱 Frescos + ligeros",
  "rec.follicular.nut2": "Cítricos, brócoli, avena, germinados",
  "rec.follicular.nut3": "Yogurt natural",

  // Recommendations - Ovulation
  "rec.ovulation.phrase": "Estás en tu pico. Crea, conecta, lidera.",
  "rec.ovulation.tip1": "Presentaciones y reuniones clave",
  "rec.ovulation.tip2": "Networking y colaboración",
  "rec.ovulation.tip3": "Tareas que requieren liderazgo",
  "rec.ovulation.nut1": "✨ Máxima energía",
  "rec.ovulation.nut2": "Aguacate, quinoa, matcha, frutos rojos",
  "rec.ovulation.nut3": "Almendras",

  // Recommendations - Early Luteal
  "rec.earlyLuteal.phrase": "El momentum sigue. Enfócate en los detalles.",
  "rec.earlyLuteal.tip1": "Revisión de proyectos en curso",
  "rec.earlyLuteal.tip2": "Trabajo detallado y de precisión",
  "rec.earlyLuteal.tip3": "Documentación y seguimiento",
  "rec.earlyLuteal.nut1": "🍂 Estabilizantes",
  "rec.earlyLuteal.nut2": "Camote, plátano, manzanilla",
  "rec.earlyLuteal.nut3": "Nueces, arroz integral",

  // Recommendations - Mid Luteal
  "rec.midLuteal.phrase": "Empieza a cerrar ciclos. Revisa y consolida.",
  "rec.midLuteal.tip1": "Cerrar tareas pendientes",
  "rec.midLuteal.tip2": "Organizar y priorizar la semana",
  "rec.midLuteal.tip3": "Tareas administrativas ligeras",

  // Recommendations - Late Luteal
  "rec.lateLuteal.phrase": "El cuerpo pide suavidad. Tareas simples, sin fricción.",
  "rec.lateLuteal.tip1": "Tareas cortas y predecibles",
  "rec.lateLuteal.tip2": "Limpieza de inbox y pendientes",
  "rec.lateLuteal.tip3": "Autocuidado y pausas frecuentes",

  // Recommendations - No data
  "rec.noData.phrase": "Configura tu ciclo para recomendaciones personalizadas.",
  "rec.noData.tip1": "Usa el ícono ⚙️ para configurar",
  "rec.noData.tip2": "Ingresa tu fecha de última menstruación",
  "rec.noData.tip3": "Indica cómo te sientes hoy",

  // Help section
  "help.title": "Guía de Fluye",
  "help.pomodoro.title": "🍅 ¿Qué es un Pomodoro?",
  "help.pomodoro.desc": "Es una técnica de productividad que divide el trabajo en bloques de <strong>25 minutos de enfoque</strong> seguidos de <strong>5 minutos de descanso</strong>. Después de 4 bloques, tomas un descanso largo de 15-30 minutos.",
  "help.pomodoro.why": "¿Por qué funciona?",
  "help.pomodoro.whyDesc": "Tu cerebro mantiene la concentración mejor en intervalos cortos. Los descansos previenen el agotamiento y mejoran la retención.",
  "help.howTo.title": "💡 ¿Cómo usar Fluye?",
  "help.step1.title": "Configura tu ciclo:",
  "help.step1.desc": "Ingresa la fecha de tu última menstruación para calcular tu fase.",
  "help.step2.title": "Indica cómo te sientes:",
  "help.step2.desc": "Cada día selecciona tu nivel de energía. Esto ajusta cuántos pomodoros te recomendamos.",
  "help.step3.title": "Usa el timer:",
  "help.step3.desc": "Presiona Play para iniciar un pomodoro de 25 minutos. Cuando termine, toma 5 min de descanso.",
  "help.step4.title": "Sigue tu progreso:",
  "help.step4.desc": "La barra muestra cuántos pomodoros llevas vs. los recomendados para hoy.",
  "help.proTip": "No te presiones por completar todos los pomodoros. Los días de baja energía, incluso 2 bloques de enfoque son un logro. 💛",

  // Footer
  "footer.createdBy": "Una creación de",
  "footer.suggestImprovements": "💡 Sugiere mejoras",
  "footer.forkGithub": "🍴 Fork en GitHub",
  "footer.buyCoffee": "☕ Regálame un café",

  // Features page
  "features.title": "Sugerencias",
  "features.subtitle": "Vota y sugiere mejoras para Fluye",
  "features.placeholder": "Describe tu sugerencia...",
  "features.add": "Agregar",
  "features.cancel": "Cancelar",
  "features.suggest": "Sugerir nueva mejora",
  "features.empty": "Aún no hay sugerencias. ¡Sé el primero!",
  "features.fix": "Fix",
  "features.improve": "Mejora",
  "features.new": "Nuevo",
  "features.design": "Diseño",

  // 404
  "notFound.title": "404",
  "notFound.message": "¡Ups! Página no encontrada",
  "notFound.back": "Volver al inicio",
};

const en: Dict = {
  // App
  "app.name": "Fluye",
  "app.tagline": "Productivity that respects your natural rhythms",

  // Onboarding
  "onboarding.question.menstruating": "Do you menstruate?",
  "onboarding.question.menstruating.desc": "This helps us personalize your productivity recommendations",
  "onboarding.yes": "Yes",
  "onboarding.no": "No",
  "onboarding.skip": "Skip (use defaults)",
  "onboarding.back": "← Back",
  "onboarding.next": "Next",
  "onboarding.start": "Get started",
  "onboarding.lastPeriod": "Date of last period",
  "onboarding.helpLabel": "Fluye Guide",

  // Feeling selector
  "feeling.title": "How's your energy for work today?",
  "feeling.subtitle": "This adjusts how many pomodoros we recommend",
  "feeling.veryLow.label": "Very low",
  "feeling.veryLow.desc": "I can only handle simple / admin tasks",
  "feeling.low.label": "Low",
  "feeling.low.desc": "I can make progress, but I need frequent breaks and light tasks",
  "feeling.medium.label": "Medium",
  "feeling.medium.desc": "I can do regular work with standard pomodoros",
  "feeling.high.label": "High",
  "feeling.high.desc": "I feel focused and ready for challenges",
  "feeling.veryHigh.label": "Very high",
  "feeling.veryHigh.desc": "Today's the day for deep / difficult tasks",

  // Regularity selector
  "regularity.title": "How regular is your cycle?",
  "regularity.subtitle": "This helps us estimate your phases",
  "regularity.regular.label": "Regular",
  "regularity.regular.desc": "My cycle is about the same length each month (~28 days)",
  "regularity.irregular.label": "Irregular",
  "regularity.irregular.desc": "My cycle varies quite a bit month to month",

  // Timer
  "timer.longBreak": "long break",
  "timer.shortBreak": "short break",
  "timer.focusing": "focusing",
  "timer.ready": "ready to flow",
  "timer.longBreakLabel": "☕ Long break",
  "timer.shortBreakLabel": "🧘 Short break",

  // Phase card
  "phase.pomodorosToday": "Pomodoros today",
  "phase.daysRemaining": "{count} day{plural} remaining in this phase",

  // Phases
  "phase.menstruation": "Menstruation",
  "phase.menstruation.desc": "Rest and be kind to yourself",
  "phase.follicular": "Follicular",
  "phase.follicular.desc": "Your energy is rising, make the most of it",
  "phase.ovulation": "Ovulation",
  "phase.ovulation.desc": "Peak energy and mental clarity",
  "phase.earlyLuteal": "Early Luteal",
  "phase.earlyLuteal.desc": "Still good energy, time to organize",
  "phase.midLuteal": "Mid Luteal",
  "phase.midLuteal.desc": "Start slowing down the pace",
  "phase.lateLuteal": "Late Luteal",
  "phase.lateLuteal.desc": "Prioritize the essentials, rest",
  "phase.yourRhythm": "Your rhythm",
  "phase.basedOnEnergy": "Based on your energy today",
  "phase.configureFeeling": "Set how you feel to personalize",

  // Pomodoro descriptions
  "pomodoro.desc.4": "Your body needs rest. Fewer sessions, more care.",
  "pomodoro.desc.6": "Moderate energy. Move forward without forcing.",
  "pomodoro.desc.8": "Good balance between productivity and rest.",
  "pomodoro.desc.10": "You're at peak energy. Make the most of it!",
  "pomodoro.desc.default": "Adjust your rhythm based on how you feel.",

  // Completion dialog
  "complete.goalReached": "Goal reached!",
  "complete.pomodoroComplete": "Pomodoro complete!",
  "complete.goalReachedDesc": "You completed {completed} of {recommended} pomodoros. Excellent work today!",
  "complete.keepGoingDesc": "You've done {completed} of {recommended} pomodoros today. Keep going!",
  "complete.breakTip": "Take a 5-minute break before the next block.",
  "complete.great": "Awesome!",
  "complete.continue": "Continue",

  // Tasks
  "tasks.title": "Today's tasks",
  "tasks.completed": "{done}/{total} completed",
  "tasks.placeholder": "Add a task...",
  "tasks.empty": "Add tasks to organize your day",

  // Weekly history
  "history.title": "Last 7 days",
  "history.days": "Sun,Mon,Tue,Wed,Thu,Fri,Sat",

  // Setup
  "setup.title": "Settings",
  "setup.subtitle": "Customize your productivity recommendations",
  "setup.save": "Save settings",
  "setup.saved": "✅ Settings saved",

  // Recommendations
  "rec.idealToday": "Ideal for today",
  "rec.nutrition": "Recommended nutrition",

  // Recommendations - Menstruation
  "rec.menstruation.phrase": "Your energy turns inward. Process, rest, don't push.",
  "rec.menstruation.tip1": "Repetitive and simple tasks",
  "rec.menstruation.tip2": "File review and organization",
  "rec.menstruation.tip3": "Journaling or personal reflection",
  "rec.menstruation.nut1": "🩸 Iron + magnesium",
  "rec.menstruation.nut2": "Spinach, dark chocolate, lentils",
  "rec.menstruation.nut3": "Sunflower seeds",

  // Recommendations - Follicular
  "rec.follicular.phrase": "Your mind is ready to learn. This is your time to plan.",
  "rec.follicular.tip1": "Strategic planning and brainstorming",
  "rec.follicular.tip2": "Learn something new or take courses",
  "rec.follicular.tip3": "Start creative projects",
  "rec.follicular.nut1": "🌱 Fresh + light",
  "rec.follicular.nut2": "Citrus, broccoli, oats, sprouts",
  "rec.follicular.nut3": "Natural yogurt",

  // Recommendations - Ovulation
  "rec.ovulation.phrase": "You're at your peak. Create, connect, lead.",
  "rec.ovulation.tip1": "Key presentations and meetings",
  "rec.ovulation.tip2": "Networking and collaboration",
  "rec.ovulation.tip3": "Tasks that require leadership",
  "rec.ovulation.nut1": "✨ Peak energy",
  "rec.ovulation.nut2": "Avocado, quinoa, matcha, berries",
  "rec.ovulation.nut3": "Almonds",

  // Recommendations - Early Luteal
  "rec.earlyLuteal.phrase": "The momentum continues. Focus on the details.",
  "rec.earlyLuteal.tip1": "Review ongoing projects",
  "rec.earlyLuteal.tip2": "Detailed and precise work",
  "rec.earlyLuteal.tip3": "Documentation and follow-up",
  "rec.earlyLuteal.nut1": "🍂 Stabilizers",
  "rec.earlyLuteal.nut2": "Sweet potato, banana, chamomile",
  "rec.earlyLuteal.nut3": "Walnuts, brown rice",

  // Recommendations - Mid Luteal
  "rec.midLuteal.phrase": "Start closing cycles. Review and consolidate.",
  "rec.midLuteal.tip1": "Close pending tasks",
  "rec.midLuteal.tip2": "Organize and prioritize the week",
  "rec.midLuteal.tip3": "Light administrative tasks",

  // Recommendations - Late Luteal
  "rec.lateLuteal.phrase": "Your body asks for softness. Simple, frictionless tasks.",
  "rec.lateLuteal.tip1": "Short and predictable tasks",
  "rec.lateLuteal.tip2": "Inbox and backlog cleanup",
  "rec.lateLuteal.tip3": "Self-care and frequent breaks",

  // Recommendations - No data
  "rec.noData.phrase": "Set up your cycle for personalized recommendations.",
  "rec.noData.tip1": "Use the ⚙️ icon to configure",
  "rec.noData.tip2": "Enter your last period date",
  "rec.noData.tip3": "Set how you feel today",

  // Help section
  "help.title": "Fluye Guide",
  "help.pomodoro.title": "🍅 What is a Pomodoro?",
  "help.pomodoro.desc": "It's a productivity technique that splits work into blocks of <strong>25 minutes of focus</strong> followed by <strong>5 minutes of rest</strong>. After 4 blocks, take a longer 15-30 minute break.",
  "help.pomodoro.why": "Why does it work?",
  "help.pomodoro.whyDesc": "Your brain focuses better in short intervals. Breaks prevent burnout and improve retention.",
  "help.howTo.title": "💡 How to use Fluye?",
  "help.step1.title": "Set up your cycle:",
  "help.step1.desc": "Enter the date of your last period to calculate your phase.",
  "help.step2.title": "Share how you feel:",
  "help.step2.desc": "Each day, select your energy level. This adjusts how many pomodoros we recommend.",
  "help.step3.title": "Use the timer:",
  "help.step3.desc": "Press Play to start a 25-minute pomodoro. When it's done, take a 5-min break.",
  "help.step4.title": "Track your progress:",
  "help.step4.desc": "The bar shows how many pomodoros you've done vs. today's recommendation.",
  "help.proTip": "Don't pressure yourself to complete all pomodoros. On low-energy days, even 2 focus blocks are an achievement. 💛",

  // Footer
  "footer.createdBy": "A creation by",
  "footer.suggestImprovements": "💡 Suggest improvements",
  "footer.forkGithub": "🍴 Fork on GitHub",
  "footer.buyCoffee": "☕ Buy me a coffee",

  // Features page
  "features.title": "Suggestions",
  "features.subtitle": "Vote and suggest improvements for Fluye",
  "features.placeholder": "Describe your suggestion...",
  "features.add": "Add",
  "features.cancel": "Cancel",
  "features.suggest": "Suggest a new improvement",
  "features.empty": "No suggestions yet. Be the first!",
  "features.fix": "Fix",
  "features.improve": "Improvement",
  "features.new": "New",
  "features.design": "Design",

  // 404
  "notFound.title": "404",
  "notFound.message": "Oops! Page not found",
  "notFound.back": "Return to Home",
};

const dictionaries: Record<Locale, Dict> = { es, en };

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
          value = value.replaceAll(`{${k}}`, String(v));
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
