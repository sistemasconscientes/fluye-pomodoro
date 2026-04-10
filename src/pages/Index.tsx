import { useState, useCallback, useEffect, useRef } from "react";
import { Settings } from "lucide-react";
import { getFeeling, setFeeling, type FeelingLevel } from "@/lib/feeling";
import FeelingSelector from "@/components/FeelingSelector";
import { motion, AnimatePresence } from "framer-motion";
import CircularTimer from "@/components/CircularTimer";
import TimerControls from "@/components/TimerControls";

import PhaseCard from "@/components/PhaseCard";
import PhaseRecommendations from "@/components/PhaseRecommendations";
import CycleSetup from "@/components/CycleSetup";
import HelpSection from "@/components/HelpSection";
import Onboarding from "@/components/Onboarding";
import Footer from "@/components/Footer";
import TaskList from "@/components/TaskList";
import WeeklyHistory from "@/components/WeeklyHistory";
import MonthlyStats from "@/components/MonthlyStats";
import PomodoroCompleteDialog from "@/components/PomodoroCompleteDialog";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import InstallPrompt from "@/components/InstallPrompt";
import { useTimer } from "@/hooks/useTimer";
import { getCyclePhase, getDefaultPhase, type CyclePhase } from "@/lib/cycle";
import { getLastPeriod, getCycleLength, getCompletedPomodoros, incrementPomodoros, getMenstruates } from "@/lib/storage";
import { recordPomodoro, getPreviousBestDay } from "@/lib/history";
import { playCompletionSound } from "@/lib/sound";
import { useI18n, PHASE_KEY_MAP } from "@/lib/i18n";
import { toast } from "sonner";
import { toLocalDateStr } from "@/lib/utils";

const Index = () => {
  const { t } = useI18n();
  const [onboarded, setOnboarded] = useState(
    () => localStorage.getItem("fluye_onboarded") === "true"
  );
  const [showSetup, setShowSetup] = useState(false);
  const [completed, setCompleted] = useState(getCompletedPomodoros());
  const [phase, setPhase] = useState<CyclePhase>(getDefaultPhase());
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [historyKey, setHistoryKey] = useState(0);
  const [showFeelingDialog, setShowFeelingDialog] = useState(() => getFeeling() === null);
  const [currentFeeling, setCurrentFeeling] = useState<FeelingLevel | null>(getFeeling());

  const refreshPhase = useCallback(() => {
    const menstruates = getMenstruates();
    if (menstruates === false) {
      setPhase(getDefaultPhase());
      return;
    }
    const lastPeriod = getLastPeriod();
    const cycleLength = getCycleLength();
    if (lastPeriod) {
      setPhase(getCyclePhase(lastPeriod, cycleLength));
    } else {
      setPhase(getDefaultPhase());
    }
  }, []);

  const lastSeenDateRef = useRef(toLocalDateStr());

  useEffect(() => {
    refreshPhase();
    setCompleted(getCompletedPomodoros());

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        const today = toLocalDateStr();
        const dayChanged = lastSeenDateRef.current !== today;
        lastSeenDateRef.current = today;

        refreshPhase();
        setCompleted(getCompletedPomodoros());
        setHistoryKey((k) => k + 1);

        if (dayChanged) {
          toast(t("dayChanged.title"), {
            description: t("dayChanged.description"),
          });
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [refreshPhase, t]);

  const handleComplete = useCallback(() => {
    const previousBest = getPreviousBestDay();
    const newCount = incrementPomodoros();
    recordPomodoro();
    setCompleted(newCount);
    setShowCompleteDialog(true);
    setHistoryKey((k) => k + 1);
    playCompletionSound();

    if (previousBest > 0 && newCount > previousBest) {
      setTimeout(() => {
        toast(t("stats.newRecord.title"), {
          description: t("stats.newRecord.description", { count: newCount }),
          duration: 5000,
        });
      }, 500);
    }
  }, [t]);

  const notificationTexts = {
    workCompleteTitle: t("notification.workComplete.title"),
    workCompleteBody: t("notification.workComplete.body"),
    breakCompleteTitle: t("notification.breakComplete.title"),
    breakCompleteBody: t("notification.breakComplete.body"),
  };

  const { timeLeft, totalTime, isRunning, mode, play, pause, reset, skipBreak } = useTimer(handleComplete, notificationTexts);

  if (!onboarded) {
    return (
      <Onboarding
        onComplete={() => {
          setOnboarded(true);
          refreshPhase();
        }}
      />
    );
  }

  // Get translated phase name and description
  const phaseKey = PHASE_KEY_MAP[phase.name];
  const phaseName = phaseKey ? t(`phase.${phaseKey}`) : phase.name;
  const phaseDesc = phaseKey ? t(`phase.${phaseKey}.desc`) : phase.description;

  const pomodoroDesc = t(`pomodoro.desc.${phase.recommendedPomodoros}`, {}) !== `pomodoro.desc.${phase.recommendedPomodoros}`
    ? t(`pomodoro.desc.${phase.recommendedPomodoros}`)
    : t("pomodoro.desc.default");

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏊‍♀️</span>
          <h1 className="font-display text-2xl text-foreground">{t("app.name")}</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            onClick={() => setShowSetup(!showSetup)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80"
            aria-label={t("setup.title")}
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Setup panel */}
      <AnimatePresence>
        {showSetup && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-5 overflow-hidden"
          >
            <CycleSetup
              onSave={() => {
                refreshPhase();
                setShowSetup(false);
                toast(t("setup.saved"));
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: two-panel layout / Mobile: stacked */}
      <div className="mt-5 flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
        {/* Left panel: Timer + Tasks */}
        <div className="flex flex-col items-center gap-6">
          {/* Phase banner (mobile & desktop) */}
          {phase.dayInCycle > 0 ? (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full flex items-center gap-3 rounded-2xl bg-accent/15 px-5 py-4"
            >
              <span className="text-3xl">{phase.emoji}</span>
              <div>
                <h2 className="font-display text-xl text-foreground">{phaseName}</h2>
                <p className="text-sm text-muted-foreground">
                  {t("phase.dayLabel", { day: phase.dayInCycle })} · {phaseDesc}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="w-full flex items-center gap-3 rounded-2xl bg-secondary/50 px-5 py-4">
              <span className="text-3xl">{phase.emoji}</span>
              <div>
                <h2 className="font-display text-xl text-foreground">{phaseName}</h2>
                <p className="text-sm text-muted-foreground">{phaseDesc}</p>
              </div>
            </div>
          )}

          <CircularTimer timeLeft={timeLeft} totalTime={totalTime} isRunning={isRunning} mode={mode} />
          <TimerControls isRunning={isRunning} mode={mode} onPlay={play} onPause={pause} onReset={reset} onSkipBreak={skipBreak} />

          <div className="w-full">
            <TaskList />
          </div>
        </div>

        {/* Right panel: Progress + Recommendations + History + Help */}
        <div className="flex flex-col gap-5">
          <PhaseCard phase={phase} completed={completed} description={pomodoroDesc} />

          <PhaseRecommendations phase={phase} />

          <motion.div key={historyKey} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <WeeklyHistory />
          </motion.div>

          <MonthlyStats />

          <HelpSection />
        </div>
      </div>

      <Footer />

      <PomodoroCompleteDialog
        open={showCompleteDialog}
        onClose={() => {
          setShowCompleteDialog(false);
          setCompleted(getCompletedPomodoros());
        }}
        completed={completed}
        recommended={phase.recommendedPomodoros}
      />

      <InstallPrompt />
    </div>
  );
};

export default Index;
