import type { GalleryGroup, MediaRef } from "../../types";
import { galleryPhoto } from "./helpers";

/*
 * Fotos (roteiro 5.6). O nome do arquivo segue IMG_AAAAMMDD_HHMM e a data/hora exibida vem dele, como pede o roteiro
 * ("usar os metadados do nome da foto"). Entram também as fotos que o ZIP trouxe e o quadro do roteiro não lista
 * (1992, 1993, 20 JAN, 07 MAI 23:59 e a de 03 MAI "Eles na piscina").
 * Mais recentes primeiro.
 */
const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
const STAMPS = [
  "19940508_0149",
  "19940508_0108",
  "19940507_2359",
  "19940507_2231",
  "19940507_2214",
  "19940507_1702",
  "19940506_2030",
  "19940505_1655",
  "19940503_1730",
  "19940502_0920",
  "19940418_2230",
  "19940405_1500",
  "19940320_1900",
  "19940312_2250",
  "19940120_2001",
  "19940108_0150",
  "19931218_0149",
  "19930911_1020",
  "19921122_0349",
];

const dateLabel = (date: string) => `${date.slice(6, 8)} ${MONTHS[Number(date.slice(4, 6)) - 1]} ${date.slice(0, 4)}`;

const photoFor = (stamp: string): MediaRef => {
  const [date, time] = stamp.split("_");
  return galleryPhoto(`ph-${stamp}`, `fotos/img-${date}-${time}.webp`, `${dateLabel(date)} · ${time.slice(0, 2)}:${time.slice(2)}`);
};

export const gallery: GalleryGroup[] = STAMPS.reduce<GalleryGroup[]>((groups, stamp) => {
  const date = stamp.split("_")[0];
  const last = groups[groups.length - 1];
  if (last && last.id === `g-${date}`) last.items.push(photoFor(stamp));
  else groups.push({ id: `g-${date}`, label: dateLabel(date), items: [photoFor(stamp)] });
  return groups;
}, []);
