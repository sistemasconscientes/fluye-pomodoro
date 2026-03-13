import { useState } from "react";
import { getLastPeriod, getRegularity, setLastPeriod, setRegularity, getMenstruates, setMenstruates, type CycleRegularity } from "@/lib/storage";
import { getFeeling, setFeeling, type FeelingLevel } from "@/lib/feeling";
import RegularitySelector from "@/components/RegularitySelector";
import FeelingSelector from "@/components/FeelingSelector";

interface CycleSetupProps {
  onSave: () => void;
}

const CycleSetup = ({ onSave }: CycleSetupProps) => {
  const [isMenstruating, setIsMenstruating] = useState<boolean>(getMenstruates() ?? false);
  const [date, setDate] = useState(getLastPeriod() || "");
  const [regularity, setReg] = useState<CycleRegularity | null>(getRegularity());
  const [feeling, setFeel] = useState<FeelingLevel | null>(getFeeling());

  const handleSave = () => {
    setMenstruates(isMenstruating);
    if (isMenstruating) {
      if (!date) return;
      setLastPeriod(date);
      if (regularity) setRegularity(regularity);
    }
    if (feeling) setFeeling(feeling);
    onSave();
  };

  return (
    <div className="space-y-4">
      {/* Menstruating toggle */}
      <div className="rounded-2xl bg-secondary/50 p-5">
        <h2 className="font-display text-lg text-foreground">Configuración</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Personaliza tus recomendaciones de productividad
        </p>

        <div className="mb-4">
          <p className="text-sm font-medium text-foreground mb-2">¿Eres persona menstruante?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setIsMenstruating(true)}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                isMenstruating
                  ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/40"
              }`}
            >
              Sí
            </button>
            <button
              onClick={() => setIsMenstruating(false)}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                !isMenstruating
                  ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/40"
              }`}
            >
              No
            </button>
          </div>
        </div>

        {isMenstruating && (
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Fecha de última menstruación
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        )}
      </div>

      {isMenstruating && (
        <RegularitySelector
          selected={regularity}
          onSelect={(r) => setReg(r)}
        />
      )}

      <FeelingSelector
        selected={feeling}
        onSelect={(f) => setFeel(f)}
      />

      <button
        onClick={handleSave}
        disabled={isMenstruating && !date}
        className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        Guardar configuración
      </button>
    </div>
  );
};

export default CycleSetup;
