import { useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { Avatar, Photo } from "../components/Media";
import { EvidenceToggle } from "../components/EvidenceToggle";
import type { MatchProfile } from "../types";

const ACCENT = "#ff8e9e";

function MatchCard({ profile }: { profile: MatchProfile }) {
  const { open } = useDevice();
  return (
    <button
      type="button"
      onClick={() => open({ app: "matches", view: "profile", id: profile.id })}
      className="inv-press relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--inv-line)] text-left"
    >
      <Photo media={profile.photos[0]} rounded="rounded-none" showKindBadge={false} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-3 pb-3 pt-8">
        <p className="text-[14px] leading-tight">
          {profile.name}
          {!profile.redacted && <span className="text-[var(--inv-dim)]">, {profile.age}</span>}
        </p>
        <p className="inv-mono flex items-center gap-1 text-[10px] text-[var(--inv-dim)]">
          <MapPin size={9} /> {profile.distanceKm} km
        </p>
      </div>
      {profile.messages && profile.messages.length > 0 && (
        <span
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full"
          style={{ background: ACCENT, color: "#2a0d14" }}
        >
          <MessageCircle size={12} />
        </span>
      )}
    </button>
  );
}

function ProfileDetail({ profile }: { profile: MatchProfile }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photo = profile.photos[photoIndex] ?? profile.photos[0];

  return (
    <AppShell
      accent={ACCENT}
      title={`${profile.name}${profile.redacted ? "" : `, ${profile.age}`}`}
      subtitle={profile.matchedAt ? `Match em ${profile.matchedAt}` : undefined}
      padded={false}
      headerBackground="linear-gradient(180deg, rgba(180,59,87,0.22), transparent)"
    >
      <div className="relative aspect-[3/4] w-full">
        <Photo media={photo} rounded="rounded-none" showKindBadge={false} />
        {profile.photos.length > 1 && (
          <div className="absolute inset-x-4 top-3 flex gap-1.5">
            {profile.photos.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPhotoIndex(i)}
                aria-label={`Foto ${i + 1}`}
                className="h-[3px] flex-1 rounded-full"
                style={{ background: "#fff", opacity: i === photoIndex ? 0.95 : 0.3 }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-5 py-5">
        {profile.city && (
          <p className="inv-mono flex items-center gap-1.5 text-[11px] text-[var(--inv-dim)]">
            <MapPin size={11} /> {profile.city} · {profile.distanceKm} km
          </p>
        )}
        {profile.bio && <p className="pt-3 text-[15px] leading-relaxed">{profile.bio}</p>}

        {profile.interests && profile.interests.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border px-3 py-1.5 text-[12px]"
                style={{ borderColor: "rgba(255,142,158,0.35)", color: ACCENT }}
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        <div className="pt-5">
          <EvidenceToggle
            accent={ACCENT}
            item={{
              id: `matches:${profile.id}`,
              appId: "matches",
              title: `Perfil — ${profile.name}`,
              subtitle: "Match",
              target: { app: "matches", view: "profile", id: profile.id },
            }}
          />
        </div>

        {profile.messages && profile.messages.length > 0 && (
          <div className="pt-7">
            <p className="inv-mono pb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--inv-dim-2)]">
              Conversa
            </p>
            <div className="flex flex-col gap-2">
              {profile.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.from === "victim" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[80%] rounded-2xl px-3 py-2 text-[14px]"
                    style={{
                      background:
                        message.from === "victim"
                          ? "rgba(255,142,158,0.16)"
                          : "var(--inv-surface-2)",
                    }}
                  >
                    {message.text}
                    <span className="inv-mono block pt-1 text-right text-[9px] text-[var(--inv-dim-2)]">
                      {message.at}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

export function MatchesApp() {
  const { caseData, current } = useDevice();
  const { matches } = caseData;

  if (current?.view === "profile") {
    const profile = matches.matches.find((item) => item.id === current.id);
    if (profile) return <ProfileDetail profile={profile} />;
  }

  const withChat = matches.matches.filter((m) => m.messages && m.messages.length > 0);

  return (
    <AppShell
      accent={ACCENT}
      title={
        <span className="inv-mono text-[16px] uppercase tracking-[0.4em]">{matches.appName}</span>
      }
      padded={false}
      headerBackground="linear-gradient(180deg, rgba(180,59,87,0.22), transparent)"
    >
      {withChat.length > 0 && (
        <div className="px-4 pt-4">
          <p className="inv-mono pb-3 text-[10px] uppercase tracking-[0.22em] text-[var(--inv-dim-2)]">
            Conversas
          </p>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {withChat.map((profile) => (
              <div key={profile.id} className="flex w-[58px] flex-col items-center gap-1.5">
                <Avatar name={profile.name} seed={profile.photos[0]?.seed ?? profile.id} size={52} ring />
                <span className="truncate text-[11px] text-[var(--inv-dim)]">{profile.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 pb-6 pt-5">
        <p className="inv-mono pb-3 text-[10px] uppercase tracking-[0.22em] text-[var(--inv-dim-2)]">
          Matches
        </p>
        <div className="grid grid-cols-2 gap-3">
          {matches.matches.map((profile) => (
            <MatchCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
