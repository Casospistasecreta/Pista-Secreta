import type { GalleryGroup, MediaRef } from "../../types";
import { calendar, galleryPhoto } from "./helpers";

/*
 * Fotos (roteiro 5.4). O nome do arquivo segue IMG_AAAAMMDD_HHMM, e a data/hora exibida vem dele, com um ajuste
 * autorizado: IMG_19161212_1415 (bancada de farmácia) aparece às 15:55, dentro da visita à farmácia do Dr. Badmaev
 * (15:45–16:10 na Localização); às 14:15 ele estava nos Banhos Públicos.
 * As duas fotos de 1912 não constam no roteiro; entram sem contexto, a pedido do autor.
 * Mais recentes primeiro.
 */
const p = (stamp: string, takenAt: ReturnType<typeof calendar>): MediaRef => {
  const [date, time] = stamp.split("_");
  return galleryPhoto(`ph-${stamp}`, `fotos/img-${date}-${time}.webp`, takenAt);
};

export const gallery: GalleryGroup[] = [
  {
    id: "g-17dez",
    label: calendar("17 DEZ 1916"),
    items: [
      p("19161217_0233", calendar("17 DEZ 1916 · 02:33")),
      p("19161217_0217", calendar("17 DEZ 1916 · 02:17")),
      p("19161217_0151", calendar("17 DEZ 1916 · 01:51")),
      p("19161217_0112", calendar("17 DEZ 1916 · 01:12")),
      p("19161217_0049", calendar("17 DEZ 1916 · 00:49")),
      p("19161217_0008", calendar("17 DEZ 1916 · 00:08")),
    ],
  },
  { id: "g-16dez", label: calendar("16 DEZ 1916"), items: [p("19161216_1850", calendar("16 DEZ 1916 · 18:50"))] },
  { id: "g-15dez", label: calendar("15 DEZ 1916"), items: [p("19161215_1744", calendar("15 DEZ 1916 · 17:44"))] },
  { id: "g-12dez", label: calendar("12 DEZ 1916"), items: [p("19161212_1415", calendar("12 DEZ 1916 · 15:55"))] },
  { id: "g-05dez", label: calendar("05 DEZ 1916"), items: [p("19161205_0930", calendar("05 DEZ 1916 · 09:30"))] },
  { id: "g-03dez", label: calendar("03 DEZ 1916"), items: [p("19161203_1812", calendar("03 DEZ 1916 · 18:12"))] },
  { id: "g-25nov", label: calendar("25 NOV 1916"), items: [p("19161125_1500", calendar("25 NOV 1916 · 15:00"))] },
  { id: "g-09nov", label: calendar("09 NOV 1916"), items: [p("19161109_0810", calendar("09 NOV 1916 · 08:10"))] },
  { id: "g-05nov", label: calendar("05 NOV 1916"), items: [p("19161105_1630", calendar("05 NOV 1916 · 16:30"))] },
  { id: "g-15jun", label: calendar("15 JUN 1916"), items: [p("19160615_1100", calendar("15 JUN 1916 · 11:00"))] },
  {
    id: "g-1912",
    label: "1912",
    items: [p("19120712_1606", calendar("12 JUL 1912 · 16:06")), p("19120330_1440", calendar("30 MAR 1912 · 14:40"))],
  },
];
