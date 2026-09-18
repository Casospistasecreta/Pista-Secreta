import { Check, Link2, Lock, Pin, Square } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { Photo } from "../components/Media";
import { EvidenceToggle } from "../components/EvidenceToggle";
import { PasscodePrompt } from "../components/PasscodePrompt";
import type { Note } from "../types";

const ACCENT = "#fffacd";

function NoteDetail({ note }: { note: Note }) {
  const { isUnlocked } = useDevice();
  const unlockKey = `notes:${note.id}`;
  const locked = Boolean(note.lock) && !isUnlocked(unlockKey);

  return (
    <AppShell accent={ACCENT} title={locked ? "Nota protegida" : note.title} subtitle={note.at}>
      {locked && note.lock ? (
        <PasscodePrompt
          unlockKey={unlockKey}
          lock={note.lock}
          accent={ACCENT}
          title="Nota protegida"
          description="Esta nota foi trancada. A senha pode estar em outro aplicativo do dispositivo."
        />
      ) : (
        <div className="pb-6">
          <h2 className="inv-display pt-2 text-[24px] leading-tight">{note.title}</h2>
          <p className="inv-mono pt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--inv-dim-2)]">
            {note.at}
          </p>

          {note.body?.map((paragraph, index) => (
            <p key={index} className="pt-4 text-[15px] leading-relaxed text-[var(--inv-text)]/90">
              {paragraph}
            </p>
          ))}

          {note.checklist && note.checklist.length > 0 && (
            <ul className="flex flex-col gap-2.5 pt-5">
              {note.checklist.map((entry, index) => (
                <li key={index} className="flex items-center gap-2.5 text-[15px]">
                  {entry.done ? (
                    <Check size={15} style={{ color: ACCENT }} />
                  ) : (
                    <Square size={14} className="text-[var(--inv-dim-2)]" />
                  )}
                  <span className={entry.done ? "text-[var(--inv-dim)] line-through" : ""}>
                    {entry.text}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {note.media && note.media.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-5">
              {note.media.map((media) => (
                <div key={media.id} className="aspect-square">
                  <Photo media={media} />
                </div>
              ))}
            </div>
          )}

          {note.link && (
            <a
              href={note.link.url}
              onClick={(event) => event.preventDefault()}
              className="mt-5 flex items-center gap-2 rounded-xl border border-[var(--inv-line)] px-3 py-2.5 text-[13px]"
              style={{ color: ACCENT }}
            >
              <Link2 size={14} />
              {note.link.label}
            </a>
          )}

          <div className="pt-6">
            <EvidenceToggle
              accent={ACCENT}
              item={{
                id: `notes:${note.id}`,
                appId: "notes",
                title: note.title,
                subtitle: `Notas · ${note.at}`,
                target: { app: "notes", view: "note", id: note.id },
              }}
            />
          </div>
        </div>
      )}
    </AppShell>
  );
}

export function NotesApp() {
  const { caseData, current, open, isUnlocked } = useDevice();

  if (current?.view === "note") {
    const note = caseData.notes.find((item) => item.id === current.id);
    if (note) return <NoteDetail note={note} />;
  }

  const ordered = [...caseData.notes].sort(
    (a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)),
  );

  return (
    <AppShell
      accent={ACCENT}
      title="Notas"
      titleClassName="inv-display text-[20px]"
      subtitle={`${caseData.notes.length} notas`}
      padded={false}
    >
      <div className="px-4 py-3">
        {ordered.map((note) => {
          const locked = Boolean(note.lock) && !isUnlocked(`notes:${note.id}`);
          return (
            <button
              key={note.id}
              type="button"
              onClick={() => open({ app: "notes", view: "note", id: note.id })}
              className="inv-press flex w-full items-start gap-3 border-b border-[var(--inv-line)] py-4 text-left last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-[15px]">
                  {note.pinned && <Pin size={12} style={{ color: ACCENT }} />}
                  <span className="truncate">{note.title}</span>
                </p>
                <p className="truncate pt-0.5 text-[13px] text-[var(--inv-dim)]">
                  <span className="inv-mono pr-2 text-[10px] uppercase tracking-[0.14em] text-[var(--inv-dim-2)]">
                    {note.at}
                  </span>
                  {locked ? "Conteúdo protegido" : (note.preview ?? "")}
                </p>
              </div>
              {locked && <Lock size={14} className="mt-1 shrink-0" style={{ color: ACCENT }} />}
            </button>
          );
        })}
      </div>
    </AppShell>
  );
}
