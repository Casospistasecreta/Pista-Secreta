import { useEffect, useRef } from "react";
import { Archive, Ban, Link2, Search } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { Avatar, AudioPlayer, Photo } from "../components/Media";
import { EvidenceToggle } from "../components/EvidenceToggle";
import { PasscodePrompt } from "../components/PasscodePrompt";
import type { Conversation, Message } from "../types";

const ACCENT = "#7fd1a8";

function ConversationRow({ conversation }: { conversation: Conversation }) {
  const { open } = useDevice();
  return (
    <button
      type="button"
      onClick={() => open({ app: "messages", view: "thread", id: conversation.id })}
      className="inv-press flex w-full items-center gap-3 rounded-2xl px-2 py-3 text-left hover:bg-white/[0.04]"
    >
      <Avatar name={conversation.person.name} seed={conversation.person.avatarSeed} src={conversation.person.avatarSrc} size={46} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[15px]">{conversation.person.name}</span>
          <span className="inv-mono shrink-0 text-[10px] text-[var(--inv-dim-2)]">
            {conversation.time}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[13px] text-[var(--inv-dim)]">{conversation.preview}</span>
          {conversation.unread ? (
            <span
              className="inv-mono flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] text-[#0b1a13]"
              style={{ background: ACCENT }}
            >
              {conversation.unread}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}

function Bubble({ message, conversationId }: { message: Message; conversationId: string }) {
  const mine = message.from === "victim";

  if (message.deleted) {
    return (
      <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
        <div className="inv-mono flex items-center gap-2 rounded-2xl border border-dashed border-[var(--inv-line-strong)] px-3 py-2 text-[11px] text-[var(--inv-dim-2)]">
          <Ban size={12} />
          Esta mensagem foi apagada
        </div>
      </div>
    );
  }

  return (
    <div className={`group flex flex-col ${mine ? "items-end" : "items-start"}`}>
      <div
        className="max-w-[78%] rounded-2xl px-3 py-2"
        style={{
          background: mine ? "rgba(127,209,168,0.14)" : "var(--inv-surface-2)",
          borderTopRightRadius: mine ? 6 : undefined,
          borderTopLeftRadius: mine ? undefined : 6,
        }}
      >
        {message.text && <p className="text-[14px] leading-snug">{message.text}</p>}

        {message.media && (
          <div className="mt-1 h-44 w-[200px] max-w-full">
            <Photo media={message.media} rounded="rounded-lg" />
          </div>
        )}

        {message.audio && (
          <div className="py-1">
            <AudioPlayer audio={message.audio} accent={ACCENT} />
          </div>
        )}

        {message.link && (
          <a
            href={message.link.url}
            onClick={(event) => event.preventDefault()}
            className="mt-1 flex items-center gap-2 rounded-lg border border-[var(--inv-line)] px-2 py-1.5 text-[12px]"
            style={{ color: ACCENT }}
          >
            <Link2 size={13} />
            <span className="truncate">{message.link.label}</span>
          </a>
        )}

        <div className="inv-mono mt-1 text-right text-[9px] text-[var(--inv-dim-2)]">
          {message.at}
        </div>
      </div>

      <div className="mt-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100 max-md:opacity-70">
        <EvidenceToggle
          compact
          accent={ACCENT}
          item={{
            id: `messages:${conversationId}:${message.id}`,
            appId: "messages",
            title: message.text ? message.text.slice(0, 60) : message.audio ? "Áudio" : "Mídia",
            subtitle: `Mensagens · ${message.at}`,
            target: { app: "messages", view: "thread", id: conversationId },
          }}
        />
      </div>
    </div>
  );
}

function Thread({ conversation }: { conversation: Conversation }) {
  const { isUnlocked } = useDevice();
  const endRef = useRef<HTMLDivElement>(null);
  const unlockKey = `messages:${conversation.id}`;
  const locked = Boolean(conversation.lock) && !isUnlocked(unlockKey);

  useEffect(() => {
    if (!locked) endRef.current?.scrollIntoView({ block: "end" });
  }, [locked, conversation.id]);

  return (
    <AppShell
      accent={ACCENT}
      title={conversation.person.name}
      subtitle={conversation.archived ? "Conversa arquivada" : "online há 2 dias"}
      right={
        <Avatar
          name={conversation.person.name}
          seed={conversation.person.avatarSeed}
          src={conversation.person.avatarSrc}
          size={32}
        />
      }
      headerBackground="linear-gradient(180deg, rgba(31,107,74,0.22), transparent)"
    >
      {locked && conversation.lock ? (
        <PasscodePrompt
          unlockKey={unlockKey}
          lock={conversation.lock}
          accent={ACCENT}
          title="Conversa arquivada"
          description="Esta conversa foi protegida. A senha pode estar em outro aplicativo."
        />
      ) : (
        <div className="flex flex-col gap-3 pb-2">
          {conversation.messages.map((message) => (
            <div key={message.id} className="flex flex-col gap-1">
              {message.dayLabel && (
                <p className="inv-mono self-center rounded-full bg-white/[0.05] px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[var(--inv-dim-2)]">
                  {message.dayLabel}
                </p>
              )}
              <Bubble message={message} conversationId={conversation.id} />
            </div>
          ))}
          <div ref={endRef} />
        </div>
      )}
    </AppShell>
  );
}

export function MessagesApp() {
  const { caseData, current, open } = useDevice();

  if (current?.view === "thread") {
    const conversation = caseData.messages.find((item) => item.id === current.id);
    if (conversation) return <Thread conversation={conversation} />;
  }

  const active = caseData.messages.filter((c) => !c.archived);
  const archived = caseData.messages.filter((c) => c.archived);

  return (
    <AppShell
      accent={ACCENT}
      title="Mensagens"
      titleClassName="font-medium"
      right={<Search size={18} className="text-[var(--inv-dim)]" />}
      headerBackground="linear-gradient(180deg, rgba(31,107,74,0.18), transparent)"
    >
      {archived.length > 0 && (
        <button
          type="button"
          onClick={() => open({ app: "messages", view: "thread", id: archived[0].id })}
          className="inv-press mb-1 flex w-full items-center gap-3 rounded-2xl px-2 py-3 text-left hover:bg-white/[0.04]"
        >
          <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-[var(--inv-line)]">
            <Archive size={18} className="text-[var(--inv-dim)]" />
          </span>
          <div className="flex-1">
            <p className="text-[15px]">Arquivadas</p>
            <p className="text-[13px] text-[var(--inv-dim)]">{archived.length} conversa(s)</p>
          </div>
        </button>
      )}

      <div className="flex flex-col">
        {active.map((conversation) => (
          <ConversationRow key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </AppShell>
  );
}
