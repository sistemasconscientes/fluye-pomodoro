import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { motion } from "framer-motion";
import type { TimerMode } from "@/hooks/useTimer";
import { useI18n } from "@/lib/i18n";

interface TimerControlsProps {
  isRunning: boolean;
  mode: TimerMode;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkipBreak: () => void;
}

const TimerControls = ({ isRunning, mode, onPlay, onPause, onReset, onSkipBreak }: TimerControlsProps) => {
  const { t } = useI18n();
  const isBreak = mode !== "work";

  return (
    <div className="flex flex-col items-center gap-3">
      {isBreak && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-accent"
        >
          {mode === "longBreak" ? t("timer.longBreakLabel") : t("timer.shortBreakLabel")}
        </motion.p>
      )}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={onReset}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80"
          aria-label="Reset"
        >
          <RotateCcw size={20} />
        </button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={isRunning ? onPause : onPlay}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
          aria-label={isRunning ? "Pause" : "Play"}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </motion.button>
        {isBreak ? (
          <button
            onClick={onSkipBreak}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80"
            aria-label="Skip break"
          >
            <SkipForward size={20} />
          </button>
        ) : (
          <div className="h-12 w-12" />
        )}
      </div>
    </div>
  );
};

export default TimerControls;
