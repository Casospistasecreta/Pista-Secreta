import type { SocialData } from "../../types";
import { asset } from "./helpers";

/*
 * Feed do PicLike (roteiro 5.2), do mais recente para o mais antigo. Códigos de foto = últimos 4 dígitos do arquivo
 * (o roteiro cita 0220/03xx em partes; aqui vale o nome do arquivo). Valores menores adicionados para o layout, pois o
 * roteiro não os traz: curtidas, horário dos comentários (usa o dia do post) e o perfil próprio do aparelho.
 */
export const social: SocialData = {
  profile: {
    handle: "@grigori.rasputin",
    displayName: "Grigori Rasputin",
    bio: "Peregrino de Pokrovskoye.",
    avatarSeed: "rasputin",
    avatarSrc: asset("avatar-rasputin.webp"),
    posts: 0,
    followers: 2150,
    following: 14,
  },
  posts: [
    {
      id: "post-0320",
      author: "@gazeta_da_capital",
      media: [
        {
          id: "sp-0320",
          kind: "photo",
          seed: "sp-0320",
          src: asset("piklike/foto-0320.webp"),
        },
      ],
      caption: "Laudo preliminar do Prof. Kosorotov vaza: três ferimentos de bala; nenhum veneno no estômago; pulmões sem água. O tiro na testa, calibre .455, foi dado de muito perto e partiu de arma diferente das demais.",
      at: "20 DEZ · 18:05",
      place: "Petrogrado",
      likes: 1760,
      comments: [
        {
          id: "c1",
          author: "@dr_vasiliev",
          text: "Sem água nos pulmões? Então não se afogou.",
          at: "20 DEZ",
        },
        {
          id: "c2",
          author: "@fiel_do_starets",
          text: "Mataram duas, três vezes!",
          at: "20 DEZ",
        },
        {
          id: "c3",
          author: "@colecionador_armas",
          text: "Calibre .455? Isso é revólver militar inglês, não é Nagant russo.",
          at: "20 DEZ",
        },
        {
          id: "c4",
          author: "@purishkevich",
          text: "Fui o último a atirar, e atirei na testa.",
          at: "20 DEZ",
        },
        {
          id: "c5",
          author: "@colecionador_armas",
          text: "Com que arma, deputado? A sua é de calibre pequeno.",
          at: "20 DEZ",
        },
      ],
    },
    {
      id: "post-0219",
      author: "@gazeta_da_capital",
      media: [
        {
          id: "sp-0219",
          kind: "photo",
          seed: "sp-0219",
          src: asset("piklike/foto-0219.webp"),
        },
      ],
      caption: "Galocha encontrada na ponte; corpo retirado do gelo do Malaya Nevka. Polícia confirma: é Rasputin.",
      at: "19 DEZ · 14:30",
      place: "Ponte Petrovsky",
      likes: 2410,
      comments: [
        {
          id: "c1",
          author: "@ivan_padeiro",
          text: "A galocha é igual à da propaganda da loja.",
          at: "19 DEZ",
        },
        {
          id: "c2",
          author: "@patriota_ruso",
          text: "Acabou o pesadelo.",
          at: "19 DEZ",
        },
        {
          id: "c3",
          author: "@fiel_do_starets",
          text: "A Rússia chora hoje.",
          at: "19 DEZ",
        },
      ],
    },
    {
      id: "post-0218",
      author: "@rasputin_vive",
      media: [
        {
          id: "sp-0218",
          kind: "photo",
          seed: "sp-0218",
          src: asset("piklike/foto-0218.webp"),
        },
      ],
      caption: "VISTO NA DOCA AO AMANHECER! Rasputin não morre: sobreviveu a faca, veneno e chumbo. #Imortal",
      at: "18 DEZ · 21:12",
      place: "Petrogrado",
      likes: 77,
      comments: [
        {
          id: "c1",
          author: "@fiel_do_starets",
          text: "Eu sabia!",
          at: "18 DEZ",
        },
        {
          id: "c2",
          author: "@cetico_nev",
          text: "A foto é de 1913, bobo.",
          at: "18 DEZ",
        },
        {
          id: "c3",
          author: "@mistico_sib",
          text: "Ele já sobreviveu à facada de 1914.",
          at: "18 DEZ",
        },
      ],
    },
    {
      id: "post-0217",
      author: "@gazeta_da_capital",
      media: [
        {
          id: "sp-0217",
          kind: "photo",
          seed: "sp-0217",
          src: asset("piklike/foto-0217.webp"),
        },
      ],
      caption: "ÚLTIMA HORA: Rasputin desaparecido. Polícia investiga tiros ouvidos na Moika. Príncipe Yusupov nega ter recebido o visitante.",
      at: "17 DEZ · 11:00",
      place: "Petrogrado",
      likes: 902,
      comments: [
        {
          id: "c1",
          author: "@vera_p",
          text: "Eu ouvi tiros! Disseram que era um cachorro.",
          at: "17 DEZ",
        },
        {
          id: "c2",
          author: "@patriota_ruso",
          text: "Finalmente.",
          at: "17 DEZ",
        },
        {
          id: "c3",
          author: "@fiel_do_starets",
          text: "Isso é obra de gente maligna.",
          at: "17 DEZ",
        },
        {
          id: "c4",
          author: "@observador_capital",
          text: "Quem teria coragem de tocar no homem da Imperatriz?",
          at: "17 DEZ",
        },
      ],
    },
    {
      id: "post-0216",
      author: "@felix.yusupov",
      media: [
        {
          id: "sp-0216",
          kind: "photo",
          seed: "sp-0216",
          src: asset("piklike/foto-0216.webp"),
        },
      ],
      caption: "Noite triste: precisei sacrificar um dos meus cães. Perdoem o barulho.",
      at: "17 DEZ · 07:33",
      place: "Palácio Yusupov, Moika",
      likes: 188,
      comments: [
        {
          id: "c1",
          author: "@dmitri.p",
          text: "Meus sentimentos, Felix.",
          at: "17 DEZ",
        },
        {
          id: "c2",
          author: "@oswald.rayner",
          text: "Sorry for your loss, old chap.",
          at: "17 DEZ",
        },
        {
          id: "c3",
          author: "@purishkevich",
          text: "O pátio já está limpo.",
          at: "17 DEZ",
        },
        {
          id: "c4",
          author: "@vera_p",
          text: "Ouvi os tiros daqui! Pensei que fosse briga.",
          at: "17 DEZ",
        },
      ],
    },
    {
      id: "post-0215",
      author: "@khvostov_ex",
      media: [
        {
          id: "sp-0215",
          kind: "photo",
          seed: "sp-0215",
          src: asset("piklike/foto-0215.webp"),
        },
      ],
      caption: "Noite longa com bons amigos. A Rússia que se vire sozinha.",
      at: "17 DEZ · 02:12",
      place: "Restaurante Medved",
      likes: 41,
      comments: [
        {
          id: "c1",
          author: "@leal_carlos",
          text: "Aproveite, Excelência!",
          at: "17 DEZ",
        },
        {
          id: "c2",
          author: "@garcom_medved",
          text: "A mesa 7 ainda pede vinho.",
          at: "17 DEZ",
        },
      ],
    },
    {
      id: "post-0214",
      author: "@dmitri.p",
      media: [
        {
          id: "sp-0214",
          kind: "photo",
          seed: "sp-0214",
          src: asset("piklike/foto-0214.webp"),
        },
      ],
      caption: "Febre alta e cama. Cancelei tudo para amanhã.",
      at: "16 DEZ · 21:45",
      place: "Petrogrado",
      likes: 130,
      comments: [
        {
          id: "c1",
          author: "@s.sukhotin",
          text: "Descanse, Alteza. Cuido de tudo, inclusive do carro.",
          at: "16 DEZ",
        },
        {
          id: "c2",
          author: "@felix.yusupov",
          text: "Melhoras, meu caro.",
          at: "16 DEZ",
        },
      ],
    },
    {
      id: "post-0213",
      author: "@irina.yusupova",
      media: [
        {
          id: "sp-0213",
          kind: "photo",
          seed: "sp-0213",
          src: asset("piklike/foto-0213.webp"),
        },
      ],
      caption: "Vento forte e chuva. Dia de ficar em casa com a pequena.",
      at: "16 DEZ · 08:50",
      place: "Ai-Todor, Crimeia",
      likes: 164,
      comments: [
        {
          id: "c1",
          author: "@felix.yusupov",
          text: "Beijos. Escrevo à noite.",
          at: "16 DEZ",
        },
        {
          id: "c2",
          author: "@xenia_a",
          text: "Fechei as janelas do salão.",
          at: "16 DEZ",
        },
      ],
    },
    {
      id: "post-0212",
      author: "@irina.yusupova",
      media: [
        {
          id: "sp-0212",
          kind: "photo",
          seed: "sp-0212",
          src: asset("piklike/foto-0212.webp"),
        },
      ],
      caption: "Sol de inverno na Crimeia. Mamãe, eu e a pequena Irina, enfim juntas.",
      at: "14 DEZ · 12:03",
      place: "Ai-Todor, Crimeia",
      likes: 198,
      comments: [
        {
          id: "c1",
          author: "@felix.yusupov",
          text: "Saudades, meu amor. Beijo na pequena.",
          at: "14 DEZ",
        },
        {
          id: "c2",
          author: "@xenia_a",
          text: "Aproveitem o sol, queridas.",
          at: "14 DEZ",
        },
      ],
    },
    {
      id: "post-0211",
      author: "@iliodor_oficial",
      media: [
        {
          id: "sp-0211",
          kind: "photo",
          seed: "sp-0211",
          src: asset("piklike/foto-0211.webp"),
        },
      ],
      caption: "O falso santo de Pokrovskoye ainda caminha entre nós. Mas o que sobe depressa desce de repente.",
      at: "14 DEZ · 10:19",
      place: "Cristiânia (Noruega)",
      likes: 39,
      comments: [
        {
          id: "c1",
          author: "@peregrino_sib",
          text: "O senhor já foi amigo dele, não?",
          at: "14 DEZ",
        },
        {
          id: "c2",
          author: "@iliodor_oficial",
          text: "Fui enganado.",
          at: "14 DEZ",
        },
        {
          id: "c3",
          author: "@fiel_do_starets",
          text: "Inveja pura.",
          at: "14 DEZ",
        },
      ],
    },
    {
      id: "post-0210",
      author: "@felix.yusupov",
      media: [
        {
          id: "sp-0210",
          kind: "photo",
          seed: "sp-0210",
          src: asset("piklike/foto-0210.webp"),
        },
      ],
      caption: "Oxford, 1909 → Petrogrado, 1916. Sete anos depois, meu velho colega de quarto bate à minha porta. Chá e lembranças.",
      at: "11 DEZ · 16:40",
      place: "Palácio Yusupov, Moika",
      likes: 276,
      comments: [
        {
          id: "c1",
          author: "@oswald.rayner",
          text: "Seu chá continua o melhor do hemisfério, old chap.",
          at: "11 DEZ",
        },
        {
          id: "c2",
          author: "@dmitri.p",
          text: "Preciso conhecê-lo.",
          at: "11 DEZ",
        },
        {
          id: "c3",
          author: "@purishkevich",
          text: "Bom ter amigos de confiança em tempos difíceis.",
          at: "11 DEZ",
        },
      ],
    },
    {
      id: "post-0209",
      author: "@khvostov_ex",
      media: [
        {
          id: "sp-0209",
          kind: "photo",
          seed: "sp-0209",
          src: asset("piklike/foto-0209.webp"),
        },
      ],
      caption: "Quem ontem mandava hoje espera. Mas a memória é longa.",
      at: "09 DEZ · 20:02",
      place: "Petrogrado",
      likes: 54,
      comments: [
        {
          id: "c1",
          author: "@leal_carlos",
          text: "Volte ao cargo, Excelência!",
          at: "09 DEZ",
        },
        {
          id: "c2",
          author: "@tolo_anonimo",
          text: "Foi demitido por incompetência.",
          at: "09 DEZ",
        },
        {
          id: "c3",
          author: "@khvostov_ex",
          text: "Respondo em breve.",
          at: "09 DEZ",
        },
      ],
    },
    {
      id: "post-0208",
      author: "@padaria_filippov",
      media: [
        {
          id: "sp-0208",
          kind: "photo",
          seed: "sp-0208",
          src: asset("piklike/foto-0208.webp"),
        },
      ],
      caption: "Hoje só pão preto. O branco acabou às seis da manhã.",
      at: "08 DEZ · 07:30",
      place: "Petrogrado",
      likes: 148,
      comments: [
        {
          id: "c1",
          author: "@maria_costureira",
          text: "Pelo menos tem.",
          at: "08 DEZ",
        },
        {
          id: "c2",
          author: "@ivan_padeiro",
          text: "Falta farinha em toda a cidade.",
          at: "08 DEZ",
        },
      ],
    },
    {
      id: "post-0207",
      author: "@galochas_triangulo",
      media: [
        {
          id: "sp-0207",
          kind: "photo",
          seed: "sp-0207",
          src: asset("piklike/foto-0207.webp"),
        },
      ],
      caption: "Galochas de borracha preta com forro vermelho. Proteção contra neve e degelo. Numeração 40 a 46.",
      at: "03 DEZ · 10:00",
      place: "Petrogrado",
      likes: 31,
      comments: [
        {
          id: "c1",
          author: "@ivan_padeiro",
          text: "Comprei as minhas ontem.",
          at: "03 DEZ",
        },
        {
          id: "c2",
          author: "@vera_p",
          text: "Quanto custa?",
          at: "03 DEZ",
        },
      ],
    },
    {
      id: "post-0206",
      author: "@gazeta_da_capital",
      media: [
        {
          id: "sp-0206",
          kind: "photo",
          seed: "sp-0206",
          src: asset("piklike/foto-0206.webp"),
        },
      ],
      caption: "Filas de pão crescem pela cidade. Governo promete soluções esta semana.",
      at: "28 NOV · 08:30",
      place: "Petrogrado",
      likes: 205,
      comments: [
        {
          id: "c1",
          author: "@ivan_padeiro",
          text: "Prometem e não entregam.",
          at: "28 NOV",
        },
        {
          id: "c2",
          author: "@maria_costureira",
          text: "Duas horas na fila hoje.",
          at: "28 NOV",
        },
        {
          id: "c3",
          author: "@vera_p",
          text: "E o carvão, quando chega?",
          at: "28 NOV",
        },
      ],
    },
    {
      id: "post-0205",
      author: "@arquivo_siberiano",
      media: [
        {
          id: "sp-0205",
          kind: "photo",
          seed: "sp-0205",
          src: asset("piklike/foto-0205.webp"),
        },
      ],
      caption: "Khioniya Guseva, autora do ataque de 29 de Junho de 1914 contra Rasputin, segue internada em hospital psiquiátrico.",
      at: "22 NOV · 13:10",
      place: "Tomsk",
      likes: 63,
      comments: [
        {
          id: "c1",
          author: "@fiel_do_starets",
          text: "Que fique lá.",
          at: "22 NOV",
        },
        {
          id: "c2",
          author: "@peregrino_sib",
          text: "Dizem que ela nunca se arrependeu.",
          at: "22 NOV",
        },
      ],
    },
    {
      id: "post-0204",
      author: "@purishkevich",
      media: [
        {
          id: "sp-0204",
          kind: "photo",
          seed: "sp-0204",
          src: asset("piklike/foto-0204.webp"),
        },
      ],
      caption: "Hoje eu disse na tribuna o que ninguém tinha coragem de dizer: o trono está cercado por forças obscuras. Que Deus salve a Rússia.",
      at: "19 NOV · 22:10",
      place: "Palácio Táurida (Duma)",
      likes: 412,
      comments: [
        {
          id: "c1",
          author: "@patriota_ruso",
          text: "Coragem rara!",
          at: "19 NOV",
        },
        {
          id: "c2",
          author: "@vera_p",
          text: "Ele vai pagar caro por isso.",
          at: "19 NOV",
        },
        {
          id: "c3",
          author: "@observador_capital",
          text: "E agora, o que ele pretende fazer?",
          at: "19 NOV",
        },
        {
          id: "c4",
          author: "@purishkevich",
          text: "Falta pouco.",
          at: "19 NOV",
        },
      ],
    },
    {
      id: "post-0203",
      author: "@o_marionetista",
      media: [
        {
          id: "sp-0203",
          kind: "photo",
          seed: "sp-0203",
          src: asset("piklike/foto-0203.webp"),
        },
      ],
      caption: "Quem governa a Rússia? O Imperador, ou o camponês que sussurra no ouvido da Imperatriz? Abram os olhos. #ForçasDasTrevas",
      at: "15 NOV · 09:40",
      likes: 87,
      comments: [
        {
          id: "c1",
          author: "@patriota_ruso",
          text: "Basta!",
          at: "15 NOV",
        },
        {
          id: "c2",
          author: "@vera_p",
          text: "Isso é calúnia.",
          at: "15 NOV",
        },
        {
          id: "c3",
          author: "@ivan_padeiro",
          text: "O pão acabou e eles discutem quem manda.",
          at: "15 NOV",
        },
        {
          id: "c4",
          author: "@observador_capital",
          text: "Meia verdade também é mentira.",
          at: "15 NOV",
        },
      ],
    },
    {
      id: "post-0201",
      author: "@tatiana_n",
      media: [
        {
          id: "sp-0201",
          kind: "photo",
          seed: "sp-0201",
          src: asset("piklike/foto-0201.webp"),
        },
      ],
      caption: "Plantão no hospital. Os nossos soldados são mais fortes do que imaginam.",
      at: "10 NOV · 11:20",
      place: "Tsarskoye Selo",
      likes: 2140,
      comments: [
        {
          id: "c1",
          author: "@olga_n",
          text: "Orgulho de você.",
          at: "10 NOV",
        },
        {
          id: "c2",
          author: "@anastasia_n",
          text: "Eu lavei as bandagens! Quase.",
          at: "10 NOV",
        },
        {
          id: "c3",
          author: "@soldado_ivan",
          text: "Obrigado, Alteza.",
          at: "10 NOV",
        },
        {
          id: "c4",
          author: "@anna_vyr",
          text: "Nossa menina de ouro.",
          at: "10 NOV",
        },
      ],
    },
    {
      id: "post-0202",
      author: "@alexei_n",
      media: [
        {
          id: "sp-0202",
          kind: "photo",
          seed: "sp-0202",
          src: asset("piklike/foto-0202.webp"),
        },
      ],
      caption: "12 anos hoje! Papai trouxe um bolo grande demais para mim.",
      at: "30 JUL · 14:02",
      place: "Tsarskoye Selo",
      likes: 3520,
      comments: [
        {
          id: "c1",
          author: "@tatiana_n",
          text: "Parabéns, Pequeno!",
          at: "30 JUL",
        },
        {
          id: "c2",
          author: "@anastasia_n",
          text: "Eu comi metade.",
          at: "30 JUL",
        },
        {
          id: "c3",
          author: "@anna_vyr",
          text: "Que Deus te guarde, querido.",
          at: "30 JUL",
        },
      ],
    },
  ],
  people: [],
};
