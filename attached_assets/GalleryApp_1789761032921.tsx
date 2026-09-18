import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Info, Lock, MapPin, Share2 } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { Photo } from "../components/Media";
import { EvidenceToggle } from "../components/EvidenceToggle";
import { PasscodePrompt } from "../components/PasscodePrompt";
import type { MediaRef } from "../types";

const ACCENT = "#ffe9a8";

function Viewer({ items, startId }: { items: MediaRef[]; startId?: string }) {
  const initial = Math.max(
    0,
    items.findIndex((item) => item.id === startId),
  );
  const [index, setIndex] = useState(initial === -1 ? 0 : initial);
  const [info, setInfo] = useState(false);
  const media = items[index];

  if (!media) return null;

  return (
    <AppShell
      accent={ACCENT}
      title={media.takenAt ?? "Foto"}
      subtitle={`${index + 1} de ${items.length}`}
      padded={false}
      right={
        <>
          <button
            type="button"
            onClick={() => setInfo((v) => !v)}
            className="inv-press flex h-9 w-9 items-center justify-center rounded-full"
            aria-label="Informações"
            style={{ color: info ? ACCENT : "var(--inv-dim)" }}
          >
            <Info size={18} />
          </button>
          <button
            type="button"
            className="inv-press flex h-9 w-9 items-center justify-center rounded-full text-[var(--inv-dim)]"
            aria-label="Compartilhar"
          >
            <Share2 size={17} />
          </button>
        </>
      }
    >
      <div className="relative flex flex-1 items-center justify-center bg-black/40">
        <div className="aspect-[3/4] w-full">
          <Photo media={media} rounded="rounded-none" />
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
              className="inv-press absolute left-1 flex h-11 w-11 items-center justify-center rounded-full bg-black/35"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % items.length)}
              className="inv-press absolute right-1 flex h-11 w-11 items-center justify-center rounded-full bg-black/35"
              aria-label="Próxima"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="border-t border-[var(--inv-line)] px-4 py-4">
        {info && (
          <div className="inv-anim-fade mb-4 rounded-xl border border-[var(--inv-line)] bg-[var(--inv-surface)] p-3">
            <p className="inv-mono pb-2 text-[9px] uppercase tracking-[0.2em] text-[var(--inv-dim-2)]">
              Informações
            </p>
            <dl className="grid grid-cols-[86px_1fr] gap-y-1.5 text-[12px]">
              <dt className="text-[var(--inv-dim-2)]">Capturada</dt>
              <dd>{media.takenAt ?? "—"}</dd>
              <dt className="text-[var(--inv-dim-2)]">Local</dt>
              <dd className="flex items-center gap-1">
                {media.place ? (
                  <>
                    <MapPin size={11} style={{ color: ACCENT }} />
                    {media.place}
                  </>
                ) : (
                  "—"
                )}
              </dd>
              <dt className="text-[var(--inv-dim-2)]">Tipo</dt>
              <dd>{media.kind === "video" ? "Vídeo" : "Imagem"}</dd>
            </dl>
          </div>
        )}

        <EvidenceToggle
          accent={ACCENT}
          item={{
            id: `gallery:${media.id}`,
            appId: "gallery",
            title: media.caption ?? `Foto ${media.takenAt ?? ""}`.trim(),
            subtitle: media.place ? `Fotos · ${media.place}` : "Fotos",
            target: { app: "gallery", view: "photo", id: media.id },
          }}
        />
      </div>
    </AppShell>
  );
}

export function GalleryApp() {
  const { caseData, current, open, isUnlocked } = useDevice();

  const allItems = useMemo(
    () =>
      caseData.gallery
        .filter((group) => !group.lock || isUnlocked(`gallery:${group.id}`))
        .flatMap((group) => group.items),
    [caseData.gallery, isUnlocked],
  );

  if (current?.view === "photo") {
    return <Viewer items={allItems} startId={current.id} />;
  }

  if (current?.view === "album") {
    const group = caseData.gallery.find((item) => item.id === current.id);
    if (group) {
      const unlockKey = `gallery:${group.id}`;
      const locked = Boolean(group.lock) && !isUnlocked(unlockKey);
      return (
        <AppShell accent={ACCENT} title={group.label} subtitle={`${group.items.length} itens`} padded={false}>
          {locked && group.lock ? (
            <PasscodePrompt
              unlockKey={unlockKey}
              lock={group.lock}
              accent={ACCENT}
              title="Álbum oculto"
              description="Este álbum está protegido por senha."
            />
          ) : (
            <div className="grid grid-cols-3 gap-[2px]">
              {group.items.map((media) => (
                <button
                  key={media.id}
                  type="button"
                  onClick={() => open({ app: "gallery", view: "photo", id: media.id })}
                  className="aspect-square"
                >
                  <Photo media={media} rounded="rounded-none" />
                </button>
              ))}
            </div>
          )}
        </AppShell>
      );
    }
  }

  return (
    <AppShell
      accent={ACCENT}
      title="Fotos"
      titleClassName="font-medium"
      subtitle={`${allItems.length} itens capturados`}
      padded={false}
    >
      <div className="pb-6">
        {caseData.gallery.map((group) => {
          const locked = Boolean(group.lock) && !isUnlocked(`gallery:${group.id}`);
          return (
            <section key={group.id}>
              <div className="flex items-center justify-between px-4 pb-2 pt-5">
                <h3 className="text-[14px] tracking-wide">{group.label}</h3>
                <button
                  type="button"
                  onClick={() => open({ app: "gallery", view: "album", id: group.id })}
                  className="inv-mono text-[10px] uppercase tracking-[0.16em]"
                  style={{ color: ACCENT }}
                >
                  {locked ? "Bloqueado" : "Ver tudo"}
                </button>
              </div>

              {locked ? (
                <button
                  type="button"
                  onClick={() => open({ app: "gallery", view: "album", id: group.id })}
                  className="inv-press mx-4 flex w-[calc(100%-2rem)] items-center gap-3 rounded-xl border border-dashed border-[var(--inv-line-strong)] px-4 py-6 text-left"
                >
                  <Lock size={16} style={{ color: ACCENT }} />
                  <span className="text-[13px] text-[var(--inv-dim)]">
                    {group.items.length} itens protegidos
                  </span>
                </button>
              ) : (
                <div className="grid grid-cols-4 gap-[2px] px-[2px]">
                  {group.items.map((media) => (
                    <button
                      key={media.id}
                      type="button"
                      onClick={() => open({ app: "gallery", view: "photo", id: media.id })}
                      className="inv-press aspect-square"
                    >
                      <Photo media={media} rounded="rounded-none" />
                    </button>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
