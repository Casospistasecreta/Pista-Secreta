import type { SocialData, SocialPost } from "../../types";
import { asset, photo } from "./helpers";

/*
 * PIKLIKE (roteiro 4.2), do mais recente para o mais antigo. Valores que o roteiro não traz (curtidas, perfil próprio do aparelho,
 * bio dos perfis de terceiros) foram acrescentados e são fáceis de trocar.
 * Ajustes em relação ao roteiro:
 *  - PK-09 (@torpreto, show de rock) passou para 19 ABR, o dia do show combinado com o Rei. Na noite de 10 MAI, Tor estava preso no trânsito.
 *  - PK-12 (@torrebranca, 10 MAI 21:02, show ROQUE) é o álibi do Rei Branco e da Torre Branca. A imagem é um PLACEHOLDER gerado: substitua por uma foto real/IA mantendo o nome do arquivo.
 *  - Em PK-11 foram acrescentados dois comentários que ensinam o jogador a notar o sol a pino às 21h05 (álibi falso do Bispo).
 */
const pk = (id: string, file: string, caption?: string) => photo(id, `piklike/${file}.webp`, caption);
const c = (id: string, author: string, text: string, at: string) => ({ id, author, text, at });

const posts: SocialPost[] = [
  {
    id: "post-pk11", author: "@bispobranco", at: "10 MAI · 21:05", place: "Mondello, Sicília", likes: 2310, media: [pk("sp-pk11", "pk-11", "Bispo branco diante de um prato de massa com frutos do mar, em uma varanda com vista para uma praia ensolarada")],
    caption: "AGORA MESMO! Abençoado em Mondello 🏖️ Defesa Siciliana: o melhor ataque é uma boa refeição. #SantaDiagonal",
    comments: [
      c("c1", "@damadogambito", "Que inveja!! 😍", "10 MAI · 21:09"),
      c("c2", "@santadiagonal", "A Obra abençoa sua folga, Dom! Hoje a fábrica de cannoli trabalhou dobrado 🙏", "10 MAI · 21:11"),
      c("c3", "@torrebranca", "Aproveita, Dom!", "10 MAI · 21:14"),
      c("c4", "@marcelo_vga", "Dom, aí na Sicília deve ser madrugada (+5h) e esse solzão? 🤔", "10 MAI · 21:20"),
      c("c5", "@bispobranco", "@marcelo_vga O fuso horário é uma bênção, meu filho 🙏", "10 MAI · 21:22"),
    ],
  },
  {
    id: "post-pk12", author: "@torrebranca", at: "10 MAI · 21:02", place: "Arena ROQUE (Casa g1)", likes: 987, media: [pk("sp-pk12", "pk-12", "Show lotado, com uma torre e um rei brancos em primeiro plano")],
    caption: "Noite de ROQUE com o Rei Branco! O som tá insano 🤘♖♔ #FestivalRoque",
    comments: [
      c("c1", "@reibranco", "Rei e Torre fazendo roque ao vivo, a gente só ensaia 😂🤘", "10 MAI · 21:03"),
      c("c2", "@zugzwang_oficial", "Obrigado por curtirem o show!", "10 MAI · 21:10"),
    ],
  },
  {
    id: "post-pk10", author: "@damadogambito", at: "10 MAI · 20:58", place: "Cassino Gambet (VIP)", likes: 1204, media: [pk("sp-pk10", "pk-10", "Dama preta ao lado de uma roleta, no cassino")],
    caption: "Rodada final no VIP! 🎰 Hoje a Dama troca tudo!",
    comments: [
      c("c1", "@gambet_oficial", "Nossa Rainha VIP! Boa sorte 🍀", "10 MAI · 20:59"),
      c("c2", "@peaobranco03", "Essa foto deve tá editada kkkk", "10 MAI · 21:02"),
      c("c3", "@peaobranco05", "Tá mesmo!! hahaah", "10 MAI · 21:03"),
    ],
  },
  {
    id: "post-pk08", author: "@xequefood", at: "05 MAI · 19:00", likes: 3120, media: [pk("sp-pk08a", "pk-08a", "Cavalo branco entregador ao lado de uma moto"), pk("sp-pk08b", "pk-08b", "Anúncio do Xeque Food: cavalo alado levando uma bandeja")],
    caption: "Pediu, chegou! Peão ou Cavalo? Você escolhe o entregador 🛵",
    comments: [
      c("c1", "@peaozinho_f2", "Hoje bati meta, 43 entregas!", "05 MAI · 19:20"),
      c("c2", "@tabulaiofan", "Cavalo atrasa porque pula demais.", "05 MAI · 19:31"),
    ],
  },
  {
    id: "post-pk07", author: "@reibranco", at: "30 ABR · 18:00", place: "Palácio e1", likes: 842, media: [pk("sp-pk07", "pk-07", "Rei preto e rei branco em mesas separadas de um café, com uma mesa vazia entre eles")],
    caption: "Regra da Oposição: dois Reis nunca ocupam casas vizinhas. Por isso meu melhor amigo @reipreto e eu só nos falamos por mensagem 🤝😂",
    comments: [
      c("c1", "@reipreto", "Sempre uma casa vazia entre nós.", "30 ABR · 18:12"),
      c("c2", "@bispobranco", "Que lindo!", "30 ABR · 18:40"),
    ],
  },
  {
    id: "post-pk06", author: "@cavalo_advogado", at: "30 ABR · 09:12", place: "Cartório b1", likes: 410, media: [pk("sp-pk06", "pk-06", "Cavalo branco em um balcão de cartório")],
    caption: "Mais um obstáculo pulado hoje ⚖️🐴 Cavalo não pede licença, pula.",
    comments: [
      c("c1", "@reipreto", "Preciso do seu salto na sexta.", "30 ABR · 09:30"),
      c("c2", "@tabulaiofan", "Doutor, e o meu processo?", "30 ABR · 10:02"),
    ],
  },
  {
    id: "post-pk05", author: "@santadiagonal", at: "27 ABR · 10:00", place: "Casa f1", likes: 1540, media: [pk("sp-pk05", "pk-05", "Caixas brancas de cannoli com pistache sobre uma mesa de madeira")],
    caption: "Campanha da Obra! 200 caixinhas de cannoli de ricota com pistache siciliano de Bronte. Toda a renda vai para a Obra da Diagonal 🙏 Peça pelo Xeque-Food!",
    comments: [
      c("c1", "@bispobranco", "Receita da minha avó 🇮🇹 abençoado!", "27 ABR · 10:20"),
      c("c2", "@rainhabranca", "Quero!!", "27 ABR · 11:05"),
      c("c3", "@claudinho_e7", "Nunca vi tanto pistache na vida.", "27 ABR · 12:40"),
    ],
  },
  {
    id: "post-pk04", author: "@damadogambito", at: "22 ABR · 22:25", place: "Cassino Gambet", likes: 977, media: [pk("sp-pk04", "pk-04", "Dama preta ao lado de uma roleta no cassino")],
    caption: "TROQUEI UMA TORRE POR UM BISPO E AINDA LEVEI 3 PEÕES 🤑 vício bom #GambetDaRainha",
    comments: [
      c("c1", "@gambet_oficial", "A casa agradece! ♥", "22 ABR · 22:31"),
      c("c2", "@reipreto", "Amor, conversamos hoje.", "22 ABR · 22:40"),
      c("c3", "@torrebranca", "Você tá bem, Dama?", "22 ABR · 23:02"),
    ],
  },
  {
    id: "post-pk09", author: "@torpreto", at: "19 ABR · 23:48", place: "Arena ROQUE (Casa g1)", likes: 654, media: [pk("sp-pk09", "pk-09", "Show de rock com uma torre e um rei pretos em silhueta diante da plateia")],
    caption: "ROQUE ao vivo!! Eu e meu Rei 🤘♜♚ #FestivalRoque",
    comments: [
      c("c1", "@reipreto", "Sempre bom quando Rei e Torre fazem roque de verdade 😂🤘", "19 ABR · 23:55"),
      c("c2", "@zugzwang_oficial", "Obrigado por curtirem o show!", "20 ABR · 00:10"),
    ],
  },
  {
    id: "post-pk03", author: "@gambet_oficial", at: "30 MAR · 12:00", likes: 5230, media: [pk("sp-pk03", "pk-03", "Rainha branca em um salão de cassino verde e dourado")],
    caption: "GAMBET: aceite o gambito! Cada lance vale um bônus 🎰 +18, jogue com responsabilidade.",
    comments: [
      c("c1", "@santadiagonal", "Parceiros de fé! 🙏", "30 MAR · 12:15"),
      c("c2", "@mestreturco", "Posso apostar nos meus próprios lances?", "30 MAR · 12:40"),
    ],
  },
  {
    id: "post-pk01", author: "@reipreto", at: "14 MAR · 18:20", place: "Palácio e8", likes: 318, media: [pk("sp-pk01", "pk-01", "Mesa de festa com um bolo verde de pistache cercado por peças de xadrez")],
    caption: "TBT de dois anos atrás: meu aniversário e o bolo de pistache que quase me tirou do jogo. Aprendi: nunca mais.",
    comments: [
      c("c1", "@damadogambito", "Nunca mais, amor ❤️ eu mesma tiro o pistache de tudo.", "14 MAR · 18:31"),
      c("c2", "@bispobranco", "Graças a Deus! Anotei: nada de pistache pro Rei 🙏", "14 MAR · 18:44"),
      c("c3", "@claudinho_e7", "Eu tava lá, seu Rei. Que susto.", "14 MAR · 19:02"),
      c("c4", "@torre_preta", "Eu corri com a caneta kkk Roque é pra isso.", "14 MAR · 19:15"),
    ],
  },
  {
    id: "post-pk02", author: "@mestreturco", at: "11 MAR · 15:50", likes: 12, media: [pk("sp-pk02", "pk-02", "Gravura de um autômato enxadrista cercado por uma multidão")],
    caption: "Robô enxadrista invencível desde 1770! Dentro dele não há ninguém. Juro.",
    comments: [
      c("c1", "@reibranco", "Vi uma perna saindo pela gaveta.", "11 MAR · 16:10"),
      c("c2", "@torre_preta", "Golpe, Rei.", "11 MAR · 16:22"),
      c("c3", "@tabulaiofan", "Comprei o curso. Cadê meu mate em 3 dias?", "11 MAR · 18:00"),
    ],
  },
];

const person = (handle: string, displayName: string, bio: string, followers: number, following: number, postsCount: number) => ({
  handle, displayName, bio, avatarSeed: handle, posts: postsCount, followers, following,
});

export const social: SocialData = {
  profile: { handle: "@reipreto", displayName: "Rei Preto", bio: "Uma casa por vez. Corte Preta · e8 ♚", avatarSeed: "reipreto", avatarSrc: asset("avatar-rei.webp"), posts: 1, followers: 8420, following: 61 },
  posts,
  people: [
    person("@damadogambito", "Dama · Rainha Preta", "VIP. Troco tudo. #GambetDaRainha", 15200, 340, 412),
    person("@bispobranco", "Dom Bispo", "Pastor da Igreja Santa Diagonal. Só ando na diagonal, mas sempre chego. 🙏", 48700, 120, 903),
    person("@santadiagonal", "Santa Diagonal Doces & Obra", "Confeitaria beneficente da Obra da Diagonal. Peça pelo Xeque-Food.", 21300, 15, 288),
    person("@gambet_oficial", "GAMBET", "Aceite o gambito. +18. Jogue com responsabilidade.", 120400, 5, 1180),
    person("@torpreto", "Tor (Rock)", "Torre Preta. Só ando em linha reta (e chego tarde).", 1320, 210, 77),
    person("@torre_preta", "Tor (Rock)", "Torre Preta. Só ando em linha reta (e chego tarde).", 1320, 210, 77),
    person("@torrebranca", "Torre Branca", "Parceira de roque do Rei Branco. 🤘", 5400, 380, 201),
    person("@reibranco", "Rei Branco", "Corte Branca. Sempre a uma casa de distância regulamentar.", 9100, 88, 140),
    person("@cavalo_advogado", "Dr. Cavalo", "Advogado. Cavalo não pede licença, pula. ⚖️", 2100, 190, 64),
    person("@claudinho_e7", "Claudinho", "Porteiro do Palácio e8. Um dia chego na casa 8.", 410, 305, 22),
    person("@mestreturco", "Mestre Turco", "Enxadrista mecânico invencível desde 1770.", 66, 3, 5),
    person("@xequefood", "Xeque-Food", "Pediu, chegou! Peão ou Cavalo?", 88200, 12, 640),
    person("@zugzwang_oficial", "Zugzwang", "Banda oficial. Cada lance é obrigatório.", 30400, 40, 310),
  ],
};
