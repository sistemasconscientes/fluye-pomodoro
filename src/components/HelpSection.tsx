const HelpSection = () => {
  return (
    <div className="rounded-2xl bg-secondary/50 p-5">
      <h2 className="font-display text-lg text-foreground mb-4">Guía de Fluye</h2>

      {/* What is a Pomodoro */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground mb-1.5">🍅 ¿Qué es un Pomodoro?</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Es una técnica de productividad que divide el trabajo en bloques de <strong className="text-foreground">25 minutos de enfoque</strong> seguidos de <strong className="text-foreground">5 minutos de descanso</strong>. Después de 4 bloques, tomas un descanso largo de 15-30 minutos.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="text-foreground font-medium">¿Por qué funciona?</span> Tu cerebro mantiene la concentración mejor en intervalos cortos. Los descansos previenen el agotamiento y mejoran la retención.
        </p>
      </div>

      {/* How to use */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">💡 ¿Cómo usar Fluye?</h3>
      </div>

      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="flex gap-3">
          <span className="text-lg">1️⃣</span>
          <p>
            <strong className="text-foreground">Configura tu ciclo:</strong> Ingresa la fecha de tu última menstruación para calcular tu fase.
          </p>
        </div>
        <div className="flex gap-3">
          <span className="text-lg">2️⃣</span>
          <p>
            <strong className="text-foreground">Indica cómo te sientes:</strong> Cada día selecciona tu nivel de energía. Esto ajusta cuántos pomodoros te recomendamos.
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
            <strong className="text-foreground">Sigue tu progreso:</strong> La barra muestra cuántos pomodoros llevas vs. los recomendados para hoy.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-accent/10 p-3">
        <p className="text-xs text-foreground/80">
          <strong>Pro tip:</strong> No te presiones por completar todos los pomodoros. Los días de baja energía, incluso 2 bloques de enfoque son un logro. 💛
        </p>
      </div>
    </div>
  );
};

export default HelpSection;
