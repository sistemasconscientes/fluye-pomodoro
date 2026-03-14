import { useI18n } from "@/lib/i18n";

const steps = [
  { num: 1, emoji: "🎚️" },
  { num: 2, emoji: "⚙️" },
  { num: 3, emoji: "▶️" },
  { num: 4, emoji: "📊" },
];

const HelpSection = () => {
  const { t } = useI18n();

  return (
    <div className="rounded-2xl bg-secondary/40 p-6 space-y-6">
      {/* Title + intro */}
      <div>
        <h2 className="font-display text-lg text-foreground">{t("help.title")}</h2>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
          {t("help.intro")}
        </p>
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
    </div>
  );
};

export default HelpSection;
