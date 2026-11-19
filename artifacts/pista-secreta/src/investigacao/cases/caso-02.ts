import type { CaseData } from "../types";
import { calendar, L } from "./localized";

/**
 * CASO 02 — teste de arquitetura.
 *
 * Propositalmente mínimo e diferente do Caso 01: outra vítima, outra senha,
 * menos itens em cada app, sem conversa arquivada nem álbum oculto (só uma
 * nota protegida, para provar que o desbloqueio também é 100% orientado a
 * dado). Nenhum componente foi tocado para este caso existir.
 */
export const caso02: CaseData = {
  slug: "caso-02",
  title: L("Registro do turno da noite", "Night shift log", "Registro del turno de noche"),
  subtitle: L("Teste de arquitetura — Caso 02", "Architecture test — Case 02", "Prueba de arquitectura — Caso 02"),
  victim: { name: "R. ALMEIDA", age: 41, city: "Curitiba", avatarSeed: "caso02-vitima" },
  device: {
    passcode: "7391",
    carrier: L("SINAL FRACO", "WEAK SIGNAL", "SEÑAL DÉBIL"),
    batteryPercent: 12,
    dateLabel: L("sábado, 19 de setembro", "Saturday, September 19", "sábado, 19 de septiembre"),
    frozenTime: "03:12",
  },

  messages: [
    {
      id: "c-central",
      person: { id: "p-central", name: "Central", avatarSeed: "caso02-central" },
      preview: L("Confirma o horário de saída?", "Can you confirm the departure time?", "¿Confirmas la hora de salida?"),
      time: "02:47",
      unread: 1,
      messages: [
        { id: "m1", from: "them", at: "02:30", dayLabel: L("Hoje", "Today", "Hoy"), text: L("Confirma o horário de saída?", "Can you confirm the departure time?", "¿Confirmas la hora de salida?") },
        { id: "m2", from: "victim", at: "02:47", text: L("Texto de demonstração do Caso 02.", "Sample text for Case 02.", "Texto de ejemplo del Caso 02.") },
      ],
    },
  ],

  social: {
    profile: {
      handle: "@r.almeida",
      displayName: "R. ALMEIDA",
      bio: L("Perfil de demonstração do Caso 02.", "Sample profile for Case 02.", "Perfil de ejemplo del Caso 02."),
      avatarSeed: "caso02-vitima",
      posts: 1,
      followers: 58,
      following: 12,
    },
    posts: [
      {
        id: "post-1",
        author: "@r.almeida",
        media: [{ id: "sp1", kind: "photo", seed: "caso02-post-1" }],
        caption: L("Legenda de demonstração do Caso 02.", "Sample caption for Case 02.", "Pie de ejemplo del Caso 02."),
        at: calendar("18 SET · 21:10"),
        likes: 4,
        comments: [],
      },
    ],
    people: [],
  },

  matches: {
    appName: "PAIR",
    profile: { name: "R. ALMEIDA", age: 41, avatarSeed: "caso02-vitima" },
    matches: [],
  },

  gallery: [
    {
      id: "g-unica",
      label: calendar("18 SET"),
      items: [
        { id: "gi1", kind: "photo", seed: "caso02-g-1", takenAt: calendar("18 SET · 21:05") },
        { id: "gi2", kind: "photo", seed: "caso02-g-2", takenAt: calendar("18 SET · 22:40") },
      ],
    },
  ],

  locations: [
    {
      id: "l-18set",
      label: calendar("18 SET"),
      stops: [
        { id: "ls1", time: "20:02", title: L("Posto de trabalho", "Workplace", "Lugar de trabajo"), durationLabel: L("3h10", "3h10", "3h10"), point: { x: 35, y: 52 } },
        { id: "ls2", time: "23:20", title: "██████████", redacted: true, point: { x: 70, y: 28 } },
      ],
    },
  ],

  bank: {
    brand: "NOVA",
    holder: "R. ALMEIDA",
    balance: 214.5,
    days: [
      {
        id: "b-18set",
    label: calendar("18 SET"),
        transactions: [
          { id: "t1", time: "21:40", merchant: L("Lanchonete placeholder", "Placeholder snack bar", "Bar de comida de ejemplo"), amount: -22.0, method: L("Débito", "Debit", "Débito") },
        ],
      },
    ],
  },

  notes: [
    {
      id: "n-protegida",
      title: "████",
      at: calendar("18 SET"),
      preview: L("Nota protegida", "Protected note", "Nota protegida"),
      lock: { passcode: "5050", hint: L("Demonstração: a senha é 5050.", "Sample: the passcode is 5050.", "Ejemplo: la contraseña es 5050.") },
      body: [L("Conteúdo desbloqueado de exemplo do Caso 02.", "Sample unlocked content for Case 02.", "Contenido de ejemplo desbloqueado del Caso 02.")],
    },
  ],
};