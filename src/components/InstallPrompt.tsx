import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPrompt = () => {
  const { t } = useI18n();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem("fluye_install_dismissed") === "true"
  );
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Already installed as PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsStandalone(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("fluye_install_dismissed", "true");
  };

  // Don't show if already installed, dismissed, or no prompt available (iOS doesn't fire beforeinstallprompt)
  // On iOS, show manual instructions
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const showBanner = !isStandalone && !dismissed && (deferredPrompt || isIOS);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-border bg-card p-4 shadow-lg"
        >
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <Download size={20} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{t("install.title")}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {isIOS ? t("install.ios") : t("install.android")}
              </p>
              {deferredPrompt && (
                <button
                  onClick={handleInstall}
                  className="mt-2 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t("install.button")}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPrompt;
