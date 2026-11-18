import type { CaseData } from "../../types";
import { asset, L } from "./helpers";
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
  title: L("Dispositivo de Odete de Jesus", "Odete de Jesus's Phone", "Teléfono de Odete de Jesus"),
  subtitle: L("Desaparecimento em Varginha, MG", "Disappearance in Varginha, MG", "Desaparición en Varginha, MG"),
  victim: { name: "Odete de Jesus", age: 68, city: "Varginha", avatarSeed: "odete", avatarSrc: asset("fotos/img-160720232.webp") },
  device: {
    passcode: "0000",
    carrier: L("SEM SERVIÇO", "NO SERVICE", "SIN SERVICIO"),
    batteryPercent: 9,
    dateLabel: L("segunda-feira, 2 de fevereiro", "Monday, February 2", "lunes, 2 de febrero"),
    frozenTime: "10:20",
    wallpaperSrc: asset("wallpaper.webp"),
  },
  briefing: [
    L(
      "Odete de Jesus, 68 anos, está desaparecida. Seus últimos rastros foram encontrados em seu celular, localizado em sua residência após seu desaparecimento.",
      "Odete de Jesus, 68, is missing. Her last known traces were found on her phone, which was recovered at her home after she disappeared.",
      "Odete de Jesus, de 68 años, está desaparecida. Sus últimos rastros aparecieron en su celular, hallado en su casa después de que desapareciera.",
    ),
    L(
      "Cabe a você investigar os aplicativos, mensagens, registros e informações disponíveis no aparelho, além de reconstruir os acontecimentos que antecederam seu desaparecimento.",
      "Your job is to examine the apps, messages, records, and information on the device, then piece together what happened before she vanished.",
      "Investiga las aplicaciones, los mensajes, los registros y la información del teléfono para reconstruir lo que ocurrió antes de su desaparición.",
    ),
    L(
      "Utilize esta área para registrar evidências relevantes, organizar suas descobertas e, ao final da investigação, enviar sua resposta sobre o que realmente aconteceu com Dona Odete.",
      "Use this space to record key evidence and organize your findings. At the end, submit your answer about what really happened to Dona Odete.",
      "Usa este espacio para registrar las pruebas clave y ordenar tus hallazgos. Al final, responde qué ocurrió realmente con Dona Odete.",
    ),
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
