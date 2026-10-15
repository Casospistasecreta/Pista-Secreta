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
 * CASO — Dona Odete de Jesus.
 * Conteúdo 100% isolado nesta pasta; as imagens ficam em
 * `public/investigacao/caso-odete/`. Rota: /investigacao/caso-odete
 */
export const casoOdete: CaseData = {
  slug: "caso-odete",
  title: "Dispositivo de Odete de Jesus",
  subtitle: "Desaparecimento em Varginha, MG",
  victim: { name: "Odete de Jesus", age: 68, city: "Varginha", avatarSeed: "odete", avatarSrc: asset("fotos/img-160720232.webp") },
  device: {
    passcode: "0000",
    carrier: "SEM SERVIÇO",
    batteryPercent: 9,
    dateLabel: "segunda-feira, 2 de fevereiro",
    frozenTime: "10:20",
    wallpaperSrc: asset("wallpaper.webp"),
  },
  briefing: [
    "Odete de Jesus, 68 anos, está desaparecida. Seus últimos rastros foram encontrados em seu celular, localizado em sua residência após seu desaparecimento.",
    "Cabe a você investigar os aplicativos, mensagens, registros e informações disponíveis no aparelho, além de reconstruir os acontecimentos que antecederam seu desaparecimento.",
    "Utilize esta área para registrar evidências relevantes, organizar suas descobertas e, ao final da investigação, enviar sua resposta sobre o que realmente aconteceu com Dona Odete.",
  ],
  messages,
  social,
  matches,
  gallery,
  locations,
  bank,
  notes,
  finalAnswer,
};
