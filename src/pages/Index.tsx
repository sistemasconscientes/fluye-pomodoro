import { useState, useCallback, useEffect } from "react";
import { Settings } from "lucide-react";
import CircularTimer from "@/components/CircularTimer";
import TimerControls from "@/components/TimerControls";
import PhaseCard from "@/components/PhaseCard";
import PhaseRecommendations from "@/components/PhaseRecommendations";
import CycleSetup from "@/components/CycleSetup";
import HelpSection from "@/components/HelpSection";
import Onboarding from "@/components/Onboarding";
import TaskList from "@/components/TaskList";
import PomodoroCompleteDialog from "@/components/PomodoroCompleteDialog";
import { useTimer } from "@/hooks/useTimer";
import { getCyclePhase, getDefaultPhase, type CyclePhase } from "@/lib/cycle";
import { getLastPeriod, getCycleLength, getCompletedPomodoros, incrementPomodoros } from "@/lib/storage";
import { toast } from "sonner";

const POMODORO_DESCRIPTIONS: Record<number, string> = {
  4: "Tu cuerpo necesita descanso. Menos sesiones, más cuidado.",
  6: "Energía moderada. Avanza sin forzar.",
  8: "Buen balance entre productividad y descanso.",
  10: "Estás en tu pico de energía. ¡Aprovecha al máximo!",
};

const Index = () => {
  const [onboarded, setOnboarded] = useState(
    () => localStorage.getItem("fluye_onboarded") === "true"
  );
  const [showSetup, setShowSetup] = useState(false);
  const [completed, setCompleted] = useState(getCompletedPomodoros());
  const [phase, setPhase] = useState<CyclePhase>(getDefaultPhase());
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);

  const refreshPhase = useCallback(() => {
    const lastPeriod = getLastPeriod();
    const cycleLength = getCycleLength();
    if (lastPeriod) {
      setPhase(getCyclePhase(lastPeriod, cycleLength));
    } else {
      setPhase(getDefaultPhase());
    }
  }, []);

  useEffect(() => {
    refreshPhase();
    setCompleted(getCompletedPomodoros());
  }, [refreshPhase]);

  const handleComplete = useCallback(() => {
    const newCount = incrementPomodoros();
    setCompleted(newCount);
    setShowCompleteDialog(true);
  }, []);

  const { timeLeft, totalTime, isRunning, play, pause, reset } = useTimer(handleComplete);

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

  const pomodoroDesc = POMODORO_DESCRIPTIONS[phase.recommendedPomodoros] || "Ajusta tu ritmo según cómo te sientas.";

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏊‍♀️</span>
          <h1 className="font-display text-2xl text-foreground">Fluye</h1>
        </div>
        <button
          onClick={() => setShowSetup(!showSetup)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80"
          aria-label="Configuración"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Setup panel */}
      {showSetup && (
        <div className="mt-5">
          <CycleSetup
            onSave={() => {
              refreshPhase();
              setShowSetup(false);
              toast("✅ Configuración guardada");
            }}
          />
        </div>
      )}

      {/* Phase + Pomodoros — two columns */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phase indicator */}
        {phase.dayInCycle > 0 ? (
          <div className="flex items-center gap-3 rounded-2xl bg-accent/15 px-5 py-4">
            <span className="text-3xl">{phase.emoji}</span>
            <div>
              <h2 className="font-display text-xl text-foreground">{phase.name}</h2>
              <p className="text-sm text-muted-foreground">
                Día {phase.dayInCycle} · {phase.description}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl bg-secondary/50 px-5 py-4">
            <span className="text-3xl">{phase.emoji}</span>
            <div>
              <h2 className="font-display text-xl text-foreground">{phase.name}</h2>
              <p className="text-sm text-muted-foreground">{phase.description}</p>
            </div>
          </div>
        )}

        {/* Pomodoro progress */}
        <PhaseCard phase={phase} completed={completed} description={pomodoroDesc} />
      </div>

      {/* Three-column layout: Timer + Tasks + Recommendations */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* Timer column */}
        <div className="flex flex-col items-center justify-center gap-8">
          <CircularTimer timeLeft={timeLeft} totalTime={totalTime} isRunning={isRunning} />
          <TimerControls
            isRunning={isRunning}
            onPlay={play}
            onPause={pause}
            onReset={reset}
          />
        </div>

        {/* Tasks column */}
        <div className="flex flex-col">
          <TaskList />
        </div>

        {/* Recommendations column */}
        <div className="flex flex-col justify-center">
          <PhaseRecommendations phase={phase} />
        </div>
      </div>

      {/* Help section — always visible at bottom */}
      <div className="mt-10">
        <HelpSection />
      </div>

      {/* Completion dialog */}
      <PomodoroCompleteDialog
        open={showCompleteDialog}
        onClose={() => setShowCompleteDialog(false)}
        completed={completed}
        recommended={phase.recommendedPomodoros}
      />
    </div>
  );
};

export default Index;
