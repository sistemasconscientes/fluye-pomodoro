import type { Dict } from "./types";

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
  "phase.dayLabel": "Día {day}",

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
  "phase.yourRhythm.desc": "Basado en tu energía de hoy",
  "phase.basedOnEnergy": "Basado en tu energía de hoy",
  "phase.configureFeeling": "Configura cómo te sientes para personalizar",

  // Recommendations - Your Rhythm (non-menstruating)
  "rec.yourRhythm.phrase": "Ajusta tu ritmo según cómo te sientas hoy.",
  "rec.yourRhythm.tip1": "Organiza tus tareas por prioridad",
  "rec.yourRhythm.tip2": "Alterna bloques de enfoque con descansos",
  "rec.yourRhythm.tip3": "Escucha tu cuerpo y adapta el ritmo",

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
  "tasks.privacy": "🔒 Tus tareas se guardan solo en este navegador",
  "tasks.showCompleted": "Ver completadas ({count})",

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
  "help.title": "¿Cómo funciona Fluye?",
  "help.intro": "Fluye te ayuda a trabajar con enfoque sin quemarte. Divide tu trabajo en bloques cortos con descansos, y adapta las recomendaciones a cómo te sientes.",
  "help.pomodoro.title": "🍅 Bloques de enfoque",
  "help.pomodoro.desc": "Trabajas durante <strong>25 minutos seguidos</strong> (un \"pomodoro\"). Cuando suena la alarma, tomas <strong>5 minutos de descanso</strong>. Después de 4 bloques, descansas más largo (15-20 min).",
  "help.pomodoro.why": "¿Por qué funciona?",
  "help.pomodoro.whyDesc": "Es más fácil concentrarse sabiendo que el descanso está cerca. Los descansos frecuentes evitan el agotamiento.",
  "help.howTo.title": "💡 Paso a paso",
  "help.step1.title": "Dile a Fluye cómo te sientes:",
  "help.step1.desc": "Al inicio selecciona tu nivel de energía. Fluye ajusta cuántos bloques de enfoque te recomienda.",
  "help.step2.title": "Personaliza tu ritmo (opcional):",
  "help.step2.desc": "Si menstrúas, puedes configurar tu ciclo en ⚙️ para recibir recomendaciones adaptadas a cada fase.",
  "help.step3.title": "Dale Play y enfócate:",
  "help.step3.desc": "El timer cuenta 25 minutos. Cuando termine, tómate el descanso — tu cerebro lo necesita.",
  "help.step4.title": "Revisa tu avance:",
  "help.step4.desc": "La barra de progreso muestra cuántos bloques llevas. No hay un mínimo obligatorio.",
  "help.proTip": "Los días difíciles también cuentan. Si solo hiciste 1 o 2 bloques de enfoque, eso es un logro. Lo importante es ser constante, no perfecto. 💛",

  // Footer
  "footer.createdBy": "Una creación de",
  "footer.suggestImprovements": "💡 Sugiere mejoras",
  "footer.forkGithub": "🍴 Fork en GitHub",
  "footer.buyCoffee": "☕ Regálame un café",

  // Notifications
  "notification.workComplete.title": "🍅 ¡Bloque completado!",
  "notification.workComplete.body": "Buen trabajo. Tómate un descanso, tu cerebro lo necesita.",
  "notification.breakComplete.title": "⏰ ¡Descanso terminado!",
  "notification.breakComplete.body": "Es hora de volver al enfoque. ¡Tú puedes!",
  "notification.toggle.label": "Notificaciones del navegador",
  "notification.toggle.desc": "Recibe una alerta cuando termine un bloque de enfoque o descanso",

  // Help toggle
  "help.showGuide": "Ver guía de uso",
  "help.hideGuide": "Ocultar",

  // Stats
  "stats.title": "Tu progreso",
  "stats.streak": "Racha de días",
  "stats.dailyAvg": "Promedio diario",
  "stats.monthTotal": "Este mes",
  "stats.last30": "Últimos 30 días",
  "stats.focusHours": "Horas de enfoque",
  "stats.bestDay": "Mejor día",
  "stats.activeDays": "Días activos",
  "stats.newRecord.title": "🏆 ¡Nuevo récord personal!",
  "stats.newRecord.description": "{{count}} pomodoros hoy — ¡tu mejor día!",
  "stats.tooltip.streak": "Días consecutivos con al menos 1 pomodoro completado",
  "stats.tooltip.dailyAvg": "Promedio de pomodoros por día activo en los últimos 30 días",
  "stats.tooltip.monthTotal": "Total de pomodoros completados en los últimos 30 días",
  "stats.tooltip.focusHours": "Tiempo estimado de enfoque basado en 25 min por pomodoro",
  "stats.tooltip.bestDay": "Máximo de pomodoros en un solo día (últimos 30 días)",
  "stats.tooltip.activeDays": "Días con al menos 1 pomodoro en los últimos 30 días",
  "stats.tooltip.heatmap": "Cada cuadro representa un día. Más oscuro = más pomodoros",
  "history.tooltip": "Tu conteo de pomodoros de los últimos 7 días. Hoy está resaltado",

  // Install prompt
  "install.title": "Instala Fluye en tu dispositivo",
  "install.ios": "Toca Compartir → Agregar a inicio para usar Fluye como app",
  "install.android": "Instala Fluye para acceso rápido sin navegador",
  "install.button": "Instalar",

  // PiP
  "pip.toggle": "Mini timer flotante",
  "pip.noTasks": "Sin tareas pendientes",
  "pip.confirmComplete": "¿Marcar tarea como completada?",
  "pip.confirm": "Sí",
  "pip.cancel": "No",

  // 404
  "notFound.title": "404",
  "notFound.message": "¡Ups! Página no encontrada",
  "notFound.back": "Volver al inicio",
  "dayChanged.title": "🌅 ¡Nuevo día!",
  "dayChanged.description": "Tu contador de pomodoros se ha reiniciado. ¡A darle!",
};

export default es;
