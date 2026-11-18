import type { SocialData, SocialPost } from "../../types";
import type { LocalizedText } from "@/i18n/types";
import { asset, calendar, L, photo } from "./helpers";

/*
 * PIKLIKE (roteiro 4.2), do mais recente para o mais antigo. Valores que o roteiro não traz (curtidas, perfil próprio do aparelho,
 * bio dos perfis de terceiros) foram acrescentados e são fáceis de trocar.
 * Ajustes em relação ao roteiro:
 *  - PK-09 (@torpreto, show de rock) passou para 19 ABR, o dia do show combinado com o Rei. Na noite de 10 MAI, Tor estava preso no trânsito.
 *  - PK-12 (@torrebranca, 10 MAI 21:02, show ROQUE) é o álibi do Rei Branco e da Torre Branca. A imagem é um PLACEHOLDER gerado: substitua por uma foto real/IA mantendo o nome do arquivo.
 *  - Em PK-11 foram acrescentados dois comentários que ensinam o jogador a notar o sol a pino às 21h05 (álibi falso do Bispo).
 */
const pk = (id: string, file: string, caption?: LocalizedText) => photo(id, `piklike/${file}.webp`, caption);
const c = (id: string, author: string, text: LocalizedText, at: string) => ({ id, author, text, at: calendar(at) });

const posts: SocialPost[] = [
  {
    id: "post-pk11", author: "@bispobranco", at: calendar("10 MAI · 21:05"), place: L("Mondello, Sicília", "Mondello, Sicily", "Mondello, Sicilia"), likes: 2310, media: [pk("sp-pk11", "pk-11", L("Bispo branco diante de um prato de massa com frutos do mar, em uma varanda com vista para uma praia ensolarada", "White Bishop beside a seafood pasta dish on a balcony overlooking a sunny beach", "Obispo Blanco junto a un plato de pasta con mariscos, en un balcón con vistas a una playa soleada"))],
    caption: L("AGORA MESMO! Abençoado em Mondello 🏖️ Defesa Siciliana: o melhor ataque é uma boa refeição. #SantaDiagonal", "RIGHT NOW! Blessed in Mondello 🏖️ Sicilian Defense: the best offense is a good meal. #SantaDiagonal", "¡AHORA MISMO! Bendecido en Mondello 🏖️ Defensa Siciliana: el mejor ataque es una buena comida. #SantaDiagonal"),
    comments: [
      c("c1", "@damadogambito", L("Que inveja!! 😍", "So jealous!! 😍", "¡Qué envidia! 😍"), "10 MAI · 21:09"),
      c("c2", "@santadiagonal", L("A Obra abençoa sua folga, Dom! Hoje a fábrica de cannoli trabalhou dobrado 🙏", "The Mission blesses your day off, Bishop! The cannoli shop worked double shifts today 🙏", "¡La Obra bendice tu día libre, Dom! Hoy la fábrica de cannoli trabajó el doble 🙏"), "10 MAI · 21:11"),
      c("c3", "@torrebranca", L("Aproveita, Dom!", "Enjoy it, Bishop!", "¡Disfruta, Dom!"), "10 MAI · 21:14"),
      c("c4", "@marcelo_vga", L("Dom, aí na Sicília deve ser madrugada (+5h) e esse solzão? 🤔", "Bishop, it must be the middle of the night in Sicily (+5h)—so why is the sun blazing? 🤔", "Dom, allí en Sicilia debe de ser de madrugada (+5 h), ¿y con ese solazo? 🤔"), "10 MAI · 21:20"),
      c("c5", "@bispobranco", L("@marcelo_vga O fuso horário é uma bênção, meu filho 🙏", "@marcelo_vga Time zones are a blessing, my child 🙏", "@marcelo_vga La diferencia horaria es una bendición, hijo mío 🙏"), "10 MAI · 21:22"),
    ],
  },
  {
    id: "post-pk12", author: "@torrebranca", at: calendar("10 MAI · 21:02"), place: L("Arena ROQUE (Casa g1)", "CASTLE ROCK Arena (g1 Square)", "Arena ROCK-ENROQUE (casilla g1)"), likes: 987, media: [pk("sp-pk12", "pk-12", L("Fantasia de Rei Branco segurando um drinque em meio à plateia do show de ROQUE", "White King costume holding a drink in the crowd at the CASTLE ROCK show", "Disfraz del Rey Blanco con una bebida entre el público del concierto ROCK-ENROQUE"))],
    caption: L("Noite de ROQUE com o Rei Branco! O som tá insano 🤘♖♔ #FestivalRoque", "CASTLE ROCK with the White King tonight! The sound is unreal 🤘♖♔ #CastleRockFest", "¡Noche de ROCK-ENROQUE con el Rey Blanco! ¡El sonido está brutal! 🤘♖♔ #FestivalEnroque"),
    comments: [
      c("c1", "@reibranco", L("Rei e Torre fazendo roque ao vivo, a gente só ensaia 😂🤘", "The King and Rook castling live—we only rehearse it 😂🤘", "El Rey y la Torre enrocándose en directo; nosotros solo ensayamos 😂🤘"), "10 MAI · 21:03"),
      c("c2", "@zugzwang_oficial", L("Obrigado por curtirem o show!", "Thanks for coming to the show!", "¡Gracias por disfrutar del concierto!"), "10 MAI · 21:10"),
    ],
  },
  {
    id: "post-pk10", author: "@damadogambito", at: calendar("10 MAI · 20:58"), place: L("Cassino Gambet (VIP)", "GAMBET Casino (VIP)", "Casino GAMBET (VIP)"), likes: 1204, media: [pk("sp-pk10", "pk-10", L("Dama preta ao lado de uma roleta, no cassino", "Black Queen beside a roulette wheel at the casino", "Reina Negra junto a una ruleta en el casino"))],
    caption: L("Rodada final no VIP! 🎰 Hoje a Dama troca tudo!", "Final round in VIP! 🎰 The Queen is trading everything tonight!", "¡Última ronda en el VIP! 🎰 ¡Hoy la Reina lo apuesta todo!"),
    comments: [
      c("c1", "@gambet_oficial", L("Nossa Rainha VIP! Boa sorte 🍀", "Our VIP Queen! Good luck 🍀", "¡Nuestra Reina VIP! Mucha suerte 🍀"), "10 MAI · 20:59"),
      c("c2", "@peaobranco03", L("Essa foto deve tá editada kkkk", "This photo has to be edited lol", "Esta foto debe estar retocada jajaja"), "10 MAI · 21:02"),
      c("c3", "@peaobranco05", L("Tá mesmo!! hahaah", "It totally is!! hahaha", "¡Sí, totalmente! jajaja"), "10 MAI · 21:03"),
    ],
  },
  {
    id: "post-pk08", author: "@xequefood", at: calendar("05 MAI · 19:00"), likes: 3120, media: [pk("sp-pk08a", "pk-08a", L("Cavalo branco entregador ao lado de uma moto", "White Knight courier beside a scooter", "Caballo Blanco repartidor junto a una moto")), pk("sp-pk08b", "pk-08b", L("Anúncio do Xeque Food: cavalo alado levando uma bandeja", "Xeque-Food ad: a winged horse carrying a tray", "Anuncio de Xeque-Food: un caballo alado lleva una bandeja"))],
    caption: L("Pediu, chegou! Peão ou Cavalo? Você escolhe o entregador 🛵", "Order up! Pawn or Knight? You pick the courier 🛵", "¡Pídelo y llega! ¿Peón o Caballo? Tú eliges al repartidor 🛵"),
    comments: [
      c("c1", "@peaozinho_f2", L("Hoje bati meta, 43 entregas!", "Hit my target today: 43 deliveries!", "¡Hoy cumplí la meta: 43 entregas!"), "05 MAI · 19:20"),
      c("c2", "@tabulaiofan", L("Cavalo atrasa porque pula demais.", "The Knight's always late—keeps jumping around.", "El Caballo se retrasa porque no para de saltar."), "05 MAI · 19:31"),
    ],
  },
  {
    id: "post-pk07", author: "@reibranco", at: calendar("30 ABR · 18:00"), place: L("Palácio e1", "e1 Palace", "Palacio e1"), likes: 842, media: [pk("sp-pk07", "pk-07", L("Rei preto e rei branco em mesas separadas de um café, com uma mesa vazia entre eles", "Black and White Kings at café tables with an empty table between them", "Rey Negro y Rey Blanco en mesas de una cafetería, separados por una mesa vacía"))],
    caption: L("Regra da Oposição: dois Reis nunca ocupam casas vizinhas. Por isso meu melhor amigo @reipreto e eu só nos falamos por mensagem 🤝😂", "The Opposition rule: two Kings can never stand on neighboring squares. That's why my best friend @reipreto and I only message each other 🤝😂", "Regla de la oposición: dos Reyes nunca ocupan casillas vecinas. Por eso mi mejor amigo @reipreto y yo solo nos escribimos 🤝😂"),
    comments: [
      c("c1", "@reipreto", L("Sempre uma casa vazia entre nós.", "Always one empty square between us.", "Siempre dejamos una casilla vacía entre nosotros."), "30 ABR · 18:12"),
      c("c2", "@bispobranco", L("Que lindo!", "How sweet!", "¡Qué bonito!"), "30 ABR · 18:40"),
    ],
  },
  {
    id: "post-pk06", author: "@cavalo_advogado", at: calendar("30 ABR · 09:12"), place: L("Cartório b1", "Registry office, b1 Square", "Registro, casilla b1"), likes: 410, media: [pk("sp-pk06", "pk-06", L("Cavalo branco em um balcão de cartório", "White Knight at a registry counter", "Caballo Blanco en el mostrador de un registro"))],
    caption: L("Mais um obstáculo pulado hoje ⚖️🐴 Cavalo não pede licença, pula.", "Another obstacle jumped today ⚖️🐴 Knights don't ask permission. They jump.", "Otro obstáculo superado hoy ⚖️🐴 El Caballo no pide permiso: salta."),
    comments: [
      c("c1", "@reipreto", L("Preciso do seu salto na sexta.", "Need you to make that jump on Friday.", "Necesito que des ese salto el viernes."), "30 ABR · 09:30"),
      c("c2", "@tabulaiofan", L("Doutor, e o meu processo?", "Doctor, what about my case?", "Doctor, ¿qué pasa con mi caso?"), "30 ABR · 10:02"),
    ],
  },
  {
    id: "post-pk05", author: "@santadiagonal", at: calendar("27 ABR · 10:00"), place: L("Casa f1", "f1 Square", "Casilla f1"), likes: 1540, media: [pk("sp-pk05", "pk-05", L("Caixas brancas de cannoli com pistache sobre uma mesa de madeira", "White boxes of pistachio cannoli on a wooden table", "Cajas blancas de cannoli de pistacho sobre una mesa de madera"))],
    caption: L("Campanha da Obra! 200 caixinhas de cannoli de ricota com pistache siciliano de Bronte. Toda a renda vai para a Obra da Diagonal 🙏 Peça pelo Xeque-Food!", "Mission fundraiser! 200 boxes of ricotta cannoli with Bronte pistachios from Sicily. All proceeds go to the Diagonal Mission 🙏 Order through Xeque-Food!", "¡Campaña de la Obra! 200 cajitas de cannoli de ricotta con pistacho siciliano de Bronte. Todo lo recaudado va a la Obra de la Diagonal 🙏 ¡Pide por Xeque-Food!"),
    comments: [
      c("c1", "@bispobranco", L("Receita da minha avó 🇮🇹 abençoado!", "My grandmother's recipe 🇮🇹 blessed!", "La receta de mi abuela 🇮🇹 ¡bendecida!"), "27 ABR · 10:20"),
      c("c2", "@rainhabranca", L("Quero!!", "I want some!!", "¡¡Quiero!!"), "27 ABR · 11:05"),
      c("c3", "@claudinho_e7", L("Nunca vi tanto pistache na vida.", "I've never seen so much pistachio in my life.", "Nunca había visto tanto pistacho."), "27 ABR · 12:40"),
    ],
  },
  {
    id: "post-pk04", author: "@damadogambito", at: calendar("22 ABR · 22:25"), place: L("Cassino Gambet", "GAMBET Casino", "Casino GAMBET"), likes: 977, media: [pk("sp-pk04", "pk-04", L("Dama preta ao lado de uma roleta no cassino", "Black Queen beside a roulette wheel at the casino", "Reina Negra junto a una ruleta en el casino"))],
    caption: L("TROQUEI UMA TORRE POR UM BISPO E AINDA LEVEI 3 PEÕES 🤑 vício bom #GambetDaRainha", "TRADED A ROOK FOR A BISHOP AND STILL WON 3 PAWNS 🤑 what a rush #QueensGAMBET", "CAMBIÉ UNA TORRE POR UN ALFIL Y AÚN ME LLEVÉ 3 PEONES 🤑 qué vicio #GAMBETDeLaReina"),
    comments: [
      c("c1", "@gambet_oficial", L("A casa agradece! ♥", "The house says thanks! ♥", "¡La casa te lo agradece! ♥"), "22 ABR · 22:31"),
      c("c2", "@reipreto", L("Amor, conversamos hoje.", "Love, we need to talk today.", "Amor, tenemos que hablar hoy."), "22 ABR · 22:40"),
      c("c3", "@torrebranca", L("Você tá bem, Dama?", "You okay, Queen?", "¿Estás bien, Reina?"), "22 ABR · 23:02"),
    ],
  },
  {
    id: "post-pk09", author: "@torpreto", at: calendar("19 ABR · 23:48"), place: L("Arena ROQUE (Casa g1)", "CASTLE ROCK Arena (g1 Square)", "Arena ROCK-ENROQUE (casilla g1)"), likes: 654, media: [pk("sp-pk09", "pk-09", L("Show de rock com uma torre e um rei pretos em silhueta diante da plateia", "Rock show, with a Black Rook and King silhouetted against the crowd", "Concierto de rock, con una Torre Negra y un Rey en silueta frente al público"))],
    caption: L("ROQUE ao vivo!! Eu e meu Rei 🤘♜♚ #FestivalRoque", "CASTLE ROCK live!! Me and my King 🤘♜♚ #CastleRockFest", "¡¡ROCK-ENROQUE en directo!! Mi Rey y yo 🤘♜♚ #FestivalEnroque"),
    comments: [
      c("c1", "@reipreto", L("Sempre bom quando Rei e Torre fazem roque de verdade 😂🤘", "Nothing beats seeing the King and Rook castle for real 😂🤘", "Qué bueno ver al Rey y a la Torre enrocarse de verdad 😂🤘"), "19 ABR · 23:55"),
      c("c2", "@zugzwang_oficial", L("Obrigado por curtirem o show!", "Thanks for coming to the show!", "¡Gracias por disfrutar del concierto!"), "20 ABR · 00:10"),
    ],
  },
  {
    id: "post-pk03", author: "@gambet_oficial", at: calendar("30 MAR · 12:00"), likes: 5230, media: [pk("sp-pk03", "pk-03", L("Rainha branca em um salão de cassino verde e dourado", "White Queen in a green-and-gold casino", "Reina Blanca en un salón de casino verde y dorado"))],
    caption: L("GAMBET: aceite o gambito! Cada lance vale um bônus 🎰 +18, jogue com responsabilidade.", "GAMBET: accept the gambit! Every move earns a bonus 🎰 18+, play responsibly.", "GAMBET: ¡acepta el gambito! Cada jugada suma un bono 🎰 +18, juega con responsabilidad."),
    comments: [
      c("c1", "@santadiagonal", L("Parceiros de fé! 🙏", "Partners in faith! 🙏", "¡Socios de fe! 🙏"), "30 MAR · 12:15"),
      c("c2", "@mestreturco", L("Posso apostar nos meus próprios lances?", "Can I bet on my own moves?", "¿Puedo apostar por mis propias jugadas?"), "30 MAR · 12:40"),
    ],
  },
  {
    id: "post-pk01", author: "@reipreto", at: calendar("14 MAR · 18:20"), place: L("Palácio e8", "e8 Palace", "Palacio e8"), likes: 318, media: [pk("sp-pk01", "pk-01", L("Mesa de festa com um bolo verde de pistache cercado por peças de xadrez", "Party table with a green pistachio cake surrounded by chess pieces", "Mesa de fiesta con una tarta verde de pistacho rodeada de piezas de ajedrez"))],
    caption: L("TBT de dois anos atrás: meu aniversário e o bolo de pistache que quase me tirou do jogo. Aprendi: nunca mais.", "Throwback to two years ago: my birthday and the pistachio cake that nearly took me out of the game. Lesson learned: never again.", "Recuerdo de hace dos años: mi cumpleaños y la tarta de pistacho que casi me saca de la partida. Aprendí: nunca más."),
    comments: [
      c("c1", "@damadogambito", L("Nunca mais, amor ❤️ eu mesma tiro o pistache de tudo.", "Never again, love ❤️ I'll remove the pistachios myself.", "Nunca más, amor ❤️ yo misma quitaré el pistacho de todo."), "14 MAR · 18:31"),
      c("c2", "@bispobranco", L("Graças a Deus! Anotei: nada de pistache pro Rei 🙏", "Thank God! Noted: no pistachio for the King 🙏", "¡Gracias a Dios! Anotado: nada de pistacho para el Rey 🙏"), "14 MAR · 18:44"),
      c("c3", "@claudinho_e7", L("Eu tava lá, seu Rei. Que susto.", "I was there, my King. What a scare.", "Yo estaba allí, mi Rey. Qué susto."), "14 MAR · 19:02"),
      c("c4", "@torre_preta", L("Eu corri com a caneta kkk Roque é pra isso.", "I sprinted over with the pen lol. That's what a Rook is for.", "Fui corriendo con la pluma jaja. Para eso sirve una Torre."), "14 MAR · 19:15"),
    ],
  },
  {
    id: "post-pk02", author: "@mestreturco", at: calendar("11 MAR · 15:50"), likes: 12, media: [pk("sp-pk02", "pk-02", L("Gravura de um autômato enxadrista cercado por uma multidão", "Engraving of a chess-playing automaton surrounded by a crowd", "Grabado de un autómata ajedrecista rodeado de gente"))],
    caption: L("Robô enxadrista invencível desde 1770! Dentro dele não há ninguém. Juro.", "Unbeatable chess robot since 1770! There's nobody inside. I swear.", "¡Autómata ajedrecista invencible desde 1770! No hay nadie dentro. Lo juro."),
    comments: [
      c("c1", "@reibranco", L("Vi uma perna saindo pela gaveta.", "I saw a leg sticking out of the drawer.", "Vi una pierna que salía del cajón."), "11 MAR · 16:10"),
      c("c2", "@torre_preta", L("Golpe, Rei.", "Scam, King.", "Es una estafa, Rey."), "11 MAR · 16:22"),
      c("c3", "@tabulaiofan", L("Comprei o curso. Cadê meu mate em 3 dias?", "I bought the course. Where's my checkmate in 3 days?", "Compré el curso. ¿Dónde está mi jaque mate en 3 días?"), "11 MAR · 18:00"),
    ],
  },
];

const person = (handle: string, displayName: LocalizedText, bio: LocalizedText, followers: number, following: number, postsCount: number) => ({
  handle, displayName, bio, avatarSeed: handle, posts: postsCount, followers, following,
});

export const social: SocialData = {
  profile: { handle: "@reipreto", displayName: L("Rei Preto", "Black King", "Rey Negro"), bio: L("Uma casa por vez. Corte Preta · e8 ♚", "One square at a time. Black Court · e8 ♚", "Una casilla a la vez. Corte Negra · e8 ♚"), avatarSeed: "reipreto", avatarSrc: asset("avatar-rei.webp"), posts: 1, followers: 8420, following: 61 },
  posts,
  people: [
    person("@damadogambito", L("Dama · Rainha Preta", "Queen · Black Queen", "Dama · Reina Negra"), L("VIP. Troco tudo. #GambetDaRainha", "VIP. I'll trade anything. #QueensGAMBET", "VIP. Lo cambio todo. #GAMBETDeLaReina"), 15200, 340, 412),
    person("@bispobranco", L("Dom Bispo", "Bishop Dom", "Don Obispo"), L("Pastor da Igreja Santa Diagonal. Só ando na diagonal, mas sempre chego. 🙏", "Pastor at Santa Diagonal Church. I only move diagonally, but I always get there. 🙏", "Pastor de la Iglesia Santa Diagonal. Solo avanzo en diagonal, pero siempre llego. 🙏"), 48700, 120, 903),
    person("@santadiagonal", L("Santa Diagonal Doces & Obra", "Santa Diagonal Sweets & Mission", "Dulces y Obra Santa Diagonal"), L("Confeitaria beneficente da Obra da Diagonal. Peça pelo Xeque-Food.", "Santa Diagonal's charity bakery. Order through Xeque-Food.", "Pastelería solidaria de la Obra de la Diagonal. Pide por Xeque-Food."), 21300, 15, 288),
    person("@gambet_oficial", "GAMBET", L("Aceite o gambito. +18. Jogue com responsabilidade.", "Accept the gambit. 18+. Play responsibly.", "Acepta el gambito. +18. Juega con responsabilidad."), 120400, 5, 1180),
    person("@torpreto", L("Tor (Rock)", "Tor (Rock)", "Tor (Rock)"), L("Torre Preta. Só ando em linha reta (e chego tarde).", "Black Rook. I only move in straight lines (and show up late).", "Torre Negra. Solo avanzo en línea recta (y siempre llego tarde)."), 1320, 210, 77),
    person("@torre_preta", L("Tor (Rock)", "Tor (Rock)", "Tor (Rock)"), L("Torre Preta. Só ando em linha reta (e chego tarde).", "Black Rook. I only move in straight lines (and show up late).", "Torre Negra. Solo avanzo en línea recta (y siempre llego tarde)."), 1320, 210, 77),
    person("@torrebranca", L("Torre Branca", "White Rook", "Torre Blanca"), L("Parceira de roque do Rei Branco. 🤘", "The White King's castling partner. 🤘", "La compañera de enroque del Rey Blanco. 🤘"), 5400, 380, 201),
    person("@reibranco", L("Rei Branco", "White King", "Rey Blanco"), L("Corte Branca. Sempre a uma casa de distância regulamentar.", "White Court. Always one square away, as the rules require.", "Corte Blanca. Siempre a una casilla de distancia reglamentaria."), 9100, 88, 140),
    person("@cavalo_advogado", L("Dr. Cavalo", "Dr. Knight", "Dr. Caballo"), L("Advogado. Cavalo não pede licença, pula. ⚖️", "Lawyer. Knights don't ask permission; they jump. ⚖️", "Abogado. El Caballo no pide permiso: salta. ⚖️"), 2100, 190, 64),
    person("@claudinho_e7", "Claudinho", L("Porteiro do Palácio e8. Um dia chego na casa 8.", "Doorman at e8 Palace. One day I'll reach the eighth rank.", "Portero del Palacio e8. Algún día llegaré a la octava fila."), 410, 305, 22),
    person("@mestreturco", L("Mestre Turco", "Turkish Master", "Maestro Turco"), L("Enxadrista mecânico invencível desde 1770.", "Unbeatable chess automaton since 1770.", "Autómata ajedrecista invencible desde 1770."), 66, 3, 5),
    person("@xequefood", "Xeque-Food", L("Pediu, chegou! Peão ou Cavalo?", "Order up! Pawn or Knight?", "¡Pídelo y llega! ¿Peón o Caballo?"), 88200, 12, 640),
    person("@zugzwang_oficial", "Zugzwang", L("Banda oficial. Cada lance é obrigatório.", "Official band. Every move is forced.", "Banda oficial. Cada jugada es obligatoria."), 30400, 40, 310),
  ],
};
