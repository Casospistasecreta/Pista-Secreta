import type { Note } from "../../types";

/*
 * Notas (roteiro 5.9). A nota "O Último Acorde" (carta) é a recompensa emocional do cadeado 2 (PIN 1967).
 * Sem o módulo Gravador (opcional no roteiro, desativado nesta versão): nenhuma nota depende de áudio.
 * A frase "Morri de contrato" é metáfora (roteiro 9.3); se algum teste mostrar dúvida, reescreva para
 * "Parei de existir para o Veludo".
 */
export const notes: Note[] = [
  {
    id: "n-cofre",
    title: "Cofre (não perder)",
    at: "28 MAR",
    preview: "Bob: o dia em que a Shibalba nasceu no palco (dia e mês)",
    body: [
      "Bob: o dia em que a Shibalba nasceu no palco (dia e mês)\nÚltima nota: o ano em que eu cheguei\nBarco: o dia em que o Vidro Doce nasceu (dia e mês)\nChave reserva da casa: com o Christian\nChave reserva da reserva: com o Mel",
    ],
    pinned: true,
  },
  {
    id: "n-ultimo-acorde",
    title: "O Último Acorde (carta)",
    at: "07 MAI · 21:58",
    preview: "Para quem encontrar este aparelho,",
    lock: { passcode: "1967", hint: "O ano em que ele chegou." },
    body: [
      "Para quem encontrar este aparelho,",
      "Se você abriu esta nota, já percebeu que as pessoas disseram uma coisa e o celular guardou outra.",
      "Eu não estou onde enterraram aquele caixão. Ele está cheio de areia e de uma promessa: nenhum contrato vai assinar o meu nome.",
      "Não morri de Sugar Rush. Fiquei quase duzentos dias limpo, e isso é a única coisa que me sobrou inteira. Morri de contrato, de cada “assina aqui”, de cada sorriso grande demais.",
      "Não fiz isso sozinho. Quem me ajudou fez por amizade. Proteja essas pessoas. E, se você trabalha para quem quer me devolver à vitrine, por favor, não procure.",
      "Mãe, pai, perdoem. Era o único jeito de continuar sendo filho de vocês e não produto de alguém. A fita explica.",
      "David, Christian, Kat: não foi culpa de ninguém. Principalmente sua, Kat. Se cuida.",
      "Se um dia a música que eu nunca gravei tocar num rádio bem longe daqui, é só um aceno.\n\n— J.",
    ],
  },
  {
    id: "n-pedido",
    title: "Meu pedido",
    at: "15 MAR",
    preview: "Se algo acontecer comigo: caixão fechado. Sem autópsia...",
    body: [
      "Se algo acontecer comigo: caixão fechado. Sem autópsia, odeio a ideia de me abrir. Sem flores da gravadora. Tocar o Vidro Doce, a versão acústica. Quem cuida de tudo é o Dr. Stitch, ele sabe o que fazer.",
    ],
  },
  {
    id: "n-dias-limpos",
    title: "Dias limpos",
    at: "07 MAI",
    preview: "Dia 1: 26 OUT 93 · Dia 194: 07 MAI",
    body: ["Dia 1: 26 OUT 93\nDia 100: 02 FEV\nDia 180: 23 ABR\nDia 190: 03 MAI\nDia 194: 07 MAI"],
  },
  {
    id: "n-quem-pede",
    title: "Quem pede e quem quer",
    at: "12 ABR",
    preview: "B. Bee: quer o contrato. Quer o artista dentro do bolso.",
    body: [
      "B. Bee: quer o contrato. Quer o artista dentro do bolso.\nRick: quer companhia no andar de cima. Me avisou do preço.\nKatherine: quer que eu fique. Tem medo de ficar sozinha.\nDavid: quer proteger a banda. Não sabe de quem.\nAlex: quer sair. Não consegue.\nRamona: quer manter o emprego.\nBrock: quer dinheiro, só.",
    ],
  },
  {
    id: "n-levar",
    title: "Levar",
    at: "06 MAI",
    preview: "Casaco azul, palheta da sorte, a fita da mãe...",
    body: ["Casaco azul, palheta da sorte, a fita da mãe, uma foto dos meus pais. Nada mais."],
  },
  {
    id: "n-letras",
    title: "Letras (rascunhos)",
    at: "30 ABR",
    preview: "Vidro Doce · O Último Acorde (nunca gravada)",
    body: [
      "Vidro Doce:\nVidro doce, vidro fino,\nquebra fácil no meu hino.\nTodo mundo quer morder,\nninguém quer me ver crescer.",
      "O Último Acorde (nunca gravada):\nDeixa o último acorde\necoando no porão.\nQuem fugiu levou a música\ne deixou o violão.",
    ],
  },
];
