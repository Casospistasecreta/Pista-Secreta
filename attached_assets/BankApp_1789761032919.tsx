import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { EvidenceToggle } from "../components/EvidenceToggle";
import type { Transaction } from "../types";

const ACCENT = "#b7f0e2";

function money(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function TransactionRow({ transaction, dayLabel }: { transaction: Transaction; dayLabel: string }) {
  const { open } = useDevice();
  const outgoing = transaction.amount < 0;

  return (
    <button
      type="button"
      onClick={() => open({ app: "bank", view: "transaction", id: transaction.id })}
      className="inv-press flex w-full items-center gap-3 border-b border-[var(--inv-line)] py-3.5 text-left last:border-b-0"
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full border"
        style={{ borderColor: "var(--inv-line-strong)", color: outgoing ? "var(--inv-dim)" : ACCENT }}
      >
        {outgoing ? <ArrowUpRight size={15} /> : <ArrowDownLeft size={15} />}
      </span>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-[14px] ${transaction.redacted ? "inv-mono tracking-[0.06em]" : ""}`}>
          {transaction.merchant}
        </p>
        <p className="inv-mono text-[10px] uppercase tracking-[0.12em] text-[var(--inv-dim-2)]">
          {transaction.time}
          {transaction.method ? ` · ${transaction.method}` : ""}
        </p>
      </div>
      <span
        className="inv-mono shrink-0 text-[13px]"
        style={{ color: outgoing ? "var(--inv-text)" : ACCENT }}
      >
        {outgoing ? "" : "+"}
        {money(transaction.amount)}
      </span>
      <span className="sr-only">{dayLabel}</span>
    </button>
  );
}

export function BankApp() {
  const { caseData, current } = useDevice();
  const [hidden, setHidden] = useState(false);
  const { bank } = caseData;

  if (current?.view === "transaction") {
    for (const day of bank.days) {
      const transaction = day.transactions.find((item) => item.id === current.id);
      if (!transaction) continue;
      return (
        <AppShell accent={ACCENT} title="Detalhes" subtitle={day.label}>
          <div className="pt-4">
            <p className="inv-mono text-[10px] uppercase tracking-[0.22em] text-[var(--inv-dim-2)]">
              {transaction.amount < 0 ? "Pagamento" : "Recebimento"}
            </p>
            <p className="inv-display pt-1 text-[34px] leading-none">
              {money(Math.abs(transaction.amount))}
            </p>
            <p className="pt-2 text-[15px]">{transaction.merchant}</p>
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--inv-line)] bg-[var(--inv-surface)]">
            {[
              { label: "Data", value: day.label },
              { label: "Horário", value: transaction.time },
              { label: "Forma", value: transaction.method ?? "—" },
              { label: "Categoria", value: transaction.category ?? "—" },
            ].map((row, index) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-4 py-3.5 text-[13px] ${
                  index > 0 ? "border-t border-[var(--inv-line)]" : ""
                }`}
              >
                <span className="inv-mono text-[10px] uppercase tracking-[0.16em] text-[var(--inv-dim-2)]">
                  {row.label}
                </span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-5">
            <EvidenceToggle
              accent={ACCENT}
              item={{
                id: `bank:${transaction.id}`,
                appId: "bank",
                title: `${transaction.merchant} — ${money(transaction.amount)}`,
                subtitle: `${bank.brand} · ${day.label} ${transaction.time}`,
                target: { app: "bank", view: "transaction", id: transaction.id },
              }}
            />
          </div>
        </AppShell>
      );
    }
  }

  return (
    <AppShell
      accent={ACCENT}
      title={<span className="inv-mono text-[15px] uppercase tracking-[0.42em]">{bank.brand}</span>}
      subtitle={bank.holder}
      padded={false}
      headerBackground="linear-gradient(180deg, rgba(29,107,96,0.2), transparent)"
    >
      <div className="border-b border-[var(--inv-line)] px-5 py-6">
        <div className="flex items-center gap-2">
          <p className="inv-mono text-[10px] uppercase tracking-[0.22em] text-[var(--inv-dim-2)]">
            Saldo disponível
          </p>
          <button
            type="button"
            onClick={() => setHidden((v) => !v)}
            className="inv-press text-[var(--inv-dim-2)]"
            aria-label={hidden ? "Mostrar saldo" : "Ocultar saldo"}
          >
            {hidden ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
        </div>
        <p className="inv-display pt-1.5 text-[36px] leading-none">
          {hidden ? "R$ ••••••" : money(bank.balance)}
        </p>

        <div className="flex gap-2 pt-5">
          {["Pix", "Transferir", "Pagar"].map((action) => (
            <span
              key={action}
              className="rounded-xl border border-[var(--inv-line-strong)] px-3.5 py-2 text-[12px] text-[var(--inv-dim)]"
            >
              {action}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 pb-6">
        {bank.days.map((day) => (
          <section key={day.id}>
            <p className="inv-mono pb-1 pt-5 text-[10px] uppercase tracking-[0.22em] text-[var(--inv-dim-2)]">
              {day.label}
            </p>
            {day.transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} dayLabel={day.label} />
            ))}
          </section>
        ))}
      </div>
    </AppShell>
  );
}
