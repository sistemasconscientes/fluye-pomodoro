## Plan: Auto-refresh al detectar cambio de día tras inactividad

### Problema
Hoy el refresh por cambio de día solo se dispara cuando el tab pasa de oculto a visible (`visibilitychange`). Si dejas la app abierta y enfocada durante horas (o la PWA queda en primer plano), al cruzar medianoche no se actualiza nada hasta que cambies de tab y vuelvas.

### Solución
Agregar dos mecanismos extra de detección de cambio de día en `src/pages/Index.tsx`, reutilizando la lógica que ya existe en el handler actual:

1. **Evento `focus` de la ventana** — cubre casos donde el usuario vuelve a la app desde otra ventana/app sin que el tab haya estado oculto (común en desktop con múltiples monitores).
2. **Intervalo de chequeo cada 60s** — compara `toLocalDateStr()` contra `lastSeenDateRef.current`. Si cambió, ejecuta el mismo flujo de refresh (refrescar fase, pomodoros, historial, pedir feeling del día y mostrar toast).

### Refactor
Extraer la lógica actual del handler de visibility a una función interna `checkForDayChange()` dentro del mismo `useEffect`, y reutilizarla desde:
- `visibilitychange` (existente)
- `focus` (nuevo)
- `setInterval` cada 60s (nuevo)

Limpiar correctamente listeners e intervalo en el cleanup del `useEffect`.

### Archivos
- `src/pages/Index.tsx` — único cambio.

### Fuera de alcance
- No tocar storage ni lógica de pomodoros (ya se reinician solos vía `getCompletedPomodoros` al detectar fecha distinta).
- No cambiar UI.
