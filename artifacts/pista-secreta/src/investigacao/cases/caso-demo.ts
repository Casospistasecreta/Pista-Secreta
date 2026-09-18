import type { CaseData } from "../types";

export const casoDemo: CaseData = {
  slug: "demo",
  title: "Dispositivo recuperado",
  subtitle: "Amostra técnica",
  victim: { name: "VÍTIMA", age: 26, city: "São Paulo", avatarSeed: "vitima" },
  device: { passcode: "0000", carrier: "SEM OPERADORA", batteryPercent: 38, dateLabel: "quarta-feira, 21 de setembro", frozenTime: "23:41" },
  messages: [
    { id: "c-marina", person: { id: "p-marina", name: "Marina", avatarSeed: "marina" }, preview: "Você contou pra ele?", time: "22:51", unread: 2, messages: [
      { id: "m1", from: "them", at: "22:40", dayLabel: "Hoje", text: "Oi, tudo bem?" },
      { id: "m2", from: "victim", at: "22:42", text: "Texto de demonstração." },
      { id: "m3", from: "them", at: "22:44", media: { id: "md1", kind: "photo", seed: "marina-foto", caption: "Imagem placeholder" } },
      { id: "m4", from: "victim", at: "22:47", audio: { id: "a1", durationSec: 14 } },
      { id: "m5", from: "them", at: "22:51", text: "Você contou pra ele?" },
    ] },
    { id: "c-lucas", person: { id: "p-lucas", name: "Lucas", avatarSeed: "lucas" }, preview: "Não aparece aqui.", time: "21:08", messages: [
      { id: "m1", from: "them", at: "20:55", dayLabel: "Hoje", text: "Mensagem de exemplo." },
      { id: "m2", from: "victim", at: "21:02", deleted: true },
      { id: "m3", from: "them", at: "21:05", text: "Link de demonstração", link: { label: "exemplo.placeholder/arquivo", url: "#" } },
      { id: "m4", from: "them", at: "21:08", text: "Não aparece aqui." },
    ] },
    { id: "c-mae", person: { id: "p-mae", name: "Mãe", avatarSeed: "mae" }, preview: "Filha, me liga.", time: "19:30", unread: 1, messages: [{ id: "m1", from: "them", at: "19:12", dayLabel: "Hoje", text: "Texto placeholder." }, { id: "m2", from: "them", at: "19:30", text: "Filha, me liga." }] },
    { id: "c-arquivada", person: { id: "p-arquivada", name: "Conversa arquivada", avatarSeed: "arquivada" }, preview: "Conteúdo protegido", time: "—", archived: true, lock: { passcode: "1234", hint: "Demonstração: a senha é 1234." }, messages: [{ id: "m1", from: "them", at: "02:11", dayLabel: "20 SET", text: "Conteúdo desbloqueado de exemplo." }, { id: "m2", from: "victim", at: "02:14", text: "Segunda linha de exemplo." }] },
  ],
  social: {
    profile: { handle: "@vitima", displayName: "VÍTIMA", bio: "Bio placeholder.", avatarSeed: "vitima", posts: 2, followers: 1284, following: 397 },
    posts: [
      { id: "post-1", author: "@vitima", media: [{ id: "sp1a", kind: "photo", seed: "post-1a" }, { id: "sp1b", kind: "photo", seed: "post-1b" }], caption: "Legenda de demonstração.", at: "21 SET · 19:34", place: "Local placeholder", likes: 214, tagged: ["@marina"], comments: [{ id: "cm1", author: "@marina", text: "Comentário de exemplo.", at: "19:51" }, { id: "cm2", author: "@lucas", text: "Outro comentário.", at: "20:07" }] },
      { id: "post-2", author: "@vitima", media: [{ id: "sp2a", kind: "photo", seed: "post-2a" }], caption: "Segunda legenda de demonstração.", at: "18 SET · 12:02", likes: 98, comments: [] },
    ],
    people: [{ handle: "@marina", displayName: "Marina", bio: "Perfil placeholder.", avatarSeed: "marina", posts: 34, followers: 812, following: 405 }, { handle: "@lucas", displayName: "Lucas", bio: "Perfil placeholder.", avatarSeed: "lucas", posts: 12, followers: 240, following: 311 }],
  },
  matches: { appName: "PAIR", profile: { name: "VÍTIMA", age: 26, avatarSeed: "vitima" }, matches: [
    { id: "mt-lucas", name: "Lucas", age: 27, distanceKm: 3, city: "São Paulo", bio: "Bio de demonstração.", photos: [{ id: "mp1", kind: "photo", seed: "match-lucas-1" }, { id: "mp2", kind: "photo", seed: "match-lucas-2" }], interests: ["Vinho", "Música", "Viagens"], matchedAt: "12 SET", messages: [{ id: "mm1", from: "them", at: "20:31", text: "Mensagem de exemplo." }, { id: "mm2", from: "victim", at: "20:40", text: "Resposta de exemplo." }] },
    { id: "mt-marina", name: "Marina", age: 25, distanceKm: 1, city: "São Paulo", bio: "Bio de demonstração.", photos: [{ id: "mp3", kind: "photo", seed: "match-marina-1" }], interests: ["Cinema", "Corrida"], matchedAt: "02 SET" },
    { id: "mt-redigido", name: "██████", age: 31, distanceKm: 5, redacted: true, bio: "Perfil indisponível.", photos: [{ id: "mp4", kind: "photo", seed: "match-redigido" }] },
  ] },
  gallery: [
    { id: "g-hoje", label: "Hoje", items: [{ id: "gi1", kind: "photo", seed: "g-1", takenAt: "21 SET · 19:34", place: "Local placeholder" }, { id: "gi2", kind: "photo", seed: "g-2", takenAt: "21 SET · 19:36" }, { id: "gi3", kind: "video", seed: "g-3", takenAt: "21 SET · 20:58", durationSec: 12 }] },
    { id: "g-ontem", label: "Ontem", items: [{ id: "gi5", kind: "photo", seed: "g-5", takenAt: "20 SET · 09:12" }, { id: "gi6", kind: "photo", seed: "g-6", takenAt: "20 SET · 13:44" }] },
    { id: "g-oculto", label: "Álbum oculto", lock: { passcode: "2020", hint: "Demonstração: a senha é 2020." }, items: [{ id: "gi12", kind: "photo", seed: "g-12", takenAt: "—" }, { id: "gi13", kind: "photo", seed: "g-13", takenAt: "—" }] },
  ],
  locations: [{ id: "l-21set", label: "21 SET", stops: [{ id: "ls1", time: "18:04", title: "Faculdade", address: "Rua placeholder, 100", exitTime: "19:02", durationLabel: "58 min", point: { x: 22, y: 70 } }, { id: "ls2", time: "19:22", title: "Shopping", address: "Av. placeholder, 2000", exitTime: "20:01", durationLabel: "39 min", point: { x: 44, y: 46 } }, { id: "ls3", time: "20:16", title: "Restaurante Luna", address: "Rua placeholder, 45", exitTime: "21:48", durationLabel: "1h32", point: { x: 63, y: 58 } }, { id: "ls4", time: "22:48", title: "████████", redacted: true, point: { x: 78, y: 30 } }] }, { id: "l-20set", label: "20 SET", stops: [{ id: "ls6", time: "08:40", title: "Padaria", durationLabel: "22 min", point: { x: 30, y: 40 } }, { id: "ls7", time: "10:05", title: "Faculdade", durationLabel: "4h10", point: { x: 55, y: 62 } }] }],
  bank: { brand: "NOVA", holder: "VÍTIMA", balance: 3842.17, days: [{ id: "b-21set", label: "21 SET", transactions: [{ id: "t1", time: "20:31", merchant: "Rest. Luna", amount: -184.9, method: "Crédito", category: "Restaurante" }, { id: "t2", time: "22:14", merchant: "Uber", amount: -27.4, method: "Débito", category: "Transporte" }, { id: "t3", time: "23:02", merchant: "Hotel █████", amount: -312, method: "Crédito", redacted: true }] }, { id: "b-20set", label: "20 SET", transactions: [{ id: "t4", time: "09:04", merchant: "Padaria placeholder", amount: -18.5, method: "Pix" }, { id: "t5", time: "14:20", merchant: "Transferência recebida", amount: 500, method: "Pix" }] }] },
  notes: [{ id: "n-compras", title: "Lista de compras", at: "20 SET", preview: "Café, filtro, sabão...", checklist: [{ text: "Café", done: true }, { text: "Filtro", done: false }, { text: "Sabão", done: false }] }, { id: "n-viagem", title: "Viagem", at: "14 SET", preview: "Anotação placeholder.", body: ["Parágrafo de demonstração.", "Segundo parágrafo de demonstração."], media: [{ id: "nm1", kind: "photo", seed: "nota-viagem" }] }, { id: "n-protegida", title: "████████", at: "21 SET", preview: "Nota protegida", lock: { passcode: "7777", hint: "Demonstração: a senha é 7777." }, body: ["Conteúdo desbloqueado de exemplo.", "Segundo parágrafo de exemplo."] }],
};