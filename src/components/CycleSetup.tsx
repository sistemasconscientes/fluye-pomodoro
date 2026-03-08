import { useState } from "react";
import { getLastPeriod, setLastPeriod } from "@/lib/storage";

interface CycleSetupProps {
  onSave: () => void;
}

const CycleSetup = ({ onSave }: CycleSetupProps) => {
  const [date, setDate] = useState(getLastPeriod() || "");

  const handleSave = () => {
    if (!date) return;
    setLastPeriod(date);
    onSave();
  };

  return (
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

        <button
          onClick={handleSave}
          disabled={!date}
          className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default CycleSetup;
