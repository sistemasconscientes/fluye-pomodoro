import { useState, useCallback } from "react";
import { Play, Pause, PictureInPicture2, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

interface PipTimerProps {
  timeLeft: number;
  isRunning: boolean;
  onPlay: () => void;
  onPause: () => void;
  tasks: Task[];
  onToggleTask: (id: string) => void;
}

/** Floating mini-timer overlay */
const FloatingMini = ({
  timeLeft,
  isRunning,
  onPlay,
  onPause,
  onClose,
}: {
  timeLeft: number;
  isRunning: boolean;
  onPlay: () => void;
  onPause: () => void;
  onClose: () => void;
}) => {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="fixed bottom-20 right-4 z-50 flex items-center gap-3 rounded-2xl bg-card border border-border shadow-xl px-4 py-3 animate-in slide-in-from-bottom-4">
      <span className="font-display text-2xl tabular-nums text-foreground">
        {min}:{sec}
      </span>
      <button
        onClick={isRunning ? onPause : onPlay}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        {isRunning ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </button>
      <button
        onClick={onClose}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground"
      >
        <X size={14} />
      </button>
    </div>
  );
};

const PipTimer = ({ timeLeft, isRunning, onPlay, onPause }: PipTimerProps) => {
  const { t } = useI18n();
  const [showFloating, setShowFloating] = useState(false);

  const openPip = useCallback(() => setShowFloating(true), []);
  const closePip = useCallback(() => setShowFloating(false), []);

  return (
    <>
      <button
        onClick={showFloating ? closePip : openPip}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80"
        aria-label={t("pip.toggle")}
        title={t("pip.toggle")}
      >
        <PictureInPicture2 size={18} />
      </button>

      {showFloating && (
        <FloatingMini
          timeLeft={timeLeft}
          isRunning={isRunning}
          onPlay={onPlay}
          onPause={onPause}
          onClose={closePip}
        />
      )}
    </>
  );
};

export default PipTimer;
