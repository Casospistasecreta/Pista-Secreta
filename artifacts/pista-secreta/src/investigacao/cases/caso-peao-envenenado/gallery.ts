import type { GalleryGroup, MediaRef } from "../../types";
import { galleryPhoto } from "./helpers";

/*
 * Fotos (roteiro 4.4). Nome do arquivo = IMG_MMDD_HHMM; a data exibida vem dele. Mais recentes primeiro.
 * Ajustes em relação ao roteiro:
 *  - IMG_0402_0015 (print do Gambet) não veio no ZIP: foi gerada como tela de interface (substituível pelo mesmo nome).
 *  - Fotos com data depois de 10 MAI (0521, 0601, 0612, 0613, 0710, 0913, 1022, 1030) não podem ser deste ano, pois o aparelho para em 10 MAI:
 *    entram em "Anos anteriores", datadas de 2025. Para mudar, altere o ano em `takenAt`.
 *  - IMG_0418_07046 foi lida como 07:04 (arquivo img-0418-0704).
 */
const p = (stamp: string, takenAt: string, caption: string): MediaRef => {
  const [md, hm] = stamp.split("_");
  return galleryPhoto(`ph-${stamp}`, `fotos/img-${md}-${hm}.webp`, takenAt, caption);
};

export const gallery: GalleryGroup[] = [
  { id: "g-0510", label: "10 MAI", items: [
    p("0510_2057", "10 MAI · 20:57", "A mesma gaveta, vazia, com a etiqueta CANETA — EMERGÊNCIA"),
    p("0510_2041", "10 MAI · 20:41", "Cannoli com pontinhos verdes em uma caixa, com um cartão"),
    p("0510_1540", "10 MAI · 15:40", "Telão da Arena mostrando o tabuleiro da Partida 64"),
  ] },
  { id: "g-0507", label: "07 MAI", items: [p("0507_1140", "07 MAI · 11:40", "Caneta de adrenalina na gaveta de cima")] },
  { id: "g-0424", label: "24 ABR", items: [p("0424_2350", "24 ABR · 23:50", "Porta de vidro do Cassino Gambet à noite")] },
  { id: "g-0418", label: "18 ABR", items: [
    p("0418_1120", "18 ABR · 11:20", "Ressaca em um sofá dourado"),
    p("0418_0704", "18 ABR · 07:04", "Sala de reuniões da diretoria"),
    p("0418_0354", "18 ABR · 03:54", "Madrugada de festa"),
  ] },
  { id: "g-0412", label: "12 ABR", items: [p("0412_1630", "12 ABR · 16:30", "Bispo branco em uma espreguiçadeira de praia")] },
  { id: "g-0402", label: "02 ABR", items: [p("0402_0015", "02 ABR · 00:15", "Print da conta do Gambet no nome da Dama, com cartão do Rei")] },
  { id: "g-0321", label: "21 MAR", items: [p("0321_0810", "21 MAR · 08:10", "Lata de cerveja Xeque Mate")] },
  { id: "g-0314", label: "14 MAR", items: [
    p("0314_1934", "14 MAR · 19:34", "Jogo beneficente de Peões e Cavalos em um estádio"),
    p("0314_1530", "14 MAR · 15:30", "Rei Preto e Rei Branco em mesas separadas por uma mesa vazia"),
  ] },
  { id: "g-0214", label: "14 FEV", items: [p("0214_2340", "14 FEV · 23:40", "Prato com risoto quadriculado")] },
  { id: "g-0212", label: "12 FEV", items: [p("0212_2105", "12 FEV · 21:05", "Rei e Dama no jantar do Fianchetto")] },
  { id: "g-0118", label: "18 JAN", items: [p("0118_0900", "18 JAN · 09:00", "Gato derrubando o Rei de um tabuleiro")] },
  { id: "g-2025", label: "ANOS ANTERIORES (2025)", items: [
    p("1030_0913", "30 OUT 2025 · 09:13", "Rei e Dama em um jardim de palácio"),
    p("1022_2250", "22 OUT 2025 · 22:50", "Noite em uma casa noturna"),
    p("0913_1227", "13 SET 2025 · 12:27", "Churrasco no jardim"),
    p("0710_1306", "10 JUL 2025 · 13:06", "Rei no alto de uma montanha"),
    p("0613_0904", "13 JUN 2025 · 09:04", "Shopping, com sacolas"),
    p("0612_2130", "12 JUN 2025 · 21:30", "Rei em um quarto, à noite"),
    p("0601_1122", "01 JUN 2025 · 11:22", "Banheiro de mármore e ouro"),
    p("0521_0800", "21 MAI 2025 · 08:00", "Rei na cadeira do dentista"),
  ] },
];
