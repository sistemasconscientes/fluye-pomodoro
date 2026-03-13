import { useState } from "react";
import { Plus, Check, Trash2 } from "lucide-react";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

const STORAGE_KEY = "fluye_tasks";
const STORAGE_DATE_KEY = "fluye_tasks_date";

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

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    const updated = [...tasks, { id: crypto.randomUUID(), text, done: false }];
    setTasks(updated);
    saveTasks(updated);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const removeTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="rounded-2xl bg-secondary/50 p-5 h-full flex flex-col">
      <h3 className="font-display text-base text-foreground mb-1">Tareas de hoy</h3>
      {tasks.length > 0 && (
        <p className="text-xs text-muted-foreground mb-3">
          {doneCount}/{tasks.length} completadas
        </p>
      )}

      {/* Add task */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Agregar tarea..."
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

      {/* Task list */}
      <div className="flex-1 space-y-1.5 overflow-y-auto">
        {tasks.length === 0 && (
          <p className="text-xs text-muted-foreground/60 text-center py-4">
            Agrega tareas para organizar tu día
          </p>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-background/50"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${
                task.done
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {task.done && <Check size={12} />}
            </button>
            <span
              className={`flex-1 text-sm transition-all ${
                task.done
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => removeTask(task.id)}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
