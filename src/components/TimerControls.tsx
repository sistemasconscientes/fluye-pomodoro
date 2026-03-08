import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

const TimerControls = ({ isRunning, onPlay, onPause, onReset }: TimerControlsProps) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={onReset}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80"
        aria-label="Reset"
      >
        <RotateCcw size={20} />
      </button>

      <button
        onClick={isRunning ? onPause : onPlay}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label={isRunning ? "Pausa" : "Iniciar"}
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </button>

      <div className="h-12 w-12" /> {/* Spacer for symmetry */}
    </div>
  );
};

export default TimerControls;
