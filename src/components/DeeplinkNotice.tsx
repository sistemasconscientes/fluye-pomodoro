import { useState, useEffect } from "react";
import { Link2, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

type OS = "android" | "macos" | "windows" | "ios" | "linux" | "other";

function detectOS(): OS {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Mac/i.test(ua)) return "macos";
  if (/Win/i.test(ua)) return "windows";
  if (/Linux/i.test(ua)) return "linux";
  return "other";
}

const DeeplinkNotice = () => {
  const { t } = useI18n();
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem("fluye_deeplink_dismissed") === "true"
  );
  const [expanded, setExpanded] = useState(false);
  const [os, setOs] = useState<OS>("other");

  useEffect(() => {
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
    setOs(detectOS());
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("fluye_deeplink_dismissed", "true");
  };

  if (!isStandalone || dismissed || os === "ios") return null;

  const stepsKey = `deeplink.steps.${os}` as const;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="relative rounded-2xl border border-border bg-card/60 p-4 shadow-sm"
      >
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={t("common.dismiss")}
        >
          <X size={16} />
        </button>
        <div className="flex items-start gap-3 pr-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15">
            <Link2 size={18} className="text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{t("deeplink.title")}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{t("deeplink.subtitle")}</p>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              {t("deeplink.howTo")}
              <ChevronDown
                size={14}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
                    {t(stepsKey)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeeplinkNotice;