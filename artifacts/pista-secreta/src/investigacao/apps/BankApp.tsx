import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { EvidenceToggle } from "../components/EvidenceToggle";
import { PasscodePrompt } from "../components/PasscodePrompt";
import { useT } from "@/i18n/LanguageProvider";
const ACCENT = "#b7f0e2";
const makeMoney = (currency: "BRL" | "RUB" | "USD" = "BRL") => (v: number) =>
  currency === "USD"
    ? `${v < 0 ? "-" : ""}US$ ${Math.abs(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : currency === "RUB"
      ? `${v < 0 ? "-" : ""}₽ ${Math.abs(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export function BankApp() {
  const tr = useT();
  const { caseData, current, open, isUnlocked } = useDevice(); const [hidden, setHidden] = useState(false); const bank = caseData.bank; const money = makeMoney(bank.currency);
  if (current?.view === "transaction") {
    for (const day of bank.days) {
      const t = day.transactions.find((x) => x.id === current.id);
      if (!t) continue;
      if (t.lock && !isUnlocked(`bank:${t.id}`)) {
        return <AppShell accent={ACCENT} title={tr("bank.lockedTransaction")} subtitle={day.label}><PasscodePrompt unlockKey={`bank:${t.id}`} lock={t.lock} accent={ACCENT} title={tr("bank.lockedTransaction")} description={tr("bank.pinRequired")} /></AppShell>;
      }
      return <AppShell accent={ACCENT} title={tr("bank.details")} subtitle={day.label}><p className="inv-mono pt-4 text-[10px] uppercase tracking-[.22em] text-[var(--inv-dim-2)]">{t.amount < 0 ? tr("bank.payment") : tr("bank.receipt")}</p><p className="inv-display pt-1 text-[34px]">{money(Math.abs(t.amount))}</p><p className="pt-2">{t.merchant}</p><div className="mt-6 rounded-2xl border border-[var(--inv-line)] bg-[var(--inv-surface)]">{[[tr("bank.date"), day.label],[tr("bank.time"),t.time],[tr("bank.method"),t.method ?? "—"],[tr("bank.category"),t.category ?? "—"],...(t.details ?? []).map((d) => [d.label, d.value])].map(([l,v],i)=><div key={l} className={`flex justify-between px-4 py-3.5 text-[13px] ${i ? "border-t border-[var(--inv-line)]" : ""}`}><span className="inv-mono text-[10px] uppercase tracking-[.16em] text-[var(--inv-dim-2)]">{l}</span><span>{v}</span></div>)}</div><div className="pt-5"><EvidenceToggle accent={ACCENT} item={{ id: `bank:${t.id}`, appId: "bank", title: `${t.merchant} — ${money(t.amount)}`, subtitle: `${bank.brand} · ${day.label} ${t.time}`, target: { app: "bank", view: "transaction", id: t.id } }} /></div></AppShell>;
    }
  }
  return <AppShell accent={ACCENT} title={<span className="inv-mono text-[15px] uppercase tracking-[.42em]">{bank.brand}</span>} subtitle={bank.holder} padded={false} headerBackground="linear-gradient(180deg,rgba(29,107,96,.2),transparent)"><div className="border-b border-[var(--inv-line)] px-5 py-6"><div className="flex items-center gap-2"><p className="inv-mono text-[10px] uppercase tracking-[.22em] text-[var(--inv-dim-2)]">{tr("bank.balance")}</p><button type="button" onClick={() => setHidden((v) => !v)} className="inv-press -m-2 p-2 text-[var(--inv-dim)]" aria-label={tr("bank.toggleBalance")}>{hidden ? <EyeOff size={13} /> : <Eye size={13} />}</button></div><p className="inv-display pt-1.5 text-[36px]">{hidden ? `${bank.currency === "RUB" ? "₽" : bank.currency === "USD" ? "US$" : "R$"} ••••••` : money(bank.balance)}</p></div><div className="px-5 pb-6">{bank.days.map((day) => <section key={day.id}><p className="inv-mono pb-1 pt-5 text-[10px] uppercase tracking-[.22em] text-[var(--inv-dim-2)]">{day.label}</p>{day.transactions.map((t) => { const locked = Boolean(t.lock) && !isUnlocked(`bank:${t.id}`); return <button key={t.id} type="button" onClick={() => open({ app: "bank", view: "transaction", id: t.id })} className="inv-press flex w-full items-center gap-3 border-b border-[var(--inv-line)] py-3.5 text-left"><span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: t.amount < 0 ? "var(--inv-dim)" : ACCENT }}>{locked ? <Lock size={14} /> : t.amount < 0 ? <ArrowUpRight size={15} /> : <ArrowDownLeft size={15} />}</span><span className="min-w-0 flex-1"><p className="truncate text-[14px]">{locked ? tr("bank.lockedTransaction") : t.merchant}</p><p className="inv-mono text-[10px] text-[var(--inv-dim-2)]">{locked ? t.time : `${t.time} · ${t.method}`}</p></span><span className="inv-mono text-[13px]" style={{ color: t.amount < 0 ? "var(--inv-text)" : ACCENT }}>{locked ? "••••" : <>{t.amount < 0 ? "" : "+"}{money(t.amount)}</>}</span></button>; })}</section>)}</div></AppShell>;
}