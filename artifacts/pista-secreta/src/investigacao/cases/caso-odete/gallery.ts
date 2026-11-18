import type { GalleryGroup, MediaRef } from "../../types";
import type { LocalizedText } from "@/i18n/types";
import { L, photo } from "./helpers";

/*
 * Datas das fotos: vale o carimbo impresso na foto quando existe; sem carimbo,
 * vale a data do nome do arquivo (IMG_DDMMAAAA; IMG_100925 foi lido como DDMMAA).
 * Carimbos lidos: 03031996→19 JUL 1992, 16031993→19 JUL 1996,
 * 04081995 (×2)→25 JUL 1996, 19061994→14 JUL 1996, 25071992→14 JUL 1996,
 * 20101992→15 AGO 1987 (dia parcialmente cortado), 12061987→22 MAR 1987.
 * Grupos por ano (mais recente primeiro); dentro do ano, mais recente primeiro.
 */
const p = (file: string, takenAt: LocalizedText): MediaRef => photo(file, `fotos/${file}.webp`, takenAt);

export const gallery: GalleryGroup[] = [
  {
    id: "g-2026",
    label: "2026",
    items: [
      p("img-11012026", L("11 JAN 2026", "JAN 11, 2026", "11 ENE 2026")),
      p("img-05012026", L("05 JAN 2026", "JAN 5, 2026", "5 ENE 2026")),
      p("img-050120262", L("05 JAN 2026", "JAN 5, 2026", "5 ENE 2026")),
    ],
  },
  {
    id: "g-2025",
    label: "2025",
    items: [
      p("img-04122025", L("04 DEZ 2025", "DEC 4, 2025", "4 DIC 2025")),
      p("img-201120252", L("20 NOV 2025", "NOV 20, 2025", "20 NOV 2025")),
      p("img-20112025", L("20 NOV 2025", "NOV 20, 2025", "20 NOV 2025")),
      p("img-18112025", L("18 NOV 2025", "NOV 18, 2025", "18 NOV 2025")),
      p("img-21092025", L("21 SET 2025", "SEP 21, 2025", "21 SEP 2025")),
      p("img-100925", L("10 SET 2025", "SEP 10, 2025", "10 SEP 2025")),
      p("img-16062025", L("16 JUN 2025", "JUN 16, 2025", "16 JUN 2025")),
      p("img-17042025", L("17 ABR 2025", "APR 17, 2025", "17 ABR 2025")),
    ],
  },
  { id: "g-2024", label: "2024", items: [p("img-15052024", L("15 MAI 2024", "MAY 15, 2024", "15 MAY 2024")), p("img-03032024", L("03 MAR 2024", "MAR 3, 2024", "3 MAR 2024"))] },
  { id: "g-2023", label: "2023", items: [p("img-09092023", L("09 SET 2023", "SEP 9, 2023", "9 SEP 2023")), p("img-16072023", L("16 JUL 2023", "JUL 16, 2023", "16 JUL 2023")), p("img-160720232", L("16 JUL 2023", "JUL 16, 2023", "16 JUL 2023"))] },
  { id: "g-2019", label: "2019", items: [p("img-02022019", L("02 FEV 2019", "FEB 2, 2019", "2 FEB 2019"))] },
  { id: "g-2016", label: "2016", items: [p("img-14032016", L("14 MAR 2016", "MAR 14, 2016", "14 MAR 2016")), p("img-13032016", L("13 MAR 2016", "MAR 13, 2016", "13 MAR 2016"))] },
  { id: "g-2006", label: "2006", items: [p("img-06082006", L("06 AGO 2006", "AUG 6, 2006", "6 AGO 2006"))] },
  { id: "g-2004", label: "2004", items: [p("img-15062004", L("15 JUN 2004", "JUN 15, 2004", "15 JUN 2004")), p("img-150620042", L("15 JUN 2004", "JUN 15, 2004", "15 JUN 2004")), p("img-150620043", L("15 JUN 2004", "JUN 15, 2004", "15 JUN 2004"))] },
  {
    id: "g-1996",
    label: "1996",
    items: [
      p("img-03121996", L("03 DEZ 1996", "DEC 3, 1996", "3 DIC 1996")),
      p("img-04081995", L("25 JUL 1996", "JUL 25, 1996", "25 JUL 1996")),
      p("img-040819952", L("25 JUL 1996", "JUL 25, 1996", "25 JUL 1996")),
      p("img-16031993", L("19 JUL 1996", "JUL 19, 1996", "19 JUL 1996")),
      p("img-19061994", L("14 JUL 1996", "JUL 14, 1996", "14 JUL 1996")),
      p("img-25071992", L("14 JUL 1996", "JUL 14, 1996", "14 JUL 1996")),
      p("img-04011996", L("04 JAN 1996", "JAN 4, 1996", "4 ENE 1996")),
    ],
  },
  { id: "g-1992", label: "1992", items: [p("img-03031996", L("19 JUL 1992", "JUL 19, 1992", "19 JUL 1992"))] },
  { id: "g-1991", label: "1991", items: [p("img-19091991", L("19 SET 1991", "SEP 19, 1991", "19 SEP 1991")), p("img-18091991", L("18 SET 1991", "SEP 18, 1991", "18 SEP 1991"))] },
  { id: "g-1987", label: "1987", items: [p("img-20101992", L("15 AGO 1987", "AUG 15, 1987", "15 AGO 1987")), p("img-12061987", L("22 MAR 1987", "MAR 22, 1987", "22 MAR 1987"))] },
];
