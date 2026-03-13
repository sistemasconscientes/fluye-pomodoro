import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="mt-12 border-t border-border py-6 text-center">
      <p className="text-xs text-muted-foreground">
        {t("footer.createdBy")}{" "}
        <a
          href="https://sistemasconscientes.com?ref=fluye"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline underline-offset-2 transition-colors hover:text-primary"
        >
          Laboratorio de Sistemas Conscientes
        </a>
      </p>
      <div className="mt-2 flex items-center justify-center gap-3 text-xs text-muted-foreground flex-wrap">
        <Link to="/features" className="underline underline-offset-2 transition-colors hover:text-primary">
          {t("footer.suggestImprovements")}
        </Link>
        <span>·</span>
        <a href="https://github.com/sistemasconscientes/fluye-pomodoro" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors hover:text-primary">
          {t("footer.forkGithub")}
        </a>
        <span>·</span>
        <a href="https://donate.stripe.com/4gMeVd0yzeBv7yt6Eufw400" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors hover:text-primary">
          {t("footer.buyCoffee")}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
