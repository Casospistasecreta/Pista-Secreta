import type { MediaRef, Message } from "../../types";

/** Recursos deste caso: `public/investigacao/caso-peao-envenenado/`. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}investigacao/caso-peao-envenenado/${path}`;

/** Foto exibida inteira (sem corte) na galeria, com zoom. */
export const galleryPhoto = (id: string, path: string, takenAt: string, caption?: string): MediaRef => ({
  id, kind: "photo", seed: id, src: asset(path), takenAt, caption, fit: "contain",
});

/** Foto dentro de uma conversa ou de um post. */
export const photo = (id: string, path: string, caption?: string): MediaRef => ({ id, kind: "photo", seed: id, src: asset(path), caption });

/** Mensagem enviada pelo Rei Preto (dono do aparelho). */
export const rei = (id: string, at: string, text?: string, media?: MediaRef): Message => ({ id, from: "victim", at, text, media });
/** Mensagem recebida pelo Rei Preto. */
export const eles = (id: string, at: string, text?: string, media?: MediaRef): Message => ({ id, from: "them", at, text, media });
