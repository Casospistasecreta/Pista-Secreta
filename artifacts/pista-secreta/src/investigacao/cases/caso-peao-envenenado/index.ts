import type { CaseData } from "../../types";
import { asset, L } from "./helpers";
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
  title: L("Dispositivo do Rei Preto", "The Black King's Device", "El dispositivo del Rey Negro"),
  subtitle: L("Peão Envenenado · Casa e8, Tabuleiro", "Poisoned Pawn · e8 Square, the Board", "Peón Envenenado · Casilla e8, Tablero"),
  victim: { name: L("Rei Preto", "Black King", "Rey Negro"), age: 58, city: L("Casa e8", "e8 Square", "Casilla e8"), avatarSeed: "reipreto", avatarSrc: asset("avatar-rei.webp") },
  device: {
    passcode: "0000",
    carrier: L("TABULEIRO", "THE BOARD", "EL TABLERO"),
    batteryPercent: 14,
    dateLabel: L("domingo, 10 de maio", "Sunday, May 10", "domingo, 10 de mayo"),
    frozenTime: "21:41",
    wallpaperSrc: asset("wallpaper.webp"),
    homeWallpaperSrc: asset("home-wallpaper.webp"),
  },
  apps: ["messages", "social", "matches", "gallery", "location", "bank", "notes", "tabulive", "casefile"],
  appLabels: { social: "PIKLIKE", matches: "Matches", tabulive: "TabuLive" },
  locationStyle: "chess",
  briefing: [
    L("Rei Preto, 58 anos, foi encontrado sem vida em seu palácio (Casa e8) na noite de 10 de Maio, poucas horas depois de a Corte Preta perder a Partida 64, a final da temporada. O laudo preliminar fala em “parada cardíaca”. O caso será arquivado como morte natural.", "The Black King, 58, was found dead in his palace (e8 Square) on the night of May 10, a few hours after the Black Court lost Game 64, the season finale. The preliminary report says “cardiac arrest.” The case is about to be filed as a natural death.", "El Rey Negro, de 58 años, apareció muerto en su palacio (casilla e8) la noche del 10 de mayo, pocas horas después de que la Corte Negra perdiera la Partida 64, la final de temporada. El informe preliminar habla de “paro cardíaco”. El caso está a punto de archivarse como muerte natural."),
    L("Mas o celular do Rei diz outra coisa.", "But the King's phone tells a different story.", "Pero el celular del Rey cuenta otra historia."),
    L("Cabe a você investigar os aplicativos, mensagens, fotos e registros do aparelho, reconstruir as últimas horas do Rei e descobrir como (ou se) ele realmente morreu, e quem moveu as peças.", "Investigate the apps, messages, photos, and records on the device. Reconstruct the King's final hours, find out how—or whether—he really died, and discover who moved the pieces.", "Investiga las aplicaciones, los mensajes, las fotos y los registros del dispositivo. Reconstruye las últimas horas del Rey, averigua cómo —o si— murió realmente y descubre quién movió las piezas."),
    L("Utilize a área “Meu Caso” para registrar evidências e, ao final, enviar sua resposta. Lembrete do Tabuleiro: no xadrez, o Rei nunca é capturado. Ele só é encurralado.", "Use “My Case” to save evidence and submit your answer when you're done. A reminder from the Board: in chess, the King is never captured. He's only cornered.", "Usa “Mi caso” para guardar pruebas y enviar tu respuesta al final. Un recordatorio del Tablero: en ajedrez, al Rey nunca lo capturan. Solo lo acorralan."),
    L("Atenção: todas as datas são de 2026, com o ano omitido. Alguns conteúdos estão trancados; a senha costuma estar em outro lugar do aparelho. O app TabuLive oferece desafios de xadrez opcionais que também destravam conteúdo.", "Note: all dates are from 2026; the year is omitted. Some content is locked, and its passcode is usually hidden elsewhere on the device. TabuLive also offers optional chess puzzles that unlock content.", "Atención: todas las fechas son de 2026, pero se omite el año. Algunos contenidos están bloqueados; la clave suele estar en otra parte del dispositivo. TabuLive también ofrece desafíos de ajedrez opcionales que desbloquean contenido."),
  ],
  stamp: { agency: L("Delegacia Xeque — Tabuleiro", "Checkmate Police — The Board", "Comisaría Jaque — El Tablero"), code: L("Evidência Nº 0510", "Evidence No. 0510", "Prueba n.º 0510") },
  messages, social, matches, gallery, locations, bank, notes, tabulive, finalAnswer,
};
