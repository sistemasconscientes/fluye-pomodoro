import { useState, useRef, useCallback, useEffect } from "react";

const WORK_SECONDS = 25 * 60;
const SHORT_BREAK_SECONDS = 5 * 60;
const LONG_BREAK_SECONDS = 15 * 60;

export type TimerMode = "work" | "shortBreak" | "longBreak";

export function useTimer(onWorkComplete: () => void) {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(WORK_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getTotalForMode = (m: TimerMode) => {
    if (m === "work") return WORK_SECONDS;
    if (m === "longBreak") return LONG_BREAK_SECONDS;
    return SHORT_BREAK_SECONDS;
  };

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (timeLeft <= 0) return;
    setIsRunning(true);
  }, [timeLeft]);

  const pause = useCallback(() => {
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  const reset = useCallback(() => {
    setIsRunning(false);
    clearTimer();
    setMode("work");
    setTimeLeft(WORK_SECONDS);
  }, [clearTimer]);

  const skipBreak = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setMode("work");
    setTimeLeft(WORK_SECONDS);
  }, [clearTimer]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            setIsRunning(false);

            if (mode === "work") {
              const newCount = sessionCount + 1;
              setSessionCount(newCount);
              onWorkComplete();

              // Every 4th session → long break, else short break
              if (newCount % 4 === 0) {
                setMode("longBreak");
                setTimeLeft(LONG_BREAK_SECONDS);
              } else {
                setMode("shortBreak");
                setTimeLeft(SHORT_BREAK_SECONDS);
              }
            } else {
              // Break finished → back to work
              setMode("work");
              setTimeLeft(WORK_SECONDS);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [isRunning, clearTimer, onWorkComplete, mode, sessionCount]);

  return {
    timeLeft,
    totalTime: getTotalForMode(mode),
    isRunning,
    mode,
    sessionCount,
    play,
    pause,
    reset,
    skipBreak,
  };
}
