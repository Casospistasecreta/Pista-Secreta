import type { MediaRef } from "../../types";
import type { LocalizedText } from "@/i18n/types";

export const L = (ptBR: string, en: string, es: string): LocalizedText => ({
  "pt-BR": ptBR,
  en,
  es,
});

/**
 * Caminho de um recurso deste caso. As imagens ficam em `public/investigacao/caso-justin-nobaind/`
 * e são servidas pelo Vite/hosting estático; `BASE_URL` mantém o caminho correto em qualquer base de deploy.
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}investigacao/caso-justin-nobaind/${path}`;

/** Foto da galeria exibida inteira (sem corte), com zoom. */
export const galleryPhoto = (id: string, path: string, takenAt: string): MediaRef => ({
  id,
  kind: "photo",
  seed: id,
  src: asset(path),
  takenAt,
  fit: "contain",
});

/** Foto de post/perfil (formato padrão dos casos anteriores). */
export const photo = (id: string, path: string): MediaRef => ({ id, kind: "photo", seed: id, src: asset(path) });
