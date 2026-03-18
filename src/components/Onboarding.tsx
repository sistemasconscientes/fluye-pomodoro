import { useState } from "react";
import { Moon, HelpCircle, X } from "lucide-react";
import { setLastPeriod, setRegularity, setMenstruates, type CycleRegularity } from "@/lib/storage";
import { toLocalDateStr } from "@/lib/utils";
import { setFeeling, type FeelingLevel } from "@/lib/feeling";
import { useI18n } from "@/lib/i18n";
import RegularitySelector from "@/components/RegularitySelector";
import FeelingSelector from "@/components/FeelingSelector";
import HelpSection from "@/components/HelpSection";

interface OnboardingProps {
  onComplete: () => void;
}

type Step = "welcome" | "cycle" | "feeling";

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const { t } = useI18n();
  const [step, setStep] = useState<Step>("welcome");
  const [isMenstruating, setIsMenstruating] = useState<boolean | null>(null);
  const [date, setDate] = useState("");
  const [regularity, setReg] = useState<CycleRegularity | null>(null);
  const [feeling, setFeel] = useState<FeelingLevel | null>(null);
  const [showHelp, setShowHelp] = useState(true);

  const handleStart = () => {
    if (isMenstruating) {
      setMenstruates(true);
      if (date) {
        setLastPeriod(date);
      } else {
        setLastPeriod(toLocalDateStr());
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
    setLastPeriod(toLocalDateStr());
    setRegularity("regular");
    localStorage.setItem("fluye_onboarded", "true");
    onComplete();
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 py-8 relative">
      <button
        onClick={() => setShowHelp(!showHelp)}
        className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80"
        aria-label={t("onboarding.helpLabel")}
      >
        {showHelp ? <X size={18} /> : <HelpCircle size={18} />}
      </button>

      {showHelp ? (
        <div className="w-full animate-in fade-in slide-in-from-top-2 duration-200">
          <HelpSection />
        </div>
      ) : (
        <>
          {step === "welcome" && (
            <div className="flex flex-col items-center text-center w-full">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15">
                <Moon size={36} className="text-primary" />
              </div>
              <h1 className="font-display text-3xl text-foreground">{t("app.name")}</h1>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
                {t("app.tagline")}
              </p>

              <div className="mt-10 w-full space-y-3">
                <p className="text-sm font-medium text-foreground">
                  {t("onboarding.question.menstruating")}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {t("onboarding.question.menstruating.desc")}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setIsMenstruating(true); setStep("cycle"); }}
                    className={`flex-1 rounded-xl border px-4 py-3.5 text-sm font-medium transition-all ${
                      isMenstruating === true
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    {t("onboarding.yes")}
                  </button>
                  <button
                    onClick={() => { setIsMenstruating(false); setStep("feeling"); }}
                    className={`flex-1 rounded-xl border px-4 py-3.5 text-sm font-medium transition-all ${
                      isMenstruating === false
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    {t("onboarding.no")}
                  </button>
                </div>

                <button
                  onClick={handleSkip}
                  className="w-full rounded-xl border border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 mt-4"
                >
                  {t("onboarding.skip")}
                </button>
              </div>
            </div>
          )}

          {step === "cycle" && (
            <div className="w-full space-y-5">
              <button onClick={() => setStep("welcome")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("onboarding.back")}
              </button>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  {t("onboarding.lastPeriod")}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <RegularitySelector selected={regularity} onSelect={(r) => setReg(r)} />
              <button
                onClick={() => setStep("feeling")}
                className="w-full rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("onboarding.next")}
              </button>
            </div>
          )}

          {step === "feeling" && (
            <div className="w-full space-y-5">
              <button
                onClick={() => setStep(isMenstruating ? "cycle" : "welcome")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("onboarding.back")}
              </button>
              <FeelingSelector selected={feeling} onSelect={(f) => setFeel(f)} />
              <button
                onClick={handleStart}
                className="w-full rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("onboarding.start")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Onboarding;
