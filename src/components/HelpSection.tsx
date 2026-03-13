import { useI18n } from "@/lib/i18n";

const HelpSection = () => {
  const { t } = useI18n();

  return (
    <div className="rounded-2xl bg-secondary/50 p-5">
      <h2 className="font-display text-lg text-foreground mb-4">{t("help.title")}</h2>

      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground mb-1.5">{t("help.pomodoro.title")}</h3>
        <p
          className="text-sm text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t("help.pomodoro.desc").replace(/<strong>/g, '<strong class="text-foreground">') }}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="text-foreground font-medium">{t("help.pomodoro.why")}</span>{" "}
          {t("help.pomodoro.whyDesc")}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">{t("help.howTo.title")}</h3>
      </div>

      <div className="space-y-3 text-sm text-muted-foreground">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="flex gap-3">
            <span className="text-lg">{["1️⃣", "2️⃣", "3️⃣", "4️⃣"][n - 1]}</span>
            <p>
              <strong className="text-foreground">{t(`help.step${n}.title`)}</strong>{" "}
              {t(`help.step${n}.desc`)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-accent/10 p-3">
        <p className="text-xs text-foreground/80">
          <strong>Pro tip:</strong> {t("help.proTip")}
        </p>
      </div>
    </div>
  );
};

export default HelpSection;
