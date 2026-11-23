import type { SocialData, SocialPost } from "../../types";
import { asset, photo } from "./helpers";

/*
 * Feed do Piklike (roteiro 5.4), do mais recente para o mais antigo. Valores que o roteiro não traz (adicionados para o
 * layout): curtidas, horário dos comentários (usa o dia do post) e o perfil próprio do aparelho.
 *
 * AJUSTES SOBRE O ROTEIRO:
 *  - Gazeta 08 MAI: acrescentado "declarou a morte no local às 23h02" (a cronologia 2.3 diz que o jornal traz esse horário).
 *  - @cetico_la no post de Tijuana: o comentário dos "sapatos" foi trocado por um que bate com a foto 0218 (a pergunta do
 *    sósia saiu do formulário final, então Tijuana é só distração).
 */
const c = (id: string, author: string, text: string, at: string) => ({ id, author, text, at });

export const social: SocialData = {
  profile: {
    handle: "@justinnobaind",
    displayName: "Justin Nobaind",
    bio: "Shibalba. Silêncio é um instrumento.",
    avatarSeed: "justin",
    avatarSrc: asset("avatar-justin.webp"),
    posts: 2,
    followers: 128450,
    following: 31,
  },
  posts: ((): SocialPost[] => [
    {
      id: "post-0222", author: "@david_brawl", media: [photo("sp-0222", "piklike/foto-0222.webp")],
      caption: "Convivendo com o luto da minha maneira. BATERIA, BATERIA, BATERIA.", at: "14 MAI · 17:00", place: "Estúdio Reverb", likes: 5120,
      comments: [
        c("c1", "@david_brawl", "Em breve um novo disco de luto do meu projeto pessoal “Faith Fighters.”", "14 MAI"),
        c("c2", "@bbee_producao", "Mais uma parceria para a eternidade.", "14 MAI"),
        c("c3", "@katherinehate", "Cedo demais, não acha?", "14 MAI"),
        c("c4", "@joerock", "Irado!! Arrebenta, meu irmão!!", "14 MAI"),
      ],
    },
    {
      id: "post-0219", author: "@substituto_verdade", media: [photo("sp-0219", "piklike/foto-0219.webp")],
      caption: "O Programa do Substituto confirmou: Justin foi substituído. O corpo sumiu, o fantasma caminha. Somos todos marionetes para eles.", at: "13 MAI · 04:20", likes: 940,
      comments: [
        c("c1", "@cetico_la", "Você não tem prova nenhuma.", "13 MAI"),
        c("c2", "@conspira_90", "A prova é o sumiço.", "13 MAI"),
      ],
    },
    {
      id: "post-0218", author: "@rockfan_tijuana", media: [photo("sp-0218", "piklike/foto-0218.webp")],
      caption: "É ELE?? Jaqueta de couro azul igualzinha. Estava no bar da esquina.", at: "12 MAI · 23:05", place: "Tijuana", likes: 3870,
      comments: [
        c("c1", "@conspira_90", "Eu avisei. Clone.", "12 MAI"),
        c("c2", "@cetico_la", "Barba, cabelo desse jeito, esse jeito de sentar... O Justin nunca andou assim.", "12 MAI"),
        c("c3", "@fa_justin", "Meu coração.", "12 MAI"),
      ],
    },
    {
      id: "post-0217", author: "@gazeta_losangeles", media: [photo("sp-0217", "piklike/foto-0217.webp")],
      caption: "Funeral de Justin Nobaind. Caixão lacrado, por vontade do próprio cantor.", at: "11 MAI · 16:00", place: "Cemitério Pinheiros Altos", likes: 8210,
      comments: [
        c("c1", "@fa_justin", "Que tristeza.", "11 MAI"),
        c("c2", "@carregador_cx", "Era pesado demais pra um homem só.", "11 MAI"),
        c("c3", "@mamae_dolores", "Eu só queria ver meu filho.", "11 MAI"),
      ],
    },
    {
      id: "post-0215", author: "@gazeta_losangeles", media: [photo("sp-0215", "piklike/foto-0215.webp")],
      caption: "Corpo de Justin não chegou ao IML. Gravadora fala em “erro burocrático”. Autópsia adiada.", at: "09 MAI · 12:10", place: "Los Angeles", likes: 6420,
      comments: [
        c("c1", "@cetico_la", "Corpo some e ninguém se mexe?", "09 MAI"),
        c("c2", "@conspira_90", "Substituto!", "09 MAI"),
        c("c3", "@fa_justin", "Respeitem o luto.", "09 MAI"),
      ],
    },
    {
      id: "post-0216", author: "@rickjackson", media: [photo("sp-0216", "piklike/foto-0216.webp")],
      caption: "Descanse, irmão. A estrada é longa pra quem sabe sair dela.", at: "09 MAI · 09:00", likes: 4310,
      comments: [
        c("c1", "@fa_rick", "Que frase estranha.", "09 MAI"),
        c("c2", "@bbee_producao", "Apague isso.", "09 MAI"),
      ],
    },
    {
      id: "post-0214", author: "@gazeta_losangeles", media: [photo("sp-0214", "piklike/foto-0214.webp")],
      caption: "ASTRO DO ROCK MORRE: Justin Nobaind, 27, encontrado sem vida na piscina. Overdose de Sugar Rush é a hipótese. Médico responsável: Dr. Milo Stitch, que declarou a morte no local às 23h02.", at: "08 MAI · 07:00", place: "Los Angeles", likes: 15680,
      comments: [
        c("c1", "@fa_justin", "Não acredito.", "08 MAI"),
        c("c2", "@cetico_la", "A caixa nem foi aberta, olha o lacre azul.", "08 MAI"),
        c("c3", "@pop_fan_k", "Pobre Katherine.", "08 MAI"),
      ],
    },
    {
      id: "post-0213", author: "@velvetnoise", media: [photo("sp-0213", "piklike/foto-0213.webp")],
      caption: "Capa da nova edição Velvet Noise. Justin Nobaind, o Rockstar mais jovem do momento.", at: "07 MAI · 22:10", place: "Hollywood Hills", likes: 9040,
      comments: [
        c("c1", "@fa_justin", "Justin! Você é tudo!", "07 MAI"),
        c("c2", "@lillysnapps", "@fa_justin seu poser, todo mundo sabe que eu sou a fã número 1 do Shibalba", "07 MAI"),
        c("c3", "@puppteriano", "Essa geração está perdida.", "07 MAI"),
      ],
    },
    {
      id: "post-0212", author: "@swordsandtulips", media: [photo("sp-0212", "piklike/foto-0212.webp"), photo("sp-0224", "piklike/foto-0224.webp")],
      caption: "Casa cheia! Obrigado, Arizona.", at: "07 MAI · 21:30", place: "Phoenix", likes: 7765,
      comments: [c("c1", "@alextulip", "Tocamo uma da Shibalba no bis, só porque sim. Rock neles!!", "07 MAI")],
    },
    {
      id: "post-0211", author: "@justinnobaind", media: [photo("sp-0211", "piklike/foto-0211.webp")],
      caption: "Silêncio é um instrumento.", at: "07 MAI · 17:02", place: "Casa de Justin", likes: 21890,
      comments: [
        c("c1", "@katherinehate", "Vem pra dentro.", "07 MAI"),
        c("c2", "@david_brawl", "Silêncio é o cacete, volta pro estúdio.", "07 MAI"),
      ],
    },
    {
      id: "post-0210", author: "@david_brawl", media: [photo("sp-0210", "piklike/foto-0210.webp")],
      caption: "Mixando com os caras. Ninguém sai antes da meia-noite.", at: "07 MAI · 17:00", place: "Estúdio Reverb", likes: 3302,
      comments: [c("c1", "@engenheiro_sam", "Ele não saiu do canto, juro.", "07 MAI")],
    },
    {
      id: "post-0208", author: "@fundo_artistas_ind", media: [photo("sp-0208", "piklike/foto-0208.webp"), photo("sp-0223", "piklike/foto-0223.webp")],
      caption: "Recebemos uma doação anônima de US$ 250 mil. Obrigado, quem quer que seja.", at: "04 MAI · 15:00", place: "Los Angeles", likes: 1984,
      comments: [
        c("c1", "@fa_musica", "Uau.", "04 MAI"),
        c("c2", "@cetico_la", "Quem tem esse dinheiro?", "04 MAI"),
      ],
    },
    {
      id: "post-0209", author: "@marlin_azul_tuco", media: [photo("sp-0209", "piklike/foto-0209.webp")],
      caption: "Marlin Azul de cara nova. Pronto para pescaria de domingo.", at: "02 MAI · 09:20", place: "Marina Pelican, San Pedro", likes: 188,
      comments: [
        c("c1", "@mel_p", "Azul de novo?", "02 MAI"),
        c("c2", "@justinnobaind", "Capitão!", "02 MAI"),
      ],
    },
    {
      id: "post-2020", author: "@christian_old", media: [photo("sp-2020", "piklike/foto-2020.webp")],
      caption: "Nova linha de Shampoo Leasy Hair da Jones & Jones. Ótimo para cabelos rebeldes e pele macia.", at: "01 MAI · 11:37", place: "Los Angeles", likes: 2750,
      comments: [
        c("c1", "@jones_e_jones", "Cabelos únicos de um Rockstar.", "01 MAI"),
        c("c2", "@garylewis", "Comprei e aprovei!!", "01 MAI"),
        c("c3", "@louengland", "Ele também combate caspas de pele?", "01 MAI"),
      ],
    },
    {
      id: "post-0207", author: "@substituto_verdade", media: [photo("sp-0207", "piklike/foto-0207.webp"), photo("sp-0221", "piklike/foto-0221.webp")],
      caption: "O Programa do Substituto é real. Compare as fotos: antes e depois. Quem sai do Veludo volta diferente.", at: "30 ABR · 03:12", likes: 1210,
      comments: [
        c("c1", "@cetico_la", "Isso é foto de dois cantores diferentes.", "30 ABR"),
        c("c2", "@conspira_90", "Exato. Dois, não um. Clone.", "30 ABR"),
        c("c3", "@lillysnapps", "Medo desse perfil.", "30 ABR"),
      ],
    },
    {
      id: "post-0206", author: "@bbee_producao", media: [photo("sp-0206", "piklike/foto-0206.webp")],
      caption: "Quem assina com o Veludo vive para sempre.", at: "20 ABR · 11:00", likes: 1650,
      comments: [
        c("c1", "@rickjackson", "Vive, mas não escolhe onde.", "20 ABR"),
        c("c2", "@fa_justin", "Que post esquisito.", "20 ABR"),
      ],
    },
    {
      id: "post-0205", author: "@tubemusic_oficial", media: [photo("sp-0205", "piklike/foto-0205.webp"), photo("sp-0225", "piklike/foto-0225.webp")],
      caption: "Justin Nobaind e Alex Tulip discutem nos bastidores. A treta do ano?", at: "18 ABR · 22:40", place: "Prêmio Tube Music", likes: 12940,
      comments: [
        c("c1", "@lillysnapps", "ELE BATEU NO ALEX?", "18 ABR"),
        c("c2", "@fa_alex", "O Alex ganha de lavada.", "18 ABR"),
        c("c3", "@cetico_la", "Parece armado.", "18 ABR"),
      ],
    },
    {
      id: "post-0202", author: "@shibalba_oficial", media: [photo("sp-0202", "piklike/foto-0202.webp")],
      caption: "Cinco anos desde o primeiro show no Dive Roxo. Obrigado por ficar.", at: "12 MAR · 20:00", place: "Dive Roxo, Hollywood", likes: 18420,
      comments: [
        c("c1", "@christian_old", "Eu estava lá e lembro de tudo.", "12 MAR"),
        c("c2", "@david_brawl", "Quebrei duas baquetas naquela noite.", "12 MAR"),
        c("c3", "@fa_justin", "Eu também!", "12 MAR"),
      ],
    },
    {
      id: "post-0201", author: "@justinnobaind", media: [photo("sp-0201", "piklike/foto-0201.webp")],
      caption: "27 anos hoje. Ainda não aprendi a ser adulto.", at: "03 FEV · 12:00", place: "Los Angeles", likes: 30210,
      comments: [
        c("c1", "@david_brawl", "Nem vai.", "03 FEV"),
        c("c2", "@katherinehate", "Parabéns, amor.", "03 FEV"),
        c("c3", "@mamae_dolores", "Meu menino. 27 anos e ainda deixa a cama desfeita.", "03 FEV"),
        c("c4", "@lillysnapps", "Feliz aniversário, Justin!!", "03 FEV"),
      ],
    },
    {
      id: "post-0204", author: "@rickjackson", media: [photo("sp-0204", "piklike/foto-0204.webp")],
      caption: "Noite de gala com uma família que só cresce. Bem-vindos ao topo.", at: "08 JAN · 01:30", place: "Mansão Veludo, Beverly Hills", likes: 9870,
      comments: [
        c("c1", "@bbee_producao", "O topo não aceita menos.", "08 JAN"),
        c("c2", "@ramonaclouds", "Tudo certo com a lista.", "08 JAN"),
        c("c3", "@fa_rick", "Essa foto tem gente demais sorrindo.", "08 JAN"),
      ],
    },
    {
      id: "post-0203", author: "@shibalba_oficial", media: [photo("sp-0203", "piklike/foto-0203.webp")],
      caption: "Um ano de Vidro Doce. Obrigado por cantar com a gente.", at: "22 AGO 1993 · 18:00", place: "Los Angeles", likes: 14760,
      comments: [
        c("c1", "@lillysnapps", "Melhor disco do mundo.", "22 AGO 1993"),
        c("c2", "@alextulip", "Passável.", "22 AGO 1993"),
        c("c3", "@shibalba_oficial", "@alextulip fica quieto.", "22 AGO 1993"),
      ],
    },
  ])(),
  people: [],
};
