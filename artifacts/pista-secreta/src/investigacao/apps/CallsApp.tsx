import { Phone, PhoneIncoming, PhoneMissed, PhoneOutgoing, Voicemail as VoicemailIcon } from "lucide-react";
import { useState } from "react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { Avatar } from "../components/Media";
import { EvidenceToggle } from "../components/EvidenceToggle";
import type { CallEntry, Voicemail } from "../types";
import { useT } from "@/i18n/LanguageProvider";

const ACCENT = "#9be7a6";

/** Procura o avatar da pessoa (por id) entre as conversas do caso. */
function usePerson(personId?: string, name = "") {
  const { caseData } = useDevice();
  const person = personId ? caseData.messages.find((c) => c.person.id === personId)?.person : undefined;
  return { seed: person?.avatarSeed ?? name, src: person?.avatarSrc };
}

function CallRow({ call }: { call: CallEntry }) {
  const { seed, src } = usePerson(call.personId, call.name);
  const t = useT();
  const Icon = call.kind === "missed" ? PhoneMissed : call.kind === "outgoing" ? PhoneOutgoing : PhoneIncoming;
  const color = call.kind === "missed" ? "var(--inv-danger)" : ACCENT;
  const label = t(`calls.${call.kind}` as "calls.missed" | "calls.outgoing" | "calls.received");
  const title = `${call.name}${call.count && call.count > 1 ? ` (${call.count})` : ""}`;
  return (
    <li className="border-b border-[var(--inv-line)] py-3">
      <div className="flex items-center gap-3">
        <Avatar name={call.name} seed={seed} src={src} size={42} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px]" style={{ color: call.kind === "missed" ? "var(--inv-danger)" : undefined }}>{title}</p>
          <p className="inv-mono flex items-center gap-1.5 text-[10px] uppercase tracking-[.1em] text-[var(--inv-dim)]"><Icon size={11} style={{ color }} />{label}{call.duration ? ` · ${call.duration}` : ""}</p>
        </div>
        <span className="inv-mono shrink-0 text-right text-[10px] text-[var(--inv-dim-2)]">{call.at}</span>
      </div>
      <div className="pl-[54px] pt-2">
        <EvidenceToggle compact accent={ACCENT} item={{ id: `calls:${call.id}`, appId: "calls", title: `${label} · ${call.name}${call.duration ? ` · ${call.duration}` : ""}`, subtitle: `${t("app.calls")} · ${call.at}`, target: { app: "calls", view: "recents" } }} />
      </div>
    </li>
  );
}

function VoicemailRow({ voicemail }: { voicemail: Voicemail }) {
  const { seed, src } = usePerson(voicemail.personId, voicemail.name);
  const t = useT();
  return (
    <li className="border-b border-[var(--inv-line)] py-4">
      <div className="flex items-center gap-3">
        <Avatar name={voicemail.name} seed={seed} src={src} size={42} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px]">{voicemail.name}</p>
          <p className="inv-mono text-[10px] uppercase tracking-[.1em] text-[var(--inv-dim)]">{t("calls.voicemail")} · {voicemail.duration}</p>
        </div>
        <span className="inv-mono shrink-0 text-right text-[10px] text-[var(--inv-dim-2)]">{voicemail.at}</span>
      </div>
      <div className="mt-3 rounded-2xl border border-[var(--inv-line)] bg-[var(--inv-surface)] px-3.5 py-3">
        <p className="inv-mono pb-1.5 text-[9px] uppercase tracking-[.2em] text-[var(--inv-dim-2)]">{t("calls.transcript")}</p>
        <p className="whitespace-pre-line text-[14px] leading-snug">{voicemail.transcript}</p>
      </div>
      <div className="pt-2.5">
        <EvidenceToggle compact accent={ACCENT} item={{ id: `calls:${voicemail.id}`, appId: "calls", title: `${t("calls.voicemail")} · ${voicemail.name}`, subtitle: `${t("app.calls")} · ${voicemail.at}`, target: { app: "calls", view: "voicemail" } }} />
      </div>
    </li>
  );
}

export function CallsApp() {
  const { caseData, current } = useDevice();
  const t = useT();
  const calls = caseData.calls;
  const [tab, setTab] = useState<"recents" | "voicemail">(current?.view === "voicemail" ? "voicemail" : "recents");
  if (!calls) return <AppShell accent={ACCENT} title={t("app.calls")}><p className="text-[14px] text-[var(--inv-dim)]">{t("calls.empty")}</p></AppShell>;
  const tabs = [
    { id: "recents" as const, label: t("calls.recent"), Icon: Phone },
    { id: "voicemail" as const, label: t("calls.voicemail"), Icon: VoicemailIcon },
  ];
  return (
    <AppShell
      accent={ACCENT}
      title={<span className="inv-display text-[20px]">{t("app.calls")}</span>}
      subtitle={tab === "recents" ? t("calls.recentCount", { count: calls.recents.length }) : t("calls.voicemailCount", { count: calls.voicemails.length })}
      headerBackground="linear-gradient(180deg,rgba(60,140,80,.2),transparent)"
      below={
        <div className="mt-3 flex gap-2 px-1">
          {tabs.map(({ id, label, Icon }) => (
            <button key={id} type="button" onClick={() => setTab(id)} aria-pressed={tab === id} className="inv-press inv-mono flex flex-1 items-center justify-center gap-2 rounded-full border px-3 py-2 text-[10px] uppercase tracking-[.14em]" style={{ borderColor: tab === id ? ACCENT : "var(--inv-line-strong)", color: tab === id ? ACCENT : "var(--inv-dim)", background: tab === id ? `${ACCENT}14` : "transparent" }}>
              <Icon size={13} />{label}
            </button>
          ))}
        </div>
      }
    >
      {tab === "recents"
        ? <ul>{calls.recents.map((call) => <CallRow key={call.id} call={call} />)}</ul>
        : calls.voicemails.length === 0
          ? <p className="pt-8 text-center text-[14px] text-[var(--inv-dim)]">{t("calls.noVoicemail")}</p>
          : <ul>{calls.voicemails.map((voicemail) => <VoicemailRow key={voicemail.id} voicemail={voicemail} />)}</ul>}
    </AppShell>
  );
}
