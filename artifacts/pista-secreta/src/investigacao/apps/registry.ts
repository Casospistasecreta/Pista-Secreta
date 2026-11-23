import type { ComponentType } from "react";
import { Crown, CreditCard, FolderSearch, Heart, Images, MapPin, MessageCircle, NotebookPen, Phone, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AppId } from "../types";
import type { TranslationKey } from "@/i18n/LanguageProvider";
import { MessagesApp } from "./MessagesApp";
import { SocialApp } from "./SocialApp";
import { MatchesApp } from "./MatchesApp";
import { GalleryApp } from "./GalleryApp";
import { LocationApp } from "./LocationApp";
import { BankApp } from "./BankApp";
import { NotesApp } from "./NotesApp";
import { CaseFileApp } from "./CaseFileApp";
import { TabuLiveApp } from "./TabuLiveApp";
import { CallsApp } from "./CallsApp";

export interface AppMeta { id: AppId; name: string; nameKey: TranslationKey; shortName?: string; shortNameKey?: TranslationKey; icon: LucideIcon; accent: string; iconBackground: string; component: ComponentType; dock?: boolean; }
export const APPS: AppMeta[] = [
  { id: "messages", name: "Mensagens", nameKey: "app.messages", icon: MessageCircle, accent: "#7fd1a8", iconBackground: "linear-gradient(150deg,#123626,#1f6b4a)", component: MessagesApp },
  { id: "social", name: "PicLike", nameKey: "app.social", icon: Sparkles, accent: "#e2a0ff", iconBackground: "linear-gradient(150deg,#3a1550,#7b3fe4)", component: SocialApp },
  { id: "matches", name: "Match", nameKey: "app.matches", icon: Heart, accent: "#ff8e9e", iconBackground: "linear-gradient(150deg,#4a1226,#b43b57)", component: MatchesApp },
  { id: "gallery", name: "Fotos", nameKey: "app.gallery", icon: Images, accent: "#ffe9a8", iconBackground: "linear-gradient(150deg,#2a2113,#7a6636)", component: GalleryApp },
  { id: "location", name: "Localização", nameKey: "app.location", shortName: "Local", shortNameKey: "app.locationShort", icon: MapPin, accent: "#8fb8ff", iconBackground: "linear-gradient(150deg,#12213f,#2f5aa8)", component: LocationApp },
  { id: "bank", name: "NOVA", nameKey: "app.bank", icon: CreditCard, accent: "#b7f0e2", iconBackground: "linear-gradient(150deg,#0f2b2b,#1d6b60)", component: BankApp },
  { id: "notes", name: "Notas", nameKey: "app.notes", icon: NotebookPen, accent: "#fffacd", iconBackground: "linear-gradient(150deg,#241d0f,#6b5a2a)", component: NotesApp },
  { id: "tabulive", name: "TabuLive", nameKey: "app.tabulive", icon: Crown, accent: "#a8e6a1", iconBackground: "linear-gradient(150deg,#0f2a1a,#2f7a46)", component: TabuLiveApp },
  { id: "calls", name: "Chamadas", nameKey: "app.calls", icon: Phone, accent: "#9be7a6", iconBackground: "linear-gradient(150deg,#0f2a17,#2d7a43)", component: CallsApp },
  { id: "casefile", name: "Meu caso", nameKey: "app.casefile", icon: FolderSearch, accent: "#c7a2ff", iconBackground: "linear-gradient(150deg,#1b1230,#4b2a8a)", component: CaseFileApp, dock: true },
];
export function getApp(id: AppId) { return APPS.find((app) => app.id === id); }