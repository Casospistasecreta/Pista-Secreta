import type { MediaRef } from "../../types";

/**
 * Caminho de um recurso deste caso. As imagens ficam em
 * `public/investigacao/caso-rasputin/` e são servidas pelo Vite/hosting estático;
 * `BASE_URL` mantém o caminho correto em qualquer base de deploy.
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}investigacao/caso-rasputin/${path}`;

/** Foto exibida inteira (sem corte) no visualizador da galeria, com zoom. */
export const galleryPhoto = (id: string, path: string, takenAt: string): MediaRef => ({
  id,
  kind: "photo",
  seed: id,
  src: asset(path),
  takenAt,
  fit: "contain",
});
