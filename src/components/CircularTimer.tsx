import { useMemo } from "react";
import { motion } from "framer-motion";
import type { TimerMode } from "@/hooks/useTimer";
import { useI18n } from "@/lib/i18n";

interface CircularTimerProps {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  mode: TimerMode;
}

const CircularTimer = ({ timeLeft, totalTime, isRunning, mode }: CircularTimerProps) => {
  const { t } = useI18n();
  const size = 280;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = useMemo(() => {
    if (totalTime === 0) return 0;
    return ((totalTime - timeLeft) / totalTime) * circumference;
  }, [timeLeft, totalTime, circumference]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isBreak = mode !== "work";
  const strokeColor = isBreak ? "hsl(var(--accent))" : "hsl(var(--primary))";

  const statusText = isBreak
    ? mode === "longBreak"
      ? t("timer.longBreak")
      : t("timer.shortBreak")
    : isRunning
    ? t("timer.focusing")
    : t("timer.ready");

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative flex items-center justify-center"
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--secondary))" strokeWidth={strokeWidth} strokeLinecap="round" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - progress} className="transition-all duration-1000 ease-linear" />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`font-display text-6xl tracking-tight text-foreground ${isRunning ? "animate-pulse-soft" : ""}`}>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
        <span className="mt-1 text-sm font-light text-muted-foreground">
          {statusText}
        </span>
      </div>
    </motion.div>
  );
};

export default CircularTimer;
