import { useRef, useState } from "react";
import type { TouchEvent as ReactTouchEvent } from "react";
import { ChevronLeft, ChevronRight, Heart, MapPin, MessageSquare, Send, UserRound } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { Avatar, Photo } from "../components/Media";
import { EvidenceToggle } from "../components/EvidenceToggle";
import type { SocialPost, SocialProfile } from "../types";
import { useT } from "@/i18n/LanguageProvider";
import type { ResolvedLocalized } from "@/i18n/types";

const ACCENT = "#e2a0ff";

function Carousel({ post, onOpenPost }: { post: ResolvedLocalized<SocialPost>; onOpenPost: () => void }) {
  const t = useT();
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const suppressOpen = useRef(false);
  const suppressOpenTimer = useRef<number | null>(null);
  const media = post.media[index] ?? post.media[0];
  const showPhoto = (nextIndex: number) => {
    setIndex((nextIndex + post.media.length) % post.media.length);
  };
  const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("[data-carousel-control]")) return;
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: ReactTouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (startX === null || endX === undefined || post.media.length < 2) return;
    const distance = endX - startX;
    if (Math.abs(distance) < 40) return;
    showPhoto(index + (distance < 0 ? 1 : -1));
    suppressOpen.current = true;
    if (suppressOpenTimer.current !== null) window.clearTimeout(suppressOpenTimer.current);
    suppressOpenTimer.current = window.setTimeout(() => {
      suppressOpen.current = false;
      suppressOpenTimer.current = null;
    }, 450);
  };
  return (
    <div
      className="relative flex w-full justify-center bg-black/40"
      role="group"
      aria-roledescription="carousel"
      aria-label={t("social.photoCarousel", { author: post.author })}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "pan-y" }}
    >
      <button
        type="button"
        className="block w-full"
        aria-label={t("social.openPost", { author: post.author })}
        onClick={() => {
          if (suppressOpen.current) {
            suppressOpen.current = false;
            if (suppressOpenTimer.current !== null) window.clearTimeout(suppressOpenTimer.current);
            suppressOpenTimer.current = null;
            return;
          }
          onOpenPost();
        }}
      >
        {media.src
          ? <img src={media.src} alt={media.caption ?? t("gallery.photoFromDevice")} className="block h-auto max-h-[560px] w-full object-contain" />
          : <div className="aspect-[4/5] w-full"><Photo media={media} rounded="rounded-none" /></div>}
      </button>
      {post.media.length > 1 && <>
        <button
          type="button"
          onClick={() => showPhoto(index - 1)}
          data-carousel-control
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white shadow-lg ring-1 ring-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={t("social.previousPhoto")}
        >
          <ChevronLeft size={23} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => showPhoto(index + 1)}
          data-carousel-control
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white shadow-lg ring-1 ring-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={t("social.nextPhoto")}
        >
          <ChevronRight size={23} aria-hidden="true" />
        </button>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {post.media.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => showPhoto(i)}
              data-carousel-control
              className="flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={t("social.photo", { number: i + 1 })}
              aria-current={i === index ? "true" : undefined}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#fff", opacity: i === index ? .95 : .55 }} />
            </button>
          ))}
        </div>
        <span className="inv-mono absolute right-3 top-3 rounded-full bg-black/65 px-2 py-0.5 text-[10px]" aria-live="polite">{index + 1}/{post.media.length}</span>
      </>}
    </div>
  );
}

function PostCard({ post, compact = false }: { post: ResolvedLocalized<SocialPost>; compact?: boolean }) {
  const { open, labelFor } = useDevice();
  const t = useT();
  return <article className="border-b border-[var(--inv-line)] pb-4"><div className="flex items-center gap-2.5 px-4 py-3"><Avatar name={post.author} seed={post.author} size={32} ring /><div className="min-w-0 flex-1"><p className="truncate text-[13px]">{post.author}</p>{post.place && <p className="flex items-center gap-1 text-[11px] text-[var(--inv-dim)]"><MapPin size={10} />{post.place}</p>}</div><span className="inv-mono text-[10px] text-[var(--inv-dim-2)]">{post.at}</span></div><Carousel post={post} onOpenPost={() => open({ app: "social", view: "post", id: post.id })} /><div className="flex items-center gap-4 px-4 pt-3 text-[var(--inv-dim)]"><Heart size={19} /><MessageSquare size={19} /><Send size={18} /></div><p className="inv-mono px-4 pt-2 text-[11px] text-[var(--inv-dim)]">{t("social.likes", { count: post.likes.toLocaleString() })}</p><p className="px-4 pt-1 text-[13px]"><span className="text-[var(--inv-chiffon)]">{post.author}</span> {post.caption}</p>{!compact && post.comments.length > 0 && <button type="button" onClick={() => open({ app: "social", view: "post", id: post.id })} className="px-4 py-2 text-[12px] text-[var(--inv-dim)]">{t("social.viewComments", { count: post.comments.length })}</button>}<div className="px-4 pt-3"><EvidenceToggle compact accent={ACCENT} item={{ id: `social:${post.id}`, appId: "social", title: post.caption.slice(0, 60) || t("social.post"), subtitle: `${labelFor("social", "PicLike")} · ${post.at}`, target: { app: "social", view: "post", id: post.id } }} /></div></article>;
}

function ProfileView({ profile, own = false }: { profile: ResolvedLocalized<SocialProfile>; own?: boolean }) {
  const t = useT();
  const { caseData, open } = useDevice();
  const ownPosts = caseData.social.posts.filter((post) => post.author === profile.handle);
  return <AppShell accent={ACCENT} title={profile.handle} padded={false}><div className="px-4 py-5"><div className="flex items-center gap-5"><Avatar name={profile.displayName} seed={profile.avatarSeed} src={profile.avatarSrc} size={72} ring /><div className="flex flex-1 justify-around text-center">{[[t("social.posts"), profile.posts], [t("social.followers"), profile.followers], [t("social.following"), profile.following]].map(([label, value]) => <div key={String(label)}><p>{Number(value).toLocaleString()}</p><p className="inv-mono text-[9px] uppercase text-[var(--inv-dim-2)]">{label}</p></div>)}</div></div><p className="pt-4 text-[14px]">{profile.displayName}</p><p className="text-[13px] text-[var(--inv-dim)]">{profile.bio}</p></div>{own ? ownPosts.length === 0 ? <div className="flex flex-col items-center gap-2 px-6 py-12 text-center"><UserRound size={22} className="text-[var(--inv-dim-2)]" /><p className="text-[13px] text-[var(--inv-dim)]">{t("social.noPosts")}</p></div> : <div className="grid grid-cols-3 gap-[2px]">{ownPosts.flatMap((post) => post.media.map((media) => <button key={media.id} type="button" onClick={() => open({ app: "social", view: "post", id: post.id })} className="aspect-square"><Photo media={media} rounded="rounded-none" showKindBadge={false} /></button>))}</div> : <div className="flex flex-col items-center gap-2 px-6 py-12 text-center"><UserRound size={22} className="text-[var(--inv-dim-2)]" /><p className="text-[13px] text-[var(--inv-dim)]">{t("social.notCaptured")}</p></div>}</AppShell>;
}

export function SocialApp() {
  const { caseData, current, open, labelFor } = useDevice();
  const t = useT();
  const social = caseData.social;
  if (current?.view === "profile" && current.id) { const profile = social.people.find((item) => item.handle === current.id) ?? { handle: current.id, displayName: current.id, bio: t("social.noProfileInfo"), avatarSeed: current.id, posts: 0, followers: 0, following: 0 }; return <ProfileView profile={profile} />; }
  if (current?.view === "me") return <ProfileView profile={social.profile} own />;
  if (current?.view === "post") {
    const post = social.posts.find((item) => item.id === current.id);
    if (post) return <AppShell accent={ACCENT} title={t("social.post")} subtitle={post.at} padded={false}><PostCard post={post} compact /><div className="px-4 py-4"><p className="inv-mono pb-3 text-[10px] uppercase text-[var(--inv-dim-2)]">{t("social.comments")}</p>{post.comments.map((comment) => <div key={comment.id} className="flex gap-3 border-b border-[var(--inv-line)] py-3"><Avatar name={comment.author} seed={comment.author} size={30} /><div className="min-w-0 flex-1"><button type="button" onClick={() => open({ app: "social", view: "profile", id: comment.author })} className="text-[12px]" style={{ color: ACCENT }}>{comment.author}</button><p className="text-[13px]">{comment.text}</p><span className="inv-mono text-[10px] text-[var(--inv-dim-2)]">{comment.at}</span></div></div>)}</div></AppShell>;
  }
  return <AppShell accent={ACCENT} title={<span className="inv-display text-[20px]">{labelFor("social", t("app.social"))}</span>} padded={false} right={<button type="button" aria-label={t("social.openMyProfile")} className="p-1" onClick={() => open({ app: "social", view: "me" })}><Avatar name={social.profile.displayName} seed={social.profile.avatarSeed} src={social.profile.avatarSrc} size={28} ring /></button>}><div className="flex flex-col">{social.posts.map((post) => <PostCard key={post.id} post={post} />)}</div></AppShell>;
}