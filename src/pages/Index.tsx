import { useState, useCallback, useEffect } from "react";
import { Settings } from "lucide-react";
import CircularTimer from "@/components/CircularTimer";
import TimerControls from "@/components/TimerControls";
import PhaseCard from "@/components/PhaseCard";
import CycleSetup from "@/components/CycleSetup";
import { useTimer } from "@/hooks/useTimer";
import { getCyclePhase, getDefaultPhase, type CyclePhase } from "@/lib/cycle";
import { getLastPeriod, getCycleLength, getCompletedPomodoros, incrementPomodoros } from "@/lib/storage";
import { toast } from "sonner";

const Index = () => {
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

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-foreground">Fluye</h1>
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
              toast("✅ Ciclo actualizado");
            }}
          />
        </div>
      )}

      {/* Timer */}
      <div className="mt-8 flex flex-1 flex-col items-center justify-center gap-8">
        <CircularTimer timeLeft={timeLeft} totalTime={totalTime} isRunning={isRunning} />
        <TimerControls
          isRunning={isRunning}
          onPlay={play}
          onPause={pause}
          onReset={reset}
        />
      </div>

      {/* Phase info */}
      <div className="mt-8">
        <PhaseCard phase={phase} completed={completed} />
      </div>
    </div>
  );
};

export default Index;
