import type { MatchesData } from "../../types";
import { me, photo, them } from "./helpers";

/*
 * Idades: Mauro ajustado para 29 (autorizado). As distâncias são valores menores
 * adicionados para o layout do card (o roteiro não as traz). A foto de capa de
 * Afonso é a mesma imagem do avatar dele nas Mensagens (perfis/afonso).
 */
export const matches: MatchesData = {
  appName: "MATCH",
  profile: { name: "Odete", age: 68, avatarSeed: "odete" },
  matches: [
    {
      id: "mt-arnaldo",
      name: "Arnaldo",
      age: 37,
      distanceKm: 5,
      bio: "Gosto de acordar cedo, treinar pesado e terminar o dia com um bom papo e carne na grelha 🔥",
      interests: ["Pilates", "Natureza", "Churrasco"],
      photos: [
        photo("mp-arnaldo-0321", "matches/arnaldo-0321.webp"),
        photo("mp-arnaldo-0322", "matches/arnaldo-0322.webp"),
        photo("mp-arnaldo-0323", "matches/arnaldo-0323.webp"),
        photo("mp-arnaldo-0324", "matches/arnaldo-0324.webp"),
      ],
      messages: [
        them("mm1", "14 NOV · 20:44", "Que Match mais gostoso. Agora vou poder te ensinar uns alongamentos fora do Pilates"),
        me("mm2", "15 NOV · 10:23", "Com esses braços fortes, eu sei o que eu vou fazer com você"),
        them("mm3", "15 NOV · 19:38", "kkkkk"),
        me("mm4", "18 NOV · 13:09", "Quanto você usa mesmo?"),
        them("mm5", "18 NOV · 14:20", "XG. Que tal a gente medir pessoalmente?"),
        me("mm6", "19 NOV · 09:41", "Mesmo horario mesmo local? rs"),
      ],
    },
    {
      id: "mt-luis",
      name: "Luis",
      age: 71,
      distanceKm: 8,
      bio: "Dono do pesqueiro em Varginha, moro sozinho. Se souber fazer uma boa broa de fubá, já começa com vantagem.",
      interests: ["Viúvo", "Café", "Pássaros"],
      photos: [
        photo("mp-luis-0331", "matches/luis-0331.webp"),
        photo("mp-luis-0333", "matches/luis-0333.webp"),
        photo("mp-luis-0334", "matches/luis-0334.webp"),
      ],
      messages: [
        them("mm1", "04 JAN · 13:12", "faz tempo que eu não como um bolinho gostoso."),
        them("mm2", "04 JAN · 19:21", "oi"),
        them("mm3", "06 JAN · 15:43", "Odete?"),
        them("mm4", "10 JAN · 11:20", "Oi"),
        them("mm5", "17 JAN · 12:57", "Ocê mora ainda na fazenda do rio verde"),
      ],
    },
    {
      id: "mt-afonso",
      name: "Afonso",
      age: 65,
      distanceKm: 14,
      bio: "18cm, Mercedes X9. Procuro uma mulher elegante, inteligente e que saiba aproveitar as coisas boas da vida.",
      interests: ["Vinho", "Negócios", "Viagem"],
      photos: [
        photo("mp-afonso-0311", "perfis/afonso.webp"),
        photo("mp-afonso-0312", "matches/afonso-0312.webp"),
        photo("mp-afonso-0313", "matches/afonso-0313.webp"),
        photo("mp-afonso-0314", "matches/afonso-0314.webp"),
      ],
      messages: [
        me("mm1", "20 OUT · 16:44", "Que paisagem mais linda"),
        them("mm2", "22 OUT · 10:32", "O Mar de Bora Bora não se compara ao azul dos seus olhos."),
        me("mm3", "22 OUT · 11:49", "meu olho é castanho"),
        them("mm4", "26 OUT · 09:40", "Não importa. Quinta feira, coloca um bom vestido que eu vou te levar para jantar."),
      ],
    },
    {
      id: "mt-mauro",
      name: "Mauro",
      age: 29,
      distanceKm: 3,
      bio: "Libriano de 96. Sou mais engraçado pessoalmente (ou pelo menos meus amigos dizem). Se você der match eu prometo não mandar “oi, tudo bem?”",
      interests: ["Futebol", "RPG", "Cinema"],
      photos: [
        photo("mp-mauro-0341", "matches/mauro-0341.webp"),
        photo("mp-mauro-0342", "matches/mauro-0342.webp"),
        photo("mp-mauro-0343", "matches/mauro-0343.webp"),
        photo("mp-mauro-0344", "matches/mauro-0344.webp"),
      ],
      messages: [
        them("mm1", "28 SET · 17:57", "oi, tudo bem?"),
        me("mm2", "29 SET · 11:34", "Ce é o filho da Claudia?"),
        them("mm3", "29 SET · 11:36", "Sou, eu que levo ela para o pilates. A gente já se viu."),
      ],
    },
  ],
};
