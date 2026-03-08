import { HelpCircle, X } from "lucide-react";
import { useState } from "react";

const HelpSection = () => {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80"
        aria-label="Ayuda"
      >
        <HelpCircle size={18} />
      </button>
    );
  }

  return (
    <div className="rounded-2xl bg-secondary/50 p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-lg text-foreground">¿Cómo funciona Fluye?</h2>
        <button
          onClick={() => setOpen(false)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
        >
          <X size={16} />
        </button>
      </div>
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="flex gap-3">
          <span className="text-lg">1️⃣</span>
          <p>
            <strong className="text-foreground">Configura tu ciclo:</strong> Ingresa la fecha de tu última menstruación para que calculemos en qué fase estás.
          </p>
        </div>
        <div className="flex gap-3">
          <span className="text-lg">2️⃣</span>
          <p>
            <strong className="text-foreground">Elige tu energía:</strong> Cada día selecciona qué tipo de energía sientes. Esto personaliza tus recomendaciones.
          </p>
        </div>
        <div className="flex gap-3">
          <span className="text-lg">3️⃣</span>
          <p>
            <strong className="text-foreground">Usa el timer:</strong> Presiona Play para iniciar un pomodoro de 25 minutos. Pausa o reinicia cuando quieras.
          </p>
        </div>
        <div className="flex gap-3">
          <span className="text-lg">4️⃣</span>
          <p>
            <strong className="text-foreground">Sigue tu progreso:</strong> Abajo verás cuántos pomodoros llevas vs. los recomendados según tu fase y energía del día.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
