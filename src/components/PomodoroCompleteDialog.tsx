import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface PomodoroCompleteDialogProps {
  open: boolean;
  onClose: () => void;
  completed: number;
  recommended: number;
}

const PomodoroCompleteDialog = ({ open, onClose, completed, recommended }: PomodoroCompleteDialogProps) => {
  const isGoalReached = completed >= recommended;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm text-center">
        <div className="flex flex-col items-center gap-3 py-4">
          <span className="text-5xl">{isGoalReached ? "🎉" : "🍅"}</span>
          <DialogTitle className="font-display text-xl text-foreground">
            {isGoalReached ? "¡Meta alcanzada!" : "¡Pomodoro completado!"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {isGoalReached
              ? `Completaste ${completed} de ${recommended} pomodoros. ¡Excelente trabajo hoy!`
              : `Llevas ${completed} de ${recommended} pomodoros hoy. ¡Sigue así!`}
          </DialogDescription>
          <p className="text-xs text-muted-foreground">
            Toma un descanso de 5 minutos antes del siguiente bloque.
          </p>
          <button
            onClick={onClose}
            className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {isGoalReached ? "¡Genial!" : "Continuar"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PomodoroCompleteDialog;
