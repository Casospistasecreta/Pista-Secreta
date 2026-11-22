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
 * CASO 004 — Rasputin (Petrogrado, dezembro de 1916).
 * Conteúdo 100% isolado nesta pasta; as imagens ficam em
 * `public/investigacao/caso-rasputin/`. Rota: /investigacao/caso-rasputin
 *
 * Valores que o roteiro não traz (adicionados, fáceis de trocar): senha do aparelho "0000", data/hora da tela
 * de bloqueio, bateria, perfil próprio no PicLike (handle, bio, números).
 */
export const casoRasputin: CaseData = {
  slug: "caso-rasputin",
  messagesWallpaperSrc: asset("messages-wallpaper.webp"),
  title: L("Dispositivo de Grigori Rasputin", "Grigori Rasputin's Device", "Dispositivo de Grigori Rasputin"),
  subtitle: L("Petrogrado, dezembro de 1916", "Petrograd, December 1916", "Petrogrado, diciembre de 1916"),
  victim: { name: "Grigori Rasputin", age: 47, city: L("Petrogrado", "Petrograd", "Petrogrado"), avatarSeed: "rasputin", avatarSrc: asset("avatar-rasputin.webp") },
  device: {
    passcode: "0000",
    carrier: L("SEM SINAL", "NO SIGNAL", "SIN SEÑAL"),
    batteryPercent: 3,
    dateLabel: L("terça-feira, 20 de dezembro", "Tuesday, December 20", "martes, 20 de diciembre"),
    frozenTime: "18:07",
    wallpaperSrc: asset("wallpaper.webp"),
    homeWallpaperSrc: asset("home-wallpaper.webp"),
  },
  briefing: [
    L("Grigori Yefimovich Rasputin, 47 anos, desapareceu na madrugada de 17 de dezembro de 1916, em Petrogrado. Dois dias depois, um corpo foi retirado do gelo do rio Malaya Nevka. Os jornais já têm uma versão. A polícia já tem outra. Os suspeitos têm uma terceira.", "Grigori Yefimovich Rasputin, 47, vanished in the early hours of December 17, 1916, in Petrograd. Two days later, a body was pulled from the ice of the Malaya Nevka River. The newspapers have one version. The police have another. The suspects have a third.", "Grigori Yefimovich Rasputin, de 47 años, desapareció en la madrugada del 17 de diciembre de 1916 en Petrogrado. Dos días después, sacaron un cuerpo del hielo del río Malaya Nevka. Los periódicos ya tienen una versión. La policía, otra. Los sospechosos, una tercera."),
    L("O celular de Rasputin foi encontrado no parapeito da Ponte Petrovsky, a poucos metros de uma galocha. A bateria estava quase no fim, mas o aparelho guardava tudo: mensagens, fotos, posts, encontros marcados e um registro de localização que não mente.", "Rasputin's phone was found on the parapet of Petrovsky Bridge, a few feet from a galosh. The battery was nearly dead, but the device had kept everything: messages, photos, posts, planned meetings, and a location history that doesn't lie.", "El teléfono de Rasputin apareció en el pretil del puente Petrovsky, a pocos metros de una bota de goma. La batería estaba casi agotada, pero el aparato lo guardaba todo: mensajes, fotos, publicaciones, encuentros y un historial de ubicación que no miente."),
    L("Cabe a você investigar o dispositivo, cruzar horários, desmontar versões e reconstruir o que aconteceu naquela noite. Como ele morreu? Ele realmente morreu? E quem é o culpado?", "Investigate the device, compare the timestamps, challenge the stories, and piece together what happened that night. How did he die? Did he really die? And who is responsible?", "Te toca investigar el teléfono, cruzar horarios, desmontar versiones y reconstruir lo que pasó aquella noche. ¿Cómo murió? ¿De verdad murió? ¿Y quién es el culpable?"),
    L("Utilize a área “Meu Caso” para registrar evidências relevantes, organizar suas descobertas e, ao final da investigação, enviar sua resposta.", "Use the “My Case” area to save key evidence, organize your findings, and submit your conclusion when the investigation is complete.", "Usa la sección «Mi caso» para guardar pruebas relevantes, organizar tus hallazgos y enviar tu respuesta al terminar la investigación."),
    L("Atenção: todas as datas seguem o calendário juliano, usado na Rússia em 1916. Para chegar às datas do calendário atual, some 13 dias.", "Note: all dates follow the Julian calendar used in Russia in 1916. Add 13 days to convert them to today's calendar.", "Atención: todas las fechas siguen el calendario juliano, usado en Rusia en 1916. Para convertirlas al calendario actual, suma 13 días."),
  ],
  stamp: { agency: L("Departamento de Polícia de Petrogrado", "Petrograd Police Department", "Departamento de Policía de Petrogrado"), code: L("Evidência Nº 0417", "Evidence No. 0417", "Prueba n.º 0417") },
  messages,
  social,
  matches,
  gallery,
  locations,
  bank,
  notes,
  finalAnswer,
};
