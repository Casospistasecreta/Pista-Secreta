import type { MediaRef, Message } from "../../types";

/**
 * Caminho de um recurso deste caso. As imagens ficam em
 * `public/investigacao/caso-odete/` e são servidas pelo Vite/hosting estático;
 * `BASE_URL` mantém o caminho correto em qualquer base de deploy.
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}investigacao/caso-odete/${path}`;

export const photo = (id: string, path: string, takenAt?: string): MediaRef => ({
  id,
  kind: "photo",
  seed: id,
  src: asset(path),
  takenAt,
});

/** Mensagem enviada por Odete (dona do aparelho). */
export const me = (id: string, at: string, text?: string, media?: MediaRef): Message => ({ id, from: "victim", at, text, media });

/** Mensagem recebida por Odete. */
export const them = (id: string, at: string, text?: string, media?: MediaRef): Message => ({ id, from: "them", at, text, media });
