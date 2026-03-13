import type { CycleRegularity } from "@/lib/storage";
import { useI18n, getRegularityOptionsTranslated } from "@/lib/i18n";

interface RegularitySelectorProps {
  selected: CycleRegularity | null;
  onSelect: (regularity: CycleRegularity) => void;
}

const RegularitySelector = ({ selected, onSelect }: RegularitySelectorProps) => {
  const { t } = useI18n();
  const options = getRegularityOptionsTranslated(t);

  return (
    <div className="rounded-2xl bg-secondary/50 p-5">
      <h2 className="font-display text-lg text-foreground">
        {t("regularity.title")}
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">
        {t("regularity.subtitle")}
      </p>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
              selected === option.value
                ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                : "border-border bg-background hover:border-primary/40"
            }`}
          >
            <span className="text-2xl">{option.emoji}</span>
            <div>
              <span className="text-sm font-medium text-foreground">
                {option.label}
              </span>
              <p className="text-xs text-muted-foreground">
                {option.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegularitySelector;
