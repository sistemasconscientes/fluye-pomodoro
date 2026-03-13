import type { CyclePhase } from "@/lib/cycle";
import { useI18n, PHASE_KEY_MAP } from "@/lib/i18n";
import { Lightbulb, Apple } from "lucide-react";

const PHASE_BG: Record<string, string> = {
  menstruation: "bg-[hsl(14,67%,62%,0.12)]",
  follicular: "bg-[hsl(100,19%,61%,0.15)]",
  ovulation: "bg-[hsl(40,80%,65%,0.15)]",
  earlyLuteal: "bg-[hsl(30,50%,60%,0.15)]",
  midLuteal: "bg-[hsl(35,40%,55%,0.12)]",
  lateLuteal: "bg-[hsl(25,30%,60%,0.12)]",
  noData: "bg-secondary/50",
  yourRhythm: "bg-secondary/50",
};

interface PhaseRecommendationsProps {
  phase: CyclePhase;
}

const PhaseRecommendations = ({ phase }: PhaseRecommendationsProps) => {
  const { t } = useI18n();
  const key = PHASE_KEY_MAP[phase.name] || "noData";
  const bgClass = PHASE_BG[key] || "bg-secondary/50";

  const phrase = t(`rec.${key}.phrase`);
  const tips = [t(`rec.${key}.tip1`), t(`rec.${key}.tip2`), t(`rec.${key}.tip3`)];

  // Nutrition tips (luteal phases share the same, noData/yourRhythm have none)
  const hasNutrition = !["noData", "yourRhythm"].includes(key);
  const nutritionTips = hasNutrition
    ? [t(`rec.${key}.nut1`), t(`rec.${key}.nut2`), t(`rec.${key}.nut3`)]
    : [];

  // For mid/late luteal, reuse early luteal nutrition
  const finalNutritionTips = ["midLuteal", "lateLuteal"].includes(key)
    ? [t("rec.earlyLuteal.nut1"), t("rec.earlyLuteal.nut2"), t("rec.earlyLuteal.nut3")]
    : nutritionTips;

  return (
    <div className={`rounded-2xl p-5 ${bgClass}`}>
      <p className="text-sm text-foreground/80 italic leading-relaxed mb-4">
        "{phrase}"
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <Lightbulb size={14} />
          <span>{t("rec.idealToday")}</span>
        </div>
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-foreground/70">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
            <span>{tip}</span>
          </div>
        ))}
      </div>

      {finalNutritionTips.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <Apple size={14} />
            <span>{t("rec.nutrition")}</span>
          </div>
          {finalNutritionTips.map((tip, i) => (
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
