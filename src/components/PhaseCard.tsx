import type { CyclePhase } from "@/lib/cycle";

interface PhaseCardProps {
  phase: CyclePhase;
  completed: number;
}

const PhaseCard = ({ phase, completed }: PhaseCardProps) => {
  const progressPercent = Math.min((completed / phase.recommendedPomodoros) * 100, 100);

  return (
    <div className="rounded-2xl bg-secondary/50 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{phase.emoji}</span>
          <div>
            <h2 className="font-display text-lg text-foreground">{phase.name}</h2>
            <p className="text-sm text-muted-foreground">{phase.description}</p>
          </div>
        </div>
        {phase.dayInCycle > 0 && (
          <span className="text-xs font-medium text-muted-foreground">
            Día {phase.dayInCycle}
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Pomodoros hoy</span>
          <span className="font-medium text-foreground">
            {completed} / {phase.recommendedPomodoros}
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {phase.daysRemaining > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            {phase.daysRemaining} día{phase.daysRemaining > 1 ? "s" : ""} restante{phase.daysRemaining > 1 ? "s" : ""} en esta fase
          </p>
        )}
      </div>
    </div>
  );
};

export default PhaseCard;
