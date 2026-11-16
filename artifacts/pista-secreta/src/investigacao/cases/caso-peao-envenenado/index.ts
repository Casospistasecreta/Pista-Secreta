import type { CaseData } from "../../types";
import { asset } from "./helpers";
import { messages } from "./messages";
import { social } from "./social";
import { matches } from "./matches";
import { gallery } from "./gallery";
import { locations } from "./locations";
import { bank } from "./bank";
import { notes } from "./notes";
import { tabulive } from "./tabulive";
import { finalAnswer } from "./final-answer";

/**
 * CASO 005 — Peão Envenenado (Xadrez).
 * Conteúdo 100% isolado nesta pasta; as imagens ficam em `public/investigacao/caso-peao-envenenado/`.
 * Rota: /investigacao/caso-peao-envenenado
 *
 * Valores que o roteiro não traz (fáceis de trocar): senha do aparelho "0000", data/hora da tela de bloqueio, bateria,
 * perfil próprio no PIKLIKE (handle, bio, números) e saldo da Nova.
 */
export const casoPeaoEnvenenado: CaseData = {
  slug: "caso-peao-envenenado",
  title: "Dispositivo do Rei Preto",
  subtitle: "Peão Envenenado · Casa e8, Tabuleiro",
  victim: { name: "Rei Preto", age: 58, city: "Casa e8", avatarSeed: "reipreto", avatarSrc: asset("avatar-rei.webp") },
  device: {
    passcode: "0000",
    carrier: "TABULEIRO",
    batteryPercent: 14,
    dateLabel: "domingo, 10 de maio",
    frozenTime: "21:41",
    wallpaperSrc: asset("wallpaper.webp"),
    homeWallpaperSrc: asset("home-wallpaper.webp"),
  },
  apps: ["messages", "social", "matches", "gallery", "location", "bank", "notes", "tabulive", "casefile"],
  appLabels: { social: "PIKLIKE", matches: "Matches", tabulive: "TabuLive" },
  locationStyle: "chess",
  briefing: [
    "Rei Preto, 58 anos, foi encontrado sem vida em seu palácio (Casa e8) na noite de 10 de Maio, poucas horas depois de a Corte Preta perder a Partida 64, a final da temporada. O laudo preliminar fala em “parada cardíaca”. O caso será arquivado como morte natural.",
    "Mas o celular do Rei diz outra coisa.",
    "Cabe a você investigar os aplicativos, mensagens, fotos e registros do aparelho, reconstruir as últimas horas do Rei e descobrir como (ou se) ele realmente morreu, e quem moveu as peças.",
    "Utilize a área “Meu Caso” para registrar evidências e, ao final, enviar sua resposta. Lembrete do Tabuleiro: no xadrez, o Rei nunca é capturado. Ele só é encurralado.",
    "Atenção: todas as datas são de 2026, com o ano omitido. Alguns conteúdos estão trancados; a senha costuma estar em outro lugar do aparelho. O app TabuLive oferece desafios de xadrez opcionais que também destravam conteúdo.",
  ],
  stamp: { agency: "Delegacia Xeque — Tabuleiro", code: "Evidência Nº 0510" },
  messages, social, matches, gallery, locations, bank, notes, tabulive, finalAnswer,
};
