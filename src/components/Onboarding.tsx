import { useState } from "react";
import { Moon } from "lucide-react";
import { setLastPeriod, setCycleLength } from "@/lib/storage";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [date, setDate] = useState("");
  const [length, setLength] = useState(28);

  const handleStart = () => {
    if (date) {
      setLastPeriod(date);
    } else {
      setLastPeriod(new Date().toISOString().split("T")[0]);
    }
    setCycleLength(length);
    localStorage.setItem("fluye_onboarded", "true");
    onComplete();
  };

  const handleSkip = () => {
    setLastPeriod(new Date().toISOString().split("T")[0]);
    setCycleLength(28);
    localStorage.setItem("fluye_onboarded", "true");
    onComplete();
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 py-8">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15">
          <Moon size={36} className="text-primary" />
        </div>
        <h1 className="font-display text-3xl text-foreground">Fluye</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
          Productividad que respeta tus ritmos naturales
        </p>
      </div>

      <div className="mt-10 w-full space-y-5">
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

        <button
          onClick={handleStart}
          className="w-full rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Empezar
        </button>

        <button
          onClick={handleSkip}
          className="w-full rounded-xl border border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50"
        >
          Saltar (usar defaults)
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
