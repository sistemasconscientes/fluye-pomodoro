import { useState, useRef, useCallback, useEffect } from "react";
import { requestNotificationPermission, sendTimerNotification } from "@/lib/notifications";

// Pomodoro durations (seconds)
const WORK_SECONDS = 25 * 60;
const SHORT_BREAK_SECONDS = 5 * 60;
const LONG_BREAK_SECONDS = 15 * 60;

export type TimerMode = "work" | "shortBreak" | "longBreak";
export interface TimerNotificationTexts {
  workCompleteTitle: string;
  workCompleteBody: string;
  breakCompleteTitle: string;
  breakCompleteBody: string;
}

export function useTimer(onWorkComplete: () => void, notificationTexts?: TimerNotificationTexts) {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(WORK_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Store the target end time so we can survive background tab throttling
  const endTimeRef = useRef<number | null>(null);
  const onWorkCompleteRef = useRef(onWorkComplete);
  const notificationTextsRef = useRef(notificationTexts);

  useEffect(() => {
    onWorkCompleteRef.current = onWorkComplete;
  }, [onWorkComplete]);

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

  const handleTimerEnd = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    endTimeRef.current = null;

    if (mode === "work") {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      onWorkCompleteRef.current();

      if (newCount % 4 === 0) {
        setMode("longBreak");
        setTimeLeft(LONG_BREAK_SECONDS);
      } else {
        setMode("shortBreak");
        setTimeLeft(SHORT_BREAK_SECONDS);
      }
    } else {
      setMode("work");
      setTimeLeft(WORK_SECONDS);
    }
  }, [clearTimer, mode, sessionCount]);

  const play = useCallback(() => {
    if (timeLeft <= 0) return;
    // Set the absolute end time based on current timeLeft
    endTimeRef.current = Date.now() + timeLeft * 1000;
    setIsRunning(true);
  }, [timeLeft]);

  const pause = useCallback(() => {
    // Snapshot remaining time from the absolute end time
    if (endTimeRef.current) {
      const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
      setTimeLeft(remaining);
    }
    endTimeRef.current = null;
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  const reset = useCallback(() => {
    setIsRunning(false);
    clearTimer();
    endTimeRef.current = null;
    setMode("work");
    setTimeLeft(WORK_SECONDS);
  }, [clearTimer]);

  const skipBreak = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    endTimeRef.current = null;
    setMode("work");
    setTimeLeft(WORK_SECONDS);
  }, [clearTimer]);

  // Tick loop: derive timeLeft from the absolute end time
  // This makes the timer resilient to background-tab throttling
  useEffect(() => {
    if (isRunning && endTimeRef.current) {
      intervalRef.current = setInterval(() => {
        const remaining = Math.round((endTimeRef.current! - Date.now()) / 1000);
        if (remaining <= 0) {
          setTimeLeft(0);
          setTimeout(handleTimerEnd, 0);
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);
    }
    return clearTimer;
  }, [isRunning, clearTimer, handleTimerEnd]);

  // Also sync when the tab becomes visible again (fires immediately)
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && endTimeRef.current) {
        const remaining = Math.round((endTimeRef.current - Date.now()) / 1000);
        if (remaining <= 0) {
          setTimeLeft(0);
          setTimeout(handleTimerEnd, 0);
        } else {
          setTimeLeft(remaining);
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [handleTimerEnd]);

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
