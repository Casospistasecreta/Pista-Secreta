import type { GalleryGroup, MediaRef } from "../../types";
import { photo } from "./helpers";

/*
 * Datas das fotos: vale o carimbo impresso na foto quando existe; sem carimbo,
 * vale a data do nome do arquivo (IMG_DDMMAAAA; IMG_100925 foi lido como DDMMAA).
 * Carimbos lidos: 03031996→19 JUL 1992, 16031993→19 JUL 1996,
 * 04081995 (×2)→25 JUL 1996, 19061994→14 JUL 1996, 25071992→14 JUL 1996,
 * 20101992→15 AGO 1987 (dia parcialmente cortado), 12061987→22 MAR 1987.
 * Grupos por ano (mais recente primeiro); dentro do ano, mais recente primeiro.
 */
const p = (file: string, takenAt: string): MediaRef => photo(file, `fotos/${file}.webp`, takenAt);

export const gallery: GalleryGroup[] = [
  {
    id: "g-2026",
    label: "2026",
    items: [
      p("img-11012026", "11 JAN 2026"),
      p("img-05012026", "05 JAN 2026"),
      p("img-050120262", "05 JAN 2026"),
    ],
  },
  {
    id: "g-2025",
    label: "2025",
    items: [
      p("img-04122025", "04 DEZ 2025"),
      p("img-201120252", "20 NOV 2025"),
      p("img-20112025", "20 NOV 2025"),
      p("img-18112025", "18 NOV 2025"),
      p("img-21092025", "21 SET 2025"),
      p("img-100925", "10 SET 2025"),
      p("img-16062025", "16 JUN 2025"),
      p("img-17042025", "17 ABR 2025"),
    ],
  },
  { id: "g-2024", label: "2024", items: [p("img-15052024", "15 MAI 2024"), p("img-03032024", "03 MAR 2024")] },
  { id: "g-2023", label: "2023", items: [p("img-09092023", "09 SET 2023"), p("img-16072023", "16 JUL 2023"), p("img-160720232", "16 JUL 2023")] },
  { id: "g-2019", label: "2019", items: [p("img-02022019", "02 FEV 2019")] },
  { id: "g-2016", label: "2016", items: [p("img-14032016", "14 MAR 2016"), p("img-13032016", "13 MAR 2016")] },
  { id: "g-2006", label: "2006", items: [p("img-06082006", "06 AGO 2006")] },
  { id: "g-2004", label: "2004", items: [p("img-15062004", "15 JUN 2004"), p("img-150620042", "15 JUN 2004"), p("img-150620043", "15 JUN 2004")] },
  {
    id: "g-1996",
    label: "1996",
    items: [
      p("img-03121996", "03 DEZ 1996"),
      p("img-04081995", "25 JUL 1996"),
      p("img-040819952", "25 JUL 1996"),
      p("img-16031993", "19 JUL 1996"),
      p("img-19061994", "14 JUL 1996"),
      p("img-25071992", "14 JUL 1996"),
      p("img-04011996", "04 JAN 1996"),
    ],
  },
  { id: "g-1992", label: "1992", items: [p("img-03031996", "19 JUL 1992")] },
  { id: "g-1991", label: "1991", items: [p("img-19091991", "19 SET 1991"), p("img-18091991", "18 SET 1991")] },
  { id: "g-1987", label: "1987", items: [p("img-20101992", "15 AGO 1987"), p("img-12061987", "22 MAR 1987")] },
];
