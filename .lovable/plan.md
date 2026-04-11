

## Plan: Deeplinks para compatibilidad con Raycast

### Objetivo
Agregar rutas URL que permitan acceder a acciones específicas de Fluye desde Raycast Quick Links o deeplinks.

### Rutas a implementar

| Ruta | Acción |
|------|--------|
| `/start` | Abre la app y auto-inicia el timer |
| `/phase` | Abre la app mostrando la fase actual |
| `/setup` | Abre la app con el panel de configuración abierto |
| `/feeling` | Abre la app mostrando el selector de energía |

### Cambios técnicos

1. **`src/App.tsx`** -- Agregar las nuevas rutas que rendericen `<Index />` con un prop `deeplink` indicando la acción solicitada.

2. **`src/pages/Index.tsx`** -- Recibir prop `deeplink` y ejecutar la acción correspondiente en un `useEffect`:
   - `start`: llamar `play()` automáticamente al montar
   - `setup`: setear `showSetup(true)`
   - `feeling`: setear `showFeelingDialog(true)`
   - `phase`: scroll al banner de fase (comportamiento por defecto, sin acción extra)
   - Después de ejecutar la acción, hacer `navigate("/", { replace: true })` para limpiar la URL

3. **Documentación en `HelpSection`** -- Agregar una sección con las URLs disponibles para que el usuario las copie y configure en Raycast como Quick Links.

### Uso en Raycast
El usuario crea Quick Links en Raycast apuntando a:
- `https://fluye-pomodoro.lovable.app/start`
- `https://fluye-pomodoro.lovable.app/setup`
- etc.

