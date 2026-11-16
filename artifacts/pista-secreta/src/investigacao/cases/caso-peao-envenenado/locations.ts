import type { LocationDay, LocationStop } from "../../types";

/*
 * Localização (roteiro 4.5), desenhada como tabuleiro roxo: cada parada fica numa Casa (ex.: e8).
 * O roteiro dá a casa só de alguns lugares; as demais foram escolhidas aqui (Clube Fianchetto g2, Arena ROQUE g1).
 */
const s = (id: string, time: string, title: string, square: string, extra: Partial<LocationStop> = {}): LocationStop => ({ id, time, title, square, address: `Casa ${square}`, ...extra });

export const locations: LocationDay[] = [
  { id: "l-1005", label: "10 MAI", stops: [
    s("l1005-1", "08:00", "Palácio e8", "e8"),
    s("l1005-2", "11:12", "Arena Central", "e4", { exitTime: "18:20", durationLabel: "7h08" }),
    s("l1005-3", "18:32", "Palácio e8", "e8", { exitTime: "21:14", durationLabel: "2h42" }),
    s("l1005-4", "21:14", "Último sinal do aparelho", "e8", { redacted: true }),
  ] },
  { id: "l-1005-tor", label: "10 MAI · TOR (AO VIVO)", stops: [
    s("l1005t-1", "20:59", "Coluna h — trânsito (compartilhada por Tor)", "h2"),
    s("l1005t-2", "21:12", "Coluna h — parado (compartilhada por Tor)", "h5"),
    s("l1005t-3", "21:29", "Palácio e8 — chegada (compartilhada por Tor)", "e8"),
  ] },
  { id: "l-0805", label: "08 MAI", stops: [
    s("l0805-1", "08:00", "Palácio e8", "e8"),
    s("l0805-2", "09:30", "Clube Fianchetto", "g2", { exitTime: "11:45", durationLabel: "2h15" }),
    s("l0805-3", "14:02", "Cartório", "b1", { exitTime: "14:40", durationLabel: "38 min" }),
    s("l0805-4", "15:20", "Palácio e8", "e8"),
  ] },
  { id: "l-2404", label: "24 ABR", stops: [
    s("l2404-1", "21:00", "Palácio e8", "e8"),
    s("l2404-2", "23:05", "Cassino Gambet", "c5", { exitTime: "00:20", durationLabel: "1h15" }),
    s("l2404-3", "00:40", "Palácio e8", "e8"),
  ] },
];
