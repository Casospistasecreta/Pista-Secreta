import { useState } from "react";
import { Heart, MapPin, MessageSquare, Send, UserRound } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { Avatar, Photo } from "../components/Media";
import { EvidenceToggle } from "../components/EvidenceToggle";
import type { SocialPost, SocialProfile } from "../types";

const ACCENT = "#e2a0ff";

function Carousel({ post }: { post: SocialPost }) {
  const [index, setIndex] = useState(0);
  const media = post.media[index] ?? post.media[0];
  return <div className="relative aspect-[4/5] w-full"><Photo media={media} rounded="rounded-none" />{post.media.length > 1 && <><div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">{post.media.map((item, i) => <button key={item.id} type="button" onClick={() => setIndex(i)} className="h-1.5 w-1.5 rounded-full" style={{ background: "#fff", opacity: i === index ? .95 : .35 }} aria-label={`Foto ${i + 1}`} />)}</div><span className="inv-mono absolute right-3 top-3 rounded-full bg-black/45 px-2 py-0.5 text-[10px]">{index + 1}/{post.media.length}</span></>}</div>;
}

function PostCard({ post, compact = false }: { post: SocialPost; compact?: boolean }) {
  const { open } = useDevice();
  return <article className="border-b border-[var(--inv-line)] pb-4"><div className="flex items-center gap-2.5 px-4 py-3"><Avatar name={post.author} seed={post.author} size={32} ring /><div className="min-w-0 flex-1"><p className="truncate text-[13px]">{post.author}</p>{post.place && <p className="flex items-center gap-1 text-[11px] text-[var(--inv-dim)]"><MapPin size={10} />{post.place}</p>}</div><span className="inv-mono text-[10px] text-[var(--inv-dim-2)]">{post.at}</span></div><button type="button" className="block w-full" onClick={() => open({ app: "social", view: "post", id: post.id })}><Carousel post={post} /></button><div className="flex items-center gap-4 px-4 pt-3 text-[var(--inv-dim)]"><Heart size={19} /><MessageSquare size={19} /><Send size={18} /></div><p className="inv-mono px-4 pt-2 text-[11px] text-[var(--inv-dim)]">{post.likes.toLocaleString("pt-BR")} curtidas</p><p className="px-4 pt-1 text-[13px]"><span className="text-[var(--inv-chiffon)]">{post.author}</span> {post.caption}</p>{!compact && post.comments.length > 0 && <button type="button" onClick={() => open({ app: "social", view: "post", id: post.id })} className="px-4 pt-1.5 text-[12px] text-[var(--inv-dim-2)]">Ver {post.comments.length} comentário(s)</button>}<div className="px-4 pt-3"><EvidenceToggle compact accent={ACCENT} item={{ id: `social:${post.id}`, appId: "social", title: post.caption.slice(0, 60) || "Publicação", subtitle: `PicLike · ${post.at}`, target: { app: "social", view: "post", id: post.id } }} /></div></article>;
}

function ProfileView({ profile, own = false }: { profile: SocialProfile; own?: boolean }) {
  const { caseData, open } = useDevice();
  return <AppShell accent={ACCENT} title={profile.handle} padded={false}><div className="px-4 py-5"><div className="flex items-center gap-5"><Avatar name={profile.displayName} seed={profile.avatarSeed} size={72} ring /><div className="flex flex-1 justify-around text-center">{[["posts", profile.posts], ["seguidores", profile.followers], ["seguindo", profile.following]].map(([label, value]) => <div key={String(label)}><p>{Number(value).toLocaleString("pt-BR")}</p><p className="inv-mono text-[9px] uppercase text-[var(--inv-dim-2)]">{label}</p></div>)}</div></div><p className="pt-4 text-[14px]">{profile.displayName}</p><p className="text-[13px] text-[var(--inv-dim)]">{profile.bio}</p></div>{own ? <div className="grid grid-cols-3 gap-[2px]">{caseData.social.posts.flatMap((post) => post.media.map((media) => <button key={media.id} type="button" onClick={() => open({ app: "social", view: "post", id: post.id })} className="aspect-square"><Photo media={media} rounded="rounded-none" showKindBadge={false} /></button>))}</div> : <div className="flex flex-col items-center gap-2 px-6 py-12 text-center"><UserRound size={22} className="text-[var(--inv-dim-2)]" /><p className="text-[13px] text-[var(--inv-dim)]">As publicações deste perfil não foram capturadas.</p></div>}</AppShell>;
}

export function SocialApp() {
  const { caseData, current, open } = useDevice();
  const social = caseData.social;
  if (current?.view === "profile") { const profile = social.people.find((item) => item.handle === current.id); if (profile) return <ProfileView profile={profile} />; }
  if (current?.view === "me") return <ProfileView profile={social.profile} own />;
  if (current?.view === "post") {
    const post = social.posts.find((item) => item.id === current.id);
    if (post) return <AppShell accent={ACCENT} title="Publicação" subtitle={post.at} padded={false}><PostCard post={post} compact /><div className="px-4 py-4"><p className="inv-mono pb-3 text-[10px] uppercase text-[var(--inv-dim-2)]">Comentários</p>{post.comments.map((comment) => <div key={comment.id} className="flex gap-3 border-b border-[var(--inv-line)] py-3"><Avatar name={comment.author} seed={comment.author} size={30} /><div className="min-w-0 flex-1"><button type="button" onClick={() => open({ app: "social", view: "profile", id: comment.author })} className="text-[12px]" style={{ color: ACCENT }}>{comment.author}</button><p className="text-[13px]">{comment.text}</p><span className="inv-mono text-[10px] text-[var(--inv-dim-2)]">{comment.at}</span></div></div>)}</div></AppShell>;
  }
  return <AppShell accent={ACCENT} title={<span className="inv-display text-[20px]">PicLike</span>} padded={false} right={<button type="button" onClick={() => open({ app: "social", view: "me" })}><Avatar name={social.profile.displayName} seed={social.profile.avatarSeed} size={28} ring /></button>}><div className="flex flex-col">{social.posts.map((post) => <PostCard key={post.id} post={post} />)}</div></AppShell>;
}