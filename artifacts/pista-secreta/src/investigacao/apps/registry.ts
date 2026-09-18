import type { ComponentType } from "react";
import { CreditCard, FolderSearch, Heart, Images, MapPin, MessageCircle, NotebookPen, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AppId } from "../types";
import { MessagesApp } from "./MessagesApp";
import { SocialApp } from "./SocialApp";
import { MatchesApp } from "./MatchesApp";
import { GalleryApp } from "./GalleryApp";
import { LocationApp } from "./LocationApp";
import { BankApp } from "./BankApp";
import { NotesApp } from "./NotesApp";
import { CaseFileApp } from "./CaseFileApp";

export interface AppMeta { id: AppId; name: string; shortName?: string; icon: LucideIcon; accent: string; iconBackground: string; component: ComponentType; dock?: boolean; }
export const APPS: AppMeta[] = [
  { id: "messages", name: "Mensagens", icon: MessageCircle, accent: "#7fd1a8", iconBackground: "linear-gradient(150deg,#123626,#1f6b4a)", component: MessagesApp },
  { id: "social", name: "PicLike", icon: Sparkles, accent: "#e2a0ff", iconBackground: "linear-gradient(150deg,#3a1550,#7b3fe4)", component: SocialApp },
  { id: "matches", name: "Match", icon: Heart, accent: "#ff8e9e", iconBackground: "linear-gradient(150deg,#4a1226,#b43b57)", component: MatchesApp },
  { id: "gallery", name: "Fotos", icon: Images, accent: "#ffe9a8", iconBackground: "linear-gradient(150deg,#2a2113,#7a6636)", component: GalleryApp },
  { id: "location", name: "Localização", shortName: "Local", icon: MapPin, accent: "#8fb8ff", iconBackground: "linear-gradient(150deg,#12213f,#2f5aa8)", component: LocationApp },
  { id: "bank", name: "NOVA", icon: CreditCard, accent: "#b7f0e2", iconBackground: "linear-gradient(150deg,#0f2b2b,#1d6b60)", component: BankApp },
  { id: "notes", name: "Notas", icon: NotebookPen, accent: "#fffacd", iconBackground: "linear-gradient(150deg,#241d0f,#6b5a2a)", component: NotesApp },
  { id: "casefile", name: "Meu caso", icon: FolderSearch, accent: "#c7a2ff", iconBackground: "linear-gradient(150deg,#1b1230,#4b2a8a)", component: CaseFileApp, dock: true },
];
export function getApp(id: AppId) { return APPS.find((app) => app.id === id); }