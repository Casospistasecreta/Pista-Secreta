import type { MediaRef } from "../../types";
import type { LocalizedText } from "@/i18n/types";

export const L = (ptBR: string, en: string, es: string): LocalizedText => ({
  "pt-BR": ptBR,
  en,
  es,
});

const EN_MONTHS: Record<string, string> = {
  JAN: "JAN", FEV: "FEB", MAR: "MAR", ABR: "APR", MAI: "MAY", JUN: "JUN",
  JUL: "JUL", AGO: "AUG", SET: "SEP", OUT: "OCT", NOV: "NOV", DEZ: "DEC",
};
const ES_MONTHS: Record<string, string> = {
  JAN: "ENE", FEV: "FEB", MAR: "MAR", ABR: "ABR", MAI: "MAY", JUN: "JUN",
  JUL: "JUL", AGO: "AGO", SET: "SEP", OUT: "OCT", NOV: "NOV", DEZ: "DIC",
};

/** Localiza rótulos de data sem alterar dia, ano ou horário do roteiro. */
export const calendar = (ptBR: LocalizedText): LocalizedText => {
  if (typeof ptBR !== "string") return ptBR;
  const translate = (months: Record<string, string>, english: boolean) => {
    let value = ptBR.replace(/\b(\d{1,2}) (JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)\b/g, (_, day: string, month: string) =>
      english ? `${months[month]} ${day}` : `${day} ${months[month]}`,
    );
    if (english) {
      value = value.replace(/\b(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC) (\d{1,2}) (\d{4})\b/g, "$1 $2, $3");
      value = value.replace("(madrugada)", "(early morning)");
    }
    return value;
  };
  return L(ptBR, translate(EN_MONTHS, true), translate(ES_MONTHS, false));
};

/**
 * Caminho de um recurso deste caso. As imagens ficam em
 * `public/investigacao/caso-rasputin/` e são servidas pelo Vite/hosting estático;
 * `BASE_URL` mantém o caminho correto em qualquer base de deploy.
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}investigacao/caso-rasputin/${path}`;

/** Foto exibida inteira (sem corte) no visualizador da galeria, com zoom. */
export const galleryPhoto = (id: string, path: string, takenAt: LocalizedText): MediaRef => ({
  id,
  kind: "photo",
  seed: id,
  src: asset(path),
  takenAt,
  fit: "contain",
});
