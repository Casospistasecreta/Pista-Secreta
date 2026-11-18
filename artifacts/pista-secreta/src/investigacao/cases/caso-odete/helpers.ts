import type { LocalizedText } from "@/i18n/types";
import type { MediaRef, Message } from "../../types";

export const L = (ptBR: string, en: string, es: string): LocalizedText => ({
  "pt-BR": ptBR,
  en,
  es,
});

/**
 * Caminho de um recurso deste caso. As imagens ficam em
 * `public/investigacao/caso-odete/` e são servidas pelo Vite/hosting estático;
 * `BASE_URL` mantém o caminho correto em qualquer base de deploy.
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}investigacao/caso-odete/${path}`;

export const photo = (id: string, path: string, takenAt?: LocalizedText): MediaRef => ({
  id,
  kind: "photo",
  seed: id,
  src: asset(path),
  takenAt,
});

/** Mensagem enviada por Odete (dona do aparelho). */
export const me = (id: string, at: LocalizedText, text?: LocalizedText, media?: MediaRef): Message => ({ id, from: "victim", at, text, media });

/** Registro de chamada (sem texto). */
export const callLog = (id: string, from: "victim" | "them", at: LocalizedText, call: NonNullable<Message["call"]>): Message => ({ id, from, at, call });

/** Mensagem recebida por Odete. */
export const them = (id: string, at: LocalizedText, text?: LocalizedText, media?: MediaRef): Message => ({ id, from: "them", at, text, media });
