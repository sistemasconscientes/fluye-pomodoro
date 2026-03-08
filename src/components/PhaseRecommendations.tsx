import type { CyclePhase } from "@/lib/cycle";
import { getPhaseRecommendation } from "@/lib/recommendations";
import { Lightbulb } from "lucide-react";

interface PhaseRecommendationsProps {
  phase: CyclePhase;
}

const PhaseRecommendations = ({ phase }: PhaseRecommendationsProps) => {
  const rec = getPhaseRecommendation(phase);

  return (
    <div className={`rounded-2xl p-5 ${rec.bgClass}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{phase.emoji}</span>
        <div>
          <h3 className="font-display text-lg text-foreground">{phase.name}</h3>
          {phase.dayInCycle > 0 && (
            <span className="text-xs text-muted-foreground">Día {phase.dayInCycle}</span>
          )}
        </div>
      </div>

      <p className="text-sm text-foreground/80 italic leading-relaxed mb-4">
        "{rec.phrase}"
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <Lightbulb size={14} />
          <span>Ideal para hoy</span>
        </div>
        {rec.tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-foreground/70">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseRecommendations;
