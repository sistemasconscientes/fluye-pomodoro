import { ENERGY_OPTIONS, type EnergyType } from "@/lib/energy";

interface EnergySelectorProps {
  selected: EnergyType | null;
  onSelect: (type: EnergyType) => void;
}

const EnergySelector = ({ selected, onSelect }: EnergySelectorProps) => {
  return (
    <div className="rounded-2xl bg-secondary/50 p-5">
      <h2 className="font-display text-lg text-foreground">
        ¿Qué tipo de energía sientes hoy?
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Esto nos ayuda a ajustar tus recomendaciones
      </p>
      <div className="space-y-2">
        {ENERGY_OPTIONS.map((option) => (
          <button
            key={option.type}
            onClick={() => onSelect(option.type)}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
              selected === option.type
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

export default EnergySelector;
