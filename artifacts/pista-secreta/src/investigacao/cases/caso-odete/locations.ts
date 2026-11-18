import type { LocationDay } from "../../types";
import { L } from "./helpers";

/*
 * O roteiro traz só nomes e horários. As posições no mapa estilizado são
 * relativas (genéricas) e repetem o mesmo ponto para o mesmo lugar em dias
 * diferentes. A permanência é calculada a partir dos horários do roteiro.
 */
const RANCHO = { x: 74, y: 24 };
const CAMPO = { x: 20, y: 30 };

export const locations: LocationDay[] = [
  {
    id: "l-20nov",
    label: L("20 NOV", "NOV 20", "20 NOV"),
    stops: [
      { id: "ls-20nov-1", time: "08:00", title: "Rancho Rio Verde", point: RANCHO },
      { id: "ls-20nov-2", time: "09:13", exitTime: "09:48", durationLabel: L("35 min", "35 min", "35 min"), title: L("Costureira Carmello", "Carmello Tailor Shop", "Taller de costura Carmello"), point: { x: 46, y: 60 } },
      { id: "ls-20nov-3", time: "09:57", exitTime: "11:22", durationLabel: L("1h25", "1 hr 25 min", "1 h 25 min"), title: "Pilates Gymfit", point: { x: 40, y: 76 } },
      { id: "ls-20nov-4", time: "11:50", exitTime: "18:54", durationLabel: L("7h04", "7 hr 4 min", "7 h 4 min"), title: "Rancho Rio Verde", point: RANCHO },
      { id: "ls-20nov-5", time: "19:06", exitTime: "20:06", durationLabel: L("1h00", "1 hr", "1 h"), title: L("Campo Baldio — Estrada das Flores", "Empty Lot — Estrada das Flores", "Terreno baldío — Estrada das Flores"), point: CAMPO },
    ],
  },
  {
    id: "l-22dez",
    label: L("22 DEZ", "DEC 22", "22 DIC"),
    stops: [
      { id: "ls-22dez-1", time: "06:00", title: "Rancho Rio Verde", point: RANCHO },
      { id: "ls-22dez-2", time: "06:50", exitTime: "12:50", durationLabel: L("6h00", "6 hr", "6 h"), title: "E.M. Paulo Cândido de Figueiredo", point: { x: 58, y: 48 } },
      { id: "ls-22dez-3", time: "13:04", exitTime: "15:12", durationLabel: L("2h08", "2 hr 8 min", "2 h 8 min"), title: "Júnior Veículos", point: { x: 34, y: 66 } },
      { id: "ls-22dez-4", time: "15:33", exitTime: "15:45", durationLabel: L("12 min", "12 min", "12 min"), title: L("Casa de Ubirajara", "Ubirajara's House", "Casa de Ubirajara"), point: { x: 82, y: 70 } },
      { id: "ls-22dez-5", time: "16:20", title: "Rancho Rio Verde", point: RANCHO },
    ],
  },
  {
    id: "l-05jan",
    label: L("05 JAN", "JAN 5", "5 ENE"),
    stops: [
      { id: "ls-05jan-1", time: "09:00", title: "Rancho Rio Verde", point: RANCHO },
      { id: "ls-05jan-2", time: "16:05", exitTime: "18:40", durationLabel: L("2h35", "2 hr 35 min", "2 h 35 min"), title: L("Casa de Shirley", "Shirley's House", "Casa de Shirley"), point: { x: 52, y: 56 } },
      { id: "ls-05jan-3", time: "19:06", exitTime: "20:06", durationLabel: L("1h00", "1 hr", "1 h"), title: L("Campo Baldio — Estrada das Flores", "Empty Lot — Estrada das Flores", "Terreno baldío — Estrada das Flores"), point: CAMPO },
    ],
  },
];
