import { useMemo } from "react";

interface CircularTimerProps {
  timeLeft: number; // seconds
  totalTime: number; // seconds
  isRunning: boolean;
}

const CircularTimer = ({ timeLeft, totalTime, isRunning }: CircularTimerProps) => {
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

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`font-display text-6xl tracking-tight text-foreground ${isRunning ? "animate-pulse-soft" : ""}`}>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
        <span className="mt-1 text-sm font-light text-muted-foreground">
          {isRunning ? "enfocándote" : "lista para fluir"}
        </span>
      </div>
    </div>
  );
};

export default CircularTimer;
