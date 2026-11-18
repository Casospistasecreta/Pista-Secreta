import type { MediaRef, Message } from "../../types";
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

/** Localiza rótulos de calendário sem alterar a data ou o horário do roteiro. */
export const calendar = (value: string): LocalizedText => {
  const translate = (months: Record<string, string>, english: boolean) =>
    value.replace(
      /\b(\d{1,2}) (JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)(?: (\d{4}))?\b/g,
      (_, day: string, month: string, year?: string) =>
        english
          ? `${months[month]} ${day}${year ? `, ${year}` : ""}`
          : `${day} ${months[month]}${year ? ` ${year}` : ""}`,
    );
  return L(value, translate(EN_MONTHS, true), translate(ES_MONTHS, false));
};

/** Recursos deste caso: `public/investigacao/caso-peao-envenenado/`. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}investigacao/caso-peao-envenenado/${path}`;

/** Foto exibida inteira (sem corte) na galeria, com zoom. */
export const galleryPhoto = (id: string, path: string, takenAt: LocalizedText, caption?: LocalizedText): MediaRef => ({
  id, kind: "photo", seed: id, src: asset(path), takenAt, caption, fit: "contain",
});

/** Foto dentro de uma conversa ou de um post. */
export const photo = (id: string, path: string, caption?: LocalizedText): MediaRef => ({ id, kind: "photo", seed: id, src: asset(path), caption });

/** Mensagem enviada pelo Rei Preto (dono do aparelho). */
export const rei = (id: string, at: string, text?: LocalizedText, media?: MediaRef): Message => ({ id, from: "victim", at: calendar(at), text, media });
/** Mensagem recebida pelo Rei Preto. */
export const eles = (id: string, at: string, text?: LocalizedText, media?: MediaRef): Message => ({ id, from: "them", at: calendar(at), text, media });
