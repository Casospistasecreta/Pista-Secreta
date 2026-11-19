import type { CaseData } from "../types";
import { calendar, L } from "./localized";

export const casoDemo: CaseData = {
  slug: "demo",
  title: L("Dispositivo recuperado", "Recovered device", "Dispositivo recuperado"),
  subtitle: L("Amostra técnica", "Technical sample", "Muestra técnica"),
  victim: { name: L("VÍTIMA", "VICTIM", "VÍCTIMA"), age: 26, city: "São Paulo", avatarSeed: "vitima" },
  device: { passcode: "0000", carrier: L("SEM OPERADORA", "NO SERVICE", "SIN SERVICIO"), batteryPercent: 38, dateLabel: L("quarta-feira, 21 de setembro", "Wednesday, September 21", "miércoles, 21 de septiembre"), frozenTime: "23:41" },
  messages: [
    {
      id: "c-marina",
      person: { id: "p-marina", name: "Marina", avatarSeed: "marina" },
      preview: L("Você contou pra ele?", "Did you tell him?", "¿Se lo contaste?"),
      time: "22:51",
      unread: 2,
      messages: [
        { id: "m1", from: "them", at: "22:40", dayLabel: L("Hoje", "Today", "Hoy"), text: L("Oi, tudo bem?", "Hey, how are you?", "Hola, ¿cómo estás?") },
        { id: "m2", from: "victim", at: "22:42", text: L("Texto de demonstração.", "Sample text.", "Texto de demostración.") },
        { id: "m3", from: "them", at: "22:44", media: { id: "md1", kind: "photo", seed: "marina-foto", caption: L("Imagem placeholder", "Placeholder image", "Imagen de ejemplo") } },
        { id: "m4", from: "victim", at: "22:47", audio: { id: "a1", durationSec: 14 } },
        { id: "m5", from: "them", at: "22:51", text: L("Você contou pra ele?", "Did you tell him?", "¿Se lo contaste?") },
      ],
    },
    {
      id: "c-lucas",
      person: { id: "p-lucas", name: "Lucas", avatarSeed: "lucas" },
      preview: L("Não aparece aqui.", "It doesn't show up here.", "No aparece aquí."),
      time: "21:08",
      messages: [
        { id: "m1", from: "them", at: "20:55", dayLabel: L("Hoje", "Today", "Hoy"), text: L("Mensagem de exemplo.", "Sample message.", "Mensaje de ejemplo.") },
        { id: "m2", from: "victim", at: "21:02", deleted: true },
        { id: "m3", from: "them", at: "21:05", text: L("Link de demonstração", "Sample link", "Enlace de ejemplo"), link: { label: L("exemplo.placeholder/arquivo", "example.placeholder/file", "ejemplo.placeholder/archivo"), url: "#" } },
        { id: "m4", from: "them", at: "21:08", text: L("Não aparece aqui.", "It doesn't show up here.", "No aparece aquí.") },
      ],
    },
    {
      id: "c-mae",
      person: { id: "p-mae", name: L("Mãe", "Mom", "Mamá"), avatarSeed: "mae" },
      preview: L("Filha, me liga.", "Call me, sweetheart.", "Hija, llámame."),
      time: "19:30",
      unread: 1,
      messages: [
        { id: "m1", from: "them", at: "19:12", dayLabel: L("Hoje", "Today", "Hoy"), text: L("Texto placeholder.", "Placeholder text.", "Texto de ejemplo.") },
        { id: "m2", from: "them", at: "19:30", text: L("Filha, me liga.", "Call me, sweetheart.", "Hija, llámame.") },
      ],
    },
    {
      id: "c-arquivada",
      person: { id: "p-arquivada", name: L("Conversa arquivada", "Archived conversation", "Conversación archivada"), avatarSeed: "arquivada" },
      preview: L("Conteúdo protegido", "Protected content", "Contenido protegido"),
      time: "—",
      archived: true,
      lock: { passcode: "1234", hint: L("Demonstração: a senha é 1234.", "Sample: the passcode is 1234.", "Ejemplo: la contraseña es 1234.") },
      messages: [
        { id: "m1", from: "them", at: "02:11", dayLabel: calendar("20 SET"), text: L("Conteúdo desbloqueado de exemplo.", "Sample unlocked content.", "Contenido de ejemplo desbloqueado.") },
        { id: "m2", from: "victim", at: "02:14", text: L("Segunda linha de exemplo.", "Second sample line.", "Segunda línea de ejemplo.") },
      ],
    },
  ],
  social: {
    profile: { handle: "@vitima", displayName: L("VÍTIMA", "VICTIM", "VÍCTIMA"), bio: L("Bio placeholder.", "Placeholder bio.", "Biografía de ejemplo."), avatarSeed: "vitima", posts: 2, followers: 1284, following: 397 },
    posts: [
      { id: "post-1", author: "@vitima", media: [{ id: "sp1a", kind: "photo", seed: "post-1a" }, { id: "sp1b", kind: "photo", seed: "post-1b" }], caption: L("Legenda de demonstração.", "Sample caption.", "Pie de ejemplo."), at: calendar("21 SET · 19:34"), place: L("Local placeholder", "Placeholder location", "Lugar de ejemplo"), likes: 214, tagged: ["@marina"], comments: [{ id: "cm1", author: "@marina", text: L("Comentário de exemplo.", "Sample comment.", "Comentario de ejemplo."), at: "19:51" }, { id: "cm2", author: "@lucas", text: L("Outro comentário.", "Another comment.", "Otro comentario."), at: "20:07" }] },
      { id: "post-2", author: "@vitima", media: [{ id: "sp2a", kind: "photo", seed: "post-2a" }], caption: L("Segunda legenda de demonstração.", "Second sample caption.", "Segundo pie de ejemplo."), at: calendar("18 SET · 12:02"), likes: 98, comments: [] },
    ],
    people: [{ handle: "@marina", displayName: "Marina", bio: L("Perfil placeholder.", "Placeholder profile.", "Perfil de ejemplo."), avatarSeed: "marina", posts: 34, followers: 812, following: 405 }, { handle: "@lucas", displayName: "Lucas", bio: L("Perfil placeholder.", "Placeholder profile.", "Perfil de ejemplo."), avatarSeed: "lucas", posts: 12, followers: 240, following: 311 }],
  },
  matches: { appName: "PAIR", profile: { name: L("VÍTIMA", "VICTIM", "VÍCTIMA"), age: 26, avatarSeed: "vitima" }, matches: [
    { id: "mt-lucas", name: "Lucas", age: 27, distanceKm: 3, city: "São Paulo", bio: L("Bio de demonstração.", "Sample bio.", "Biografía de ejemplo."), photos: [{ id: "mp1", kind: "photo", seed: "match-lucas-1" }, { id: "mp2", kind: "photo", seed: "match-lucas-2" }], interests: [L("Vinho", "Wine", "Vino"), L("Música", "Music", "Música"), L("Viagens", "Travel", "Viajes")], matchedAt: calendar("12 SET"), messages: [{ id: "mm1", from: "them", at: "20:31", text: L("Mensagem de exemplo.", "Sample message.", "Mensaje de ejemplo.") }, { id: "mm2", from: "victim", at: "20:40", text: L("Resposta de exemplo.", "Sample reply.", "Respuesta de ejemplo.") }] },
    { id: "mt-marina", name: "Marina", age: 25, distanceKm: 1, city: "São Paulo", bio: L("Bio de demonstração.", "Sample bio.", "Biografía de ejemplo."), photos: [{ id: "mp3", kind: "photo", seed: "match-marina-1" }], interests: [L("Cinema", "Movies", "Cine"), L("Corrida", "Running", "Running")], matchedAt: calendar("02 SET") },
    { id: "mt-redigido", name: "██████", age: 31, distanceKm: 5, redacted: true, bio: L("Perfil indisponível.", "Profile unavailable.", "Perfil no disponible."), photos: [{ id: "mp4", kind: "photo", seed: "match-redigido" }] },
  ] },
  gallery: [
    { id: "g-hoje", label: L("Hoje", "Today", "Hoy"), items: [{ id: "gi1", kind: "photo", seed: "g-1", takenAt: calendar("21 SET · 19:34"), place: L("Local placeholder", "Placeholder location", "Lugar de ejemplo") }, { id: "gi2", kind: "photo", seed: "g-2", takenAt: calendar("21 SET · 19:36") }, { id: "gi3", kind: "video", seed: "g-3", takenAt: calendar("21 SET · 20:58"), durationSec: 12 }] },
    { id: "g-ontem", label: L("Ontem", "Yesterday", "Ayer"), items: [{ id: "gi5", kind: "photo", seed: "g-5", takenAt: calendar("20 SET · 09:12") }, { id: "gi6", kind: "photo", seed: "g-6", takenAt: calendar("20 SET · 13:44") }] },
    { id: "g-oculto", label: L("Álbum oculto", "Hidden album", "Álbum oculto"), lock: { passcode: "2020", hint: L("Demonstração: a senha é 2020.", "Sample: the passcode is 2020.", "Ejemplo: la contraseña es 2020.") }, items: [{ id: "gi12", kind: "photo", seed: "g-12", takenAt: "—" }, { id: "gi13", kind: "photo", seed: "g-13", takenAt: "—" }] },
  ],
  locations: [
    { id: "l-21set", label: calendar("21 SET"), stops: [
      { id: "ls1", time: "18:04", title: L("Faculdade", "University", "Universidad"), address: L("Rua placeholder, 100", "Placeholder Street, 100", "Calle de ejemplo, 100"), exitTime: "19:02", durationLabel: L("58 min", "58 min", "58 min"), point: { x: 22, y: 70 } },
      { id: "ls2", time: "19:22", title: "Shopping", address: L("Av. placeholder, 2000", "Placeholder Ave., 2000", "Av. de ejemplo, 2000"), exitTime: "20:01", durationLabel: L("39 min", "39 min", "39 min"), point: { x: 44, y: 46 } },
      { id: "ls3", time: "20:16", title: L("Restaurante Luna", "Luna Restaurant", "Restaurante Luna"), address: L("Rua placeholder, 45", "Placeholder Street, 45", "Calle de ejemplo, 45"), exitTime: "21:48", durationLabel: L("1h32", "1h32", "1h32"), point: { x: 63, y: 58 } },
      { id: "ls4", time: "22:48", title: "████████", redacted: true, point: { x: 78, y: 30 } },
    ] },
    { id: "l-20set", label: calendar("20 SET"), stops: [
      { id: "ls6", time: "08:40", title: L("Padaria", "Bakery", "Panadería"), durationLabel: L("22 min", "22 min", "22 min"), point: { x: 30, y: 40 } },
      { id: "ls7", time: "10:05", title: L("Faculdade", "University", "Universidad"), durationLabel: L("4h10", "4h10", "4h10"), point: { x: 55, y: 62 } },
    ] },
  ],
  bank: { brand: "NOVA", holder: L("VÍTIMA", "VICTIM", "VÍCTIMA"), balance: 3842.17, days: [
    { id: "b-21set", label: calendar("21 SET"), transactions: [
      { id: "t1", time: "20:31", merchant: L("Rest. Luna", "Luna Restaurant", "Restaurante Luna"), amount: -184.9, method: L("Crédito", "Credit", "Crédito"), category: L("Restaurante", "Restaurant", "Restaurante") },
      { id: "t2", time: "22:14", merchant: "Uber", amount: -27.4, method: L("Débito", "Debit", "Débito"), category: L("Transporte", "Transport", "Transporte") },
      { id: "t3", time: "23:02", merchant: "Hotel █████", amount: -312, method: L("Crédito", "Credit", "Crédito"), redacted: true },
    ] },
    { id: "b-20set", label: calendar("20 SET"), transactions: [
      { id: "t4", time: "09:04", merchant: L("Padaria placeholder", "Placeholder bakery", "Panadería de ejemplo"), amount: -18.5, method: "Pix" },
      { id: "t5", time: "14:20", merchant: L("Transferência recebida", "Incoming transfer", "Transferencia recibida"), amount: 500, method: "Pix" },
    ] },
  ] },
  notes: [
    { id: "n-compras", title: L("Lista de compras", "Shopping list", "Lista de compras"), at: calendar("20 SET"), preview: L("Café, filtro, sabão...", "Coffee, filters, soap...", "Café, filtros, jabón..."), checklist: [{ text: L("Café", "Coffee", "Café"), done: true }, { text: L("Filtro", "Filter", "Filtro"), done: false }, { text: L("Sabão", "Soap", "Jabón"), done: false }] },
    { id: "n-viagem", title: L("Viagem", "Trip", "Viaje"), at: calendar("14 SET"), preview: L("Anotação placeholder.", "Placeholder note.", "Nota de ejemplo."), body: [L("Parágrafo de demonstração.", "Sample paragraph.", "Párrafo de ejemplo."), L("Segundo parágrafo de demonstração.", "Second sample paragraph.", "Segundo párrafo de ejemplo.")], media: [{ id: "nm1", kind: "photo", seed: "nota-viagem" }] },
    { id: "n-protegida", title: "████████", at: calendar("21 SET"), preview: L("Nota protegida", "Protected note", "Nota protegida"), lock: { passcode: "7777", hint: L("Demonstração: a senha é 7777.", "Sample: the passcode is 7777.", "Ejemplo: la contraseña es 7777.") }, body: [L("Conteúdo desbloqueado de exemplo.", "Sample unlocked content.", "Contenido de ejemplo desbloqueado."), L("Segundo parágrafo de exemplo.", "Second sample paragraph.", "Segundo párrafo de ejemplo.")] },
  ],
};