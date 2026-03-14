import { useI18n, type Locale } from "@/lib/i18n";

const localeOrder: Locale[] = ["es", "en", "pt"];
const localeLabels: Record<Locale, { flag: string; label: string }> = {
  es: { flag: "🇲🇽", label: "ES" },
  en: { flag: "🇺🇸", label: "EN" },
  pt: { flag: "🇧🇷", label: "PT" },
};

const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();

  const toggle = () => {
    const idx = localeOrder.indexOf(locale);
    setLocale(localeOrder[(idx + 1) % localeOrder.length]);
  };

  const next = localeOrder[(localeOrder.indexOf(locale) + 1) % localeOrder.length];
  const { flag, label } = localeLabels[next];

  return (
    <button
      onClick={toggle}
      className="flex h-10 items-center gap-1.5 rounded-full bg-secondary px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/80"
      aria-label="Switch language"
    >
      <span className="text-base">{flag}</span>
      <span className="text-xs uppercase">{next}</span>
    </button>
  );
};

export default LanguageSwitcher;
