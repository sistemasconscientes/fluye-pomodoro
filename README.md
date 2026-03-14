# 🏊‍♀️ Fluye — Pomodoro consciente

Temporizador Pomodoro que adapta tu productividad a las fases de tu ciclo menstrual. Menos hustle, más fluir.

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Lovable](https://img.shields.io/badge/built%20with-Lovable-ff69b4)](https://lovable.dev)

## ✨ Características

- **Temporizador Pomodoro** — Ciclos de 25 min de trabajo + descansos automáticos (5 min cortos, 15 min largos cada 4 sesiones)
- **Fases del ciclo** — Detecta automáticamente tu fase (Menstruación → Folicular → Ovulación → Lútea) y ajusta la meta diaria de pomodoros
- **Nivel de energía** — Ajusta tus pomodoros recomendados según cómo te sientes hoy
- **Historial semanal** — Visualiza tu progreso de los últimos 7 días
- **Lista de tareas** — Organiza qué hacer en cada sesión
- **Sonido de completación** — Notificación sonora con tres tonos al terminar cada pomodoro
- **Multilenguaje** — Disponible en español neutro e inglés, con detección automática del idioma del navegador
- **PWA** — Instalable como app en tu dispositivo
- **100% privado** — Todos los datos se guardan en localStorage, nada sale de tu navegador

## 🌐 Internacionalización (i18n)

Fluye soporta múltiples idiomas usando un sistema de diccionarios por locale:

```
src/locales/
├── types.ts    # Tipo Dict con todas las claves
├── es.ts       # Español neutro (~200 claves)
├── en.ts       # English (~200 claves)
└── index.ts    # Exporta dictionaries y Locale
```

- **Detección automática**: al primer uso, detecta el idioma del navegador
- **Persistencia**: el idioma seleccionado se guarda en `localStorage`
- **Interpolación**: soporta parámetros como `{done}/{total} completadas`
- **Agregar un idioma**: crea un nuevo archivo (ej. `pt.ts`), exporta el tipo `Dict` y regístralo en `index.ts`

## 🧮 Lógica de pomodoros recomendados

El objetivo diario se calcula así:

```
recomendados = redondear((base_fase + valor_energía) / 2)
```

| Fase | Base |
|------|------|
| Menstruación | 4 |
| Folicular | 8 |
| Ovulación | 10 |
| Lútea temprana | 10 |
| Lútea media | 8 |
| Lútea tardía | 6 |

| Energía | Valor |
|---------|-------|
| Bajísima | 4 |
| Baja | 6 |
| Media | 7 |
| Alta | 8 |
| Muy alta | 10 |

Si no se selecciona energía, se usa el valor base de la fase.

## 🛠️ Stack tecnológico

- **React 18** + TypeScript
- **Vite** — Build tool
- **Tailwind CSS** + shadcn/ui — Diseño
- **Framer Motion** — Animaciones
- **Web Audio API** — Sonido de completación
- **localStorage** — Persistencia de datos
- **vite-plugin-pwa** — Soporte offline
- **i18n custom** — Sistema de traducciones con diccionarios por locale

## 🚀 Desarrollo local

```bash
# Clonar el repositorio
git clone https://github.com/sistemasconscientes/fluye-pomodoro.git
cd fluye-pomodoro

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🤝 Contribuir

1. Revisa los [issues abiertos](https://github.com/sistemasconscientes/fluye-pomodoro/issues)
2. Sigue el [Kanban del proyecto](https://github.com/orgs/sistemasconscientes/projects/5)
3. Usa [Conventional Commits](https://www.conventionalcommits.org/) para tus mensajes
4. Abre un Pull Request

Consulta [CONTRIBUTING.md](CONTRIBUTING.md) y el [Código de Conducta](CODE_OF_CONDUCT.md) para más detalles.

## ☕ Apoya el proyecto

Si Fluye te es útil, puedes [invitarme un café](https://donate.stripe.com/4gMeVd0yzeBv7yt6Eufw400).

## 📄 Licencia

[MIT](LICENSE) — Laboratorio de Sistemas Conscientes

---

Una creación de [Laboratorio de Sistemas Conscientes](https://sistemasconscientes.com?ref=fluye)
