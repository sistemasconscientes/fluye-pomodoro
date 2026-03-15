import { useState } from "react";
import { Plus, Check, Trash2, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

const STORAGE_KEY = "fluye_tasks";

function loadTasks(): Task[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

const TaskList = ({ onTasksChange }: { onTasksChange?: () => void }) => {
  const { t } = useI18n();
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [newTask, setNewTask] = useState("");

  const updateTasks = (updated: Task[]) => {
    setTasks(updated);
    saveTasks(updated);
    onTasksChange?.();
  };

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    updateTasks([...tasks, { id: crypto.randomUUID(), text, done: false }]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    updateTasks(tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id: string) => {
    updateTasks(tasks.filter((t) => t.id !== id));
  };

  const doneCount = tasks.filter((t) => t.done).length;
  const pendingTasks = tasks.filter((t) => !t.done);
  const completedTasks = tasks.filter((t) => t.done);
  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <div className="rounded-2xl bg-secondary/50 p-5 h-full flex flex-col">
      <h3 className="font-display text-base text-foreground mb-1">{t("tasks.title")}</h3>
      {tasks.length > 0 ? (
        <p className="text-xs text-muted-foreground mb-3">
          {t("tasks.completed", { done: doneCount, total: tasks.length })}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground/60 mb-3">
          {t("tasks.privacy")}
        </p>
      )}

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder={t("tasks.placeholder")}
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/60"
        />
        <button
          onClick={addTask}
          disabled={!newTask.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 space-y-1.5 overflow-y-auto">
        {tasks.length === 0 && (
          <p className="text-xs text-muted-foreground/60 text-center py-4">
            {t("tasks.empty")}
          </p>
        )}
        {pendingTasks.map((task) => (
          <div key={task.id} className="group flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-background/50">
            <button
              onClick={() => toggleTask(task.id)}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border hover:border-primary/50 transition-all"
            >
            </button>
            <span className="flex-1 text-sm text-foreground">{task.text}</span>
            <button
              onClick={() => removeTask(task.id)}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {doneCount > 0 && (
          <>
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors pt-2"
            >
              <ChevronDown size={14} className={`transition-transform ${showCompleted ? "rotate-0" : "-rotate-90"}`} />
              {t("tasks.showCompleted", { count: doneCount })}
            </button>
            {showCompleted && completedTasks.map((task) => (
              <div key={task.id} className="group flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-background/50">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-primary bg-primary text-primary-foreground transition-all"
                >
                  <Check size={12} />
                </button>
                <span className="flex-1 text-sm text-muted-foreground line-through">{task.text}</span>
                <button
                  onClick={() => removeTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;
