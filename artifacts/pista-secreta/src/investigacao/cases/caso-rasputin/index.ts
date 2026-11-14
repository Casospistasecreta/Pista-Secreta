import type { CaseData } from "../../types";
import { asset } from "./helpers";
import { messages } from "./messages";
import { social } from "./social";
import { matches } from "./matches";
import { gallery } from "./gallery";
import { locations } from "./locations";
import { bank } from "./bank";
import { notes } from "./notes";
import { finalAnswer } from "./final-answer";

/**
 * CASO 004 — Rasputin (Petrogrado, dezembro de 1916).
 * Conteúdo 100% isolado nesta pasta; as imagens ficam em
 * `public/investigacao/caso-rasputin/`. Rota: /investigacao/caso-rasputin
 *
 * Valores que o roteiro não traz (adicionados, fáceis de trocar): senha do aparelho "0000", data/hora da tela
 * de bloqueio, bateria, perfil próprio no PicLike (handle, bio, números).
 */
export const casoRasputin: CaseData = {
  slug: "caso-rasputin",
  title: "Dispositivo de Grigori Rasputin",
  subtitle: "Petrogrado, dezembro de 1916",
  victim: { name: "Grigori Rasputin", age: 47, city: "Petrogrado", avatarSeed: "rasputin", avatarSrc: asset("avatar-rasputin.webp") },
  device: {
    passcode: "0000",
    carrier: "SEM SINAL",
    batteryPercent: 3,
    dateLabel: "terça-feira, 20 de dezembro",
    frozenTime: "18:07",
    wallpaperSrc: asset("wallpaper.webp"),
    homeWallpaperSrc: asset("home-wallpaper.webp"),
  },
  briefing: [
    "Grigori Yefimovich Rasputin, 47 anos, desapareceu na madrugada de 17 de dezembro de 1916, em Petrogrado. Dois dias depois, um corpo foi retirado do gelo do rio Malaya Nevka. Os jornais já têm uma versão. A polícia já tem outra. Os suspeitos têm uma terceira.",
    "O celular de Rasputin foi encontrado no parapeito da Ponte Petrovsky, a poucos metros de uma galocha. A bateria estava quase no fim, mas o aparelho guardava tudo: mensagens, fotos, posts, encontros marcados e um registro de localização que não mente.",
    "Cabe a você investigar o dispositivo, cruzar horários, desmontar versões e reconstruir o que aconteceu naquela noite. Como ele morreu? Ele realmente morreu? E quem é o culpado?",
    "Utilize a área “Meu Caso” para registrar evidências relevantes, organizar suas descobertas e, ao final da investigação, enviar sua resposta.",
    "Atenção: todas as datas seguem o calendário juliano, usado na Rússia em 1916. Para chegar às datas do calendário atual, some 13 dias.",
  ],
  stamp: { agency: "Departamento de Polícia de Petrogrado", code: "Evidência Nº 0417" },
  messages,
  social,
  matches,
  gallery,
  locations,
  bank,
  notes,
  finalAnswer,
};
