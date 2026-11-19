/**
 * Investigação Digital — contrato de dados.
 *
 * Este arquivo define APENAS a forma dos dados. Nenhum conteúdo de caso
 * deve viver aqui. Cada caso é um objeto `CaseData` em `./cases/`.
 */
import type { LocalizedText } from "@/i18n/types";

export type AppId =
  | "messages"
  | "social"
  | "matches"
  | "gallery"
  | "location"
  | "bank"
  | "notes"
  | "tabulive"
  | "casefile";

/** Uma tela dentro do dispositivo. `view`/`id` são interpretados por cada app. */
export interface Screen {
  app: AppId;
  view?: string;
  id?: string;
}

/** Conteúdo protegido por senha (notas, conversas arquivadas, álbuns...). */
export interface Lock {
  /** Senha exigida. Nesta fase é texto simples — é conteúdo de jogo, não segurança. */
  passcode: string;
  /** Dica opcional exibida na tela de senha. */
  hint?: LocalizedText;
}

/**
 * Referência de mídia. Nesta versão não existem arquivos reais: `seed` gera
 * um placeholder visual determinístico. Quando o caso tiver imagens de
 * verdade, basta preencher `src` que o componente passa a usar o arquivo.
 */
export interface MediaRef {
  id: string;
  kind: "photo" | "video";
  /** Semente do placeholder procedural (qualquer string estável). */
  seed: string;
  /** Caminho/URL da imagem real, quando existir. */
  src?: string;
  caption?: LocalizedText;
  takenAt?: LocalizedText;
  place?: LocalizedText;
  /** Duração em segundos (somente vídeo). */
  durationSec?: number;
  /** Ajuste da imagem no visualizador da galeria. Padrão: "cover" (preenche e corta). "contain" mostra a foto inteira. */
  fit?: "cover" | "contain";
}

export interface AudioRef {
  id: string;
  durationSec: number;
  /** Rótulo opcional ("Áudio", "Mensagem de voz"). */
  label?: LocalizedText;
}

export interface Person {
  id: string;
  name: LocalizedText;
  /** Semente do avatar procedural. */
  avatarSeed: string;
  /** Caminho/URL do avatar real, quando existir. */
  avatarSrc?: string;
  handle?: string;
  subtitle?: LocalizedText;
}

/* ------------------------------------------------------------------ */
/* Mensagens                                                           */
/* ------------------------------------------------------------------ */

export interface Message {
  id: string;
  /** "victim" = enviada pela vítima; "them" = recebida. */
  from: "victim" | "them";
  at: LocalizedText;
  text?: LocalizedText;
  media?: MediaRef;
  audio?: AudioRef;
  link?: { label: LocalizedText; url: string };
  /** Renderiza como "mensagem apagada". */
  deleted?: boolean;
  /** Separador de data exibido acima da mensagem. */
  dayLabel?: LocalizedText;
  /** Registro de chamada (recebida, perdida ou feita), exibido no lugar do texto. */
  call?: { kind: "received" | "missed" | "outgoing"; count?: number; duration?: string };
}

export interface Conversation {
  id: string;
  person: Person;
  preview: LocalizedText;
  time: LocalizedText;
  unread?: number;
  pinned?: boolean;
  archived?: boolean;
  lock?: Lock;
  messages: Message[];
}

/* ------------------------------------------------------------------ */
/* PicLike (rede social)                                               */
/* ------------------------------------------------------------------ */

export interface SocialComment {
  id: string;
  author: string;
  text: LocalizedText;
  at: LocalizedText;
}

export interface SocialPost {
  id: string;
  author: string;
  media: MediaRef[];
  caption: LocalizedText;
  at: LocalizedText;
  place?: LocalizedText;
  likes: number;
  tagged?: string[];
  comments: SocialComment[];
}

export interface SocialProfile {
  handle: string;
  displayName: LocalizedText;
  bio: LocalizedText;
  avatarSeed: string;
  avatarSrc?: string;
  posts: number;
  followers: number;
  following: number;
}

export interface SocialData {
  profile: SocialProfile;
  posts: SocialPost[];
  /** Perfis de terceiros abríveis a partir de comentários/marcações. */
  people: SocialProfile[];
}

/* ------------------------------------------------------------------ */
/* Match (relacionamento)                                              */
/* ------------------------------------------------------------------ */

export interface MatchProfile {
  id: string;
  name: LocalizedText;
  age: number;
  distanceKm: number;
  city?: LocalizedText;
  bio?: LocalizedText;
  photos: MediaRef[];
  interests?: LocalizedText[];
  matchedAt?: LocalizedText;
  /** Prévia da conversa dentro do app de relacionamento. */
  messages?: Message[];
  /** Nome redigido/censurado na lista ("██████"). */
  redacted?: boolean;
  /** Texto no lugar de "{distanceKm} km" (ex.: "a 40 m de você"). */
  distanceLabel?: LocalizedText;
  /** Linhas extras de "Dados do perfil" (ex.: criado em, local do cadastro). */
  details?: { label: LocalizedText; value: LocalizedText }[];
}

export interface MatchesData {
  appName: LocalizedText;
  profile: { name: LocalizedText; age: number; avatarSeed: string };
  matches: MatchProfile[];
}

/* ------------------------------------------------------------------ */
/* Fotos                                                               */
/* ------------------------------------------------------------------ */

export interface GalleryGroup {
  id: string;
  label: LocalizedText;
  items: MediaRef[];
  lock?: Lock;
}

/* ------------------------------------------------------------------ */
/* Localização                                                         */
/* ------------------------------------------------------------------ */

export interface LocationStop {
  id: string;
  time: string;
  title: LocalizedText;
  address?: LocalizedText;
  exitTime?: string;
  durationLabel?: LocalizedText;
  /** Local desconhecido/redigido. */
  redacted?: boolean;
  /** Posição relativa (0–100) no mapa estilizado. */
  point?: { x: number; y: number };
  /** Casa do tabuleiro (ex.: "e8"), usada quando `locationStyle` do caso é "chess". */
  square?: string;
}

export interface LocationDay {
  id: string;
  label: LocalizedText;
  stops: LocationStop[];
}

/* ------------------------------------------------------------------ */
/* Banco                                                               */
/* ------------------------------------------------------------------ */

export interface Transaction {
  id: string;
  time: string;
  merchant: LocalizedText;
  /** Negativo = saída, positivo = entrada. Em reais. */
  amount: number;
  method?: LocalizedText;
  category?: LocalizedText;
  redacted?: boolean;
  /** Transação trancada: detalhes só aparecem após informar o PIN. */
  lock?: Lock;
  /** Linhas extras exibidas na tela de detalhes (ex.: quem pagou). */
  details?: { label: LocalizedText; value: LocalizedText }[];
}

export interface BankDay {
  id: string;
  label: LocalizedText;
  transactions: Transaction[];
}

export interface BankData {
  brand: string;
  holder: LocalizedText;
  /** Moeda exibida. Padrão: "BRL" (R$). */
  currency?: "BRL" | "RUB";
  balance: number;
  days: BankDay[];
}

/* ------------------------------------------------------------------ */
/* Notas                                                               */
/* ------------------------------------------------------------------ */

export interface Note {
  id: string;
  title: LocalizedText;
  at: LocalizedText;
  preview?: LocalizedText;
  /** Corpo em parágrafos. */
  body?: LocalizedText[];
  checklist?: { text: LocalizedText; done: boolean }[];
  media?: MediaRef[];
  link?: { label: LocalizedText; url: string };
  pinned?: boolean;
  lock?: Lock;
  /** Gravação associada à nota. O player só aparece quando `src` existir. */
  audio?: NoteAudio;
}

export interface NoteAudio {
  src?: string;
  label?: LocalizedText;
}

/* ------------------------------------------------------------------ */
/* Caso                                                                */
/* ------------------------------------------------------------------ */

export interface Victim {
  name: LocalizedText;
  age?: number;
  city?: LocalizedText;
  avatarSeed: string;
  avatarSrc?: string;
}

export interface DeviceConfig {
  /** Senha da tela de bloqueio (4 dígitos). */
  passcode: string;
  carrier: LocalizedText;
  batteryPercent: number;
  /** Data exibida na tela de bloqueio. */
  dateLabel: LocalizedText;
  /** Hora "congelada" do dispositivo. Se ausente, usa o relógio real. */
  frozenTime?: string;
  /** Imagem de fundo da tela de bloqueio (opcional). */
  wallpaperSrc?: string;
  /** Imagem de fundo da tela inicial (opcional). */
  homeWallpaperSrc?: string;
}

export interface CaseData {
  slug: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  victim: Victim;
  device: DeviceConfig;
  messages: Conversation[];
  social: SocialData;
  matches: MatchesData;
  gallery: GalleryGroup[];
  locations: LocationDay[];
  bank: BankData;
  notes: Note[];
  /** Texto de abertura exibido no topo de "Meu caso" (opcional). */
  briefing?: LocalizedText[];
  /** Carimbo exibido em "Meu caso" (ambientação), ex.: { agency: "Departamento de Polícia", code: "Evidência Nº 0417" }. */
  stamp?: { agency: LocalizedText; code: LocalizedText };
  /** Resposta final do caso (opcional). Sem isto, "Meu caso" só lista evidências. */
  finalAnswer?: FinalAnswerConfig;
  /** Aplicativos exibidos na tela inicial. Padrão: todos, exceto "tabulive" (que só aparece nos casos que o declaram). */
  apps?: AppId[];
  /** Nomes alternativos dos aplicativos neste caso (ex.: { social: "PIKLIKE" }). */
  appLabels?: Partial<Record<AppId, LocalizedText>>;
  /** Estilo do mapa do app Localização. Padrão: "map". "chess" desenha um tabuleiro e usa `LocationStop.square`. */
  locationStyle?: "map" | "chess";
  /** Dados do app TabuLive (xadrez). Só é usado se "tabulive" estiver em `apps`. */
  tabulive?: TabuLiveData;
}

/* ------------------------------------------------------------------ */
/* TabuLive (app de xadrez com desafios que destravam conteúdo)        */
/* ------------------------------------------------------------------ */

/** Chave de desbloqueio usada pelos apps: "messages:<id>", "notes:<id>", "bank:<id>" ou "gallery:<id>". */
export interface TabuLiveUnlock {
  key: string;
  /** Texto exibido ao resolver ("Conversa arquivada: Pastor D."). */
  label: LocalizedText;
}

export interface TabuLivePuzzle {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  /** Posição inicial em FEN. */
  fen: string;
  /** Objetivo exibido ao jogador. */
  goal: LocalizedText;
  /** Dica deixada pelo dono do aparelho. */
  hint?: LocalizedText;
  /** Lance vencedor em notação brasileira, exibido quando o jogador pede a solução. */
  solution: LocalizedText;
  unlocks: TabuLiveUnlock;
}

export interface TabuLiveDuel {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  /** Posição inicial em FEN. O bot joga com a cor oposta à do jogador. */
  fen: string;
  playerColor: "w" | "b";
  /** Quanto o bot erra de propósito (0 a 1). */
  blunderRate?: number;
  goal: LocalizedText;
  hint?: LocalizedText;
  unlocks: TabuLiveUnlock;
}

export interface TabuLiveFriendChat {
  id: string;
  name: LocalizedText;
  status?: LocalizedText;
  messages: { from: "victim" | "them"; at: LocalizedText; text: LocalizedText }[];
}

export interface TabuLiveData {
  profile: { name: LocalizedText; title: LocalizedText; rating: number; avatarSeed: string; avatarSrc?: string };
  friends: TabuLiveFriendChat[];
  puzzles: TabuLivePuzzle[];
  duel?: TabuLiveDuel;
}

/* ------------------------------------------------------------------ */
/* Resposta final                                                      */
/* ------------------------------------------------------------------ */

export interface FinalQuestion {
  id: string;
  prompt: LocalizedText;
  options: { id: string; text: LocalizedText }[];
  /** Resposta correta (escolha única). */
  correctOptionId?: string;
  /** "multiple" = o jogador marca várias opções; acerta só se marcar exatamente `correctOptionIds`. */
  type?: "single" | "multiple";
  correctOptionIds?: string[];
  /** Somente com `scoring`: pontos da pergunta. */
  points?: number;
  /** Somente com `scoring`: pergunta opcional (não bloqueia o envio). */
  bonus?: boolean;
  /** Somente com `scoring`: textos exibidos no resultado. */
  feedback?: {
    correct?: LocalizedText;
    wrong?: LocalizedText;
    /** Texto específico para uma alternativa errada (escolha única). */
    wrongByOption?: Record<string, LocalizedText>;
  };
}

export interface FinalReport {
  title: LocalizedText;
  subtitle?: LocalizedText;
  paragraphs: LocalizedText[];
  closing?: LocalizedText;
}

/** Modo com pontuação: o envio sempre gera um resultado (faixa conforme os pontos) e permite refazer. */
export interface FinalScoring {
  tiers: { id: string; label: LocalizedText; minPoints: number; report: FinalReport }[];
}

export interface FinalAnswerConfig {
  /** Texto introdutório da tela de resposta. */
  intro?: LocalizedText;
  questions: FinalQuestion[];
  /** Relatório exibido somente depois que todas as respostas estão corretas (modo sem `scoring`). */
  report: FinalReport;
  scoring?: FinalScoring;
}

/* ------------------------------------------------------------------ */
/* Evidências                                                          */
/* ------------------------------------------------------------------ */

export interface EvidenceItem {
  /** Identificador estável do item marcado (ex.: "messages:c1:m4"). */
  id: string;
  appId: AppId;
  title: string;
  subtitle?: string;
  /** Tela para onde o dossiê deve levar ao tocar na evidência. */
  target?: Screen;
}