import type { CyclePhase } from "@/lib/cycle";

interface PhaseCardProps {
  phase: CyclePhase;
  completed: number;
  description?: string;
}

const PhaseCard = ({ phase, completed, description }: PhaseCardProps) => {
  const progressPercent = Math.min((completed / phase.recommendedPomodoros) * 100, 100);

  return (
    <div className="rounded-2xl bg-secondary/50 p-5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Pomodoros hoy</span>
        <span className="font-medium text-foreground">
          {completed} / {phase.recommendedPomodoros}
        </span>
      </div>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
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
  );
};

export default PhaseCard;
