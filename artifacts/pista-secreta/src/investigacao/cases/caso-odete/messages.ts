import type { Conversation } from "../../types";
import { asset, callLog, L, me, photo, them } from "./helpers";

/*
 * Datas: o roteiro não traz o ano. Out–Dez = 2025, Jan–Fev = 2026
 * (confirmado pela manchete de 20/jan/2026). O campo `at` carrega dia e hora.
 * Ajustes autorizados: cartões "segunda-feira"/"quarta-feira" da Deise movidos
 * para 29/dez e 07/jan, para bater com o dia da semana.
 */

const shirley: Conversation = {
  id: "c-shirley",
  person: { id: "p-shirley", name: "Shirley", avatarSeed: "shirley", avatarSrc: asset("perfis/shirley.webp") },
  preview: L("Tem um homem rondando sua casa. Ele ta procurando ocê", "There's a man hanging around your house. He's looking for you.", "Hay un hombre rondando tu casa. Te está buscando."),
  time: L("18 JAN", "JAN 18", "18 ENE"),
  messages: [
    them("m01", L("22 OUT · 15:11", "OCT 22 · 15:11", "22 OCT · 15:11"), L("Fiz bolo de fubá.", "I made cornmeal cake.", "Hice bizcocho de harina de maíz.")),
    them("m02", L("22 OUT · 15:12", "OCT 22 · 15:12", "22 OCT · 15:12"), L("Passa aqui.", "Come by.", "Pásate por aquí.")),
    me("m03", L("22 OUT · 15:20", "OCT 22 · 15:20", "22 OCT · 15:20"), L("Colhi umas mexirica docinha, to levando tbm.", "Picked some sweet mandarins. Bringing you a few too.", "Coseché unas mandarinas dulces, también te llevo.")),
    me("m04", L("27 OUT · 13:47", "OCT 27 · 13:47", "27 OCT · 13:47"), L("Vou ter um encontro hoje", "I've got a date today.", "Hoy tengo una cita."), photo("ph-012122", "mensagens/foto-012122.webp")),
    me("m05", L("27 OUT · 13:48", "OCT 27 · 13:48", "27 OCT · 13:48"), L("Qual desses vai ficar melhor?", "Which one looks better?", "¿Cuál de estos me queda mejor?")),
    them("m06", L("27 OUT · 14:03", "OCT 27 · 14:03", "27 OCT · 14:03"), L("O Vermelho. Cor da paixão. Depois me conta tudo", "The red one. The color of passion. Tell me everything after.", "El rojo. Color de la pasión. Después me cuentas todo.")),
    me("m07", L("27 OUT · 15:56", "OCT 27 · 15:56", "27 OCT · 15:56"), L("Na ginástica eu te conto", "I'll tell you at exercise class.", "Te cuento en gimnasia.")),
    me("m08", L("07 JAN · 08:47", "JAN 7 · 08:47", "7 ENE · 08:47"), L("bom dia sua véia, bora para o pilates?", "Morning, you old bird! Pilates today?", "¡Buen día, viejita! ¿Vamos a pilates?")),
    them("m09", L("07 JAN · 09:58", "JAN 7 · 09:58", "7 ENE · 09:58"), L("Hoje nn dá, recebi visita", "Can't today, I have company over.", "Hoy no puedo, tengo visita."), photo("ph-012121", "mensagens/foto-012121.webp")),
    them("m10", L("16 JAN · 11:17", "JAN 16 · 11:17", "16 ENE · 11:17"), L("Odete, quando você vai me mostrar o bonitão que tanto falou?", "Odete, when are you going to introduce me to that handsome guy you've been talking about?", "Odete, ¿cuándo me presentas al guapísimo del que tanto hablas?")),
    me("m11", L("16 JAN · 13:26", "JAN 16 · 13:26", "16 ENE · 13:26"), L("To com ele agora mesmo", "I'm with him right now.", "Estoy con él ahora mismo.")),
    them("m12", L("16 JAN · 13:47", "JAN 16 · 13:47", "16 ENE · 13:47"), L("Cuidado com o marca-passo", "Watch that pacemaker.", "Cuidado con el marcapasos.")),
    me("m13", L("16 JAN · 14:06", "JAN 16 · 14:06", "16 ENE · 14:06"), L("rs", "lol", "jaja")),
    them("m14", L("18 JAN · 16:23", "JAN 18 · 16:23", "18 ENE · 16:23"), L("Odete, tá esperando companhia?", "Odete, are you expecting someone?", "Odete, ¿estás esperando a alguien?")),
    them("m15", L("18 JAN · 16:24", "JAN 18 · 16:24", "18 ENE · 16:24"), L("Tem um homem rondando sua casa. Ele ta procurando ocê", "There's a man hanging around your house. He's looking for you.", "Hay un hombre rondando tu casa. Te está buscando.")),
  ],
};

const deise: Conversation = {
  id: "c-deise",
  person: { id: "p-deise", name: "Deise", avatarSeed: "deise", avatarSrc: asset("perfis/deise.webp") },
  preview: L("Bom diaa Deise", "Mornin', Deise", "Buen díaaa, Deise"),
  time: L("16 JAN", "JAN 16", "16 ENE"),
  messages: [
    me("m01", L("25 DEZ · 06:11", "DEC 25 · 06:11", "25 DIC · 06:11"), L("Feliz Natal minha sobrinha mais linda", "Merry Christmas to my loveliest niece", "Feliz Navidad a mi sobrina más linda")),
    me("m02", L("26 DEZ · 07:14", "DEC 26 · 07:14", "26 DIC · 07:14"), L("Bom dia Deise, te amo", "Good morning, Deise. Love you.", "Buen día, Deise. Te quiero.")),
    me("m03", L("29 DEZ · 09:14", "DEC 29 · 09:14", "29 DIC · 09:14"), undefined, photo("ph-012141", "mensagens/foto-012141.webp")),
    me("m04", L("30 DEZ · 08:44", "DEC 30 · 08:44", "30 DIC · 08:44"), L("Bom dia flor, bom final de ano", "Morning, sunshine. Have a lovely end of the year.", "Buen día, preciosa. Que termines muy bien el año.")),
    me("m05", L("01 JAN · 07:14", "JAN 1 · 07:14", "1 ENE · 07:14"), L("Bom dia, quando voce vem me visitar?", "Good morning! When are you coming to visit me?", "Buen día, ¿cuándo vienes a visitarme?")),
    me("m06", L("07 JAN · 06:33", "JAN 7 · 06:33", "7 ENE · 06:33"), L("Bom diaa, tenha um ótimo dia", "Good morning! Have a great day.", "Buen díaaa, que tengas un día genial.")),
    me("m07", L("07 JAN · 07:14", "JAN 7 · 07:14", "7 ENE · 07:14"), undefined, photo("ph-012142", "mensagens/foto-012142.webp")),
    me("m08", L("08 JAN · 06:57", "JAN 8 · 06:57", "8 ENE · 06:57"), L("Bom dia meu amor", "Morning, sweetheart.", "Buen día, mi amor.")),
    me("m09", L("10 JAN · 07:13", "JAN 10 · 07:13", "10 ENE · 07:13"), L("Bom diaa lindinha", "Morning, beautiful.", "Buen díaaa, linda.")),
    me("m10", L("11 JAN · 09:54", "JAN 11 · 09:54", "11 ENE · 09:54"), undefined, photo("ph-012143", "mensagens/foto-012143.webp")),
    me("m11", L("12 JAN · 10:03", "JAN 12 · 10:03", "12 ENE · 10:03"), L("Bom diaa, hoje dormi até tarde", "Morning! I slept in today.", "Buen díaaa, hoy dormí hasta tarde.")),
    me("m12", L("13 JAN · 09:30", "JAN 13 · 09:30", "13 ENE · 09:30"), L("te amo sabia?", "You know I love you, right?", "¿Sabías que te quiero?")),
    me("m13", L("14 JAN · 07:03", "JAN 14 · 07:03", "14 ENE · 07:03"), L("Bom diaa", "Mornin'!", "Buen díaaa")),
    me("m14", L("15 JAN · 12:02", "JAN 15 · 12:02", "15 ENE · 12:02"), undefined, photo("ph-012144", "mensagens/foto-012144.webp")),
    me("m15", L("16 JAN · 06:33", "JAN 16 · 06:33", "16 ENE · 06:33"), L("Bom diaa Deise", "Mornin', Deise", "Buen díaaa, Deise")),
  ],
};

const luisDesconhecido: Conversation = {
  id: "c-desconhecido-luis",
  person: { id: "p-desconhecido-luis", name: L("Número desconhecido", "Unknown number", "Número desconocido"), avatarSeed: "desconhecido-luis", avatarSrc: asset("perfis/desconhecido.webp") },
  preview: L("Tem Bolo?", "Got cake?", "¿Hay pastel?"),
  time: L("18 JAN", "JAN 18", "18 ENE"),
  messages: [
    them("m01", L("10 JAN · 11:10", "JAN 10 · 11:10", "10 ENE · 11:10"), L("Bom dia Odete, aqui é o Luis. Peguei seu número da feira", "Morning, Odete. It's Luis. I got your number at the market.", "Buen día, Odete. Soy Luis. Conseguí tu número en la feria.")),
    them("m02", L("18 JAN · 15:56", "JAN 18 · 15:56", "18 ENE · 15:56"), L("vim fazer uma surpresinha", "I thought I'd surprise you.", "Vine a darte una sorpresita."), photo("ph-012101", "mensagens/foto-012101.webp")),
    them("m03", L("18 JAN · 15:58", "JAN 18 · 15:58", "18 ENE · 15:58"), L("Tem Bolo?", "Got cake?", "¿Hay pastel?")),
  ],
};

const sebastiao: Conversation = {
  id: "c-sebastiao",
  person: { id: "p-sebastiao", name: "Sebastião", avatarSeed: "sebastiao", avatarSrc: asset("perfis/sebastiao.webp") },
  preview: L("Hoje eu te convenço a vender o Rancho.", "Today I'll talk you into selling the ranch.", "Hoy te convenzo de vender el rancho."),
  time: L("02 FEV", "FEB 2", "2 FEB"),
  messages: [
    them("m01", L("16 JUN · 11:29", "JUN 16 · 11:29", "16 JUN · 11:29"), L("Tia, teria como me passar um dinheirinho do Tio para eu viajar com as crianças?", "Auntie, could you send me a little of Uncle's money so I can take the kids on a trip?", "Tía, ¿podrías pasarme algo de la plata del tío para viajar con los niños?")),
    me("m02", L("16 JUN · 12:11", "JUN 16 · 12:11", "16 JUN · 12:11"), L("Ta feito!! Boa viagem. Amo vocês.", "Done!! Have a great trip. Love you all.", "¡Listo! Buen viaje. Los quiero.")),
    them("m03", L("09 AGO · 17:04", "AUG 9 · 17:04", "9 AGO · 17:04"), L("Tia, precisamos conversar sobre aquela questão do rancho.", "Auntie, we need to talk about the ranch.", "Tía, tenemos que hablar de lo del rancho.")),
    them("m04", L("13 AGO · 10:44", "AUG 13 · 10:44", "13 AGO · 10:44"), L("Que tal morar na cidade? Vende ai e alugamos um quartinho para você.", "Why not move to town? Sell it and we can rent you a little place.", "¿Y si te mudas al pueblo? Vende el rancho y te alquilamos un cuartito.")),
    me("m05", L("13 AGO · 14:35", "AUG 13 · 14:35", "13 AGO · 14:35"), L("Para de ser chato garoto", "Stop being a pain, kid.", "Deja de ser pesado, muchacho.")),
    me("m06", L("13 AGO · 14:36", "AUG 13 · 14:36", "13 AGO · 14:36"), L("Amo minha casinha que eu e seu tio construimos para a gente.", "I love the little home your uncle and I built for ourselves.", "Me encanta la casita que tu tío y yo construimos.")),
    them("m07", L("13 AGO · 15:02", "AUG 13 · 15:02", "13 AGO · 15:02"), L("Isso de morar no interior é passado tia. Ta tudo muito velho ai.", "Country living is a thing of the past, Auntie. Everything out there is so old.", "Eso de vivir en el campo ya pasó, tía. Allá está todo muy viejo.")),
    them("m08", L("13 AGO · 15:10", "AUG 13 · 15:10", "13 AGO · 15:10"), L("Pensa bem viu?", "Think it over, okay?", "Piénsalo bien, ¿sí?")),
    them("m09", L("22 SET · 08:10", "SEP 22 · 08:10", "22 SEP · 08:10"), L("Tia, to passando por Rio Verde e vou passar aí para almoçar com as crianças. Podemos aproveitar e falar do Rancho.", "Auntie, I'm passing through Rio Verde and will stop by for lunch with the kids. We can talk about the ranch then.", "Tía, voy pasando por Rio Verde y me acercaré a almorzar con los niños. Aprovechamos y hablamos del rancho.")),
    me("m10", L("25 DEZ · 07:13", "DEC 25 · 07:13", "25 DIC · 07:13"), L("Feliz Natal Sebastião!! Um beijo para você e as crianças.", "Merry Christmas, Sebastião!! Kisses to you and the kids.", "¡Feliz Navidad, Sebastião! Un beso para ti y los niños.")),
    me("m11", L("01 JAN · 05:55", "JAN 1 · 05:55", "1 ENE · 05:55"), undefined, photo("ph-012111", "mensagens/foto-012111.webp")),
    them("m12", L("19 JAN · 10:33", "JAN 19 · 10:33", "19 ENE · 10:33"), L("Tia, faz tempo que a senhora não me passa uma graninha… Faltou dezembro e janeiro.", "Auntie, you haven't sent me any money in a while… December and January are missing.", "Tía, hace rato que no me pasas algo de plata… Faltó diciembre y enero.")),
    them("m13", L("21 JAN · 18:58", "JAN 21 · 18:58", "21 ENE · 18:58"), "???"),
    them("m14", L("02 FEV · 10:04", "FEB 2 · 10:04", "2 FEB · 10:04"), L("To passando ai para te visitar tia.", "I'm stopping by to see you, Auntie.", "Voy para allá a visitarte, tía.")),
    them("m15", L("02 FEV · 10:05", "FEB 2 · 10:05", "2 FEB · 10:05"), L("Hoje eu te convenço a vender o Rancho.", "Today I'll talk you into selling the ranch.", "Hoy te convenzo de vender el rancho.")),
  ],
};

const afonso: Conversation = {
  id: "c-afonso",
  person: { id: "p-afonso", name: "Afonso", avatarSeed: "afonso", avatarSrc: asset("perfis/afonso.webp") },
  preview: L("Conteúdo protegido", "Protected content", "Contenido protegido"),
  time: L("16 JAN", "JAN 16", "16 ENE"),
  archived: true,
  lock: { passcode: "6969" },
  messages: [
    them("m01", L("30 OUT · 16:11", "OCT 30 · 16:11", "30 OCT · 16:11"), L("As 18h estarei passando aí docinho.", "I'll stop by at 6, sweetheart.", "A las 18 paso por ahí, cariño.")),
    me("m02", L("30 OUT · 16:40", "OCT 30 · 16:40", "30 OCT · 16:40"), L("Estarei esperando.", "I'll be waiting.", "Te estaré esperando.")),
    them("m03", L("01 NOV · 15:20", "NOV 1 · 15:20", "1 NOV · 15:20"), L("Me diverti muito ontem.", "I had a great time yesterday.", "Ayer me divertí mucho.")),
    me("m04", L("01 NOV · 17:20", "NOV 1 · 17:20", "1 NOV · 17:20"), L("Quero ver você comprir o que prometeu", "Let's see you keep your promise.", "A ver si cumples lo que prometiste.")),
    them("m05", L("01 NOV · 19:26", "NOV 1 · 19:26", "1 NOV · 19:26"), L("Mais quatro encontros e eu faço acontecer", "Four more dates and I'll make it happen.", "Cuatro citas más y lo hago realidad.")),
    me("m06", L("04 NOV · 11:33", "NOV 4 · 11:33", "4 NOV · 11:33"), L("Então não vou perder tempo", "Then I won't waste any time.", "Entonces no voy a perder tiempo.")),
    me("m07", L("04 NOV · 11:34", "NOV 4 · 11:34", "4 NOV · 11:34"), L("Hoje vai estar ocupado?", "Are you busy today?", "¿Vas a estar ocupado hoy?")),
    them("m08", L("04 NOV · 13:22", "NOV 4 · 13:22", "4 NOV · 13:22"), L("Para você nunca, já sei até o local", "Never too busy for you. I even know the place.", "Para ti nunca estoy ocupado, ya sé hasta dónde.")),
    them("m09", L("04 NOV · 13:22", "NOV 4 · 13:22", "4 NOV · 13:22"), L("Mesmo horário", "Same time.", "A la misma hora.")),
    me("m10", L("19 NOV · 16:24", "NOV 19 · 16:24", "19 NOV · 16:24"), L("Conseguiu encontrar alguma coisa?", "Did you find anything?", "¿Pudiste encontrar algo?")),
    them("m11", L("19 NOV · 18:06", "NOV 19 · 18:06", "19 NOV · 18:06"), L("Melhor pessoalmente. Amanhã eu passo ai", "Better to talk in person. I'll come by tomorrow.", "Mejor en persona. Mañana paso por ahí.")),
    them("m12", L("08 DEZ · 11:30", "DEC 8 · 11:30", "8 DIC · 11:30"), L("Engraçado eu estar com saudades?", "Funny that I'm the one missing you?", "¿Te parece raro que te extrañe?")),
    them("m13", L("08 DEZ · 11:31", "DEC 8 · 11:31", "8 DIC · 11:31"), L("Normalmente é ao contrário", "Usually it's the other way around.", "Normalmente es al revés.")),
    me("m14", L("08 DEZ · 12:11", "DEC 8 · 12:11", "8 DIC · 12:11"), L("Hoje eu vou fazer um jantar estrelado para a gente no Rancho", "Tonight, I'm making us dinner under the stars at the ranch.", "Esta noche nos prepararé una cena bajo las estrellas en el rancho.")),
    me("m15", L("17 DEZ · 16:31", "DEC 17 · 16:31", "17 DIC · 16:31"), L("Não era ele. Nem perto de ser ele", "It wasn't him. Not even close.", "No era él. Ni se parecía.")),
    them("m16", L("17 DEZ · 17:03", "DEC 17 · 17:03", "17 DIC · 17:03"), L("Tem certeza? Vou aí para falarmos.", "Are you sure? I'll come over so we can talk.", "¿Estás segura? Voy para allá y hablamos.")),
    them("m17", L("05 JAN · 22:23", "JAN 5 · 22:23", "5 ENE · 22:23"), L("Você não sai da minha cabeça. Amanhã eu te pego ein", "Can't get you out of my head. I'll pick you up tomorrow, okay?", "No sales de mi cabeza. Mañana paso por ti, ¿eh?")),
    me("m18", L("06 JAN · 07:22", "JAN 6 · 07:22", "6 ENE · 07:22"), L("Lembrando que esse é nosso quinto encontro", "Just so you know, this is our fifth date.", "Te recuerdo que esta es nuestra quinta cita.")),
    them("m19", L("06 JAN · 17:54", "JAN 6 · 17:54", "6 ENE · 17:54"), L("Já sei. To chegando!! bora bora", "I know, I know. On my way!! Let's go!", "Ya sé. ¡¡Ya voy!! ¡Vamos!")),
    me("m20", L("16 JAN · 13:26", "JAN 16 · 13:26", "16 ENE · 13:26"), L("Acabei de receber uma ligação", "I just got a call.", "Acabo de recibir una llamada.")),
    me("m21", L("16 JAN · 13:27", "JAN 16 · 13:27", "16 ENE · 13:27"), L("VOCÊ ESTÁ CASADO ESSE TEMPO TODO", "YOU'VE BEEN MARRIED THIS WHOLE TIME", "LLEVAS CASADO TODO ESTE TIEMPO")),
    me("m22", L("16 JAN · 13:27", "JAN 16 · 13:27", "16 ENE · 13:27"), L("Seu porco. Sua mulher descobriu tudo e espero do fundo do meu coração que ela te deixe.", "You pig. Your wife found out, and I hope with all my heart she leaves you.", "Sinvergüenza. Tu mujer se enteró y espero de todo corazón que te deje.")),
    me("m23", L("16 JAN · 13:28", "JAN 16 · 13:28", "16 ENE · 13:28"), L("Não dá mais para confiar em ninguém nesse mundo", "You can't trust anyone in this world.", "Ya no se puede confiar en nadie en este mundo.")),
    them("m24", L("16 JAN · 13:31", "JAN 16 · 13:31", "16 ENE · 13:31"), L("E dai? Eu posso aguentar as duas e algumas mais", "So what? I can handle both of you, and a few more.", "¿Y qué? Puedo con las dos y con algunas más.")),
    them("m25", L("16 JAN · 13:31", "JAN 16 · 13:31", "16 ENE · 13:31"), L("Ela não vai me deixar e se você deixar eu arrumo outra velha qualquer", "She won't leave me. And if you do, I'll find some other old lady.", "Ella no me va a dejar, y si tú lo haces, consigo a cualquier otra vieja.")),
    me("m26", L("16 JAN · 13:57", "JAN 16 · 13:57", "16 ENE · 13:57"), L("Seu murcho. você não é nada", "You're pathetic. You're nothing.", "Eres un tipo acabado. No vales nada.")),
    them("m27", L("16 JAN · 15:11", "JAN 16 · 15:11", "16 ENE · 15:11"), L("Para de drama, deixa eu te levar para sair. Aquela procura está quase se encaminhando.", "Stop making a scene. Let me take you out. That search is almost getting somewhere.", "Deja el drama y deja que te saque. Esa búsqueda está a punto de dar frutos.")),
    them("m28", L("16 JAN · 15:13", "JAN 16 · 15:13", "16 ENE · 15:13"), L("Você não quer saber onde ele está?", "Don't you want to know where he is?", "¿No quieres saber dónde está?")),
    me("m29", L("16 JAN · 15:34", "JAN 16 · 15:34", "16 ENE · 15:34"), L("Eu já sei onde ele está. Bem longe de você.", "I already know where he is. Far away from you.", "Ya sé dónde está. Muy lejos de ti.")),
    callLog("m30", "them", L("16 JAN · 15:46", "JAN 16 · 15:46", "16 ENE · 15:46"), { kind: "missed", count: 3 }),
  ],
};

const ligacao: Conversation = {
  id: "c-desconhecido-ligacao",
  person: { id: "p-desconhecido-ligacao", name: L("Número desconhecido", "Unknown number", "Número desconocido"), avatarSeed: "desconhecido-ligacao", avatarSrc: asset("perfis/desconhecido.webp") },
  preview: L("1 ligação recebida · 00:34:19", "1 incoming call · 00:34:19", "1 llamada recibida · 00:34:19"),
  time: L("16 JAN", "JAN 16", "16 ENE"),
  messages: [callLog("m01", "them", L("16 JAN · 12:47", "JAN 16 · 12:47", "16 ENE · 12:47"), { kind: "received", count: 1, duration: "00:34:19" })],
};

const azimov: Conversation = {
  id: "c-desconhecido-azimov",
  person: { id: "p-desconhecido-azimov", name: L("Número desconhecido", "Unknown number", "Número desconocido"), avatarSeed: "desconhecido-azimov", avatarSrc: asset("perfis/desconhecido.webp") },
  preview: L("Olá _ Odete _ Permita-me apresentar-me. Eu sou o Príncipe Azimov…", "Greetings, Odete. Allow me to introduce myself. I am Prince Azimov…", "Hola, Odete. Permíteme presentarme. Soy el príncipe Azimov…"),
  time: L("11 SET", "SEP 11", "11 SEP"),
  messages: [
    them(
      "m01",
      L("11 SET · 12:00", "SEP 11 · 12:00", "11 SEP · 12:00"),
      [
        L("Olá _ Odete _ Permita-me apresentar-me. Eu sou o Príncipe Azimov, emissário do Planeta Io. Prezada Senhora Odete de Jesus,", "Greetings, Odete. Allow me to introduce myself. I am Prince Azimov, envoy from Planet Io. Dear Ms. Odete de Jesus,", "Hola, Odete. Permíteme presentarme. Soy el príncipe Azimov, emisario del planeta Io. Estimada señora Odete de Jesus:"),
        L("Meu nome é Azimov, Príncipe Herdeiro e Emissário Diplomático do planeta Io, uma das luas de Júpiter.", "My name is Azimov, Crown Prince and Diplomatic Envoy from Io, one of Jupiter's moons.", "Me llamo Azimov, príncipe heredero y emisario diplomático de Io, una de las lunas de Júpiter."),
        L("Peço desculpas por entrar em contato desta maneira, mas nossa situação é de EXTREMA URGÊNCIA.", "I apologize for contacting you this way, but our situation is EXTREMELY URGENT.", "Perdona que te contacte de esta manera, pero nuestra situación es de EXTREMA URGENCIA."),
        L("Para ativar o Protocolo de Luz de Io, é preciso transferir para a Terra uma quantidade de energia que atualmente está bloqueada em uma conta diplomática interplanetária.", "To activate Io's Light Protocol, we must transfer energy to Earth that is currently locked in an interplanetary diplomatic account.", "Para activar el Protocolo de Luz de Io, debemos transferir a la Tierra una energía que ahora está bloqueada en una cuenta diplomática interplanetaria."),
        L("Para liberar esta energia, necessito da sua ajuda. Por favor não tenha medo, você foi Escolhida", "I need your help to release this energy. Please don't be afraid. You have been Chosen.", "Necesito tu ayuda para liberar esta energía. No tengas miedo: has sido Elegida."),
        L("Para enviarmos o código secreto de ativação e enviar as transmissões instrutivas, precisaríamos de algumas informações. Tudo o que necessito de si neste momento é do seu interesse mútuo, confirmando os seus dados básicos (Nome Completo, Número de Telefone e Dados Bancários) para darmos início ao Protocolo.", "To send the secret activation code and instructions, I'll need a few details. For our mutual benefit, please confirm your full name, phone number, and bank information so we can begin the Protocol.", "Para enviarte el código secreto de activación y las instrucciones, necesito algunos datos. Por el bien de ambos, confirma tu nombre completo, teléfono y datos bancarios para iniciar el Protocolo."),
        L("Não compartilhe esta mensagem com outras pessoas. Os governos da Terra ainda não estão preparados para conhecer a verdade.", "Do not share this message. Earth's governments are not ready to learn the truth.", "No compartas este mensaje. Los gobiernos de la Tierra aún no están preparados para conocer la verdad."),
        L("O tempo está acabando.", "Time is running out.", "Se acaba el tiempo."),
        "PRÍNCIPE AZIMOV",
      ].join("\n\n"),
    ),
  ],
};

const nova: Conversation = {
  id: "c-nova-banking",
  person: { id: "p-nova-banking", name: "Nova Banking", avatarSeed: "nova-banking", avatarSrc: asset("perfis/nova.webp") },
  preview: L("Solicitação de autorização — Garantia imobiliária", "Authorization request — Property collateral", "Solicitud de autorización — Garantía inmobiliaria"),
  time: L("09 JAN", "JAN 9", "9 ENE"),
  messages: [
    them(
      "m01",
      L("09 JAN · 16:15", "JAN 9 · 16:15", "9 ENE · 16:15"),
      [
        L("Solicitação de autorização — Garantia imobiliária", "Authorization request — Property collateral", "Solicitud de autorización — Garantía inmobiliaria"),
        L("Prezado Sr. Sebastião Borges,", "Dear Mr. Sebastião Borges,", "Estimado Sr. Sebastião Borges:"),
        L("Identificamos em seu cadastro uma solicitação referente à constituição de garantia hipotecária sobre o imóvel rural denominado “Rancho Rio Verde”, registrado em seu nome.", "We found a request on your account to use the rural property known as “Rancho Rio Verde,” registered in your name, as mortgage collateral.", "Encontramos en su cuenta una solicitud para constituir una hipoteca sobre la propiedad rural “Rancho Rio Verde”, registrada a su nombre."),
        L("Para prosseguimento da análise e formalização da operação, é necessária a confirmação expressa do proprietário quanto à autorização para utilização do referido imóvel como garantia.", "To continue our review and formalize the transaction, the owner must explicitly authorize the use of this property as collateral.", "Para continuar el análisis y formalizar la operación, el propietario debe autorizar expresamente el uso de la propiedad como garantía."),
        L("Solicitação: Autorização para constituição de hipoteca\nImóvel: Rancho Rio Verde\nTitular: Sebastião Borges\nFinalidade: Garantia de operação de crédito\nPrazo para manifestação: 5 dias úteis.", "Request: Mortgage authorization\nProperty: Rancho Rio Verde\nOwner: Sebastião Borges\nPurpose: Credit collateral\nResponse deadline: 5 business days.", "Solicitud: Autorización de hipoteca\nPropiedad: Rancho Rio Verde\nTitular: Sebastião Borges\nFinalidad: Garantía de crédito\nPlazo para responder: 5 días hábiles."),
        L("Solicitamos que responda a esta mensagem confirmando sua autorização ou entre em contato com nossa agência para esclarecimentos. A ausência de manifestação dentro do prazo informado poderá resultar na suspensão da solicitação até que seja obtida a autorização necessária.", "Please reply to confirm your authorization or contact our branch with any questions. If we do not hear from you within the stated period, the request may be suspended until we receive your authorization.", "Responda a este mensaje para confirmar su autorización o comuníquese con nuestra sucursal si tiene dudas. Si no recibimos respuesta dentro del plazo, la solicitud podría suspenderse hasta obtener la autorización necesaria."),
        L("Atenciosamente,\nSetor de Crédito e Garantias\nBanco Nova — Agência Varginha/MG", "Sincerely,\nCredit and Collateral Department\nBanco Nova — Varginha Branch, MG", "Atentamente,\nDepartamento de Créditos y Garantías\nBanco Nova — Sucursal Varginha/MG"),
      ].join("\n\n"),
    ),
  ],
};

/** Ordenadas pela mensagem mais recente, como num aplicativo real. */
export const messages: Conversation[] = [sebastiao, shirley, luisDesconhecido, ligacao, deise, nova, azimov, afonso];
