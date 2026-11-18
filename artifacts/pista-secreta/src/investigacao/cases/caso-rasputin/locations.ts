import type { LocationDay } from "../../types";
import { calendar, L } from "./helpers";

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
    label: calendar("22 NOV"),
    stops: [
      { id: "ls-22nov-1", time: "07:00", title: "Gorokhovaya, 64", point: CASA },
      { id: "ls-22nov-2", time: "09:10", exitTime: "09:55", durationLabel: L("45 min", "45 min", "45 min"), title: L("Catedral de Kazan", "Kazan Cathedral", "Catedral de Kazán"), point: { x: 40, y: 40 } },
      { id: "ls-22nov-3", time: "11:02", exitTime: "12:20", durationLabel: L("1h18", "1 hr 18 min", "1 h 18 min"), title: L("Ministério do Interior (Fontanka)", "Ministry of Internal Affairs (Fontanka)", "Ministerio del Interior (Fontanka)"), point: { x: 62, y: 36 } },
      { id: "ls-22nov-4", time: "12:50", title: "Gorokhovaya, 64", point: CASA },
    ],
  },
  {
    id: "l-03dez",
    label: calendar("03 DEZ"),
    stops: [
      { id: "ls-03dez-1", time: "08:00", title: "Gorokhovaya, 64", point: CASA },
      { id: "ls-03dez-2", time: "18:04", exitTime: "19:35", durationLabel: L("1h31", "1 hr 31 min", "1 h 31 min"), title: L("Palácio Yusupov (Moika, 94)", "Yusupov Palace (Moika, 94)", "Palacio Yusupov (Moika, 94)"), point: YUSUPOV },
      { id: "ls-03dez-3", time: "19:58", title: "Gorokhovaya, 64", point: CASA },
    ],
  },
  {
    id: "l-08dez",
    label: calendar("08 DEZ"),
    stops: [
      { id: "ls-08dez-1", time: "09:00", title: "Gorokhovaya, 64", point: CASA },
      { id: "ls-08dez-2", time: "17:12", exitTime: "19:05", durationLabel: L("1h53", "1 hr 53 min", "1 h 53 min"), title: L("Palácio Yusupov (Moika, 94)", "Yusupov Palace (Moika, 94)", "Palacio Yusupov (Moika, 94)"), point: YUSUPOV },
      { id: "ls-08dez-3", time: "19:30", title: "Gorokhovaya, 64", point: CASA },
    ],
  },
  {
    id: "l-12dez",
    label: calendar("12 DEZ"),
    stops: [
      { id: "ls-12dez-1", time: "09:00", title: "Gorokhovaya, 64", point: CASA },
      { id: "ls-12dez-2", time: "14:00", exitTime: "15:30", durationLabel: L("1h30", "1 hr 30 min", "1 h 30 min"), title: L("Casas de Banho Públicas", "Public Baths", "Baños Públicos"), point: { x: 68, y: 66 } },
      { id: "ls-12dez-3", time: "15:45", exitTime: "16:10", durationLabel: L("25 min", "25 min", "25 min"), title: L("Farmácia do Dr. Badmaev", "Dr. Badmaev's Pharmacy", "Farmacia del Dr. Badmaev"), point: { x: 76, y: 44 } },
      { id: "ls-12dez-4", time: "17:00", title: "Gorokhovaya, 64", point: CASA },
    ],
  },
  {
    id: "l-15dez",
    label: calendar("15 DEZ"),
    stops: [
      { id: "ls-15dez-1", time: "09:00", title: "Gorokhovaya, 64", point: CASA },
      { id: "ls-15dez-2", time: "12:00", title: L("Estação Tsarskoye Selo", "Tsarskoye Selo Station", "Estación de Tsarskoye Selo"), point: { x: 70, y: 22 } },
      { id: "ls-15dez-3", time: "13:30", exitTime: "18:40", durationLabel: L("5h10", "5 hr 10 min", "5 h 10 min"), title: L("Palácio de Alexandre (Tsarskoye Selo)", "Alexander Palace (Tsarskoye Selo)", "Palacio de Alejandro (Tsarskoye Selo)"), point: { x: 90, y: 10 } },
      { id: "ls-15dez-4", time: "18:50", exitTime: "19:40", durationLabel: L("50 min", "50 min", "50 min"), title: L("Casa de Anya", "Anya's house", "Casa de Anya"), point: { x: 84, y: 24 } },
      { id: "ls-15dez-5", time: "21:00", title: "Gorokhovaya, 64", point: CASA },
    ],
  },
  {
    id: "l-16dez",
    label: calendar("16 DEZ"),
    stops: [{ id: "ls-16dez-1", time: "07:00", exitTime: "23:56", durationLabel: L("16h56", "16 hr 56 min", "16 h 56 min"), title: L("Gorokhovaya, 64 (em casa o dia inteiro)", "Gorokhovaya 64 (home all day)", "Gorokhovaya 64 (en casa todo el día)"), point: CASA }],
  },
  {
    id: "l-17dez",
    label: calendar("17 DEZ (madrugada)"),
    stops: [
      { id: "ls-17dez-1", time: "00:09", title: L("Em movimento (Gorokhovaya → Moika)", "In transit (Gorokhovaya → Moika)", "En movimiento (Gorokhovaya → Moika)"), point: { x: 34, y: 54 } },
      { id: "ls-17dez-2", time: "00:21", exitTime: "00:24", durationLabel: L("3 min", "3 min", "3 min"), title: L("Palácio Yusupov (Moika, 94) — pátio dos fundos", "Yusupov Palace (Moika, 94) — rear courtyard", "Palacio Yusupov (Moika, 94) — patio trasero"), point: YUSUPOV },
      { id: "ls-17dez-3", time: "00:24", exitTime: "02:42", durationLabel: L("2h18", "2 hr 18 min", "2 h 18 min"), title: L("Palácio Yusupov — porão (sinal fraco)", "Yusupov Palace — basement (weak signal)", "Palacio Yusupov — sótano (señal débil)"), point: YUSUPOV },
      { id: "ls-17dez-4", time: "02:42", exitTime: "02:50", durationLabel: L("8 min", "8 min", "8 min"), title: L("Palácio Yusupov — pátio externo", "Yusupov Palace — outer courtyard", "Palacio Yusupov — patio exterior"), point: YUSUPOV },
      { id: "ls-17dez-5", time: "02:51", exitTime: "04:56", durationLabel: L("2h05", "2 hr 5 min", "2 h 5 min"), title: L("Palácio Yusupov — parado", "Yusupov Palace — stationary", "Palacio Yusupov — detenido"), point: YUSUPOV },
      { id: "ls-17dez-6", time: "05:03", title: L("Em movimento (Moika → Ponte Petrovsky)", "In transit (Moika → Petrovsky Bridge)", "En movimiento (Moika → puente Petrovsky)"), point: { x: 26, y: 32 } },
      { id: "ls-17dez-7", time: "05:11", exitTime: "05:19", durationLabel: L("8 min", "8 min", "8 min"), title: L("Ponte Petrovsky — rio Malaya Nevka", "Petrovsky Bridge — Malaya Nevka River", "Puente Petrovsky — río Malaya Nevka"), point: PONTE },
      { id: "ls-17dez-8", time: "05:19", title: L("Sinal perdido", "Signal lost", "Señal perdida"), point: PONTE },
    ],
  },
];
