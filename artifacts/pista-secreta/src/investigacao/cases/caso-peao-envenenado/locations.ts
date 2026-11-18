import type { LocationDay, LocationStop } from "../../types";
import type { LocalizedText } from "@/i18n/types";
import { calendar, L } from "./helpers";

/*
 * Localização (roteiro 4.5), desenhada como tabuleiro roxo: cada parada fica numa Casa (ex.: e8).
 * O roteiro dá a casa só de alguns lugares; as demais foram escolhidas aqui (Clube Fianchetto g2, Arena ROQUE g1).
 */
const s = (id: string, time: string, title: LocalizedText, square: string, extra: Partial<LocationStop> = {}): LocationStop => ({
  id, time, title, square,
  address: L(`Casa ${square}`, `Square ${square}`, `Casilla ${square}`),
  ...extra,
});

export const locations: LocationDay[] = [
  { id: "l-1005", label: calendar("10 MAI"), stops: [
    s("l1005-1", "08:00", L("Palácio e8", "e8 Palace", "Palacio e8"), "e8"),
    s("l1005-2", "11:12", L("Arena Central", "Central Arena", "Arena Central"), "e4", { exitTime: "18:20", durationLabel: "7h08" }),
    s("l1005-3", "18:32", L("Palácio e8", "e8 Palace", "Palacio e8"), "e8", { exitTime: "21:14", durationLabel: "2h42" }),
    s("l1005-4", "21:14", L("Último sinal do aparelho", "Device's last signal", "Última señal del dispositivo"), "e8", { redacted: true }),
  ] },
  { id: "l-1005-tor", label: L("10 MAI · TOR (AO VIVO)", "MAY 10 · TOR (LIVE)", "10 MAY · TOR (EN VIVO)"), stops: [
    s("l1005t-1", "20:59", L("Coluna h — trânsito (compartilhada por Tor)", "h-file — traffic (shared by Tor)", "Columna h — tráfico (compartida por Tor)"), "h2"),
    s("l1005t-2", "21:12", L("Coluna h — parado (compartilhada por Tor)", "h-file — stopped (shared by Tor)", "Columna h — detenido (compartida por Tor)"), "h5"),
    s("l1005t-3", "21:29", L("Palácio e8 — chegada (compartilhada por Tor)", "e8 Palace — arrival (shared by Tor)", "Palacio e8 — llegada (compartida por Tor)"), "e8"),
  ] },
  { id: "l-0805", label: calendar("08 MAI"), stops: [
    s("l0805-1", "08:00", L("Palácio e8", "e8 Palace", "Palacio e8"), "e8"),
    s("l0805-2", "09:30", L("Clube Fianchetto", "Fianchetto Club", "Club Fianchetto"), "g2", { exitTime: "11:45", durationLabel: "2h15" }),
    s("l0805-3", "14:02", L("Cartório", "Registry office", "Registro"), "b1", { exitTime: "14:40", durationLabel: L("38 min", "38 min", "38 min") }),
    s("l0805-4", "15:20", L("Palácio e8", "e8 Palace", "Palacio e8"), "e8"),
  ] },
  { id: "l-2404", label: calendar("24 ABR"), stops: [
    s("l2404-1", "21:00", L("Palácio e8", "e8 Palace", "Palacio e8"), "e8"),
    s("l2404-2", "23:05", L("Cassino Gambet", "GAMBET Casino", "Casino GAMBET"), "c5", { exitTime: "00:20", durationLabel: "1h15" }),
    s("l2404-3", "00:40", L("Palácio e8", "e8 Palace", "Palacio e8"), "e8"),
  ] },
];
