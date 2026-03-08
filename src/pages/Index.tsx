import { useState, useCallback, useEffect } from "react";
import { Settings } from "lucide-react";
import CircularTimer from "@/components/CircularTimer";
import TimerControls from "@/components/TimerControls";
import PhaseCard from "@/components/PhaseCard";
import PhaseRecommendations from "@/components/PhaseRecommendations";
import CycleSetup from "@/components/CycleSetup";
import HelpSection from "@/components/HelpSection";
import Onboarding from "@/components/Onboarding";
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
    toast("🍅 ¡Pomodoro completado!", {
      description: `Llevas ${newCount} de ${phase.recommendedPomodoros} hoy`,
    });
  }, [phase.recommendedPomodoros]);

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
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-5 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏊‍♀️</span>
          <h1 className="font-display text-2xl text-foreground">Fluye</h1>
        </div>
        <div className="flex items-center gap-2">
          <HelpSection />
          <button
            onClick={() => setShowSetup(!showSetup)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80"
            aria-label="Configuración"
          >
            <Settings size={18} />
          </button>
        </div>
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

      {/* Progress bar — full width above columns */}
      <div className="mt-6">
        <PhaseCard phase={phase} completed={completed} description={pomodoroDesc} />
      </div>

      {/* Two-column layout: Timer + Recommendations */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
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

        {/* Recommendations column */}
        <div className="flex flex-col justify-center">
          <PhaseRecommendations phase={phase} />
        </div>
      </div>
    </div>
  );
};

export default Index;
