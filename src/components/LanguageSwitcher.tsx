import { useI18n, type Locale } from "@/lib/i18n";

const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();

  const toggle = () => {
    setLocale(locale === "es" ? "en" : "es");
  };

  return (
    <button
      onClick={toggle}
      className="flex h-10 items-center gap-1.5 rounded-full bg-secondary px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/80"
      aria-label="Switch language"
    >
      <span className="text-base">{locale === "es" ? "🇺🇸" : "🇲🇽"}</span>
      <span className="text-xs uppercase">{locale === "es" ? "EN" : "ES"}</span>
    </button>
  );
};

export default LanguageSwitcher;
