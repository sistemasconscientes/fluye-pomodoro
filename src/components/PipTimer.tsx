import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
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

// Inline styles for the PiP window (no access to app's CSS)
const pipStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #1a1a2e;
    color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    user-select: none;
  }
  .pip-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 12px;
    width: 100%;
  }
  .pip-row {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    justify-content: center;
  }
  .pip-time {
    font-size: 28px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: -1px;
    color: #ffffff;
  }
  .pip-btn-play {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: #7c3aed;
    color: white;
    transition: opacity 0.15s;
    flex-shrink: 0;
  }
  .pip-btn-play:hover { opacity: 0.85; }
  .pip-icon-btn {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    transition: color 0.15s;
  }
  .pip-icon-btn:hover { color: #ccc; }
  .pip-icon-btn:disabled { color: #444; cursor: default; }
  .pip-task-row {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.06);
    border-radius: 8px;
    padding: 5px 10px;
    width: 100%;
    max-width: 300px;
  }
  .pip-btn-check {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    border: 1.5px solid rgba(255,255,255,0.3);
    background: transparent;
    color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.15s;
  }
  .pip-btn-check.checked {
    background: #7c3aed;
    border-color: #7c3aed;
    color: white;
  }
  .pip-task-text {
    flex: 1;
    font-size: 12px;
    color: #ccc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pip-task-text.done {
    text-decoration: line-through;
    color: #666;
  }
  .pip-no-tasks {
    font-size: 11px;
    color: #555;
  }
  .pip-confirm {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  .pip-confirm-box {
    background: #2a2a3e;
    border-radius: 10px;
    padding: 12px 16px;
    text-align: center;
    max-width: 200px;
  }
  .pip-confirm-box p {
    font-size: 12px;
    margin-bottom: 10px;
    color: #ddd;
  }
  .pip-confirm-btns {
    display: flex;
    gap: 8px;
    justify-content: center;
  }
  .pip-confirm-btns button {
    padding: 5px 14px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 12px;
  }
  .pip-confirm-yes {
    background: #7c3aed;
    color: white;
  }
  .pip-confirm-no {
    background: rgba(255,255,255,0.1);
    color: #ccc;
  }
`;

/** Floating overlay fallback for browsers without Document PiP */
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
  const [pipWindow, setPipWindow] = useState<Window | null>(null);
  const [showFloating, setShowFloating] = useState(false);
  const pipContainerRef = useRef<HTMLDivElement | null>(null);
  const [taskIndex, setTaskIndex] = useState(0);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const pendingTasks = tasks.filter((t) => !t.done);

  const supportsDocPip = "documentPictureInPicture" in window;

  const openPip = useCallback(async () => {
    if (supportsDocPip) {
      try {
        const pip = await (window as any).documentPictureInPicture.requestWindow({
          width: 300,
          height: 120,
        });
        // Inject styles
        const style = pip.document.createElement("style");
        style.textContent = pipStyles;
        pip.document.head.appendChild(style);

        // Create mount point
        const container = pip.document.createElement("div");
        container.id = "pip-root";
        pip.document.body.appendChild(container);

        pipContainerRef.current = container;
        setPipWindow(pip);

        pip.addEventListener("pagehide", () => {
          setPipWindow(null);
          pipContainerRef.current = null;
        });
      } catch {
        // Fallback to floating
        setShowFloating(true);
      }
    } else {
      setShowFloating(true);
    }
  }, [supportsDocPip]);

  const closePip = useCallback(() => {
    if (pipWindow) {
      pipWindow.close();
      setPipWindow(null);
      pipContainerRef.current = null;
    }
    setShowFloating(false);
  }, [pipWindow]);

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
      <div className="pip-row">
        <div className="pip-time">{min}:{sec}</div>
        <button
          className="pip-btn-play"
          onClick={isRunning ? onPause : onPlay}
        >
          {isRunning ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="4" x2="6" y2="20"/><line x1="18" y1="4" x2="18" y2="20"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
          )}
        </button>
      </div>

      {currentTask ? (
        <div className="pip-task-row">
          <button
            className={`pip-btn-check ${currentTask.done ? "checked" : ""}`}
            onClick={() => handleConfirmComplete(currentTask.id)}
          >
            {currentTask.done && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
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
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18,15 12,9 6,15"/></svg>
          </button>
          <button
            className="pip-icon-btn"
            onClick={() => setTaskIndex((i) => Math.min(pendingTasks.length - 1, i + 1))}
            disabled={taskIndex >= pendingTasks.length - 1}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 12,15 18,9"/></svg>
          </button>
        </div>
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
        onClick={pipWindow || showFloating ? closePip : openPip}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80"
        aria-label={t("pip.toggle")}
        title={t("pip.toggle")}
      >
        <PictureInPicture2 size={18} />
      </button>

      {/* Document PiP portal */}
      {pipWindow && pipContainerRef.current && createPortal(pipContent, pipContainerRef.current)}

      {/* Floating fallback */}
      {showFloating && !pipWindow && (
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
