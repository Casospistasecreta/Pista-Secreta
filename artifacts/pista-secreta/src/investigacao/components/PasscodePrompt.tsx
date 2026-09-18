import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import type { Lock as LockConfig } from "../types";

export function PasscodePrompt({
  unlockKey, lock, accent, title = "Conteúdo protegido",
  description = "Este conteúdo exige uma senha encontrada em outro lugar do dispositivo.",
}: {
  unlockKey: string; lock: LockConfig; accent: string; title?: string; description?: string;
}) {
  const { tryUnlock } = useDevice();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const ok = tryUnlock(unlockKey, value, lock.passcode);
    if (!ok) { setError(true); setValue(""); window.setTimeout(() => setError(false), 450); }
  }
  return (
    <div className="inv-anim-fade flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div className={`flex h-14 w-14 items-center justify-center rounded-full border ${error ? "inv-anim-shake" : ""}`} style={{ borderColor: accent, color: accent }}><Lock size={22} /></div>
      <h3 className="mt-5 text-base font-medium">{title}</h3>
      <p className="mt-2 max-w-[260px] text-[13px] leading-relaxed text-[var(--inv-dim)]">{description}</p>
      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-[240px]">
        <input value={value} onChange={(event) => setValue(event.target.value)} inputMode="text" autoComplete="off" placeholder="Senha" className={`inv-mono w-full rounded-xl border bg-[var(--inv-surface-2)] px-4 py-3 text-center text-sm tracking-[0.3em] outline-none placeholder:tracking-normal placeholder:text-[var(--inv-dim-2)] ${error ? "inv-anim-shake" : ""}`} style={{ borderColor: error ? "var(--inv-danger)" : "var(--inv-line-strong)" }} aria-label="Senha do conteúdo protegido" />
        <button type="submit" className="inv-press mt-3 w-full rounded-xl px-4 py-3 text-sm font-medium text-[#120b1d]" style={{ background: accent }}>Desbloquear</button>
      </form>
      {lock.hint && <button type="button" onClick={() => setShowHint((v) => !v)} className="inv-mono mt-4 text-[10px] uppercase tracking-[0.18em] text-[var(--inv-dim-2)] underline-offset-4 hover:underline">{showHint ? lock.hint : "Ver dica"}</button>}
    </div>
  );
}