import type { MatchesData } from "../../types";
import { L, me, photo, them } from "./helpers";

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
      bio: L("Gosto de acordar cedo, treinar pesado e terminar o dia com um bom papo e carne na grelha 🔥", "Early riser, serious about training, and always up for good conversation and barbecue 🔥", "Me gusta madrugar, entrenar fuerte y terminar el día con buena charla y carne a la parrilla 🔥"),
      interests: [L("Pilates", "Pilates", "Pilates"), L("Natureza", "Outdoors", "Naturaleza"), L("Churrasco", "Barbecue", "Parrillada")],
      photos: [
        photo("mp-arnaldo-0321", "matches/arnaldo-0321.webp"),
        photo("mp-arnaldo-0322", "matches/arnaldo-0322.webp"),
        photo("mp-arnaldo-0323", "matches/arnaldo-0323.webp"),
        photo("mp-arnaldo-0324", "matches/arnaldo-0324.webp"),
      ],
      messages: [
        them("mm1", L("14 NOV · 20:44", "NOV 14 · 20:44", "14 NOV · 20:44"), L("Que Match mais gostoso. Agora vou poder te ensinar uns alongamentos fora do Pilates", "What a great match. Now I can teach you a few stretches outside Pilates.", "Qué buen match. Ahora puedo enseñarte unos estiramientos fuera de pilates.")),
        me("mm2", L("15 NOV · 10:23", "NOV 15 · 10:23", "15 NOV · 10:23"), L("Com esses braços fortes, eu sei o que eu vou fazer com você", "With arms like those, I know exactly what I'd like to do with you.", "Con esos brazos fuertes, ya sé lo que quiero hacer contigo.")),
        them("mm3", L("15 NOV · 19:38", "NOV 15 · 19:38", "15 NOV · 19:38"), L("kkkkk", "lol", "jajaja")),
        me("mm4", L("18 NOV · 13:09", "NOV 18 · 13:09", "18 NOV · 13:09"), L("Quanto você usa mesmo?", "What size do you wear again?", "¿Qué talla usas?")),
        them("mm5", L("18 NOV · 14:20", "NOV 18 · 14:20", "18 NOV · 14:20"), L("XG. Que tal a gente medir pessoalmente?", "XL. How about we take your measurements in person?", "XL. ¿Qué tal si te tomo las medidas en persona?")),
        me("mm6", L("19 NOV · 09:41", "NOV 19 · 09:41", "19 NOV · 09:41"), L("Mesmo horario mesmo local? rs", "Same time, same place? lol", "¿Misma hora, mismo lugar? jaja")),
      ],
    },
    {
      id: "mt-luis",
      name: "Luis",
      age: 71,
      distanceKm: 8,
      bio: L("Dono do pesqueiro em Varginha, moro sozinho. Se souber fazer uma boa broa de fubá, já começa com vantagem.", "I own a fishing spot in Varginha and live alone. If you can bake good cornmeal bread, you're already ahead.", "Tengo un pesquero en Varginha y vivo solo. Si sabes hacer buen pan de maíz, ya tienes puntos a favor."),
      interests: [L("Viúvo", "Widowed", "Viudo"), L("Café", "Coffee", "Café"), L("Pássaros", "Birds", "Aves")],
      photos: [
        photo("mp-luis-0331", "matches/luis-0331.webp"),
        photo("mp-luis-0333", "matches/luis-0333.webp"),
        photo("mp-luis-0334", "matches/luis-0334.webp"),
      ],
      messages: [
        them("mm1", L("04 JAN · 13:12", "JAN 4 · 13:12", "4 ENE · 13:12"), L("faz tempo que eu não como um bolinho gostoso.", "It's been ages since I had a good cake.", "Hace mucho que no como un pastelito rico.")),
        them("mm2", L("04 JAN · 19:21", "JAN 4 · 19:21", "4 ENE · 19:21"), L("oi", "hey", "hola")),
        them("mm3", L("06 JAN · 15:43", "JAN 6 · 15:43", "6 ENE · 15:43"), "Odete?"),
        them("mm4", L("10 JAN · 11:20", "JAN 10 · 11:20", "10 ENE · 11:20"), L("Oi", "Hey", "Hola")),
        them("mm5", L("17 JAN · 12:57", "JAN 17 · 12:57", "17 ENE · 12:57"), L("Ocê mora ainda na fazenda do rio verde", "You still living out at the Rio Verde farm?", "¿Todavía vives en el rancho de Rio Verde?")),
      ],
    },
    {
      id: "mt-afonso",
      name: "Afonso",
      age: 65,
      distanceKm: 14,
      bio: L("18cm, Mercedes X9. Procuro uma mulher elegante, inteligente e que saiba aproveitar as coisas boas da vida.", "18 cm, Mercedes X9. Looking for an elegant, smart woman who knows how to enjoy the finer things.", "18 cm, Mercedes X9. Busco una mujer elegante e inteligente que sepa disfrutar de lo bueno de la vida."),
      interests: [L("Vinho", "Wine", "Vino"), L("Negócios", "Business", "Negocios"), L("Viagem", "Travel", "Viajes")],
      photos: [
        photo("mp-afonso-0311", "perfis/afonso.webp"),
        photo("mp-afonso-0312", "matches/afonso-0312.webp"),
        photo("mp-afonso-0313", "matches/afonso-0313.webp"),
        photo("mp-afonso-0314", "matches/afonso-0314.webp"),
      ],
      messages: [
        me("mm1", L("20 OUT · 16:44", "OCT 20 · 16:44", "20 OCT · 16:44"), L("Que paisagem mais linda", "What a beautiful view.", "Qué paisaje tan hermoso.")),
        them("mm2", L("22 OUT · 10:32", "OCT 22 · 10:32", "22 OCT · 10:32"), L("O Mar de Bora Bora não se compara ao azul dos seus olhos.", "The Bora Bora sea can't compare to the blue in your eyes.", "El mar de Bora Bora no se compara con el azul de tus ojos.")),
        me("mm3", L("22 OUT · 11:49", "OCT 22 · 11:49", "22 OCT · 11:49"), L("meu olho é castanho", "My eyes are brown.", "Mis ojos son marrones.")),
        them("mm4", L("26 OUT · 09:40", "OCT 26 · 09:40", "26 OCT · 09:40"), L("Não importa. Quinta feira, coloca um bom vestido que eu vou te levar para jantar.", "Doesn't matter. Put on a nice dress Thursday. I'm taking you to dinner.", "No importa. El jueves ponte un buen vestido, te llevo a cenar.")),
      ],
    },
    {
      id: "mt-mauro",
      name: "Mauro",
      age: 29,
      distanceKm: 3,
      bio: L("Libriano de 96. Sou mais engraçado pessoalmente (ou pelo menos meus amigos dizem). Se você der match eu prometo não mandar “oi, tudo bem?”", "Libra, '96. Funnier in person (or so my friends say). Match with me and I promise not to open with “hey, how are you?”", "Libra del 96. Soy más gracioso en persona (eso dicen mis amigos). Si hacemos match, prometo no empezar con “hola, ¿cómo estás?”"),
      interests: [L("Futebol", "Soccer", "Fútbol"), L("RPG", "RPGs", "Juegos de rol"), L("Cinema", "Movies", "Cine")],
      photos: [
        photo("mp-mauro-0341", "matches/mauro-0341.webp"),
        photo("mp-mauro-0342", "matches/mauro-0342.webp"),
        photo("mp-mauro-0343", "matches/mauro-0343.webp"),
        photo("mp-mauro-0344", "matches/mauro-0344.webp"),
      ],
      messages: [
        them("mm1", L("28 SET · 17:57", "SEP 28 · 17:57", "28 SEP · 17:57"), L("oi, tudo bem?", "hey, how's it going?", "hola, ¿todo bien?")),
        me("mm2", L("29 SET · 11:34", "SEP 29 · 11:34", "29 SEP · 11:34"), L("Ce é o filho da Claudia?", "Are you Claudia's son?", "¿Eres el hijo de Claudia?")),
        them("mm3", L("29 SET · 11:36", "SEP 29 · 11:36", "29 SEP · 11:36"), L("Sou, eu que levo ela para o pilates. A gente já se viu.", "Yeah, I take her to Pilates. We've met before.", "Sí, yo la llevo a pilates. Ya nos conocemos.")),
      ],
    },
  ],
};
