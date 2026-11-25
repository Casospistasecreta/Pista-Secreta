import { useState } from "react";
import { ChevronDown, ChevronRight, FolderSearch, Trash2 } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { FinalAnswerScreen } from "../components/FinalAnswerScreen";
import { getApp } from "./registry";
import { useT } from "@/i18n/LanguageProvider";
const ACCENT = "#c7a2ff";
function Briefing({ paragraphs, stamp, defaultOpen }: { paragraphs: string[]; stamp?: { agency: string; code: string }; defaultOpen: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(defaultOpen);
  return <div className="border-b border-[var(--inv-line)] pb-4 pt-2">
    {stamp && <div className="mb-3"><span className="inv-mono inline-block -rotate-2 rounded border-2 px-2.5 py-1 text-[9px] font-semibold uppercase leading-snug tracking-[.16em]" style={{ color: "var(--inv-danger)", borderColor: "var(--inv-danger)", opacity: 0.85 }}>{stamp.agency}<br />{stamp.code}</span></div>}
    <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="inv-press inv-mono -my-1 flex w-full items-center justify-between py-2 text-[10px] uppercase tracking-[.22em] text-[var(--inv-dim)]">{t("casefile.summary")} <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} /></button>
    {open && <div className="flex flex-col gap-2 pt-1">{paragraphs.map((paragraph, index) => <p key={index} className="text-[13px] leading-relaxed text-[var(--inv-dim)]">{paragraph}</p>)}</div>}
  </div>;
}
export function CaseFileApp() {
  const { caseData, current, evidence, removeEvidence, clearEvidence, open, goHome, labelFor } = useDevice();
  const t = useT();
  if (current?.view === "answer" && caseData.finalAnswer) return <FinalAnswerScreen />;
  const displayedEvidence = evidence.map((item) => {
    if (item.appId === "calls" && caseData.calls) {
      const id = item.id.slice("calls:".length);
      const call = caseData.calls.recents.find((entry) => entry.id === id);
      if (call) {
        const label = call.kind === "missed"
          ? t("calls.missed")
          : call.kind === "outgoing" ? t("calls.outgoing") : t("calls.received");
        return {
          ...item,
          title: `${label}${call.count && call.count > 1 ? ` (${call.count})` : ""} · ${call.name}`,
          subtitle: `${t("app.calls")} · ${call.at}`,
        };
      }
      const voicemail = caseData.calls.voicemails.find((entry) => entry.id === id);
      if (voicemail) {
        return {
          ...item,
          title: `${t("calls.voicemail")} · ${voicemail.name}`,
          subtitle: `${t("app.calls")} · ${voicemail.at}`,
        };
      }
      return item;
    }
    if (item.appId === "tabulive") {
      const friendId = item.id.split(":")[2];
      const friend = caseData.tabulive?.friends.find((entry) => entry.id === friendId);
      return friend
        ? {
            ...item,
            title: t("tabulive.friendConversation", { name: friend.name }),
            subtitle: t("app.tabulive"),
          }
        : item;
    }
    if (caseData.slug === "caso-rasputin") {
      const [, firstId, secondId] = item.id.split(":");
      if (item.appId === "messages") {
        const conversation = caseData.messages.find((entry) => entry.id === firstId);
        const message = conversation?.messages.find((entry) => entry.id === secondId);
        if (!message) return item;
        const callTitle = message.call
          ? message.call.kind === "missed" ? t("messages.missedCallOne")
            : message.call.kind === "outgoing" ? t("messages.outgoingCallOne")
              : t("messages.incomingCallOne")
          : undefined;
        return {
          ...item,
          title: message.text ?? callTitle ?? (message.audio ? t("shared.audio") : t("shared.media")),
          subtitle: `${t("app.messages")} · ${message.at}`,
        };
      }
      if (item.appId === "social") {
        const post = caseData.social.posts.find((entry) => entry.id === firstId);
        return post ? {
          ...item,
          title: post.caption || t("social.post"),
          subtitle: `${labelFor("social", t("app.social"))} · ${post.at}`,
        } : item;
      }
      if (item.appId === "matches") {
        const profile = caseData.matches.matches.find((entry) => entry.id === firstId);
        return profile ? { ...item, title: `${t("matches.profileData")} — ${profile.name}`, subtitle: t("app.matches") } : item;
      }
      if (item.appId === "gallery") {
        const media = caseData.gallery.flatMap((group) => group.items).find((entry) => entry.id === firstId);
        return media ? {
          ...item,
          title: media.caption ?? `${t("gallery.photo")} ${media.takenAt ?? ""}`,
          subtitle: media.place ? `${t("gallery.photosLabel")} · ${media.place}` : t("gallery.photosLabel"),
        } : item;
      }
      if (item.appId === "location") {
        for (const day of caseData.locations) {
          const stop = day.stops.find((entry) => entry.id === firstId);
          if (stop) return { ...item, title: `${stop.title} — ${stop.time}`, subtitle: `${t("app.location")} · ${day.label}` };
        }
        return item;
      }
      if (item.appId === "bank") {
        for (const day of caseData.bank.days) {
          const transaction = day.transactions.find((entry) => entry.id === firstId);
          if (transaction) {
            const separator = item.title.lastIndexOf(" — ");
            const amount = separator >= 0 ? item.title.slice(separator) : "";
            return { ...item, title: `${transaction.merchant}${amount}`, subtitle: `${caseData.bank.brand} · ${day.label} ${transaction.time}` };
          }
        }
        return item;
      }
      if (item.appId === "notes") {
        const note = caseData.notes.find((entry) => entry.id === firstId);
        return note ? { ...item, title: note.title, subtitle: `${t("app.notes")} · ${note.at}` } : item;
      }
      return item;
    }
    if (caseData.slug === "caso-peao-envenenado") {
      const [, firstId, secondId] = item.id.split(":");
      if (item.appId === "messages") {
        const conversation = caseData.messages.find((entry) => entry.id === firstId);
        const message = conversation?.messages.find((entry) => entry.id === secondId);
        if (!conversation || !message) return item;
        const callTitle = message.call
          ? message.call.kind === "missed" ? t("messages.missedCallOne")
            : message.call.kind === "outgoing" ? t("messages.outgoingCallOne")
              : t("messages.incomingCallOne")
          : undefined;
        return {
          ...item,
          title: message.text ?? callTitle ?? (message.audio ? t("shared.audio") : t("shared.media")),
          subtitle: `${t("app.messages")} · ${message.at}`,
        };
      }
      if (item.appId === "social") {
        const post = caseData.social.posts.find((entry) => entry.id === firstId);
        return post ? {
          ...item,
          title: post.caption || t("social.post"),
          subtitle: `${labelFor("social", t("app.social"))} · ${post.at}`,
        } : item;
      }
      if (item.appId === "matches") {
        const profile = caseData.matches.matches.find((entry) => entry.id === firstId);
        return profile ? { ...item, title: `${t("matches.profileData")} — ${profile.name}`, subtitle: t("app.matches") } : item;
      }
      if (item.appId === "gallery") {
        const media = caseData.gallery.flatMap((group) => group.items).find((entry) => entry.id === firstId);
        return media ? {
          ...item,
          title: media.caption ?? `${t("gallery.photo")} ${media.takenAt ?? ""}`,
          subtitle: t("gallery.photosLabel"),
        } : item;
      }
      if (item.appId === "location") {
        for (const day of caseData.locations) {
          const stop = day.stops.find((entry) => entry.id === firstId);
          if (stop) return { ...item, title: `${stop.title} — ${stop.time}`, subtitle: `${t("app.location")} · ${day.label}` };
        }
        return item;
      }
      if (item.appId === "bank") {
        for (const day of caseData.bank.days) {
          const transaction = day.transactions.find((entry) => entry.id === firstId);
          if (transaction) {
            const separator = item.title.lastIndexOf(" — ");
            const amount = separator >= 0 ? item.title.slice(separator) : "";
            return { ...item, title: `${transaction.merchant}${amount}`, subtitle: `${caseData.bank.brand} · ${day.label} ${transaction.time}` };
          }
        }
        return item;
      }
      if (item.appId === "notes") {
        const note = caseData.notes.find((entry) => entry.id === firstId);
        return note ? { ...item, title: note.title, subtitle: `${t("app.notes")} · ${note.at}` } : item;
      }
      return item;
    }
    if (caseData.slug !== "caso-odete") return item;
    const [, firstId, secondId] = item.id.split(":");
    if (item.appId === "messages") {
      const conversation = caseData.messages.find((entry) => entry.id === firstId);
      const message = conversation?.messages.find((entry) => entry.id === secondId);
      if (!conversation || !message) return item;
      const callTitle = message.call
        ? message.call.kind === "missed" ? t("messages.missedCallOne")
          : message.call.kind === "outgoing" ? t("messages.outgoingCallOne")
            : t("messages.incomingCallOne")
        : undefined;
      return {
        ...item,
        title: message.text?.slice(0, 60) ?? callTitle ?? (message.audio ? t("shared.audio") : t("shared.media")),
        subtitle: `${t("app.messages")} · ${message.at}`,
      };
    }
    if (item.appId === "social") {
      const post = caseData.social.posts.find((entry) => entry.id === firstId);
      return post ? {
        ...item,
        title: post.caption.slice(0, 60) || t("social.post"),
        subtitle: `${labelFor("social", t("app.social"))} · ${post.at}`,
      } : item;
    }
    if (item.appId === "matches") {
      const profile = caseData.matches.matches.find((entry) => entry.id === firstId);
      return profile ? { ...item, title: `${t("matches.profileData")} — ${profile.name}`, subtitle: t("app.matches") } : item;
    }
    if (item.appId === "gallery") {
      const media = caseData.gallery.flatMap((group) => group.items).find((entry) => entry.id === firstId);
      return media ? {
        ...item,
        title: media.caption ?? `${t("gallery.photo")} ${media.takenAt ?? ""}`,
        subtitle: media.place ? `${t("gallery.photosLabel")} · ${media.place}` : t("gallery.photosLabel"),
      } : item;
    }
    if (item.appId === "location") {
      for (const day of caseData.locations) {
        const stop = day.stops.find((entry) => entry.id === firstId);
        if (stop) return { ...item, title: `${stop.title} — ${stop.time}`, subtitle: `${t("app.location")} · ${day.label}` };
      }
      return item;
    }
    if (item.appId === "bank") {
      for (const day of caseData.bank.days) {
        const transaction = day.transactions.find((entry) => entry.id === firstId);
        if (transaction) {
          const amount = item.title.slice(item.title.lastIndexOf(" — "));
          return { ...item, title: `${transaction.merchant}${amount}`, subtitle: `${caseData.bank.brand} · ${day.label} ${transaction.time}` };
        }
      }
      return item;
    }
    if (item.appId === "notes") {
      const note = caseData.notes.find((entry) => entry.id === firstId);
      return note ? { ...item, title: note.title, subtitle: `${t("app.notes")} · ${note.at}` } : item;
    }
    return item;
  });
  return <AppShell accent={ACCENT} title={<span className="inv-display text-[19px]">{t("casefile.title")}</span>} subtitle={caseData.title} right={evidence.length > 0 ? <button type="button" onClick={clearEvidence} className="inv-press inv-mono text-[10px] uppercase tracking-[0.16em] text-[var(--inv-dim-2)]">{t("casefile.clear")}</button> : undefined} headerBackground="linear-gradient(180deg,rgba(75,42,138,.25),transparent)">
    {caseData.briefing && caseData.briefing.length > 0 && <Briefing paragraphs={caseData.briefing} stamp={caseData.stamp} defaultOpen={evidence.length === 0} />}
    <div className="flex items-baseline justify-between pt-2"><p className="inv-mono text-[10px] uppercase tracking-[.22em] text-[var(--inv-dim-2)]">{t("casefile.found")}</p><p className="inv-display text-[26px]" style={{ color: ACCENT }}>{evidence.length}</p></div>
    {evidence.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center"><FolderSearch size={26} className="text-[var(--inv-dim-2)]" /><p className="text-[14px] text-[var(--inv-dim)]">{t("casefile.empty")}</p><button type="button" onClick={goHome} className="inv-press inv-mono mt-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[.18em]" style={{ borderColor: ACCENT, color: ACCENT }}>{t("casefile.backToDevice")}</button></div> :
       <ul className="flex flex-col pt-4">{displayedEvidence.map((item) => { const app = getApp(item.appId); const Icon = app?.icon ?? FolderSearch; const evidenceTextClass = caseData.slug === "caso-rasputin" ? "whitespace-normal break-words" : "truncate"; return <li key={item.id} className="flex items-center gap-3 border-b border-[var(--inv-line)] py-3.5"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border" style={{ borderColor: "var(--inv-line-strong)", color: app?.accent ?? ACCENT }}><Icon size={15} /></span><button type="button" onClick={() => item.target && open(item.target)} className="min-w-0 flex-1 text-left"><p className={`${evidenceTextClass} text-[14px]`}>{item.title}</p><p className={`inv-mono ${evidenceTextClass} text-[10px] uppercase tracking-[.12em] text-[var(--inv-dim-2)]`}>{item.subtitle}</p></button>{item.target && <ChevronRight size={15} className="text-[var(--inv-dim-2)]" />}<button type="button" onClick={() => removeEvidence(item.id)} className="inv-press p-1 text-[var(--inv-dim-2)]" aria-label={t("casefile.removeEvidence", { title: item.title })}><Trash2 size={14} /></button></li>; })}</ul>}
    {caseData.finalAnswer && <div className="mt-auto pt-6"><button type="button" onClick={() => open({ app: "casefile", view: "answer" })} className="inv-press w-full rounded-xl px-4 py-3 text-sm font-medium text-[#120b1d]" style={{ background: ACCENT }}>{t("casefile.submitAnswer")}</button></div>}
  </AppShell>;
}