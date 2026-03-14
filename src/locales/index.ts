import es from "./es";
import en from "./en";
import pt from "./pt";
import type { Dict } from "./types";

export type { Dict };

export type Locale = "es" | "en" | "pt";

export const dictionaries: Record<Locale, Dict> = { es, en, pt };
