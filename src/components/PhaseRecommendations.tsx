import type { CyclePhase } from "@/lib/cycle";
import { getPhaseRecommendation } from "@/lib/recommendations";
import { Lightbulb, Apple } from "lucide-react";

interface PhaseRecommendationsProps {
  phase: CyclePhase;
}

const PhaseRecommendations = ({ phase }: PhaseRecommendationsProps) => {
  const rec = getPhaseRecommendation(phase);

  return (
    <div className={`rounded-2xl p-5 ${rec.bgClass}`}>
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

      {rec.nutritionTips.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <Apple size={14} />
            <span>Nutrición recomendada</span>
          </div>
          {rec.nutritionTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-foreground/70">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhaseRecommendations;
