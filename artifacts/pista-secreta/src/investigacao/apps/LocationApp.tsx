import { useState } from "react";
import { Clock, MapPin, Navigation } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { EvidenceToggle } from "../components/EvidenceToggle";
import type { LocationDay, LocationStop } from "../types";

const ACCENT = "#8fb8ff";

function MiniMap({ stops, activeId }: { stops: LocationStop[]; activeId?: string }) {
  const points = stops.filter((stop) => stop.point);
  const path = points.map((stop, index) => `${index === 0 ? "M" : "L"} ${stop.point!.x} ${stop.point!.y}`).join(" ");
  return (
    <div className="relative h-40 overflow-hidden rounded-2xl border bg-[var(--inv-surface)]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M -5 78 L 40 58 L 72 66 L 105 44 M 18 -5 L 26 40 L 20 105" fill="none" stroke="rgba(255,250,205,.07)" strokeWidth="3" />
        {path && <path d={path} fill="none" stroke={ACCENT} strokeWidth=".8" strokeDasharray="2.5 2" vectorEffect="non-scaling-stroke" />}
      </svg>
      {points.map((stop) => (
        <span key={stop.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${stop.point!.x}%`, top: `${stop.point!.y}%` }}>
          <span className={`block h-2.5 w-2.5 rounded-full ${stop.id === activeId ? "" : "inv-anim-dot"}`} style={{ background: stop.redacted ? "var(--inv-danger)" : ACCENT }} />
        </span>
      ))}
    </div>
  );
}

function StopDetail({ stop, dayLabel }: { stop: LocationStop; dayLabel: string }) {
  return (
    <AppShell accent={ACCENT} title={stop.title} subtitle={dayLabel}>
      <MiniMap stops={[stop]} activeId={stop.id} />
      <div className="mt-5 rounded-2xl border bg-[var(--inv-surface)]">
        {[
          ["Entrada", stop.time],
          ["Saída", stop.exitTime ?? "—"],
          ["Tempo no local", stop.durationLabel ?? "—"],
          ["Endereço", stop.address ?? "Não registrado"],
        ].map(([label, value], index) => (
          <div key={label} className={`flex justify-between px-4 py-3.5 text-[13px] ${index ? "border-t" : ""}`}>
            <span className="inv-mono text-[10px] uppercase text-[var(--inv-dim-2)]">{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className="pt-5">
        <EvidenceToggle accent={ACCENT} item={{ id: `location:${stop.id}`, appId: "location", title: `${stop.title} — ${stop.time}`, subtitle: `Localização · ${dayLabel}`, target: { app: "location", view: "stop", id: stop.id } }} />
      </div>
    </AppShell>
  );
}

export function LocationApp() {
  const { caseData, current, open } = useDevice();
  const [dayIndex, setDayIndex] = useState(0);
  if (current?.view === "stop") {
    for (const day of caseData.locations) {
      const stop = day.stops.find((item) => item.id === current.id);
      if (stop) return <StopDetail stop={stop} dayLabel={day.label} />;
    }
  }
  const day: LocationDay | undefined = caseData.locations[dayIndex];
  return (
    <AppShell
      accent={ACCENT}
      title="Localização"
      subtitle="Histórico do dispositivo"
      right={<Navigation size={16} />}
      below={<div className="flex gap-2 pt-3">{caseData.locations.map((item, index) => <button key={item.id} type="button" onClick={() => setDayIndex(index)} className="inv-press inv-mono rounded-full border px-3 py-1.5 text-[10px] uppercase" style={{ borderColor: index === dayIndex ? ACCENT : "var(--inv-line-strong)", color: index === dayIndex ? ACCENT : "var(--inv-dim)" }}>{item.label}</button>)}</div>}
    >
      {day ? (
        <>
          <MiniMap stops={day.stops} />
          <p className="inv-mono flex items-center gap-1.5 pt-4 text-[10px] uppercase text-[var(--inv-dim-2)]"><MapPin size={11} /> {day.stops.length} paradas registradas</p>
          <div className="pt-5">
            {day.stops.map((stop, index) => (
              <button key={stop.id} type="button" onClick={() => open({ app: "location", view: "stop", id: stop.id })} className="inv-press flex w-full gap-4 text-left">
                <span className="inv-mono w-[46px] pt-[3px] text-[12px] text-[var(--inv-dim)]">{stop.time}</span>
                <span className="flex flex-col items-center"><span className="mt-1.5 h-2.5 w-2.5 rounded-full" style={{ background: stop.redacted ? "var(--inv-danger)" : ACCENT }} />{index < day.stops.length - 1 && <span className="my-1 w-px flex-1 bg-[var(--inv-line-strong)]" />}</span>
                <span className="flex-1 pb-6"><p className={stop.redacted ? "inv-mono" : ""}>{stop.title}</p><p className="flex items-center gap-1.5 pt-0.5 text-[12px] text-[var(--inv-dim)]">{stop.durationLabel && <><Clock size={11} />{stop.durationLabel}</>}</p></span>
              </button>
            ))}
          </div>
        </>
      ) : <p>Nenhum histórico disponível.</p>}
    </AppShell>
  );
}