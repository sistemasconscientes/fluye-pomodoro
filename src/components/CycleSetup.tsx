import { useState } from "react";
import { getLastPeriod, getCycleLength, setLastPeriod, setCycleLength } from "@/lib/storage";
import { getEnergyType, setEnergyType, type EnergyType } from "@/lib/energy";
import EnergySelector from "@/components/EnergySelector";

interface CycleSetupProps {
  onSave: () => void;
}

const CycleSetup = ({ onSave }: CycleSetupProps) => {
  const [date, setDate] = useState(getLastPeriod() || "");
  const [length, setLength] = useState(getCycleLength());
  const [energy, setEnergy] = useState<EnergyType | null>(getEnergyType());

  const handleSave = () => {
    if (!date) return;
    setLastPeriod(date);
    setCycleLength(length);
    if (energy) setEnergyType(energy);
    onSave();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-secondary/50 p-5">
        <h2 className="font-display text-lg text-foreground">Configura tu ciclo</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Para personalizar tus pomodoros según tu energía
        </p>

        <div className="space-y-4">
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

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Duración del ciclo (días)
            </label>
            <input
              type="number"
              min={21}
              max={40}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      </div>

      <EnergySelector
        selected={energy}
        onSelect={(type) => setEnergy(type)}
      />

      <button
        onClick={handleSave}
        disabled={!date}
        className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        Guardar configuración
      </button>
    </div>
  );
};

export default CycleSetup;
