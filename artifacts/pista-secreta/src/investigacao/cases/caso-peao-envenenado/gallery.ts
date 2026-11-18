import type { GalleryGroup, MediaRef } from "../../types";
import type { LocalizedText } from "@/i18n/types";
import { calendar, galleryPhoto, L } from "./helpers";

/*
 * Fotos (roteiro 4.4). Nome do arquivo = IMG_MMDD_HHMM; a data exibida vem dele. Mais recentes primeiro.
 * Ajustes em relação ao roteiro:
 *  - IMG_0402_0015 (print do Gambet) não veio no ZIP: foi gerada como tela de interface (substituível pelo mesmo nome).
 *  - Fotos com data depois de 10 MAI (0521, 0601, 0612, 0613, 0710, 0913, 1022, 1030) não podem ser deste ano, pois o aparelho para em 10 MAI:
 *    entram em "Anos anteriores", datadas de 2025. Para mudar, altere o ano em `takenAt`.
 *  - IMG_0418_07046 foi lida como 07:04 (arquivo img-0418-0704).
 */
const p = (stamp: string, takenAt: string, caption: LocalizedText): MediaRef => {
  const [md, hm] = stamp.split("_");
  return galleryPhoto(`ph-${stamp}`, `fotos/img-${md}-${hm}.webp`, calendar(takenAt), caption);
};

export const gallery: GalleryGroup[] = [
  { id: "g-0510", label: calendar("10 MAI"), items: [
    p("0510_2057", "10 MAI · 20:57", L("A mesma gaveta, vazia, com a etiqueta CANETA — EMERGÊNCIA", "The same empty drawer, labeled EPINEPHRINE PEN — EMERGENCY", "El mismo cajón vacío, con la etiqueta PLUMA DE ADRENALINA — EMERGENCIA")),
    p("0510_2041", "10 MAI · 20:41", L("Cannoli com pontinhos verdes em uma caixa, com um cartão", "A cannoli with green specks in a box beside a card", "Cannoli con puntitos verdes en una caja, junto a una tarjeta")),
    p("0510_1540", "10 MAI · 15:40", L("Telão da Arena mostrando o tabuleiro da Partida 64", "Arena screen showing the board from Game 64", "Pantalla de la Arena con el tablero de la Partida 64")),
  ] },
  { id: "g-0507", label: calendar("07 MAI"), items: [p("0507_1140", "07 MAI · 11:40", L("Caneta de adrenalina na gaveta de cima", "Epinephrine pen in the top drawer", "Pluma de adrenalina en el cajón superior"))] },
  { id: "g-0424", label: calendar("24 ABR"), items: [p("0424_2350", "24 ABR · 23:50", L("Porta de vidro do Cassino Gambet à noite", "Glass doors at the GAMBET Casino at night", "Puertas de cristal del casino GAMBET por la noche"))] },
  { id: "g-0418", label: calendar("18 ABR"), items: [
    p("0418_1120", "18 ABR · 11:20", L("Ressaca em um sofá dourado", "Hungover on a gold sofa", "Resaca en un sofá dorado")),
    p("0418_0704", "18 ABR · 07:04", L("Sala de reuniões da diretoria", "Boardroom", "Sala de reuniones de la directiva")),
    p("0418_0354", "18 ABR · 03:54", L("Madrugada de festa", "A party that ran into the early hours", "Fiesta de madrugada")),
  ] },
  { id: "g-0412", label: calendar("12 ABR"), items: [p("0412_1630", "12 ABR · 16:30", L("Bispo branco em uma espreguiçadeira de praia", "White Bishop lounging on a beach chair", "Obispo Blanco en una tumbona de playa"))] },
  { id: "g-0402", label: calendar("02 ABR"), items: [p("0402_0015", "02 ABR · 00:15", L("Print da conta do Gambet no nome da Dama, com cartão do Rei", "Screenshot of the GAMBET account in the Queen's name, charged to the King's card", "Captura de la cuenta de GAMBET a nombre de la Reina, con la tarjeta del Rey"))] },
  { id: "g-0321", label: calendar("21 MAR"), items: [p("0321_0810", "21 MAR · 08:10", L("Lata de cerveja Xeque Mate", "Xeque Mate beer can", "Lata de cerveza Xeque Mate"))] },
  { id: "g-0314", label: calendar("14 MAR"), items: [
    p("0314_1934", "14 MAR · 19:34", L("Jogo beneficente de Peões e Cavalos em um estádio", "A charity match of Pawns and Knights at a stadium", "Partido benéfico de Peones y Caballos en un estadio")),
    p("0314_1530", "14 MAR · 15:30", L("Rei Preto e Rei Branco em mesas separadas por uma mesa vazia", "Black King and White King at tables separated by an empty table", "Rey Negro y Rey Blanco en mesas separadas por una mesa vacía")),
  ] },
  { id: "g-0214", label: calendar("14 FEV"), items: [p("0214_2340", "14 FEV · 23:40", L("Prato com risoto quadriculado", "A plate of checkerboard risotto", "Plato de risotto a cuadros"))] },
  { id: "g-0212", label: calendar("12 FEV"), items: [p("0212_2105", "12 FEV · 21:05", L("Rei e Dama no jantar do Fianchetto", "King and Queen at dinner at Fianchetto", "Rey y Reina en una cena en Fianchetto"))] },
  { id: "g-0118", label: calendar("18 JAN"), items: [p("0118_0900", "18 JAN · 09:00", L("Gato derrubando o Rei de um tabuleiro", "A cat knocking the King off a chessboard", "Un gato tira al Rey del tablero"))] },
  { id: "g-2025", label: L("ANOS ANTERIORES (2025)", "OLDER PHOTOS (2025)", "AÑOS ANTERIORES (2025)"), items: [
    p("1030_0913", "30 OUT 2025 · 09:13", L("Rei e Dama em um jardim de palácio", "King and Queen in a palace garden", "Rey y Reina en un jardín del palacio")),
    p("1022_2250", "22 OUT 2025 · 22:50", L("Noite em uma casa noturna", "Night out at a club", "Noche en una discoteca")),
    p("0913_1227", "13 SET 2025 · 12:27", L("Churrasco no jardim", "Backyard barbecue", "Asado en el jardín")),
    p("0710_1306", "10 JUL 2025 · 13:06", L("Rei no alto de uma montanha", "King on a mountaintop", "Rey en lo alto de una montaña")),
    p("0613_0904", "13 JUN 2025 · 09:04", L("Shopping, com sacolas", "Shopping bags in hand", "De compras, con bolsas")),
    p("0612_2130", "12 JUN 2025 · 21:30", L("Rei em um quarto, à noite", "King in a room at night", "Rey en una habitación, de noche")),
    p("0601_1122", "01 JUN 2025 · 11:22", L("Banheiro de mármore e ouro", "Marble-and-gold bathroom", "Baño de mármol y oro")),
    p("0521_0800", "21 MAI 2025 · 08:00", L("Rei na cadeira do dentista", "King in the dentist's chair", "Rey en el sillón del dentista")),
  ] },
];
