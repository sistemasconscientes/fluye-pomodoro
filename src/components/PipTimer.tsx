import { useState, useEffect, useCallback } from "react";
import { Play, Pause, ChevronUp, ChevronDown, Check, PictureInPicture2, X } from "lucide-react";
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

const STORAGE_KEY = "fluye_tasks";

function loadTasks(): Task[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}


/** Floating overlay — used on all platforms */
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

const PipTimer = ({ timeLeft, isRunning, onPlay, onPause, tasks, onToggleTask }: PipTimerProps) => {
  const { t } = useI18n();
  const [showFloating, setShowFloating] = useState(false);
  const [taskIndex, setTaskIndex] = useState(0);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const pendingTasks = tasks.filter((t) => !t.done);
  const openPip = useCallback(() => {
    setShowFloating(true);
  }, []);

  const closePip = useCallback(() => {
    setShowFloating(false);
  }, []);

  // Keep task index in bounds
  useEffect(() => {
    if (taskIndex >= pendingTasks.length) {
      setTaskIndex(Math.max(0, pendingTasks.length - 1));
    }
  }, [pendingTasks.length, taskIndex]);

  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");
  const currentTask = pendingTasks[taskIndex] || null;

  const handleConfirmComplete = (id: string) => {
    setConfirmingId(id);
  };

  const confirmComplete = () => {
    if (confirmingId) {
      onToggleTask(confirmingId);
      setConfirmingId(null);
      // Stay at same index (next task slides in)
    }
  };

  // PiP content rendered via portal
  const pipContent = (
    <div className="pip-container">
      <div className="pip-time">{min}:{sec}</div>
      <button
        className="pip-btn-play"
        onClick={isRunning ? onPause : onPlay}
      >
        {isRunning ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="4" x2="6" y2="20"/><line x1="18" y1="4" x2="18" y2="20"/></svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
        )}
      </button>

      {currentTask ? (
        <>
          <div className="pip-sep" />
          <div className="pip-task-group">
            <button
              className={`pip-btn-check ${currentTask.done ? "checked" : ""}`}
              onClick={() => handleConfirmComplete(currentTask.id)}
            >
              {currentTask.done && (
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
              )}
            </button>
            <span className={`pip-task-text ${currentTask.done ? "done" : ""}`}>
              {currentTask.text}
            </span>
            <button
              className="pip-icon-btn"
              onClick={() => setTaskIndex((i) => Math.max(0, i - 1))}
              disabled={taskIndex === 0}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18,15 12,9 6,15"/></svg>
            </button>
            <button
              className="pip-icon-btn"
              onClick={() => setTaskIndex((i) => Math.min(pendingTasks.length - 1, i + 1))}
              disabled={taskIndex >= pendingTasks.length - 1}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 12,15 18,9"/></svg>
            </button>
          </div>
        </>
      ) : (
        <span className="pip-no-tasks">✓ {t("pip.noTasks")}</span>
      )}

      {confirmingId && (
        <div className="pip-confirm">
          <div className="pip-confirm-box">
            <p>{t("pip.confirmComplete")}</p>
            <div className="pip-confirm-btns">
              <button className="pip-confirm-no" onClick={() => setConfirmingId(null)}>
                {t("pip.cancel")}
              </button>
              <button className="pip-confirm-yes" onClick={confirmComplete}>
                {t("pip.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

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
