import { type FeelingLevel } from "@/lib/feeling";
import { useI18n, getFeelingOptionsTranslated } from "@/lib/i18n";

interface FeelingSelectorProps {
  selected: FeelingLevel | null;
  onSelect: (level: FeelingLevel) => void;
}

const FeelingSelector = ({ selected, onSelect }: FeelingSelectorProps) => {
  const { t } = useI18n();
  const options = getFeelingOptionsTranslated(t);

  return (
    <div className="rounded-2xl bg-secondary/50 p-5">
      <h2 className="font-display text-lg text-foreground">
        {t("feeling.title")}
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">
        {t("feeling.subtitle")}
      </p>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.level}
            onClick={() => onSelect(option.level)}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
              selected === option.level
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

export default FeelingSelector;
