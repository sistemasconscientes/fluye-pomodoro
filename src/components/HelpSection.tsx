import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { getWeeklyHistory } from "@/lib/history";

const steps = [
  { num: 1, emoji: "🎚️" },
  { num: 2, emoji: "⚙️" },
  { num: 3, emoji: "▶️" },
  { num: 4, emoji: "📊" },
];

function hasCompletedAnyPomodoro(): boolean {
  const history = getWeeklyHistory();
  return history.some((d) => d.count > 0);
}

const HelpSection = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(() => !hasCompletedAnyPomodoro());

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
      >
        <HelpCircle size={16} />
        <span>{t("help.showGuide")}</span>
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-secondary/40 p-6 space-y-6"
    >
      {/* Header with close */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-display text-lg text-foreground">{t("help.title")}</h2>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
            {t("help.intro")}
          </p>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-4 mt-1"
        >
          <ChevronDown size={14} className="rotate-180" />
          <span>{t("help.hideGuide")}</span>
        </button>
      </div>

      {/* What is a pomodoro */}
      <div className="rounded-xl bg-background/60 p-4 space-y-2">
        <h3 className="text-sm font-semibold text-foreground">{t("help.pomodoro.title")}</h3>
        <p
          className="text-sm text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: t("help.pomodoro.desc").replace(
              /<strong>/g,
              '<strong class="text-foreground font-medium">'
            ),
          }}
        />
        <p className="text-xs text-muted-foreground pt-1">
          <span className="text-foreground font-medium">{t("help.pomodoro.why")}</span>{" "}
          {t("help.pomodoro.whyDesc")}
        </p>
      </div>

      {/* Step by step */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">{t("help.howTo.title")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {steps.map(({ num, emoji }) => (
            <div
              key={num}
              className="flex gap-3 rounded-xl bg-background/60 p-3.5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-base">
                {emoji}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug">
                  {t(`help.step${num}.title`)}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                  {t(`help.step${num}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro tip */}
      <div className="rounded-xl bg-accent/10 border border-accent/20 p-4">
        <p className="text-xs text-foreground/80 leading-relaxed">
          {t("help.proTip")}
        </p>
      </div>

      {/* Deeplinks / Raycast */}
      <div className="rounded-xl bg-background/60 p-4 space-y-2">
        <h3 className="text-sm font-semibold text-foreground">{t("help.deeplinks.title")}</h3>
        <p className="text-xs text-muted-foreground">{t("help.deeplinks.desc")}</p>
        <div className="grid gap-1.5 mt-2">
          {[
            { path: "/start", label: t("help.deeplinks.start") },
            { path: "/phase", label: t("help.deeplinks.phase") },
            { path: "/setup", label: t("help.deeplinks.setup") },
            { path: "/feeling", label: t("help.deeplinks.feeling") },
          ].map(({ path, label }) => (
            <div key={path} className="flex items-center gap-2 text-xs">
              <code className="rounded bg-secondary px-2 py-0.5 text-foreground font-mono select-all">
                {window.location.origin}{path}
              </code>
              <span className="text-muted-foreground">— {label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HelpSection;
