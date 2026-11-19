import type { LocalizedText } from "@/i18n/types";

export const L = (ptBR: string, en: string, es: string): LocalizedText => ({
  "pt-BR": ptBR,
  en,
  es,
});

const MONTHS: Record<string, [en: string, es: string]> = {
  JAN: ["JAN", "ENE"],
  FEV: ["FEB", "FEB"],
  MAR: ["MAR", "MAR"],
  ABR: ["APR", "ABR"],
  MAI: ["MAY", "MAY"],
  JUN: ["JUN", "JUN"],
  JUL: ["JUL", "JUL"],
  AGO: ["AUG", "AGO"],
  SET: ["SEP", "SEP"],
  OUT: ["OCT", "OCT"],
  NOV: ["NOV", "NOV"],
  DEZ: ["DEC", "DIC"],
};

/** Localizes Portuguese abbreviated month names while preserving time and date numbers. */
export function calendar(ptBR: string): LocalizedText {
  let en = ptBR;
  let es = ptBR;
  for (const [source, [english, spanish]] of Object.entries(MONTHS)) {
    const token = new RegExp(`\\b${source}\\b`, "g");
    en = en.replace(token, english);
    es = es.replace(token, spanish);
  }
  return L(ptBR, en, es);
}
