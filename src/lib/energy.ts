export type EnergyType = "mental" | "creative" | "social" | "physical";

export interface EnergyOption {
  type: EnergyType;
  label: string;
  emoji: string;
  description: string;
}

export const ENERGY_OPTIONS: EnergyOption[] = [
  {
    type: "mental",
    label: "Mental profunda",
    emoji: "🧠",
    description: "Buen foco, poca energía social",
  },
  {
    type: "creative",
    label: "Creativa",
    emoji: "🎨",
    description: "Ideas fluyen, difícil seguir estructuras rígidas",
  },
  {
    type: "social",
    label: "Social / comunicación",
    emoji: "💬",
    description: "Bien para juntas, mensajes, feedback",
  },
  {
    type: "physical",
    label: "Física / movimiento",
    emoji: "🏃‍♀️",
    description: "Bien para tareas operativas, manuales, ejercicios",
  },
];

export function getEnergyType(): EnergyType | null {
  const saved = localStorage.getItem("fluye_energy_type");
  const savedDate = localStorage.getItem("fluye_energy_date");
  const today = new Date().toISOString().split("T")[0];
  if (savedDate !== today || !saved) return null;
  return saved as EnergyType;
}

export function setEnergyType(type: EnergyType) {
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem("fluye_energy_type", type);
  localStorage.setItem("fluye_energy_date", today);
}
