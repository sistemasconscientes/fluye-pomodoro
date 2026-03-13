import type { Dict } from "./types";

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

export default en;
