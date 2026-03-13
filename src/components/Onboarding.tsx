import { useState } from "react";
import { Moon } from "lucide-react";
import { setLastPeriod, setRegularity, setMenstruates, type CycleRegularity } from "@/lib/storage";
import { setFeeling, type FeelingLevel } from "@/lib/feeling";
import RegularitySelector from "@/components/RegularitySelector";
import FeelingSelector from "@/components/FeelingSelector";

interface OnboardingProps {
  onComplete: () => void;
}

type Step = "welcome" | "cycle" | "feeling";

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState<Step>("welcome");
  const [isMenstruating, setIsMenstruating] = useState<boolean | null>(null);
  const [date, setDate] = useState("");
  const [regularity, setReg] = useState<CycleRegularity | null>(null);
  const [feeling, setFeel] = useState<FeelingLevel | null>(null);

  const handleStart = () => {
    if (isMenstruating) {
      setMenstruates(true);
      if (date) {
        setLastPeriod(date);
      } else {
        setLastPeriod(new Date().toISOString().split("T")[0]);
      }
      if (regularity) setRegularity(regularity);
    } else {
      setMenstruates(false);
    }
    if (feeling) setFeeling(feeling);
    localStorage.setItem("fluye_onboarded", "true");
    onComplete();
  };

  const handleSkip = () => {
    setMenstruates(false);
    setLastPeriod(new Date().toISOString().split("T")[0]);
    setRegularity("regular");
    localStorage.setItem("fluye_onboarded", "true");
    onComplete();
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 py-8">
      {step === "welcome" && (
        <div className="flex flex-col items-center text-center w-full">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15">
            <Moon size={36} className="text-primary" />
          </div>
          <h1 className="font-display text-3xl text-foreground">Fluye</h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
            Productividad que respeta tus ritmos naturales
          </p>

          <div className="mt-10 w-full space-y-3">
            <p className="text-sm font-medium text-foreground">
              ¿Eres persona menstruante?
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              Esto nos ayuda a personalizar tus recomendaciones de productividad
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsMenstruating(true);
                  setStep("cycle");
                }}
                className={`flex-1 rounded-xl border px-4 py-3.5 text-sm font-medium transition-all ${
                  isMenstruating === true
                    ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/40"
                }`}
              >
                Sí
              </button>
              <button
                onClick={() => {
                  setIsMenstruating(false);
                  setStep("feeling");
                }}
                className={`flex-1 rounded-xl border px-4 py-3.5 text-sm font-medium transition-all ${
                  isMenstruating === false
                    ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/40"
                }`}
              >
                No
              </button>
            </div>

            <button
              onClick={handleSkip}
              className="w-full rounded-xl border border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 mt-4"
            >
              Saltar (usar defaults)
            </button>
          </div>
        </div>
      )}

      {step === "cycle" && (
        <div className="w-full space-y-5">
          <button
            onClick={() => setStep("welcome")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Volver
          </button>

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

          <RegularitySelector
            selected={regularity}
            onSelect={(r) => setReg(r)}
          />

          <button
            onClick={() => setStep("feeling")}
            className="w-full rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Siguiente
          </button>
        </div>
      )}

      {step === "feeling" && (
        <div className="w-full space-y-5">
          <button
            onClick={() => setStep(isMenstruating ? "cycle" : "welcome")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Volver
          </button>

          <FeelingSelector
            selected={feeling}
            onSelect={(f) => setFeel(f)}
          />

          <button
            onClick={handleStart}
            className="w-full rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Empezar
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
