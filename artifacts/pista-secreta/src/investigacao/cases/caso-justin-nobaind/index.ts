import type { CaseData } from "../../types";
import { asset, L } from "./helpers";
import { messages } from "./messages";
import { social } from "./social";
import { matches } from "./matches";
import { gallery } from "./gallery";
import { locations } from "./locations";
import { bank } from "./bank";
import { notes } from "./notes";
import { calls } from "./calls";
import { finalAnswer } from "./final-answer";

/**
 * CASO 006 — Justin Nobaind (Los Angeles, maio de 1994).
 * Conteúdo 100% isolado nesta pasta; as imagens ficam em `public/investigacao/caso-justin-nobaind/`.
 * Rota: /investigacao/caso-justin-nobaind
 *
 * Valores que o roteiro não traz (fáceis de trocar): senha do aparelho "0000", data/hora da tela de bloqueio,
 * bateria, operadora, perfil próprio no Piklike (handle, bio, números) e saldo da NOVA.
 * O módulo Gravador é opcional no roteiro e está DESATIVADO (nenhuma pista depende dele).
 */
export const casoJustinNobaind: CaseData = {
  slug: "caso-justin-nobaind",
  title: L("Dispositivo de Justin Nobaind", "Justin Nobaind's Device", "Dispositivo de Justin Nobaind"),
  subtitle: L("Los Angeles, maio de 1994", "Los Angeles, May 1994", "Los Ángeles, mayo de 1994"),
  victim: { name: "Justin Nobaind", age: 27, city: "Los Angeles", avatarSeed: "justin", avatarSrc: asset("avatar-justin.webp") },
  device: {
    passcode: "0000",
    carrier: "SEM SINAL",
    batteryPercent: 9,
    dateLabel: "sábado, 14 de maio",
    frozenTime: "15:42",
    wallpaperSrc: asset("wallpaper.webp"),
    homeWallpaperSrc: asset("home-wallpaper.webp"),
  },
  messagesWallpaperSrc: asset("chat-wallpaper.webp"),
  apps: ["messages", "social", "matches", "gallery", "location", "bank", "notes", "calls", "casefile"],
  appLabels: { social: "Piklike", matches: "Matches" },
  briefing: [
    "Justin Nobaind, 27 anos, vocalista e guitarrista da banda Shibalba, foi encontrado na piscina de sua casa em Los Angeles na noite de 7 de maio de 1994. A versão oficial fala em overdose de Sugar Rush. O funeral, de caixão fechado, já aconteceu.",
    "Mas o corpo sumiu a caminho do IML, o laudo nunca foi divulgado e o médico que declarou a morte no local não explicou o que viu. Uma pessoa vestida como ele foi fotografada depois do funeral. O celular do cantor foi recuperado entre seus pertences e guarda mensagens, fotos, posts, encontros e registros anteriores àquela noite.",
    "Cabe a você investigar o aparelho, cruzar horários e reconstruir os últimos dias de Justin. Ele morreu mesmo? Se não morreu, de quem estava fugindo? E quem o ajudou?",
    "Utilize a área “Meu Caso” para registrar evidências relevantes, organizar suas descobertas e, ao final, enviar sua resposta.",
    "Atenção: todas as datas são de 1994, com o ano omitido (exceto quando for outro). Alguns conteúdos estão trancados; as senhas costumam ser datas que Justin guardou em mais de um lugar do aparelho.",
  ],
  stamp: { agency: L("Divisão de Pessoas Desaparecidas", "Missing Persons Division", "División de Personas Desaparecidas"), code: L("Evidência Nº 0594", "Evidence No. 0594", "Prueba n.º 0594") },
  messages,
  social,
  matches,
  gallery,
  locations,
  bank,
  notes,
  calls,
  finalAnswer,
};
