import type { Conversation, Message } from "../../types";
import { asset } from "./helpers";
import { withExtras } from "./messages-extra";

/*
 * Mensagens (roteiro 5.1 a 5.3). Formato de data: "07 MAI · 22:48" (padrão do motor). Todos os registros são de 1994.
 * Mensagens marcadas [Entregue] no roteiro (recebidas depois da "morte" e nunca lidas) = contador de não lidas.
 *
 * AJUSTES SOBRE O ROTEIRO (todos pequenos, para o caso fechar):
 *  - Os dois "números desconhecidos" viraram duas conversas (A e B), cada uma com seu número. O prefixo "(Número A)"/"(Número B)" saiu do texto
 *    porque agora o nome da conversa já diz quem é.
 *  - Mamãe, 29 ABR: Justin passou de "Vou só." para "Levo, sim." porque a foto do jantar de 06 MAI (IMG_19940506_2030)
 *    mostra Katherine à mesa.
 *  - Katherine, 07 MAI 21:44: "Vai dormir, Kat." virou "Dirige com calma, Kat." (ela já tinha saído às 21h10 e estava na estrada).
 *  - Nomes trocados por segurança jurídica (roteiro 9.2), a pedido do autor: David Grawl → David Brawl e Kelly Glitter → Kelly Sparks.
 *    Dr. Milo Stitch ficou como no roteiro. Para voltar aos originais, basta localizar e substituir nos arquivos deste caso.
 */
const them = (id: string, at: string, text: string): Message => ({ id, from: "them", at, text });
const me = (id: string, at: string, text: string): Message => ({ id, from: "victim", at, text });

const baseMessages: Conversation[] = [
  {
    id: "c-mamae",
    person: { id: "p-mamae", name: "Mamãe", avatarSeed: "mamae", avatarSrc: asset("mensagens/mamae.webp") },
    preview: "O enterro foi lindo. Mas eu não consegui ver o seu rosto.",
    time: "11 MAI",
    unread: 2,
    messages: [
      them("m01", "14 ABR · 10:20", "Seu pai pergunta se você está comendo. Eu também."),
      me("m02", "14 ABR · 10:31", "Tô, mãe."),
      them("m03", "29 ABR · 19:05", "Sexta tem lasanha. Traz a Katherine?"),
      me("m04", "29 ABR · 19:22", "Levo, sim. E preciso conversar uns assuntos com vocês."),
      them("m05", "06 MAI · 23:30", "Chegou bem? Seu pai ficou olhando a porta até você sumir na rua."),
      me("m06", "06 MAI · 23:42", "Cheguei. Te amo, mãe. Mesmo."),
      them("m07", "06 MAI · 23:43", "Eu sei, filho. Eu também."),
      them("m08", "08 MAI · 07:30", "Filho, a polícia está aqui."),
      them("m09", "11 MAI · 22:10", "O enterro foi lindo. Mas eu não consegui ver o seu rosto. Uma mãe devia poder ver."),
    ],
  },
  {
    id: "c-bbee",
    person: { id: "p-bbee", name: "B. Bee", avatarSeed: "bbee", avatarSrc: asset("mensagens/bbee.webp") },
    preview: "Sem o Justin não tem contrato. Sem contrato não tem disco. Sem disco não tem nada.",
    time: "10 MAI",
    unread: 3,
    messages: [
      them("m01", "10 ABR · 11:02", "Contrato final na mesa. Prazo: 10 de maio. Sem emendas."),
      me("m02", "10 ABR · 11:20", "Preciso ler com calma."),
      them("m03", "10 ABR · 11:21", "Calma é luxo. Lê no carro."),
      them("m04", "21 ABR · 16:40", "Cancelei a data de Denver. O Círculo achou que você precisava descansar."),
      me("m05", "21 ABR · 16:55", "Quem é o Círculo pra decidir isso?"),
      them("m06", "21 ABR · 16:56", "Os mesmos que pagam seu cachê."),
      them("m07", "02 MAI · 10:00", "Adiantamento caiu. Não devolve. Devolver é ofensa."),
      them("m08", "05 MAI · 18:12", "Se não assinar, aquela fita com a Katherine vai parar numa revista. Pensa na moça."),
      them("m09", "07 MAI · 15:30", "Último aviso. Domingo à noite você assina ou eu assino por você."),
      me("m10", "07 MAI · 19:50", "Domingo você tem sua resposta."),
      them("m11", "08 MAI · 07:58", "Quem mandou lacrar o caixão? QUEM AUTORIZOU?"),
      them("m12", "08 MAI · 09:30", "Cadê o corpo? Me liga agora."),
      them("m13", "10 MAI · 18:00", "Sem o Justin não tem contrato. Sem contrato não tem disco. Sem disco não tem nada."),
    ],
  },
  {
    id: "c-katherine",
    person: { id: "p-katherine", name: "Katherine Hate", avatarSeed: "katherine", avatarSrc: asset("mensagens/katherine.webp") },
    preview: "Entrei numa clínica. Não consigo mais.",
    time: "09 MAI",
    unread: 3,
    messages: [
      them("m01", "12 ABR · 23:10", "Você ficou o dia todo naquele estúdio de novo. Eu sou o quê, parte do cenário?"),
      me("m02", "12 ABR · 23:31", "Kat, é pressão do Bee."),
      them("m03", "12 ABR · 23:33", "Sempre o Bee. Nunca eu."),
      them("m04", "28 ABR · 02:40", "Tô mal. Não conta pro David."),
      me("m05", "28 ABR · 02:52", "Chego em vinte minutos. Não toma nada até eu chegar."),
      them("m06", "03 MAI · 22:15", "David disse que eu sou veneno. Você concorda?"),
      me("m07", "03 MAI · 22:20", "Não."),
      them("m08", "03 MAI · 22:21", "Então por que tá me largando aos poucos?"),
      me("m09", "03 MAI · 22:30", "Não tô. Tô tentando te proteger. Um dia você entende."),
      them("m10", "07 MAI · 21:22", "Eu te odeio. Não, não odeio. Odeio essa casa."),
      them("m11", "07 MAI · 21:40", "Vi aquela caixa na mesa da piscina. Joga fora, por favor. Não quero nem olhar."),
      me("m12", "07 MAI · 21:44", "Jogo. Dirige com calma, Kat. A gente se fala."),
      them("m13", "08 MAI · 02:15", "Me diz que é mentira."),
      them("m14", "08 MAI · 03:50", "Eu fui embora. A culpa é minha."),
      them("m15", "09 MAI · 11:02", "Entrei numa clínica. Não consigo mais."),
    ],
  },
  {
    id: "c-rick",
    person: { id: "p-rick", name: "Rick Jackson", avatarSeed: "rick", avatarSrc: asset("mensagens/rick.webp") },
    preview: "Boa viagem, capitão.",
    time: "09 MAI",
    unread: 1,
    messages: [
      them("m01", "08 JAN · 02:10", "Boa festa, garoto. Esse mundo tem outro andar. Quer subir?"),
      me("m02", "08 JAN · 02:14", "Quanto custa a passagem?"),
      them("m03", "08 JAN · 02:15", "Tudo."),
      them("m04", "12 MAR · 22:30", "Se quiser sair, saia antes de assinar. Depois só pelo caixão."),
      them("m05", "05 MAI · 21:40", "Cuidado com quem sorri demais. E com quem some sem barulho."),
      them("m06", "09 MAI · 09:00", "Boa viagem, capitão."),
    ],
  },
  {
    id: "c-brock",
    person: { id: "p-brock", name: "Brock", avatarSeed: "brock", avatarSrc: asset("mensagens/brock.webp") },
    preview: "Que overdose é essa?",
    time: "09 MAI",
    unread: 1,
    messages: [
      me("m01", "03 MAI · 15:10", "Preciso de uma caixa. Das grandes."),
      them("m02", "03 MAI · 15:32", "Você? Achei que tava fora dessa."),
      me("m03", "03 MAI · 15:35", "É pra deixar na mesa da piscina. Visita."),
      them("m04", "05 MAI · 16:50", "Entregue. Caixa grande, lacre azul. Cuida."),
      them("m05", "09 MAI · 03:00", "Vi a foto da mesa no jornal. A caixa que eu te vendi tá lá, com o lacre azul inteiro. Inteiro, Justin. Que overdose é essa?"),
    ],
  },
  {
    id: "c-kelly",
    person: { id: "p-kelly", name: "Kelly Sparks", avatarSeed: "kelly", avatarSrc: asset("mensagens/kelly.webp") },
    preview: "Obrigada por tudo que você me ensinou.",
    time: "08 MAI",
    unread: 1,
    messages: [
      them("m01", "22 MAR · 14:00", "Oi, Justin! Sou a Kelly Sparks, da Tube Music. Você topa me dar umas dicas de carreira?"),
      me("m02", "22 MAR · 14:20", "Dica 1: não assina nada sem ler. Dica 2: não assina nada com o Bee."),
      them("m03", "14 ABR · 17:45", "A Katherine me olhou torto no camarim. Ela tem razão de desconfiar de mim, rs."),
      me("m04", "14 ABR · 17:50", "Ela desconfia até do espelho. Relaxa."),
      them("m05", "07 MAI · 20:20", "Boa sorte na sessão de amanhã! Te devo um café."),
      them("m06", "08 MAI · 23:00", "Obrigada por tudo que você me ensinou."),
    ],
  },
  {
    id: "c-alex",
    person: { id: "p-alex", name: "Alex Tulip", avatarSeed: "alex", avatarSrc: asset("mensagens/alex.webp") },
    preview: "Seu tolo. Seu tolo bonito.",
    time: "08 MAI",
    unread: 1,
    messages: [
      them("m01", "19 ABR · 01:20", "Vi o que o Bee fez no Prêmio. Fingir briga pra vender disco. Que vergonha."),
      me("m02", "19 ABR · 09:05", "Você também fingiu."),
      them("m03", "19 ABR · 09:07", "Eu tenho contrato. Você ainda tem escolha. Escolhe direito."),
      them("m04", "03 MAI · 20:02", "Fui na sala do Bee. Não assina. Se um dia você sumir, me avisa que eu sumo junto."),
      them("m05", "04 MAI · 12:30", "Show em Phoenix sábado. Vou tocar às 21h."),
      them("m06", "08 MAI · 05:10", "Seu tolo. Seu tolo bonito."),
    ],
  },
  {
    id: "c-ramona",
    person: { id: "p-ramona", name: "Ramona Clouds", avatarSeed: "ramona", avatarSrc: asset("mensagens/ramona.webp") },
    preview: "Cancelei todas as entrevistas. Me avisa se... me avisa.",
    time: "08 MAI",
    unread: 1,
    messages: [
      them("m01", "10 ABR · 14:00", "Reunião quinta, 15h, com B. Bee e os investidores. Eles vão te apresentar o contrato."),
      them("m02", "29 ABR · 09:10", "B. Bee quer saber onde você vai estar no fim de semana. Posso dizer?"),
      me("m03", "29 ABR · 09:40", "Diz que estou em casa."),
      them("m04", "05 MAI · 10:00", "Rick Jackson ligou duas vezes. Quer te ver antes de sábado."),
      them("m05", "06 MAI · 12:10", "Desculpa, Justin. Falei pro B. Bee que você estaria em casa sábado à noite. Ele me apertou."),
      me("m06", "06 MAI · 12:31", "Perfeito. Obrigado, Ramona."),
      them("m07", "08 MAI · 08:30", "Cancelei todas as entrevistas. Me avisa se... me avisa."),
    ],
  },
  {
    id: "c-papai",
    person: { id: "p-papai", name: "Papai", avatarSeed: "papai", avatarSrc: asset("mensagens/papai.webp") },
    preview: "Filho.",
    time: "08 MAI",
    unread: 1,
    messages: [
      them("m01", "10 MAR · 20:02", "Vi você na TV. Cabelo comprido demais."),
      me("m02", "10 MAR · 20:05", "Obrigado, pai."),
      them("m03", "10 MAR · 20:06", "Era elogio."),
      me("m04", "02 MAI · 21:15", "Cuida da mãe, pai. Qualquer coisa."),
      them("m05", "02 MAI · 21:40", "Sempre cuidei. O que está acontecendo?"),
      them("m06", "08 MAI · 07:50", "Filho."),
    ],
  },
  {
    id: "c-david",
    person: { id: "p-david", name: "David Brawl", avatarSeed: "david", avatarSrc: asset("mensagens/david.webp") },
    preview: "Se o Bee tiver a ver com isso eu acabo com ele.",
    time: "08 MAI",
    unread: 2,
    messages: [
      them("m01", "18 MAR · 15:02", "Assinou alguma coisa com o Bee sem me avisar?"),
      me("m02", "18 MAR · 15:10", "Não assinei nada."),
      them("m03", "18 MAR · 15:11", "Ótimo. Ele não é seu amigo."),
      them("m04", "03 MAI · 23:44", "Aquela mulher vai te matar, mano. Você tá limpo há seis meses, não joga isso fora."),
      me("m05", "03 MAI · 23:50", "Não é a Kat, David. Para."),
      them("m06", "07 MAI · 18:30", "Ensaio amanhã às 14h?"),
      me("m07", "07 MAI · 18:41", "Amanhã não dá. Mas, depois de domingo, a gente resolve tudo. Prometo."),
      them("m08", "07 MAI · 22:20", "Dormiu? Me liga."),
      them("m09", "08 MAI · 00:40", "Atende. Atende. ATENDE."),
      them("m10", "08 MAI · 06:12", "Se o Bee tiver a ver com isso eu acabo com ele."),
    ],
  },
  {
    id: "c-christian",
    person: { id: "p-christian", name: "Christian Old", avatarSeed: "christian", avatarSrc: asset("mensagens/christian.webp") },
    preview: "Eu devia ter chegado antes.",
    time: "08 MAI",
    unread: 1,
    messages: [
      them("m01", "18 ABR · 21:05", "A Lilly mandou oi."),
      me("m02", "18 ABR · 21:09", "Lilly manda oi pra todo mundo, mano."),
      them("m03", "18 ABR · 21:10", "Pra mim manda mais."),
      me("m04", "18 ABR · 21:12", "Ah. Então é isso. Pode deixar, segredo é meu segundo nome."),
      me("m05", "05 MAI · 17:30", "Sábado, 22h45, lá em casa. Só você."),
      them("m06", "05 MAI · 17:36", "Pra quê?"),
      me("m07", "05 MAI · 17:40", "Conversa de irmão. Prometo que vale."),
      me("m08", "07 MAI · 22:05", "Vem pela lateral. A porta tá aberta."),
      them("m09", "07 MAI · 22:07", "Tô indo."),
      them("m10", "08 MAI · 01:12", "Eu devia ter chegado antes."),
    ],
  },
  {
    id: "c-stitch",
    person: { id: "p-stitch", name: "Dr. Stitch", avatarSeed: "stitch", avatarSrc: asset("mensagens/stitch.webp") },
    preview: "Estamos bem. Apague esta conversa.",
    time: "08 MAI",
    unread: 1,
    messages: [
      them("m01", "28 MAR · 16:30", "Sr. Nobaind, aqui é Milo Stitch. O Bob me falou das suas noites. Posso ajudar."),
      them("m02", "02 ABR · 22:12", "Exercício para dormir: respire fundo, conte até dez, solte devagar. Repita."),
      them("m03", "15 ABR · 10:05", "Sua pressão está ótima. Seu coração, melhor do que o de muita gente de quarenta."),
      them("m04", "06 MAI · 14:30", "Amanhã às 22h, na sua casa, conversamos. Nada de comer depois das 16h."),
      them("m05", "07 MAI · 21:15", "Estou de sobreaviso esta noite. Qualquer coisa, ligue."),
      them("m06", "08 MAI · 04:02", "Estamos bem. Apague esta conversa."),
    ],
  },
  {
    id: "c-desconhecidos",
    person: { id: "p-desc", name: "Número desconhecido A", avatarSeed: "desconhecido", avatarSrc: asset("mensagens/desconhecido.webp") },
    preview: "Sai do jogo ou o jogo sai de você. Um amigo.",
    time: "06 MAI",
    messages: [
      them("m01", "06 MAI · 03:12", "Sai do jogo ou o jogo sai de você. Um amigo."),
    ],
  },
  {
    id: "c-desconhecido-b",
    person: { id: "p-desc-b", name: "Número desconhecido B", avatarSeed: "desconhecido-b", avatarSrc: asset("mensagens/desconhecido.webp") },
    preview: "Sei que você tem namorada. Mas eu sei cantar todas as suas músicas. — L.",
    time: "07 MAI",
    messages: [
      them("m01", "07 MAI · 17:45", "Sei que você tem namorada. Mas eu sei cantar todas as suas músicas. — L."),
    ],
  },
  {
    id: "c-bob",
    person: { id: "p-bob", name: "Bob Redwood", avatarSeed: "bob", avatarSrc: asset("mensagens/bob.webp") },
    preview: "Tudo certo. Não responda.",
    time: "08 MAI",
    unread: 1,
    archived: true,
    lock: { passcode: "1203", hint: "Justin guardava datas que comemorava com a banda." },
    messages: [
      them("m01", "15 FEV · 17:10", "Justin, aqui é Bob Redwood, da Pacific Pulse. Posso te fazer uma pergunta sobre contratos?"),
      me("m02", "15 FEV · 17:45", "Se for sobre o Bee, já gostei de você."),
      them("m03", "20 MAR · 21:12", "Cinco nomes. Todos assinaram com a mesma advogada. Todos sumiram em até um ano."),
      me("m04", "20 MAR · 21:30", "Sumiram como?"),
      them("m05", "20 MAR · 21:31", "Contratos novos, nomes novos, país novo. Há quem diga que foram substituídos. Eu digo que foram convencidos."),
      them("m06", "28 MAR · 10:02", "Um amigo médico quer te conhecer. Milo Stitch. Dorme mal quem tem muita gente em volta."),
      them("m07", "22 ABR · 23:00", "Abri um canal que ninguém lê. Procure a coruja."),
      me("m08", "28 ABR · 20:14", "E se não dá pra vencer o jogo, Bob? E se dá pra sair do tabuleiro?"),
      them("m09", "28 ABR · 20:20", "Tabuleiro tem borda. Conheço quem trabalhe na borda."),
      me("m10", "04 MAI · 22:00", "É loucura."),
      them("m11", "04 MAI · 22:03", "É por isso que funciona. Ninguém procura quem eles acham que já está acabado."),
      them("m12", "08 MAI · 03:12", "Tudo certo. Não responda."),
    ],
  },
];

/** Conversas finais: as do roteiro + as mensagens extras do pacote de atualização (messages-extra.ts), intercaladas por data. */
export const messages: Conversation[] = baseMessages.map(withExtras);
