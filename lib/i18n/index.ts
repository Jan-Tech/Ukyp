import tk from "./tk";
import ru from "./ru";

export type Locale = "tk" | "ru";
export type Translations = typeof tk;

const translations = { tk, ru };

export function getT(locale: Locale): Translations {
  return translations[locale] ?? translations.tk;
}

export { tk, ru };
