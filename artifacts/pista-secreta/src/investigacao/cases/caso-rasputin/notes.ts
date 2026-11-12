import type { Note } from "../../types";
import { asset } from "./helpers";

/*
 * Notas (roteiro 5.7) + Agenda (5.8) + Gravador (5.9), estes dois como notas fixadas (plano B previsto no roteiro).
 * Ajuste autorizado: na Agenda, a chegada de Papa passou de 19 Dez (segunda) para 20 Dez (terça), como dizem as
 * mensagens de Papai e Mamãe ("na terça").
 *
 * ÁUDIO DO GRAVADOR: quando o arquivo existir, coloque-o em
 * public/investigacao/caso-rasputin/audio/ e troque a linha abaixo por, por exemplo:
 *   const GRAVACAO_AUDIO_SRC: string | undefined = asset("audio/gravacao-0001.mp3");
 * O player aparece sozinho na nota "Gravação 0001".
 */
const GRAVACAO_AUDIO_SRC: string | undefined = undefined;
void asset;

export const notes: Note[] = [
  {
    id: "n-gravacao-0001",
    title: "Gravação 0001",
    at: "17 DEZ · 02:31",
    preview: "Transcrição automática, baixa confiança.",
    body: [
      "17 Dez · 02h31 · duração 15m00s · iniciada por engano (botão lateral) · interrompida pelo limite de 15 minutos · transcrição automática, baixa confiança.\nFalantes identificados pelo sistema como Voz A, B, C, D, E e F.",
      "[00:00] ruído de tecido; respiração.\n[00:07] ao fundo, gramofone: melodia alegre de marcha, repetida, volume baixo.\n[00:21] Voz A (jovem, calma): “Veja, Grigori Yefimovich, o cristal pesa mais do que parece. Ajoelhe-se e reze um pouco.”\n[00:35] Voz B (grave, sotaque camponês): “Rezo todo dia, filho. Mas este armário é bonito. Quantas gavetinhas…”\n[01:12] ruído de gavetas pequenas.\n[02:04] Voz B: “A princesa demora, Felix.”\n[02:09] Voz A: “Já vai descer. Reze mais um pouco.”",
      "[02:40] passos no andar de cima; porta; tudo abafado.\n[03:23] Voz A (baixa): “Reze, Grigori.”\n[03:51] [DISPARO 1 — seco]\n[03:52] queda de corpo; vidro quebrando.\n[04:10] silêncio (18 s).\n[04:28] passos descendo; sussurros em russo e em francês.\n[04:41] Voz C (francês): “Il ne respire plus.” (“Ele não respira mais.”)",
      "[04:47] Voz D (russo): “Tem certeza, doutor?”\n[04:50] Voz C: “Sem pulso.”\n[05:31] porta; passos subindo.\n[10:12] passos descendo, um só par.\n[10:25] Voz A (ofegante): “Grigori Yefimovich?”\n[10:40] movimento arrastado; Voz B (muito baixa, rouca): “Felix… Felix… vou contar tudo à Mamãe.”\n[10:52] grito agudo (Voz A); passos correndo escada acima; um segundo par de passos, mais pesado, logo atrás.",
      "[11:30] porta de ferro; vento; ar frio.\n[12:02] [DISPARO 2 — seco]\n[12:05] [DISPARO 3 — seco]\n[12:09] [DISPARO 4 — seco]\n[12:31] Voz E (russo, ofegante): “Ele cai! Ele cai!”\n[12:48] corpo caindo na neve.\n[13:20] neve rangendo; vozes sussurrando.",
      "[13:41] Voz A (histérica): “Ele está vivo! Ele não morre!”\n[13:50] pancadas surdas, repetidas (seis).\n[14:02] [DISPARO 5 — GRAVE, estrondo mais forte e de outro tom que os anteriores]\n[14:03] eco; silêncio.\n[14:11] Voz F (calma, idioma: inglês, confiança 41%): “That’s done.” (“Está feito.”)\n[14:30] Voz A (chorando): “Meu Deus. Meu Deus.”\n[15:00] gravação encerrada automaticamente.",
    ],
    pinned: true,
    audio: { src: GRAVACAO_AUDIO_SRC, label: "Gravação 0001" },
  },
  {
    id: "n-agenda",
    title: "Agenda",
    at: "16 DEZ",
    preview: "22 Nov · 11h00 — Ministério do Interior (Protopopov)",
    body: [
      "22 Nov · 11h00 — Ministério do Interior (Protopopov)\n03 Dez · 18h00 — Chá · Palácio Yusupov (Felix)\n08 Dez · 17h00 — Chá · Palácio Yusupov (Felix)\n12 Dez · 14h00 — Casas de Banho Públicas\n15 Dez · 13h30 — Tsarskoye Selo (Imperatriz e Pequeno)\n17 Dez · 00h30 — Moika, 94 — Princesa Irina (via Felix)\n17 Dez · 11h00 — Chá com Anya\n20 Dez — Chegada de Papa\n07 Jan — Trem para Pokrovskoye\n21 Jan — Aniversário (Grigori, 48 anos)",
    ],
    pinned: true,
  },
  {
    id: "n-sonho",
    title: "Sonho",
    at: "12 DEZ",
    body: [
      "Sonhei com uma ponte de pedra e uma água preta que cantava meu nome. Tinha sinos, mas ninguém tocava. Acordei com gosto de amêndoa na boca. A Praska diria que é sinal. Eu digo que é fome.",
    ],
    preview: "Sonhei com uma ponte de pedra e uma água preta que cantava meu nome. Tinha sinos, mas ninguém tocava. Acordei com gosto de amêndoa na boca. A Praska diria que é sinal. Eu digo que é fome.",
  },
  {
    id: "n-lembretes",
    title: "Lembretes",
    at: "10 DEZ",
    checklist: [
      {
        text: "Perguntar a Simanovich o que é “Match”.",
        done: false,
      },
      {
        text: "Galocha nova ao lado da porta. Não esquecer.",
        done: false,
      },
      {
        text: "Avisar Matriona que volto cedo.",
        done: false,
      },
      {
        text: "Mandar mel ao Pequeno.",
        done: false,
      },
    ],
    preview: "Perguntar a Simanovich o que é “Match”.",
  },
  {
    id: "n-para-papa-e-mama-se-eu-p",
    title: "Para Papa e Mama (se eu partir)",
    at: "07 DEZ",
    body: [
      "Escrevo em paz, mas com o coração apertado. Sinto que não passarei do primeiro dia do ano novo.",
      "Se quem me tirar a vida for gente do povo, ladrão ou camponês, não tema, Papa: o seu trono ficará firme e seus filhos reinarão por muito tempo.",
      "Mas se a mão que me matar tiver sangue de príncipe e brasão de família, se os grandes da corte se sujarem com o meu sangue, então ouça: antes que passem dois anos, ninguém da sua casa continuará vivo, e será o próprio povo russo quem os levará.",
      "Não deixe isso acontecer. Escolha o povo. Escute o povo. Deus abençoe o Pequeno, Mama.",
      "— Grigori",
    ],
    preview: "Escrevo em paz, mas com o coração apertado. Sinto que não passarei do primeiro dia do ano novo.",
    lock: {
      passcode: "1890",
      hint: "As senhas são datas ou anos que Rasputin guardou nas Notas e em outros aplicativos.",
    },
  },
  {
    id: "n-datas-importantes",
    title: "Datas importantes",
    at: "01 DEZ",
    body: [
      "• 26/03 — aniversário da Matriona\n• 21/01 — meu aniversário\n• 07 Jan — trem para Pokrovskoye\n• Senha da conversa do ministro: o dia do Pequeno (dia e mês)\n• Senha da passagem: o dia em que quase morri (dia e mês)\n• Senha da nota para Papa e Mama: o ano em que me uni à Praska",
    ],
    checklist: [
      {
        text: "Chave reserva com a Akilina",
        done: false,
      },
      {
        text: "Descobrir o que é Match",
        done: false,
      },
    ],
    preview: "26/03 — aniversário da Matriona",
  },
  {
    id: "n-quem-pede-e-quem-quer",
    title: "Quem pede e quem quer",
    at: "22 NOV",
    body: [
      "• Condessa M. — quer o filho longe do front.\n• Banqueiro Rubin — quer fornecer para o exército.\n• Khvostov — quer o cargo de volta; guarda rancor.\n• Purishkevich — barulhento. Fala alto para esconder o medo.\n• Grão-duque Nicolau — não me suporta.\n• Ella — reza por mim, mas me teme.\n• Iliodor — de amigo a inimigo; só reza por dinheiro.\n• Felix — jovem triste, mãos frias, riso demais. A casa dele tem corredores demais.",
    ],
    preview: "Condessa M. — quer o filho longe do front.",
  },
  {
    id: "n-remedio-do-estomago",
    title: "Remédio do estômago",
    at: "15 NOV",
    body: [
      "Dr. Badmaev diz que meu estômago é frio e a azia me come. Pó de bicarbonato antes das refeições e leite morno. Não beber vinho forte de estômago vazio. (Eu bebo mesmo assim. Praska brigaria.)",
    ],
    preview: "Dr. Badmaev diz que meu estômago é frio e a azia me come. Pó de bicarbonato antes das refeições e leite morno. Não beber vinho forte de estômago vazio. (Eu bebo mesmo assim. Praska brigaria.)",
  },
  {
    id: "n-o-dia-em-que-me-abriram-",
    title: "O dia em que me abriram a barriga",
    at: "29 JUN",
    body: [
      "29 de junho. Em Pokrovskoye, uma mulher gritou que eu era o Anticristo e enfiou a faca na minha barriga. Vi minhas tripas ao sol. Deus me devolveu. Todo ano agradeço neste dia. A Praska diz que sou teimoso demais para morrer. Eu digo: não é teima, é encargo.",
    ],
    preview: "29 de junho. Em Pokrovskoye, uma mulher gritou que eu era o Anticristo e enfiou a faca na minha barriga. Vi minhas tripas ao sol. Deus me devolveu. Todo ano agradeço neste dia. A Praska diz que sou teimoso demais para morrer. Eu digo: não é teima, é encargo.",
  },
  {
    id: "n-cuidados-com-o-pequeno",
    title: "Cuidados com o Pequeno",
    at: "01 JUN",
    body: [
      "• Nada de aspirina: o sangue não estanca.\n• Ao primeiro sinal de dor, repouso. Não esperar piorar.\n• Água morna e pano limpo sobre a articulação.\n• Rezar baixinho. Ele escuta e se acalma.\n• Não deixar subir em árvore nem correr com cachorro.\n• Mel com pão. Histórias de lobo ajudam.",
    ],
    preview: "Nada de aspirina: o sangue não estanca.",
  },
];
