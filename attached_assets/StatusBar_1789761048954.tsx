import { useEffect, useState } from "react";
import { Wifi } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";

function realClock(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

export function useDeviceClock(): string {
  const { caseData } = useDevice();
  const frozen = caseData.device.frozenTime;
  const [time, setTime] = useState(() => frozen ?? realClock());

  useEffect(() => {
    if (frozen) {
      setTime(frozen);
      return;
    }
    setTime(realClock());
    const id = window.setInterval(() => setTime(realClock()), 15000);
    return () => window.clearInterval(id);
  }, [frozen]);

  return time;
}

function SignalBars() {
  return (
    <span className="flex items-end gap-[2px]" aria-hidden="true">
      {[4, 6, 8, 10].map((h, i) => (
        <span
          key={h}
          className="w-[2px] rounded-full bg-current"
          style={{ height: h, opacity: i < 3 ? 0.9 : 0.3 }}
        />
      ))}
    </span>
  );
}

function Battery({ percent }: { percent: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`Bateria ${percent}%`}>
      <span className="inv-mono text-[10px] opacity-70">{percent}%</span>
      <span className="relative flex h-[11px] w-[22px] items-center rounded-[3px] border border-current/50 p-[1.5px]">
        <span
          className="h-full rounded-[1px]"
          style={{
            width: `${Math.max(6, Math.min(100, percent))}%`,
            background: percent <= 20 ? "var(--inv-danger)" : "currentColor",
          }}
        />
        <span className="absolute -right-[3px] h-[4px] w-[2px] rounded-r-sm bg-current/50" />
      </span>
    </span>
  );
}

export function StatusBar({ tone = "default" }: { tone?: "default" | "muted" }) {
  const { caseData } = useDevice();
  const time = useDeviceClock();

  return (
    <div
      className={`relative z-20 flex shrink-0 items-center justify-between px-5 pb-1 pt-2 text-[11px] ${
        tone === "muted" ? "text-[var(--inv-dim)]" : "text-[var(--inv-text)]"
      }`}
    >
      <span className="inv-mono tracking-wide">{time}</span>
      <div className="flex items-center gap-2">
        <span className="inv-mono text-[9px] uppercase tracking-[0.16em] opacity-50">
          {caseData.device.carrier}
        </span>
        <SignalBars />
        <Wifi size={12} className="opacity-70" />
        <Battery percent={caseData.device.batteryPercent} />
      </div>
    </div>
  );
}
