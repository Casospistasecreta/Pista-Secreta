import type { LocationDay } from "../../types";

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
    label: "20 NOV",
    stops: [
      { id: "ls-20nov-1", time: "08:00", title: "Rancho Rio Verde", point: RANCHO },
      { id: "ls-20nov-2", time: "09:13", exitTime: "09:48", durationLabel: "35 min", title: "Costureira Carmello", point: { x: 46, y: 60 } },
      { id: "ls-20nov-3", time: "09:57", exitTime: "11:22", durationLabel: "1h25", title: "Pilates Gymfit", point: { x: 40, y: 76 } },
      { id: "ls-20nov-4", time: "11:50", exitTime: "18:54", durationLabel: "7h04", title: "Rancho Rio Verde", point: RANCHO },
      { id: "ls-20nov-5", time: "19:06", exitTime: "20:06", durationLabel: "1h00", title: "Campo Baldio — Estrada das Flores", point: CAMPO },
    ],
  },
  {
    id: "l-22dez",
    label: "22 DEZ",
    stops: [
      { id: "ls-22dez-1", time: "06:00", title: "Rancho Rio Verde", point: RANCHO },
      { id: "ls-22dez-2", time: "06:50", exitTime: "12:50", durationLabel: "6h00", title: "E.M. Paulo Cândido de Figueiredo", point: { x: 58, y: 48 } },
      { id: "ls-22dez-3", time: "13:04", exitTime: "15:12", durationLabel: "2h08", title: "Júnior Veículos", point: { x: 34, y: 66 } },
      { id: "ls-22dez-4", time: "15:33", exitTime: "15:45", durationLabel: "12 min", title: "Casa de Ubirajara", point: { x: 82, y: 70 } },
      { id: "ls-22dez-5", time: "16:20", title: "Rancho Rio Verde", point: RANCHO },
    ],
  },
  {
    id: "l-05jan",
    label: "05 JAN",
    stops: [
      { id: "ls-05jan-1", time: "09:00", title: "Rancho Rio Verde", point: RANCHO },
      { id: "ls-05jan-2", time: "16:05", exitTime: "18:40", durationLabel: "2h35", title: "Casa de Shirley", point: { x: 52, y: 56 } },
      { id: "ls-05jan-3", time: "19:06", exitTime: "20:06", durationLabel: "1h00", title: "Campo Baldio — Estrada das Flores", point: CAMPO },
    ],
  },
];
