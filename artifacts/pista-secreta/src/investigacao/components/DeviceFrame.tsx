import type { ReactNode } from "react";
import { LockKeyhole } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";

export function DeviceFrame({ children }: { children: ReactNode }) {
  const { caseData, deviceUnlocked, lockDevice } = useDevice();
  return (
    <div className="inv-root inv-stage inv-grain relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden md:p-8">
      <div className="pointer-events-none absolute left-0 top-0 hidden w-full items-start justify-between p-8 lg:flex">
        <div>
          <p className="inv-mono text-[10px] uppercase tracking-[0.34em] text-[var(--inv-dim-2)]">Pista Secreta</p>
          <p className="inv-display pt-1 text-[22px] tracking-wide text-[var(--inv-chiffon)]/90">Investigação Digital</p>
          <p className="inv-mono pt-2 text-[10px] uppercase tracking-[0.18em] text-[var(--inv-dim-2)]">{caseData.title}</p>
        </div>
        {deviceUnlocked && (
          <button type="button" onClick={lockDevice} className="inv-press pointer-events-auto inv-mono flex items-center gap-2 rounded-full border border-[var(--inv-line-strong)] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--inv-dim)]">
            <LockKeyhole size={12} /> Bloquear
          </button>
        )}
      </div>
      <div className="relative z-10 flex h-[100dvh] w-full flex-col overflow-hidden bg-[var(--inv-bg)] md:h-[min(860px,92vh)] md:w-[392px] md:rounded-[46px] md:border md:border-white/10 md:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95),0_0_0_10px_rgba(10,7,17,0.9)]">
        <div className="pointer-events-none absolute left-1/2 top-2 z-30 hidden h-[26px] w-[104px] -translate-x-1/2 rounded-full bg-black/85 md:block" />
        <div className="relative flex h-full flex-col md:pt-1">{children}</div>
      </div>
      <p className="inv-mono pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-[9px] uppercase tracking-[0.22em] text-[var(--inv-dim-2)] md:block">Evidência digital · uso restrito à investigação</p>
    </div>
  );
}