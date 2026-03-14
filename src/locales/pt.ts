import type { Dict } from "./types";

const pt: Dict = {
  // App
  "app.name": "Fluye",
  "app.tagline": "Produtividade que respeita seus ritmos naturais",

  // Onboarding
  "onboarding.question.menstruating": "Você menstrua?",
  "onboarding.question.menstruating.desc": "Isso nos ajuda a personalizar suas recomendações de produtividade",
  "onboarding.yes": "Sim",
  "onboarding.no": "Não",
  "onboarding.skip": "Pular (usar padrões)",
  "onboarding.back": "← Voltar",
  "onboarding.next": "Próximo",
  "onboarding.start": "Começar",
  "onboarding.lastPeriod": "Data da última menstruação",
  "onboarding.helpLabel": "Guia do Fluye",

  // Feeling selector
  "feeling.title": "Como está sua energia para trabalhar hoje?",
  "feeling.subtitle": "Isso ajusta quantos pomodoros recomendamos",
  "feeling.veryLow.label": "Muito baixa",
  "feeling.veryLow.desc": "Só consigo lidar com tarefas muito simples / administrativas",
  "feeling.low.label": "Baixa",
  "feeling.low.desc": "Consigo avançar, mas preciso de pausas frequentes e tarefas leves",
  "feeling.medium.label": "Média",
  "feeling.medium.desc": "Consigo trabalhar normalmente com pomodoros padrão",
  "feeling.high.label": "Alta",
  "feeling.high.desc": "Estou focada e pronta para desafios",
  "feeling.veryHigh.label": "Muito alta",
  "feeling.veryHigh.desc": "Hoje é dia de tarefas difíceis / profundas",

  // Regularity selector
  "regularity.title": "Como é seu ciclo?",
  "regularity.subtitle": "Isso nos ajuda a estimar suas fases",
  "regularity.regular.label": "Regular",
  "regularity.regular.desc": "Meu ciclo dura mais ou menos o mesmo a cada mês (~28 dias)",
  "regularity.irregular.label": "Irregular",
  "regularity.irregular.desc": "Meu ciclo varia bastante de mês a mês",

  // Timer
  "timer.longBreak": "pausa longa",
  "timer.shortBreak": "pausa curta",
  "timer.focusing": "focando",
  "timer.ready": "pronta para fluir",
  "timer.longBreakLabel": "☕ Pausa longa",
  "timer.shortBreakLabel": "🧘 Pausa curta",

  // Phase card
  "phase.pomodorosToday": "Pomodoros hoje",
  "phase.daysRemaining": "{count} dia{plural} restante{plural} nesta fase",

  // Phases
  "phase.menstruation": "Menstruação",
  "phase.menstruation.desc": "Descanse e seja gentil consigo",
  "phase.follicular": "Folicular",
  "phase.follicular.desc": "Sua energia está crescendo, aproveite",
  "phase.ovulation": "Ovulação",
  "phase.ovulation.desc": "Máxima energia e clareza mental",
  "phase.earlyLuteal": "Lútea inicial",
  "phase.earlyLuteal.desc": "Ainda com boa energia, organize",
  "phase.midLuteal": "Lútea média",
  "phase.midLuteal.desc": "Comece a desacelerar o ritmo",
  "phase.lateLuteal": "Lútea tardia",
  "phase.lateLuteal.desc": "Priorize o essencial, descanse",
  "phase.yourRhythm": "Seu ritmo",
  "phase.yourRhythm.desc": "Baseado na sua energia de hoje",
  "phase.basedOnEnergy": "Baseado na sua energia de hoje",
  "phase.configureFeeling": "Configure como se sente para personalizar",

  // Recommendations - Your Rhythm (non-menstruating)
  "rec.yourRhythm.phrase": "Ajuste seu ritmo conforme se sentir hoje.",
  "rec.yourRhythm.tip1": "Organize tarefas por prioridade",
  "rec.yourRhythm.tip2": "Alterne blocos de foco com pausas",
  "rec.yourRhythm.tip3": "Ouça seu corpo e adapte o ritmo",

  // Pomodoro descriptions
  "pomodoro.desc.4": "Seu corpo precisa de descanso. Menos sessões, mais cuidado.",
  "pomodoro.desc.6": "Energia moderada. Avance sem forçar.",
  "pomodoro.desc.8": "Bom equilíbrio entre produtividade e descanso.",
  "pomodoro.desc.10": "Você está no pico de energia. Aproveite ao máximo!",
  "pomodoro.desc.default": "Ajuste seu ritmo conforme se sentir.",

  // Completion dialog
  "complete.goalReached": "Meta alcançada!",
  "complete.pomodoroComplete": "Pomodoro completo!",
  "complete.goalReachedDesc": "Você completou {completed} de {recommended} pomodoros. Excelente trabalho hoje!",
  "complete.keepGoingDesc": "Você fez {completed} de {recommended} pomodoros hoje. Continue assim!",
  "complete.breakTip": "Faça uma pausa de 5 minutos antes do próximo bloco.",
  "complete.great": "Ótimo!",
  "complete.continue": "Continuar",

  // Tasks
  "tasks.title": "Tarefas de hoje",
  "tasks.completed": "{done}/{total} concluídas",
  "tasks.placeholder": "Adicionar tarefa...",
  "tasks.empty": "Adicione tarefas para organizar seu dia",
  "tasks.privacy": "🔒 Suas tarefas são salvas apenas neste navegador",

  // Weekly history
  "history.title": "Últimos 7 dias",
  "history.days": "Dom,Seg,Ter,Qua,Qui,Sex,Sáb",

  // Setup
  "setup.title": "Configurações",
  "setup.subtitle": "Personalize suas recomendações de produtividade",
  "setup.save": "Salvar configurações",
  "setup.saved": "✅ Configurações salvas",

  // Recommendations
  "rec.idealToday": "Ideal para hoje",
  "rec.nutrition": "Nutrição recomendada",

  // Recommendations - Menstruation
  "rec.menstruation.phrase": "Sua energia vai para dentro. Processe, descanse, não force.",
  "rec.menstruation.tip1": "Tarefas repetitivas e simples",
  "rec.menstruation.tip2": "Revisão e organização de arquivos",
  "rec.menstruation.tip3": "Journaling ou reflexão pessoal",
  "rec.menstruation.nut1": "🩸 Ferro + magnésio",
  "rec.menstruation.nut2": "Espinafre, chocolate amargo, lentilhas",
  "rec.menstruation.nut3": "Sementes de girassol",

  // Recommendations - Follicular
  "rec.follicular.phrase": "Sua mente está pronta para aprender. É hora de planejar.",
  "rec.follicular.tip1": "Planejamento estratégico e brainstorming",
  "rec.follicular.tip2": "Aprender algo novo ou fazer cursos",
  "rec.follicular.tip3": "Iniciar projetos criativos",
  "rec.follicular.nut1": "🌱 Frescos + leves",
  "rec.follicular.nut2": "Cítricos, brócolis, aveia, brotos",
  "rec.follicular.nut3": "Iogurte natural",

  // Recommendations - Ovulation
  "rec.ovulation.phrase": "Você está no pico. Crie, conecte, lidere.",
  "rec.ovulation.tip1": "Apresentações e reuniões importantes",
  "rec.ovulation.tip2": "Networking e colaboração",
  "rec.ovulation.tip3": "Tarefas que exigem liderança",
  "rec.ovulation.nut1": "✨ Máxima energia",
  "rec.ovulation.nut2": "Abacate, quinoa, matcha, frutas vermelhas",
  "rec.ovulation.nut3": "Amêndoas",

  // Recommendations - Early Luteal
  "rec.earlyLuteal.phrase": "O momentum continua. Foque nos detalhes.",
  "rec.earlyLuteal.tip1": "Revisão de projetos em andamento",
  "rec.earlyLuteal.tip2": "Trabalho detalhado e de precisão",
  "rec.earlyLuteal.tip3": "Documentação e acompanhamento",
  "rec.earlyLuteal.nut1": "🍂 Estabilizantes",
  "rec.earlyLuteal.nut2": "Batata-doce, banana, camomila",
  "rec.earlyLuteal.nut3": "Nozes, arroz integral",

  // Recommendations - Mid Luteal
  "rec.midLuteal.phrase": "Comece a fechar ciclos. Revise e consolide.",
  "rec.midLuteal.tip1": "Fechar tarefas pendentes",
  "rec.midLuteal.tip2": "Organizar e priorizar a semana",
  "rec.midLuteal.tip3": "Tarefas administrativas leves",

  // Recommendations - Late Luteal
  "rec.lateLuteal.phrase": "O corpo pede suavidade. Tarefas simples, sem atrito.",
  "rec.lateLuteal.tip1": "Tarefas curtas e previsíveis",
  "rec.lateLuteal.tip2": "Limpeza de inbox e pendências",
  "rec.lateLuteal.tip3": "Autocuidado e pausas frequentes",

  // Recommendations - No data
  "rec.noData.phrase": "Configure seu ciclo para recomendações personalizadas.",
  "rec.noData.tip1": "Use o ícone ⚙️ para configurar",
  "rec.noData.tip2": "Insira a data da última menstruação",
  "rec.noData.tip3": "Indique como se sente hoje",

  // Help section
  "help.title": "Guia do Fluye",
  "help.pomodoro.title": "🍅 O que é um Pomodoro?",
  "help.pomodoro.desc": "É uma técnica de produtividade que divide o trabalho em blocos de <strong>25 minutos de foco</strong> seguidos de <strong>5 minutos de descanso</strong>. Após 4 blocos, faça uma pausa longa de 15-30 minutos.",
  "help.pomodoro.why": "Por que funciona?",
  "help.pomodoro.whyDesc": "Seu cérebro mantém o foco melhor em intervalos curtos. As pausas previnem o esgotamento e melhoram a retenção.",
  "help.howTo.title": "💡 Como usar o Fluye?",
  "help.step1.title": "Configure seu ciclo:",
  "help.step1.desc": "Insira a data da sua última menstruação para calcular sua fase.",
  "help.step2.title": "Indique como se sente:",
  "help.step2.desc": "Cada dia selecione seu nível de energia. Isso ajusta quantos pomodoros recomendamos.",
  "help.step3.title": "Use o timer:",
  "help.step3.desc": "Pressione Play para iniciar um pomodoro de 25 minutos. Quando terminar, faça 5 min de pausa.",
  "help.step4.title": "Acompanhe seu progresso:",
  "help.step4.desc": "A barra mostra quantos pomodoros você fez vs. os recomendados para hoje.",
  "help.proTip": "Não se pressione para completar todos os pomodoros. Em dias de baixa energia, até 2 blocos de foco são uma conquista. 💛",

  // Footer
  "footer.createdBy": "Uma criação de",
  "footer.suggestImprovements": "💡 Sugira melhorias",
  "footer.forkGithub": "🍴 Fork no GitHub",
  "footer.buyCoffee": "☕ Me pague um café",

  // Features page
  "features.title": "Sugestões",
  "features.subtitle": "Vote e sugira melhorias para o Fluye",
  "features.placeholder": "Descreva sua sugestão...",
  "features.add": "Adicionar",
  "features.cancel": "Cancelar",
  "features.suggest": "Sugerir nova melhoria",
  "features.empty": "Ainda não há sugestões. Seja o primeiro!",
  "features.fix": "Correção",
  "features.improve": "Melhoria",
  "features.new": "Novo",
  "features.design": "Design",

  // 404
  "notFound.title": "404",
  "notFound.message": "Ops! Página não encontrada",
  "notFound.back": "Voltar ao início",
};

export default pt;
