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

  return (
    <div className="relative aspect-[4/5] w-full">
      <Photo media={media} rounded="rounded-none" />
      {post.media.length > 1 && (
        <>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {post.media.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Foto ${i + 1}`}
                className="h-1.5 w-1.5 rounded-full transition-opacity"
                style={{ background: "#fff", opacity: i === index ? 0.95 : 0.35 }}
              />
            ))}
          </div>
          <span className="inv-mono absolute right-3 top-3 rounded-full bg-black/45 px-2 py-0.5 text-[10px] backdrop-blur-sm">
            {index + 1}/{post.media.length}
          </span>
        </>
      )}
    </div>
  );
}

function PostCard({ post, compact = false }: { post: SocialPost; compact?: boolean }) {
  const { open } = useDevice();

  return (
    <article className="border-b border-[var(--inv-line)] pb-4">
      <div className="flex items-center gap-2.5 px-4 py-3">
        <Avatar name={post.author} seed={post.author} size={32} ring />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px]">{post.author}</p>
          {post.place && (
            <p className="flex items-center gap-1 text-[11px] text-[var(--inv-dim)]">
              <MapPin size={10} />
              {post.place}
            </p>
          )}
        </div>
        <span className="inv-mono text-[10px] text-[var(--inv-dim-2)]">{post.at}</span>
      </div>

      <button
        type="button"
        className="block w-full"
        onClick={() => open({ app: "social", view: "post", id: post.id })}
      >
        <Carousel post={post} />
      </button>

      <div className="flex items-center gap-4 px-4 pt-3 text-[var(--inv-dim)]">
        <Heart size={19} />
        <MessageSquare size={19} />
        <Send size={18} />
      </div>

      <p className="inv-mono px-4 pt-2 text-[11px] text-[var(--inv-dim)]">
        {post.likes.toLocaleString("pt-BR")} curtidas
      </p>

      <p className="px-4 pt-1 text-[13px] leading-snug">
        <span className="text-[var(--inv-chiffon)]">{post.author}</span> {post.caption}
      </p>

      {post.tagged && post.tagged.length > 0 && (
        <p className="px-4 pt-1 text-[12px]" style={{ color: ACCENT }}>
          Com {post.tagged.join(", ")}
        </p>
      )}

      {!compact && post.comments.length > 0 && (
        <button
          type="button"
          onClick={() => open({ app: "social", view: "post", id: post.id })}
          className="px-4 pt-1.5 text-[12px] text-[var(--inv-dim-2)]"
        >
          Ver {post.comments.length} comentário(s)
        </button>
      )}

      <div className="px-4 pt-3">
        <EvidenceToggle
          compact
          accent={ACCENT}
          item={{
            id: `social:${post.id}`,
            appId: "social",
            title: post.caption.slice(0, 60) || "Publicação",
            subtitle: `PicLike · ${post.at}`,
            target: { app: "social", view: "post", id: post.id },
          }}
        />
      </div>
    </article>
  );
}

function PostDetail({ post }: { post: SocialPost }) {
  const { caseData, open } = useDevice();

  return (
    <AppShell
      accent={ACCENT}
      title="Publicação"
      subtitle={post.at}
      padded={false}
      headerBackground="linear-gradient(180deg, rgba(123,63,228,0.2), transparent)"
    >
      <PostCard post={post} compact />
      <div className="px-4 py-4">
        <p className="inv-mono pb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--inv-dim-2)]">
          Comentários
        </p>
        {post.comments.length === 0 && (
          <p className="text-[13px] text-[var(--inv-dim)]">Nenhum comentário.</p>
        )}
        <div className="flex flex-col gap-4">
          {post.comments.map((comment) => {
            const profile = caseData.social.people.find((p) => p.handle === comment.author);
            return (
              <div key={comment.id} className="flex gap-3">
                <Avatar name={comment.author} seed={comment.author} size={30} />
                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    disabled={!profile}
                    onClick={() => profile && open({ app: "social", view: "profile", id: profile.handle })}
                    className="text-[12px]"
                    style={{ color: profile ? ACCENT : "var(--inv-text)" }}
                  >
                    {comment.author}
                  </button>
                  <p className="text-[13px] leading-snug">{comment.text}</p>
                  <span className="inv-mono text-[10px] text-[var(--inv-dim-2)]">{comment.at}</span>
                </div>
                <EvidenceToggle
                  compact
                  accent={ACCENT}
                  item={{
                    id: `social:${post.id}:${comment.id}`,
                    appId: "social",
                    title: comment.text.slice(0, 60),
                    subtitle: `Comentário de ${comment.author}`,
                    target: { app: "social", view: "post", id: post.id },
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

function ProfileView({ profile, own = false }: { profile: SocialProfile; own?: boolean }) {
  const { caseData, open } = useDevice();
  const posts = own ? caseData.social.posts : [];

  return (
    <AppShell
      accent={ACCENT}
      title={profile.handle}
      titleClassName="font-medium"
      padded={false}
      headerBackground="linear-gradient(180deg, rgba(123,63,228,0.2), transparent)"
    >
      <div className="px-4 py-5">
        <div className="flex items-center gap-5">
          <Avatar name={profile.displayName} seed={profile.avatarSeed} src={profile.avatarSrc} size={72} ring />
          <div className="flex flex-1 justify-around text-center">
            {[
              { label: "posts", value: profile.posts },
              { label: "seguidores", value: profile.followers },
              { label: "seguindo", value: profile.following },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[15px]">{stat.value.toLocaleString("pt-BR")}</p>
                <p className="inv-mono text-[9px] uppercase tracking-[0.14em] text-[var(--inv-dim-2)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="pt-4 text-[14px]">{profile.displayName}</p>
        <p className="text-[13px] text-[var(--inv-dim)]">{profile.bio}</p>
      </div>

      {own ? (
        <div className="grid grid-cols-3 gap-[2px]">
          {posts.flatMap((post) =>
            post.media.map((media) => (
              <button
                key={media.id}
                type="button"
                onClick={() => open({ app: "social", view: "post", id: post.id })}
                className="aspect-square"
              >
                <Photo media={media} rounded="rounded-none" showKindBadge={false} />
              </button>
            )),
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
          <UserRound size={22} className="text-[var(--inv-dim-2)]" />
          <p className="text-[13px] text-[var(--inv-dim)]">
            As publicações deste perfil não foram capturadas pela perícia.
          </p>
        </div>
      )}
    </AppShell>
  );
}

export function SocialApp() {
  const { caseData, current, open } = useDevice();
  const { social } = caseData;

  if (current?.view === "post") {
    const post = social.posts.find((item) => item.id === current.id);
    if (post) return <PostDetail post={post} />;
  }

  if (current?.view === "profile") {
    const profile = social.people.find((item) => item.handle === current.id);
    if (profile) return <ProfileView profile={profile} />;
  }

  if (current?.view === "me") {
    return <ProfileView profile={social.profile} own />;
  }

  return (
    <AppShell
      accent={ACCENT}
      title={<span className="inv-display text-[20px] tracking-wide">PicLike</span>}
      padded={false}
      right={
        <button
          type="button"
          onClick={() => open({ app: "social", view: "me" })}
          className="inv-press"
          aria-label="Abrir perfil da vítima"
        >
          <Avatar
            name={social.profile.displayName}
            seed={social.profile.avatarSeed}
            src={social.profile.avatarSrc}
            size={28}
            ring
          />
        </button>
      }
      headerBackground="linear-gradient(180deg, rgba(123,63,228,0.22), transparent)"
    >
      <div className="flex flex-col">
        {social.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </AppShell>
  );
}
