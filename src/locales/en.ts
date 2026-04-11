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
  "phase.dayLabel": "Day {day}",

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
  "phase.yourRhythm.desc": "Based on your energy today",
  "phase.basedOnEnergy": "Based on your energy today",
  "phase.configureFeeling": "Set how you feel to personalize",

  // Recommendations - Your Rhythm (non-menstruating)
  "rec.yourRhythm.phrase": "Adjust your rhythm based on how you feel today.",
  "rec.yourRhythm.tip1": "Organize tasks by priority",
  "rec.yourRhythm.tip2": "Alternate focus blocks with breaks",
  "rec.yourRhythm.tip3": "Listen to your body and adapt your pace",

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
  "tasks.privacy": "🔒 Your tasks are saved only in this browser",
  "tasks.showCompleted": "Show completed ({count})",

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
  "help.title": "How does Fluye work?",
  "help.intro": "Fluye helps you work with focus without burning out. It breaks your work into short blocks with breaks, and adapts recommendations to how you feel.",
  "help.pomodoro.title": "🍅 Focus blocks",
  "help.pomodoro.desc": "You work for <strong>25 minutes straight</strong> (a \"pomodoro\"). When the alarm rings, you take a <strong>5-minute break</strong>. After 4 blocks, take a longer break (15-20 min).",
  "help.pomodoro.why": "Why does it work?",
  "help.pomodoro.whyDesc": "It's easier to focus when you know a break is coming. Frequent breaks prevent burnout.",
  "help.howTo.title": "💡 Step by step",
  "help.step1.title": "Tell Fluye how you feel:",
  "help.step1.desc": "Select your energy level at the start. Fluye adjusts how many focus blocks it recommends.",
  "help.step2.title": "Personalize your rhythm (optional):",
  "help.step2.desc": "If you menstruate, you can set up your cycle in ⚙️ to get recommendations adapted to each phase.",
  "help.step3.title": "Hit Play and focus:",
  "help.step3.desc": "The timer counts 25 minutes. When it's done, take the break — your brain needs it.",
  "help.step4.title": "Check your progress:",
  "help.step4.desc": "The progress bar shows how many blocks you've done. There's no mandatory minimum.",
  "help.proTip": "Tough days count too. If you only did 1 or 2 focus blocks, that's an achievement. What matters is being consistent, not perfect. 💛",

  // Footer
  "footer.createdBy": "A creation by",
  "footer.suggestImprovements": "💡 Suggest improvements",
  "footer.forkGithub": "🍴 Fork on GitHub",
  "footer.buyCoffee": "☕ Buy me a coffee",

  // Notifications
  "notification.workComplete.title": "🍅 Focus block done!",
  "notification.workComplete.body": "Great work. Take a break — your brain needs it.",
  "notification.breakComplete.title": "⏰ Break's over!",
  "notification.breakComplete.body": "Time to get back to focus. You've got this!",
  "notification.toggle.label": "Browser notifications",
  "notification.toggle.desc": "Get an alert when a focus block or break ends",

  // Help toggle
  "help.showGuide": "Show usage guide",
  "help.hideGuide": "Hide",

  // Stats
  "stats.title": "Your progress",
  "stats.streak": "Day streak",
  "stats.dailyAvg": "Daily average",
  "stats.monthTotal": "This month",
  "stats.last30": "Last 30 days",
  "stats.focusHours": "Focus hours",
  "stats.bestDay": "Best day",
  "stats.activeDays": "Active days",
  "stats.newRecord.title": "🏆 New personal record!",
  "stats.newRecord.description": "{{count}} pomodoros today — your best day ever!",
  "stats.tooltip.streak": "Consecutive days with at least 1 pomodoro completed",
  "stats.tooltip.dailyAvg": "Average pomodoros per active day in the last 30 days",
  "stats.tooltip.monthTotal": "Total pomodoros completed in the last 30 days",
  "stats.tooltip.focusHours": "Estimated focus time based on 25 min per pomodoro",
  "stats.tooltip.bestDay": "Most pomodoros completed in a single day (last 30 days)",
  "stats.tooltip.activeDays": "Days with at least 1 pomodoro in the last 30 days",
  "stats.tooltip.heatmap": "Each square represents a day. Darker = more pomodoros",
  "history.tooltip": "Your pomodoro count for each of the last 7 days. Today is highlighted",

  // Install prompt
  "install.title": "Install Fluye on your device",
  "install.ios": "Tap Share → Add to Home Screen to use Fluye as an app",
  "install.android": "Install Fluye for quick access without a browser",
  "install.button": "Install",

  // PiP
  "pip.toggle": "Floating mini timer",
  "pip.noTasks": "No pending tasks",
  "pip.confirmComplete": "Mark task as completed?",
  "pip.confirm": "Yes",
  "pip.cancel": "No",

  // 404
  "notFound.title": "404",
  "notFound.message": "Oops! Page not found",
  "notFound.back": "Return to Home",
  "dayChanged.title": "🌅 New day!",
  "dayChanged.description": "Your pomodoro counter has been reset. Let's go!",

  // Deeplinks
  "help.deeplinks.title": "Quick Links (Raycast)",
  "help.deeplinks.desc": "Use these URLs as Quick Links in Raycast or any launcher:",
  "help.deeplinks.start": "Start timer",
  "help.deeplinks.phase": "View current phase",
  "help.deeplinks.setup": "Open settings",
  "help.deeplinks.feeling": "Set today's energy",
};

export default en;
