import es from "./es";
import en from "./en";
import type { Dict } from "./types";

export type { Dict };

export type Locale = "es" | "en";

export const dictionaries: Record<Locale, Dict> = { es, en };
