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
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg text-foreground">Guía de Fluye</h2>
        <button
          onClick={() => setOpen(false)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
        >
          <X size={16} />
        </button>
      </div>

      {/* What is a Pomodoro */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground mb-1.5">🍅 ¿Qué es un Pomodoro?</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Es una técnica de productividad que divide el trabajo en bloques de <strong className="text-foreground">25 minutos de enfoque</strong> seguidos de <strong className="text-foreground">5 minutos de descanso</strong>. Después de 4 bloques, tomas un descanso largo de 15-30 minutos.
        </p>
        <div className="mt-2 space-y-1">
          <p className="text-xs text-muted-foreground">
            <span className="text-foreground font-medium">¿Por qué funciona?</span> Tu cerebro mantiene la concentración mejor en intervalos cortos. Los descansos previenen el agotamiento y mejoran la retención.
          </p>
        </div>
      </div>

      {/* How to use Fluye */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">💡 ¿Cómo aprovecharlo con Fluye?</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Fluye adapta la técnica Pomodoro a tu ciclo menstrual. Te sugiere cuántos bloques hacer según tu fase y energía del día.
        </p>
      </div>

      {/* Steps */}
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
            <strong className="text-foreground">Usa el timer:</strong> Presiona Play para iniciar un pomodoro de 25 minutos. Cuando termine, toma 5 min de descanso.
          </p>
        </div>
        <div className="flex gap-3">
          <span className="text-lg">4️⃣</span>
          <p>
            <strong className="text-foreground">Sigue tu progreso:</strong> La barra de arriba muestra cuántos pomodoros llevas vs. los recomendados para hoy.
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 rounded-xl bg-accent/10 p-3">
        <p className="text-xs text-foreground/80">
          <strong>Pro tip:</strong> No te presiones por completar todos los pomodoros. Los días de baja energía, incluso 2 bloques de enfoque son un logro. 💛
        </p>
      </div>
    </div>
  );
};

export default HelpSection;
