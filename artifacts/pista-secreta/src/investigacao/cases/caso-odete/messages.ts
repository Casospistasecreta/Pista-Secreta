import type { Conversation } from "../../types";
import { asset, me, photo, them } from "./helpers";

/*
 * Datas: o roteiro não traz o ano. Out–Dez = 2025, Jan–Fev = 2026
 * (confirmado pela manchete de 20/jan/2026). O campo `at` carrega dia e hora.
 * Ajustes autorizados: cartões "segunda-feira"/"quarta-feira" da Deise movidos
 * para 29/dez e 07/jan, para bater com o dia da semana.
 */

const shirley: Conversation = {
  id: "c-shirley",
  person: { id: "p-shirley", name: "Shirley", avatarSeed: "shirley", avatarSrc: asset("perfis/shirley.webp") },
  preview: "Tem um homem rondando sua casa. Ele ta procurando ocê",
  time: "18 JAN",
  messages: [
    them("m01", "22 OUT · 15:11", "Fiz bolo de fubá."),
    them("m02", "22 OUT · 15:12", "Passa aqui."),
    me("m03", "22 OUT · 15:20", "Colhi umas mexirica docinha, to levando tbm."),
    me("m04", "27 OUT · 13:47", "Vou ter um encontro hoje", photo("ph-012122", "mensagens/foto-012122.webp")),
    me("m05", "27 OUT · 13:48", "Qual desses vai ficar melhor?"),
    them("m06", "27 OUT · 14:03", "O Vermelho. Cor da paixão. Depois me conta tudo"),
    me("m07", "27 OUT · 15:56", "Na ginástica eu te conto"),
    me("m08", "07 JAN · 08:47", "bom dia sua véia, bora para o pilates?"),
    them("m09", "07 JAN · 09:58", "Hoje nn dá, recebi visita", photo("ph-012121", "mensagens/foto-012121.webp")),
    them("m10", "16 JAN · 11:17", "Odete, quando você vai me mostrar o bonitão que tanto falou?"),
    me("m11", "16 JAN · 13:26", "To com ele agora mesmo"),
    them("m12", "16 JAN · 13:47", "Cuidado com o marca-passo"),
    me("m13", "16 JAN · 14:06", "rs"),
    them("m14", "18 JAN · 16:23", "Odete, tá esperando companhia?"),
    them("m15", "18 JAN · 16:24", "Tem um homem rondando sua casa. Ele ta procurando ocê"),
  ],
};

const deise: Conversation = {
  id: "c-deise",
  person: { id: "p-deise", name: "Deise", avatarSeed: "deise", avatarSrc: asset("perfis/deise.webp") },
  preview: "Bom diaa Deise",
  time: "16 JAN",
  messages: [
    me("m01", "25 DEZ · 06:11", "Feliz Natal minha sobrinha mais linda"),
    me("m02", "26 DEZ · 07:14", "Bom dia Deise, te amo"),
    me("m03", "29 DEZ · 09:14", undefined, photo("ph-012141", "mensagens/foto-012141.webp")),
    me("m04", "30 DEZ · 08:44", "Bom dia flor, bom final de ano"),
    me("m05", "01 JAN · 07:14", "Bom dia, quando voce vem me visitar?"),
    me("m06", "07 JAN · 06:33", "Bom diaa, tenha um ótimo dia"),
    me("m07", "07 JAN · 07:14", undefined, photo("ph-012142", "mensagens/foto-012142.webp")),
    me("m08", "08 JAN · 06:57", "Bom dia meu amor"),
    me("m09", "10 JAN · 07:13", "Bom diaa lindinha"),
    me("m10", "11 JAN · 09:54", undefined, photo("ph-012143", "mensagens/foto-012143.webp")),
    me("m11", "12 JAN · 10:03", "Bom diaa, hoje dormi até tarde"),
    me("m12", "13 JAN · 09:30", "te amo sabia?"),
    me("m13", "14 JAN · 07:03", "Bom diaa"),
    me("m14", "15 JAN · 12:02", undefined, photo("ph-012144", "mensagens/foto-012144.webp")),
    me("m15", "16 JAN · 06:33", "Bom diaa Deise"),
  ],
};

const luisDesconhecido: Conversation = {
  id: "c-desconhecido-luis",
  person: { id: "p-desconhecido-luis", name: "Número desconhecido", avatarSeed: "desconhecido-luis", avatarSrc: asset("perfis/desconhecido.webp") },
  preview: "Tem Bolo?",
  time: "18 JAN",
  messages: [
    them("m01", "10 JAN · 11:10", "Bom dia Odete, aqui é o Luis. Peguei seu número da feira"),
    them("m02", "18 JAN · 15:56", "vim fazer uma surpresinha", photo("ph-012101", "mensagens/foto-012101.webp")),
    them("m03", "18 JAN · 15:58", "Tem Bolo?"),
  ],
};

const sebastiao: Conversation = {
  id: "c-sebastiao",
  person: { id: "p-sebastiao", name: "Sebastião", avatarSeed: "sebastiao", avatarSrc: asset("perfis/sebastiao.webp") },
  preview: "Hoje eu te convenço a vender o Rancho.",
  time: "02 FEV",
  messages: [
    them("m01", "16 JUN · 11:29", "Tia, teria como me passar um dinheirinho do Tio para eu viajar com as crianças?"),
    me("m02", "16 JUN · 12:11", "Ta feito!! Boa viagem. Amo vocês."),
    them("m03", "09 AGO · 17:04", "Tia, precisamos conversar sobre aquela questão do rancho."),
    them("m04", "13 AGO · 10:44", "Que tal morar na cidade? Vende ai e alugamos um quartinho para você."),
    me("m05", "13 AGO · 14:35", "Para de ser chato garoto"),
    me("m06", "13 AGO · 14:36", "Amo minha casinha que eu e seu tio construimos para a gente."),
    them("m07", "13 AGO · 15:02", "Isso de morar no interior é passado tia. Ta tudo muito velho ai."),
    them("m08", "13 AGO · 15:10", "Pensa bem viu?"),
    them("m09", "22 SET · 08:10", "Tia, to passando por Rio Verde e vou passar aí para almoçar com as crianças. Podemos aproveitar e falar do Rancho."),
    me("m10", "25 DEZ · 07:13", "Feliz Natal Sebastião!! Um beijo para você e as crianças."),
    me("m11", "01 JAN · 05:55", undefined, photo("ph-012111", "mensagens/foto-012111.webp")),
    them("m12", "19 JAN · 10:33", "Tia, faz tempo que a senhora não me passa uma graninha… Faltou dezembro e janeiro."),
    them("m13", "21 JAN · 18:58", "???"),
    them("m14", "02 FEV · 10:04", "To passando ai para te visitar tia."),
    them("m15", "02 FEV · 10:05", "Hoje eu te convenço a vender o Rancho."),
  ],
};

const afonso: Conversation = {
  id: "c-afonso",
  person: { id: "p-afonso", name: "Afonso", avatarSeed: "afonso", avatarSrc: asset("perfis/afonso.webp") },
  preview: "Conteúdo protegido",
  time: "06 JAN",
  archived: true,
  lock: { passcode: "6969" },
  messages: [
    them("m01", "30 OUT · 16:11", "As 18h estarei passando aí docinho."),
    me("m02", "30 OUT · 16:40", "Estarei esperando."),
    them("m03", "01 NOV · 15:20", "Me diverti muito ontem."),
    me("m04", "01 NOV · 17:20", "Quero ver você comprir o que prometeu"),
    them("m05", "01 NOV · 19:26", "Mais quatro encontros e eu faço acontecer"),
    me("m06", "04 NOV · 11:33", "Então não vou perder tempo"),
    me("m07", "04 NOV · 11:34", "Hoje vai estar ocupado?"),
    them("m08", "04 NOV · 13:22", "Para você nunca, já sei até o local"),
    them("m09", "04 NOV · 13:22", "Mesmo horário"),
    me("m10", "19 NOV · 16:24", "Conseguiu encontrar alguma coisa?"),
    them("m11", "19 NOV · 18:06", "Melhor pessoalmente. Amanhã eu passo ai"),
    them("m12", "08 DEZ · 11:30", "Engraçado eu estar com saudades?"),
    them("m13", "08 DEZ · 11:31", "Normalmente é ao contrário"),
    me("m14", "08 DEZ · 12:11", "Hoje eu vou fazer um jantar estrelado para a gente no Rancho"),
    me("m15", "17 DEZ · 16:31", "Não era ele. Nem perto de ser ele"),
    them("m16", "17 DEZ · 17:03", "Tem certeza? Vou aí para falarmos."),
    them("m17", "05 JAN · 22:23", "Você não sai da minha cabeça. Amanhã eu te pego ein"),
    me("m18", "06 JAN · 07:22", "Lembrando que esse é nosso quinto encontro"),
    them("m19", "06 JAN · 17:54", "Já sei. To chegando!! bora bora"),
  ],
};

const azimov: Conversation = {
  id: "c-desconhecido-azimov",
  person: { id: "p-desconhecido-azimov", name: "Número desconhecido", avatarSeed: "desconhecido-azimov", avatarSrc: asset("perfis/desconhecido.webp") },
  preview: "Olá _ Odete _ Permita-me apresentar-me. Eu sou o Príncipe Azimov…",
  time: "11 SET",
  messages: [
    them(
      "m01",
      "11 SET · 12:00",
      [
        "Olá _ Odete _ Permita-me apresentar-me. Eu sou o Príncipe Azimov, emissário do Planeta Io. Prezada Senhora Odete de Jesus,",
        "Meu nome é Azimov, Príncipe Herdeiro e Emissário Diplomático do planeta Io, uma das luas de Júpiter.",
        "Peço desculpas por entrar em contato desta maneira, mas nossa situação é de EXTREMA URGÊNCIA.",
        "Para ativar o Protocolo de Luz de Io, é preciso transferir para a Terra uma quantidade de energia que atualmente está bloqueada em uma conta diplomática interplanetária.",
        "Para liberar esta energia, necessito da sua ajuda. Por favor não tenha medo, você foi Escolhida",
        "Para enviarmos o código secreto de ativação e enviar as transmissões instrutivas, precisaríamos de algumas informações. Tudo o que necessito de si neste momento é do seu interesse mútuo, confirmando os seus dados básicos (Nome Completo, Número de Telefone e Dados Bancários) para darmos início ao Protocolo.",
        "Não compartilhe esta mensagem com outras pessoas. Os governos da Terra ainda não estão preparados para conhecer a verdade.",
        "O tempo está acabando.",
        "PRÍNCIPE AZIMOV",
      ].join("\n\n"),
    ),
  ],
};

const nova: Conversation = {
  id: "c-nova-banking",
  person: { id: "p-nova-banking", name: "Nova Banking", avatarSeed: "nova-banking", avatarSrc: asset("perfis/nova.webp") },
  preview: "Solicitação de autorização — Garantia imobiliária",
  time: "09 JAN",
  messages: [
    them(
      "m01",
      "09 JAN · 16:15",
      [
        "Solicitação de autorização — Garantia imobiliária",
        "Prezado Sr. Sebastião Borges,",
        "Identificamos em seu cadastro uma solicitação referente à constituição de garantia hipotecária sobre o imóvel rural denominado “Rancho Rio Verde”, registrado em seu nome.",
        "Para prosseguimento da análise e formalização da operação, é necessária a confirmação expressa do proprietário quanto à autorização para utilização do referido imóvel como garantia.",
        "Solicitação: Autorização para constituição de hipoteca\nImóvel: Rancho Rio Verde\nTitular: Sebastião Borges\nFinalidade: Garantia de operação de crédito\nPrazo para manifestação: 5 dias úteis.",
        "Solicitamos que responda a esta mensagem confirmando sua autorização ou entre em contato com nossa agência para esclarecimentos. A ausência de manifestação dentro do prazo informado poderá resultar na suspensão da solicitação até que seja obtida a autorização necessária.",
        "Atenciosamente,\nSetor de Crédito e Garantias\nBanco Nova — Agência Varginha/MG",
      ].join("\n\n"),
    ),
  ],
};

/** Ordenadas pela mensagem mais recente, como num aplicativo real. */
export const messages: Conversation[] = [sebastiao, shirley, luisDesconhecido, deise, nova, azimov, afonso];
