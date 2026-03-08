import { useState, useRef, useCallback, useEffect } from "react";

const POMODORO_MINUTES = 25;
const POMODORO_SECONDS = POMODORO_MINUTES * 60;

export function useTimer(onComplete: () => void) {
  const [timeLeft, setTimeLeft] = useState(POMODORO_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    setTimeLeft(POMODORO_SECONDS);
  }, [clearTimer]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [isRunning, clearTimer, onComplete]);

  return {
    timeLeft,
    totalTime: POMODORO_SECONDS,
    isRunning,
    play,
    pause,
    reset,
  };
}
