import type { LocationDay } from "../../types";

/*
 * Localização (roteiro 5.5). O roteiro traz só nomes e horários; as posições no mapa estilizado são relativas
 * (genéricas) e repetem o mesmo ponto para o mesmo lugar em dias diferentes. A permanência é calculada a partir
 * dos horários do roteiro.
 */
const CASA = { x: 46, y: 56 };
const YUSUPOV = { x: 22, y: 50 };
const PONTE = { x: 30, y: 12 };

export const locations: LocationDay[] = [
  {
    id: "l-22nov",
    label: "22 NOV",
    stops: [
      { id: "ls-22nov-1", time: "07:00", title: "Gorokhovaya, 64", point: CASA },
      { id: "ls-22nov-2", time: "09:10", exitTime: "09:55", durationLabel: "45 min", title: "Catedral de Kazan", point: { x: 40, y: 40 } },
      { id: "ls-22nov-3", time: "11:02", exitTime: "12:20", durationLabel: "1h18", title: "Ministério do Interior (Fontanka)", point: { x: 62, y: 36 } },
      { id: "ls-22nov-4", time: "12:50", title: "Gorokhovaya, 64", point: CASA },
    ],
  },
  {
    id: "l-03dez",
    label: "03 DEZ",
    stops: [
      { id: "ls-03dez-1", time: "08:00", title: "Gorokhovaya, 64", point: CASA },
      { id: "ls-03dez-2", time: "18:04", exitTime: "19:35", durationLabel: "1h31", title: "Palácio Yusupov (Moika, 94)", point: YUSUPOV },
      { id: "ls-03dez-3", time: "19:58", title: "Gorokhovaya, 64", point: CASA },
    ],
  },
  {
    id: "l-08dez",
    label: "08 DEZ",
    stops: [
      { id: "ls-08dez-1", time: "09:00", title: "Gorokhovaya, 64", point: CASA },
      { id: "ls-08dez-2", time: "17:12", exitTime: "19:05", durationLabel: "1h53", title: "Palácio Yusupov (Moika, 94)", point: YUSUPOV },
      { id: "ls-08dez-3", time: "19:30", title: "Gorokhovaya, 64", point: CASA },
    ],
  },
  {
    id: "l-12dez",
    label: "12 DEZ",
    stops: [
      { id: "ls-12dez-1", time: "09:00", title: "Gorokhovaya, 64", point: CASA },
      { id: "ls-12dez-2", time: "14:00", exitTime: "15:30", durationLabel: "1h30", title: "Casas de Banho Públicas", point: { x: 68, y: 66 } },
      { id: "ls-12dez-3", time: "15:45", exitTime: "16:10", durationLabel: "25 min", title: "Farmácia do Dr. Badmaev", point: { x: 76, y: 44 } },
      { id: "ls-12dez-4", time: "17:00", title: "Gorokhovaya, 64", point: CASA },
    ],
  },
  {
    id: "l-15dez",
    label: "15 DEZ",
    stops: [
      { id: "ls-15dez-1", time: "09:00", title: "Gorokhovaya, 64", point: CASA },
      { id: "ls-15dez-2", time: "12:00", title: "Estação Tsarskoye Selo", point: { x: 70, y: 22 } },
      { id: "ls-15dez-3", time: "13:30", exitTime: "18:40", durationLabel: "5h10", title: "Palácio de Alexandre (Tsarskoye Selo)", point: { x: 90, y: 10 } },
      { id: "ls-15dez-4", time: "18:50", exitTime: "19:40", durationLabel: "50 min", title: "Casa de Anya", point: { x: 84, y: 24 } },
      { id: "ls-15dez-5", time: "21:00", title: "Gorokhovaya, 64", point: CASA },
    ],
  },
  {
    id: "l-16dez",
    label: "16 DEZ",
    stops: [{ id: "ls-16dez-1", time: "07:00", exitTime: "23:56", durationLabel: "16h56", title: "Gorokhovaya, 64 (em casa o dia inteiro)", point: CASA }],
  },
  {
    id: "l-17dez",
    label: "17 DEZ (madrugada)",
    stops: [
      { id: "ls-17dez-1", time: "00:09", title: "Em movimento (Gorokhovaya → Moika)", point: { x: 34, y: 54 } },
      { id: "ls-17dez-2", time: "00:21", exitTime: "00:24", durationLabel: "3 min", title: "Palácio Yusupov (Moika, 94) — pátio dos fundos", point: YUSUPOV },
      { id: "ls-17dez-3", time: "00:24", exitTime: "02:42", durationLabel: "2h18", title: "Palácio Yusupov — porão (sinal fraco)", point: YUSUPOV },
      { id: "ls-17dez-4", time: "02:42", exitTime: "02:50", durationLabel: "8 min", title: "Palácio Yusupov — pátio externo", point: YUSUPOV },
      { id: "ls-17dez-5", time: "02:51", exitTime: "04:56", durationLabel: "2h05", title: "Palácio Yusupov — parado", point: YUSUPOV },
      { id: "ls-17dez-6", time: "05:03", title: "Em movimento (Moika → Ponte Petrovsky)", point: { x: 26, y: 32 } },
      { id: "ls-17dez-7", time: "05:11", exitTime: "05:19", durationLabel: "8 min", title: "Ponte Petrovsky — rio Malaya Nevka", point: PONTE },
      { id: "ls-17dez-8", time: "05:19", title: "Sinal perdido", point: PONTE },
    ],
  },
];
