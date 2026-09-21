import type { CaseData } from "../types";

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
  title: "Registro do turno da noite",
  subtitle: "Teste de arquitetura — Caso 02",
  victim: { name: "R. ALMEIDA", age: 41, city: "Curitiba", avatarSeed: "caso02-vitima" },
  device: {
    passcode: "7391",
    carrier: "SINAL FRACO",
    batteryPercent: 12,
    dateLabel: "sábado, 19 de setembro",
    frozenTime: "03:12",
  },

  messages: [
    {
      id: "c-central",
      person: { id: "p-central", name: "Central", avatarSeed: "caso02-central" },
      preview: "Confirma o horário de saída?",
      time: "02:47",
      unread: 1,
      messages: [
        { id: "m1", from: "them", at: "02:30", dayLabel: "Hoje", text: "Confirma o horário de saída?" },
        { id: "m2", from: "victim", at: "02:47", text: "Texto de demonstração do Caso 02." },
      ],
    },
  ],

  social: {
    profile: {
      handle: "@r.almeida",
      displayName: "R. ALMEIDA",
      bio: "Perfil de demonstração do Caso 02.",
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
        caption: "Legenda de demonstração do Caso 02.",
        at: "18 SET · 21:10",
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
      label: "18 SET",
      items: [
        { id: "gi1", kind: "photo", seed: "caso02-g-1", takenAt: "18 SET · 21:05" },
        { id: "gi2", kind: "photo", seed: "caso02-g-2", takenAt: "18 SET · 22:40" },
      ],
    },
  ],

  locations: [
    {
      id: "l-18set",
      label: "18 SET",
      stops: [
        { id: "ls1", time: "20:02", title: "Posto de trabalho", durationLabel: "3h10", point: { x: 35, y: 52 } },
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
        label: "18 SET",
        transactions: [
          { id: "t1", time: "21:40", merchant: "Lanchonete placeholder", amount: -22.0, method: "Débito" },
        ],
      },
    ],
  },

  notes: [
    {
      id: "n-protegida",
      title: "████",
      at: "18 SET",
      preview: "Nota protegida",
      lock: { passcode: "5050", hint: "Demonstração: a senha é 5050." },
      body: ["Conteúdo desbloqueado de exemplo do Caso 02."],
    },
  ],
};
