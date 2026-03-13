import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n";

interface PomodoroCompleteDialogProps {
  open: boolean;
  onClose: () => void;
  completed: number;
  recommended: number;
}

const PomodoroCompleteDialog = ({ open, onClose, completed, recommended }: PomodoroCompleteDialogProps) => {
  const { t } = useI18n();
  const isGoalReached = completed >= recommended;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm text-center">
        <div className="flex flex-col items-center gap-3 py-4">
          <span className="text-5xl">{isGoalReached ? "🎉" : "🍅"}</span>
          <DialogTitle className="font-display text-xl text-foreground">
            {isGoalReached ? t("complete.goalReached") : t("complete.pomodoroComplete")}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {isGoalReached
              ? t("complete.goalReachedDesc", { completed: String(completed), recommended: String(recommended) })
              : t("complete.keepGoingDesc", { completed: String(completed), recommended: String(recommended) })}
          </DialogDescription>
          <p className="text-xs text-muted-foreground">
            {t("complete.breakTip")}
          </p>
          <button
            onClick={onClose}
            className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {isGoalReached ? t("complete.great") : t("complete.continue")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PomodoroCompleteDialog;
