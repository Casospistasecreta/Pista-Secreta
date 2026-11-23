import type { LocationDay } from "../../types";

/*
 * Localização (roteiro 5.7). O roteiro traz só nomes e horários; as posições no mapa estilizado são relativas (genéricas)
 * e repetem o mesmo ponto para o mesmo lugar em dias diferentes. A permanência é calculada a partir dos horários.
 * O celular nunca passa pelo IML: vai à clínica, à marina e à funerária (é a pista "siga o celular, não o caixão").
 * Ajuste: "Redoção" (erro de digitação do roteiro) virou "Redação".
 */
const CASA = { x: 50, y: 44 };
const PACIFIC_PULSE = { x: 22, y: 66 };
const CLINICA = { x: 66, y: 20 };
const TEATRO = { x: 36, y: 34 };
const ESTUDIO = { x: 62, y: 56 };
const PAIS = { x: 80, y: 74 };
const MARINA = { x: 16, y: 88 };
const FUNERARIA = { x: 74, y: 40 };

export const locations: LocationDay[] = [
  {
    id: "l-08mai",
    label: "08 MAI",
    stops: [
      { id: "ls-08mai-1", time: "08:10", title: "Funerária Halloway", point: FUNERARIA },
      { id: "ls-08mai-2", time: "08:40", title: "Sinal perdido", redacted: true },
    ],
  },
  {
    id: "l-07mai",
    label: "07 MAI",
    stops: [
      { id: "ls-07-1", time: "07:00", exitTime: "23:40", durationLabel: "o dia todo", title: "Casa", point: CASA },
      { id: "ls-07n-1", time: "23:44", title: "Em movimento", redacted: true },
      { id: "ls-07n-2", time: "23:58", exitTime: "00:40", durationLabel: "42 min", title: "Clínica Stitch (Van Nuys)", point: CLINICA },
      { id: "ls-07n-3", time: "00:52", title: "Em movimento", redacted: true },
      { id: "ls-07n-4", time: "01:05", exitTime: "01:50", durationLabel: "45 min", title: "Marina Pelican, San Pedro", point: MARINA },
      { id: "ls-07n-5", time: "01:52", title: "Sinal perdido", redacted: true },
    ],
  },
  {
    id: "l-06mai",
    label: "06 MAI",
    stops: [
      { id: "ls-06-1", time: "09:00", title: "Casa", point: CASA },
      { id: "ls-06-2", time: "19:00", exitTime: "23:20", durationLabel: "4h20", title: "Casa dos pais (Maple Court, 66)", point: PAIS },
      { id: "ls-06-3", time: "23:38", title: "Casa", point: CASA },
    ],
  },
  {
    id: "l-03mai",
    label: "03 MAI",
    stops: [
      { id: "ls-03-1", time: "10:00", title: "Casa", point: CASA },
      { id: "ls-03-2", time: "14:00", exitTime: "23:30", durationLabel: "9h30", title: "Estúdio Reverb", point: ESTUDIO },
      { id: "ls-03-3", time: "00:05", title: "Casa", point: CASA },
    ],
  },
  {
    id: "l-18abr",
    label: "18 ABR",
    stops: [
      { id: "ls-18-1", time: "15:00", title: "Casa", point: CASA },
      { id: "ls-18-2", time: "17:00", exitTime: "23:20", durationLabel: "6h20", title: "Teatro do Prêmio Tube Music", point: TEATRO },
      { id: "ls-18-3", time: "00:10", title: "Casa", point: CASA },
    ],
  },
  {
    id: "l-28mar",
    label: "28 MAR",
    stops: [
      { id: "ls-28-1", time: "09:00", title: "Casa", point: CASA },
      { id: "ls-28-2", time: "15:10", exitTime: "16:20", durationLabel: "1h10", title: "Clínica Stitch (Van Nuys)", point: CLINICA },
      { id: "ls-28-3", time: "17:00", title: "Casa", point: CASA },
    ],
  },
  {
    id: "l-20mar",
    label: "20 MAR",
    stops: [
      { id: "ls-20-1", time: "09:00", title: "Casa", point: CASA },
      { id: "ls-20-2", time: "17:40", exitTime: "19:05", durationLabel: "1h25", title: "Redação da Pacific Pulse (Pier Road, 12)", point: PACIFIC_PULSE },
      { id: "ls-20-3", time: "20:00", title: "Casa", point: CASA },
    ],
  },
];
