import { Archive, Ban, Link2, PhoneIncoming, PhoneMissed, PhoneOutgoing, Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { Avatar, AudioPlayer, Photo } from "../components/Media";
import { EvidenceToggle } from "../components/EvidenceToggle";
import { PasscodePrompt } from "../components/PasscodePrompt";
import type { Conversation, Message } from "../types";
import { useT } from "@/i18n/LanguageProvider";
import type { ResolvedLocalized } from "@/i18n/types";
const ACCENT = "#7fd1a8";
function callLabel(call: NonNullable<Message["call"]>, t: ReturnType<typeof useT>) {
  const count = call.count ?? 1;
  if (call.kind === "missed") return count === 1 ? t("messages.missedCallOne") : t("messages.missedCalls", { count });
  if (call.kind === "outgoing") return count === 1 ? t("messages.outgoingCallOne") : t("messages.outgoingCalls", { count });
  return count === 1 ? t("messages.incomingCallOne") : t("messages.incomingCalls", { count });
}

function CallRow({ call }: { call: NonNullable<Message["call"]> }) {
  const t = useT();
  const Icon = call.kind === "missed" ? PhoneMissed : call.kind === "outgoing" ? PhoneOutgoing : PhoneIncoming;
  const color = call.kind === "missed" ? "var(--inv-danger)" : ACCENT;
  return (
    <div className="flex items-center gap-2.5 py-0.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,.06)", color }}>
        <Icon size={15} />
      </span>
      <span className="flex flex-col">
        <span className="text-[14px] font-medium leading-tight" style={{ color }}>{callLabel(call, t)}</span>
        {call.duration && <span className="inv-mono text-[11px] text-[var(--inv-dim)]">{t("messages.duration", { duration: call.duration })}</span>}
      </span>
    </div>
  );
}

function Bubble({ message, conversationId }: { message: ResolvedLocalized<Message>; conversationId: string }) {
  const t = useT();
  const mine = message.from === "victim";
  if (message.deleted) {
    return (
      <div className="flex justify-start">
        <div className="inv-mono flex items-center gap-2 rounded-2xl border border-dashed px-3 py-2 text-[11px] text-[var(--inv-dim-2)]">
          <Ban size={12} />{t("messages.deleted")}
        </div>
      </div>
    );
  }

  const evidenceTitle = message.text?.slice(0, 60)
    ?? (message.call ? callLabel(message.call, t) : message.audio ? t("shared.audio") : t("shared.media"));

  return (
    <div className={`group flex flex-col ${mine ? "items-end" : "items-start"}`}>
      <div className="max-w-[78%] rounded-2xl px-3 py-2" style={{ background: mine ? "rgba(127,209,168,.14)" : "var(--inv-surface-2)" }}>
        {message.call && <CallRow call={message.call} />}
        {message.text && <p className="whitespace-pre-line text-[14px] leading-snug">{message.text}</p>}
        {message.media && <div className="mt-1 h-44 w-[200px]"><Photo media={message.media} rounded="rounded-lg" /></div>}
        {message.audio && <AudioPlayer audio={message.audio} accent={ACCENT} />}
        {message.link && <a href={message.link.url} onClick={(event) => event.preventDefault()} className="mt-1 flex items-center gap-2 text-[12px]" style={{ color: ACCENT }}><Link2 size={13} />{message.link.label}</a>}
        <div className="inv-mono mt-1 text-right text-[9px] text-[var(--inv-dim-2)]">{message.at}</div>
      </div>
      <div className="mt-1 opacity-70">
        <EvidenceToggle compact accent={ACCENT} item={{ id: `messages:${conversationId}:${message.id}`, appId: "messages", title: evidenceTitle, subtitle: `${t("app.messages")} · ${message.at}`, target: { app: "messages", view: "thread", id: conversationId } }} />
      </div>
    </div>
  );
}
function Thread({ conversation }: { conversation: ResolvedLocalized<Conversation> }) {
  const { caseData, isUnlocked } = useDevice();
  const t = useT();
  const end = useRef<HTMLDivElement>(null);
  const locked = Boolean(conversation.lock) && !isUnlocked(`messages:${conversation.id}`);

  useEffect(() => {
    if (!locked) end.current?.scrollIntoView({ block: "end" });
  }, [locked]);

  return (
    <AppShell
      accent={ACCENT}
      title={conversation.person.name}
      subtitle={conversation.archived ? t("messages.conversationArchived") : t("messages.onlineDays")}
      right={<Avatar name={conversation.person.name} seed={conversation.person.avatarSeed} src={conversation.person.avatarSrc} size={32} />}
      scrollBackgroundImage={locked ? undefined : caseData.messagesWallpaperSrc}
    >
      {locked && conversation.lock ? (
        <PasscodePrompt
          unlockKey={`messages:${conversation.id}`}
          lock={conversation.lock}
          accent={ACCENT}
          title={t("messages.conversationArchived")}
          description={t("messages.protectedDescription")}
        />
      ) : (
        <div className="flex flex-col gap-3 pb-2">
          {conversation.messages.map((m) => <div key={m.id}><Bubble message={m} conversationId={conversation.id} /></div>)}
          <div ref={end} />
        </div>
      )}
    </AppShell>
  );
}
export function MessagesApp() { const { caseData, current, open } = useDevice(); const t = useT(); if (current?.view === "thread") { const c = caseData.messages.find((x) => x.id === current.id); if (c) return <Thread conversation={c} />; } const active = caseData.messages.filter((c) => !c.archived); const archived = caseData.messages.filter((c) => c.archived); return <AppShell accent={ACCENT} title={t("app.messages")} titleClassName="font-medium" right={<Search size={18} aria-label={t("messages.search")} />} headerBackground="linear-gradient(180deg,rgba(31,107,74,.18),transparent)">{archived.length > 0 && <button type="button" onClick={() => open({ app: "messages", view: "thread", id: archived[0].id })} className="inv-press mb-1 flex w-full items-center gap-3 rounded-2xl px-2 py-3 text-left"><span className="flex h-[46px] w-[46px] items-center justify-center rounded-full border"><Archive size={18} /></span><span><p>{t("messages.archived")}</p><p className="text-[13px] text-[var(--inv-dim)]">{t("messages.conversationCount", { count: archived.length })}</p></span></button>}<div>{active.map((c) => <button key={c.id} type="button" onClick={() => open({ app: "messages", view: "thread", id: c.id })} className="inv-press flex w-full items-center gap-3 rounded-2xl px-2 py-3 text-left"><Avatar name={c.person.name} seed={c.person.avatarSeed} src={c.person.avatarSrc} size={46} /><div className="min-w-0 flex-1"><div className="flex justify-between"><span className="truncate">{c.person.name}</span><span className="inv-mono text-[10px] text-[var(--inv-dim-2)]">{c.time}</span></div><span className="block truncate text-[13px] text-[var(--inv-dim)]">{c.preview}</span></div>{c.unread ? <span className="shrink-0 rounded-full px-2 text-[10px]" style={{ background: ACCENT, color: "#0b1a13" }}>{c.unread}</span> : null}</button>)}</div></AppShell>; }