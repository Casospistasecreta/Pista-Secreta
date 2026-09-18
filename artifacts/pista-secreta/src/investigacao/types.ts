/**
 * Investigação Digital — contrato de dados.
 *
 * Este arquivo define APENAS a forma dos dados. Nenhum conteúdo de caso
 * deve viver aqui. Cada caso é um objeto `CaseData` em `./cases/`.
 */

export type AppId =
  | "messages"
  | "social"
  | "matches"
  | "gallery"
  | "location"
  | "bank"
  | "notes"
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
  hint?: string;
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
  caption?: string;
  takenAt?: string;
  place?: string;
  /** Duração em segundos (somente vídeo). */
  durationSec?: number;
}

export interface AudioRef {
  id: string;
  durationSec: number;
  /** Rótulo opcional ("Áudio", "Mensagem de voz"). */
  label?: string;
}

export interface Person {
  id: string;
  name: string;
  /** Semente do avatar procedural. */
  avatarSeed: string;
  /** Caminho/URL do avatar real, quando existir. */
  avatarSrc?: string;
  handle?: string;
  subtitle?: string;
}

/* ------------------------------------------------------------------ */
/* Mensagens                                                           */
/* ------------------------------------------------------------------ */

export interface Message {
  id: string;
  /** "victim" = enviada pela vítima; "them" = recebida. */
  from: "victim" | "them";
  at: string;
  text?: string;
  media?: MediaRef;
  audio?: AudioRef;
  link?: { label: string; url: string };
  /** Renderiza como "mensagem apagada". */
  deleted?: boolean;
  /** Separador de data exibido acima da mensagem. */
  dayLabel?: string;
}

export interface Conversation {
  id: string;
  person: Person;
  preview: string;
  time: string;
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
  text: string;
  at: string;
}

export interface SocialPost {
  id: string;
  author: string;
  media: MediaRef[];
  caption: string;
  at: string;
  place?: string;
  likes: number;
  tagged?: string[];
  comments: SocialComment[];
}

export interface SocialProfile {
  handle: string;
  displayName: string;
  bio: string;
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
  name: string;
  age: number;
  distanceKm: number;
  city?: string;
  bio?: string;
  photos: MediaRef[];
  interests?: string[];
  matchedAt?: string;
  /** Prévia da conversa dentro do app de relacionamento. */
  messages?: Message[];
  /** Nome redigido/censurado na lista ("██████"). */
  redacted?: boolean;
}

export interface MatchesData {
  appName: string;
  profile: { name: string; age: number; avatarSeed: string };
  matches: MatchProfile[];
}

/* ------------------------------------------------------------------ */
/* Fotos                                                               */
/* ------------------------------------------------------------------ */

export interface GalleryGroup {
  id: string;
  label: string;
  items: MediaRef[];
  lock?: Lock;
}

/* ------------------------------------------------------------------ */
/* Localização                                                         */
/* ------------------------------------------------------------------ */

export interface LocationStop {
  id: string;
  time: string;
  title: string;
  address?: string;
  exitTime?: string;
  durationLabel?: string;
  /** Local desconhecido/redigido. */
  redacted?: boolean;
  /** Posição relativa (0–100) no mapa estilizado. */
  point?: { x: number; y: number };
}

export interface LocationDay {
  id: string;
  label: string;
  stops: LocationStop[];
}

/* ------------------------------------------------------------------ */
/* Banco                                                               */
/* ------------------------------------------------------------------ */

export interface Transaction {
  id: string;
  time: string;
  merchant: string;
  /** Negativo = saída, positivo = entrada. Em reais. */
  amount: number;
  method?: string;
  category?: string;
  redacted?: boolean;
}

export interface BankDay {
  id: string;
  label: string;
  transactions: Transaction[];
}

export interface BankData {
  brand: string;
  holder: string;
  balance: number;
  days: BankDay[];
}

/* ------------------------------------------------------------------ */
/* Notas                                                               */
/* ------------------------------------------------------------------ */

export interface Note {
  id: string;
  title: string;
  at: string;
  preview?: string;
  /** Corpo em parágrafos. */
  body?: string[];
  checklist?: { text: string; done: boolean }[];
  media?: MediaRef[];
  link?: { label: string; url: string };
  pinned?: boolean;
  lock?: Lock;
}

/* ------------------------------------------------------------------ */
/* Caso                                                                */
/* ------------------------------------------------------------------ */

export interface Victim {
  name: string;
  age?: number;
  city?: string;
  avatarSeed: string;
  avatarSrc?: string;
}

export interface DeviceConfig {
  /** Senha da tela de bloqueio (4 dígitos). */
  passcode: string;
  carrier: string;
  batteryPercent: number;
  /** Data exibida na tela de bloqueio. */
  dateLabel: string;
  /** Hora "congelada" do dispositivo. Se ausente, usa o relógio real. */
  frozenTime?: string;
}

export interface CaseData {
  slug: string;
  title: string;
  subtitle?: string;
  victim: Victim;
  device: DeviceConfig;
  messages: Conversation[];
  social: SocialData;
  matches: MatchesData;
  gallery: GalleryGroup[];
  locations: LocationDay[];
  bank: BankData;
  notes: Note[];
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