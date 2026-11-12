import type { MatchesData } from "../../types";
import { asset } from "./helpers";

/*
 * Matches (roteiro 5.3). Ajuste autorizado: as falas do perfil de Agrafiena vinham rotuladas "Lídia" no roteiro; aqui
 * pertencem a Agrafiena. Distâncias (exceto a de Irina, "a 40 m") e a cidade são valores menores adicionados para o layout.
 */
export const matches: MatchesData = {
  appName: "MATCHES",
  profile: {
    name: "Grigori",
    age: 47,
    avatarSeed: "rasputin",
  },
  matches: [
    {
      id: "mt-irina",
      name: "Irina Y.",
      age: 21,
      distanceKm: 0.04,
      distanceLabel: "a 40 m de você",
      city: "Petrogrado",
      bio: "Princesa só no papel. Procuro alguém que me escute e me ensine a rezar de verdade.",
      interests: [
        "Cavalos",
        "Música",
        "Orações",
      ],
      matchedAt: "09 DEZ",
      details: [
        {
          label: "Perfil criado em",
          value: "08 DEZ · 23:50",
        },
        {
          label: "Local do cadastro",
          value: "Moika, 94",
        },
        {
          label: "Última atividade",
          value: "17 DEZ · 02:19",
        },
      ],
      photos: [
        {
          id: "mp-irina-0401",
          kind: "photo",
          seed: "mp-irina-0401",
          src: asset("matches/irina-0401.webp"),
        },
        {
          id: "mp-irina-0402",
          kind: "photo",
          seed: "mp-irina-0402",
          src: asset("matches/irina-0402.webp"),
        },
        {
          id: "mp-irina-0403",
          kind: "photo",
          seed: "mp-irina-0403",
          src: asset("matches/irina-0403.webp"),
        },
        {
          id: "mp-irina-0404",
          kind: "photo",
          seed: "mp-irina-0404",
          src: asset("matches/irina-0404.webp"),
        },
      ],
      messages: [
        {
          id: "mm1",
          from: "them",
          at: "09 DEZ · 22:12",
          text: "O senhor é o homem de quem meu marido tanto fala. Estou tão ansiosa para conhecê-lo.",
        },
        {
          id: "mm2",
          from: "victim",
          at: "09 DEZ · 22:30",
          text: "Princesa? Sou um camponês de botas gastas.",
        },
        {
          id: "mm3",
          from: "them",
          at: "09 DEZ · 22:41",
          text: "É justamente por isso. Gosto de quem anda pela terra.",
        },
        {
          id: "mm4",
          from: "them",
          at: "13 DEZ · 21:05",
          text: "Felix diz que posso recebê-lo na sexta, depois da meia-noite. Sem criados e sem fofocas. Estou pronta para o senhor.",
        },
        {
          id: "mm5",
          from: "victim",
          at: "13 DEZ · 21:20",
          text: "Pronto estou eu. rs",
        },
        {
          id: "mm6",
          from: "them",
          at: "16 DEZ · 18:20",
          text: "Hoje à noite, então. Entre pelo pátio. Felix lhe mostrará o armário que eu adoro.",
        },
        {
          id: "mm7",
          from: "victim",
          at: "17 DEZ · 02:11",
          text: "Princesa, onde está? O príncipe diz que a senhora já desce.",
        },
        {
          id: "mm8",
          from: "them",
          at: "17 DEZ · 02:19",
          text: "Fico pronto em dois minutos, querido. Olhe o crucifixo do armário enquanto espera.",
        },
      ],
    },
    {
      id: "mt-lidia",
      name: "Lídia",
      age: 34,
      distanceKm: 3,
      city: "Petrogrado",
      bio: "Cantora no Villa Rode. Não aceito cantadas, só gorjetas.",
      interests: [
        "Canto",
        "Cabaré",
        "Madeira",
      ],
      matchedAt: "11 DEZ",
      photos: [
        {
          id: "mp-lidia-0405",
          kind: "photo",
          seed: "mp-lidia-0405",
          src: asset("matches/lidia-0405.webp"),
        },
        {
          id: "mp-lidia-0406",
          kind: "photo",
          seed: "mp-lidia-0406",
          src: asset("matches/lidia-0406.webp"),
        },
        {
          id: "mp-lidia-0407",
          kind: "photo",
          seed: "mp-lidia-0407",
          src: asset("matches/lidia-0407.webp"),
        },
        {
          id: "mp-lidia-0408",
          kind: "photo",
          seed: "mp-lidia-0408",
          src: asset("matches/lidia-0408.webp"),
        },
      ],
      messages: [
        {
          id: "mm1",
          from: "them",
          at: "11 DEZ · 23:10",
          text: "O santo mais popular da cidade finalmente deu match! Vem me ouvir cantar?",
        },
        {
          id: "mm2",
          from: "victim",
          at: "11 DEZ · 23:30",
          text: "Santo não frequenta cabaré, Lídia. Mas gosto de música.",
        },
        {
          id: "mm3",
          from: "them",
          at: "16 DEZ · 17:10",
          text: "Sexta de gala no Villa Rode. Vem hoje?",
        },
        {
          id: "mm4",
          from: "victim",
          at: "16 DEZ · 17:35",
          text: "Hoje tenho encontro com uma princesa.",
        },
        {
          id: "mm5",
          from: "them",
          at: "16 DEZ · 17:37",
          text: "Princesa à meia-noite? Cuidado com conto de fadas, rs.",
        },
      ],
    },
    {
      id: "mt-tolia",
      name: "Tolia",
      age: 44,
      distanceKm: 5,
      city: "Petrogrado",
      bio: "Pescador. Moro na Malaya Nevka, perto da Ponte Petrovsky. Falo pouco.",
      interests: [
        "Pesca no gelo",
        "Chá",
        "Silêncio",
      ],
      matchedAt: "14 DEZ",
      photos: [
        {
          id: "mp-tolia-0409",
          kind: "photo",
          seed: "mp-tolia-0409",
          src: asset("matches/tolia-0409.webp"),
        },
        {
          id: "mp-tolia-0410",
          kind: "photo",
          seed: "mp-tolia-0410",
          src: asset("matches/tolia-0410.webp"),
        },
        {
          id: "mp-tolia-0411",
          kind: "photo",
          seed: "mp-tolia-0411",
          src: asset("matches/tolia-0411.webp"),
        },
      ],
      messages: [
        {
          id: "mm1",
          from: "them",
          at: "14 DEZ · 06:40",
          text: "Oi.",
        },
        {
          id: "mm2",
          from: "victim",
          at: "14 DEZ · 18:15",
          text: "Oi, Tolia. A pesca vai boa?",
        },
        {
          id: "mm3",
          from: "them",
          at: "16 DEZ · 19:22",
          text: "Gelo bom. Amanhã cedo vou furar buracos na Nevka.",
        },
        {
          id: "mm4",
          from: "them",
          at: "17 DEZ · 06:02",
          text: "O senhor mora na Gorokhovaya, né? Cheguei cedo na Nevka e vi um carro fechado parado na Ponte Petrovsky. Uns homens jogaram uma trouxa no buraco do gelo. Um deles era alto, de capote claro, com um cinto largo atravessado no peito, e falava numa língua que não era a nossa.",
        },
        {
          id: "mm5",
          from: "them",
          at: "17 DEZ · 06:05",
          text: "Fui embora com medo. Conto porque o senhor mora perto.",
        },
      ],
    },
    {
      id: "mt-sasha",
      name: "Sasha",
      age: 62,
      distanceKm: 4,
      city: "Petrogrado",
      bio: "Viúva. Faço o melhor bolo de mel de Petrogrado.",
      interests: [
        "Mel",
        "Costura",
        "Igreja",
      ],
      matchedAt: "12 DEZ",
      photos: [
        {
          id: "mp-sasha-0412",
          kind: "photo",
          seed: "mp-sasha-0412",
          src: asset("matches/sasha-0412.webp"),
        },
        {
          id: "mp-sasha-0413",
          kind: "photo",
          seed: "mp-sasha-0413",
          src: asset("matches/sasha-0413.webp"),
        },
        {
          id: "mp-sasha-0414",
          kind: "photo",
          seed: "mp-sasha-0414",
          src: asset("matches/sasha-0414.webp"),
        },
      ],
      messages: [
        {
          id: "mm1",
          from: "them",
          at: "12 DEZ · 10:12",
          text: "Bolo de mel hoje? Passe aqui.",
        },
        {
          id: "mm2",
          from: "victim",
          at: "12 DEZ · 10:40",
          text: "Hoje não, Sasha. Tenho compromisso com um banho.",
        },
      ],
    },
    {
      id: "mt-agrafiena",
      name: "Agrafiena",
      age: 27,
      distanceKm: 6,
      city: "Petrogrado",
      bio: "A vida deve ser vivida como nos folhetins.",
      interests: [
        "Literatura",
        "Piano",
        "Vodka",
      ],
      matchedAt: "09 DEZ",
      photos: [
        {
          id: "mp-agrafiena-0415",
          kind: "photo",
          seed: "mp-agrafiena-0415",
          src: asset("matches/agrafiena-0415.webp"),
        },
        {
          id: "mp-agrafiena-0416",
          kind: "photo",
          seed: "mp-agrafiena-0416",
          src: asset("matches/agrafiena-0416.webp"),
        },
        {
          id: "mp-agrafiena-0417",
          kind: "photo",
          seed: "mp-agrafiena-0417",
          src: asset("matches/agrafiena-0417.webp"),
        },
        {
          id: "mp-agrafiena-0418",
          kind: "photo",
          seed: "mp-agrafiena-0418",
          src: asset("matches/agrafiena-0418.webp"),
        },
        {
          id: "mp-agrafiena-0419",
          kind: "photo",
          seed: "mp-agrafiena-0419",
          src: asset("matches/agrafiena-0419.webp"),
        },
      ],
      messages: [
        {
          id: "mm1",
          from: "them",
          at: "09 DEZ · 20:11",
          text: "Se o senhor for metade dos homens que pregam nos folhetos, eu sou uma mulher de sorte.",
        },
        {
          id: "mm2",
          from: "victim",
          at: "09 DEZ · 23:30",
          text: "Eu sou muito maior do que eles pregam.",
        },
        {
          id: "mm3",
          from: "them",
          at: "10 DEZ · 11:23",
          text: "E você pode comprovar isso?",
        },
        {
          id: "mm4",
          from: "victim",
          at: "11 DEZ · 17:35",
          text: "Palavra por Palavra.",
        },
        {
          id: "mm5",
          from: "them",
          at: "13 DEZ · 12:37",
          text: "Isso que veremos.",
        },
      ],
    },
  ],
};
