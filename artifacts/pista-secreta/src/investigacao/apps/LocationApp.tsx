import { useState } from "react";
import { Clock, MapPin, Navigation } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { EvidenceToggle } from "../components/EvidenceToggle";
import type { LocationDay, LocationStop } from "../types";
import { useT } from "@/i18n/LanguageProvider";
import type { ResolvedLocalized } from "@/i18n/types";

const ACCENT = "#8fb8ff";

function MiniMap({ stops, activeId }: { stops: ResolvedLocalized<LocationStop>[]; activeId?: string }) {
  const points = stops.filter((stop) => stop.point);
  const path = points.map((stop, index) => `${index === 0 ? "M" : "L"} ${stop.point!.x} ${stop.point!.y}`).join(" ");
  return (
    <div className="relative h-40 shrink-0 overflow-hidden rounded-2xl border bg-[var(--inv-surface)]">
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


const LIGHT = "#d9cdf2";
const DARK = "#7a58b8";

/** Mapa em forma de tabuleiro (casos com `locationStyle: "chess"`). Cada parada usa `square` (ex.: "e8"). */
function ChessMap({ stops, activeId }: { stops: ResolvedLocalized<LocationStop>[]; activeId?: string }) {
  const points = stops.filter((stop) => stop.square && /^[a-h][1-8]$/.test(stop.square));
  const center = (square: string) => ({ x: (square.charCodeAt(0) - 97) * 12.5 + 6.25, y: (8 - Number(square[1])) * 12.5 + 6.25 });
  const path = points.map((stop, index) => { const c = center(stop.square!); return `${index === 0 ? "M" : "L"} ${c.x} ${c.y}`; }).join(" ");
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] shrink-0 overflow-hidden rounded-2xl border">
      <div className="absolute inset-0 grid grid-cols-8">
        {Array.from({ length: 64 }, (_, i) => {
          const f = i % 8; const r = Math.floor(i / 8);
          return <span key={i} className="relative" style={{ background: (f + r) % 2 === 1 ? DARK : LIGHT }}>{r === 7 && <span className="absolute bottom-[1px] right-[3px] text-[8px] font-semibold" style={{ color: (f + r) % 2 === 1 ? LIGHT : DARK }}>{String.fromCharCode(97 + f)}</span>}{f === 0 && <span className="absolute left-[3px] top-[1px] text-[8px] font-semibold" style={{ color: (f + r) % 2 === 1 ? LIGHT : DARK }}>{8 - r}</span>}</span>;
        })}
      </div>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {path && <path d={path} fill="none" stroke="#fffacd" strokeWidth="1" strokeDasharray="2.5 2" opacity=".9" />}
        {points.map((stop, i) => { const c = center(stop.square!); const active = stop.id === activeId; return <g key={stop.id}><circle cx={c.x} cy={c.y} r={active ? 4.6 : 3.8} fill={stop.redacted ? "#e06a6a" : "#1b1228"} stroke="#fffacd" strokeWidth=".8" /><text x={c.x} y={c.y + 1.4} textAnchor="middle" fontSize="4" fill="#fffacd" fontFamily="ui-monospace,monospace">{i + 1}</text></g>; })}
      </svg>
    </div>
  );
}

function StopDetail({ stop, dayLabel }: { stop: ResolvedLocalized<LocationStop>; dayLabel: string }) {
  const { caseData } = useDevice();
  const t = useT();
  const chess = caseData.locationStyle === "chess";
  return (
    <AppShell accent={ACCENT} title={stop.title} subtitle={dayLabel}>
      {chess ? <ChessMap stops={[stop]} activeId={stop.id} /> : <MiniMap stops={[stop]} activeId={stop.id} />}
      <div className="mt-5 rounded-2xl border bg-[var(--inv-surface)]">
        {[
          [t("location.entrance"), stop.time],
          [t("location.exit"), stop.exitTime ?? "—"],
          [t("location.timeAtPlace"), stop.durationLabel ?? "—"],
          [chess ? t("location.square") : t("location.address"), stop.address ?? (stop.square ? `${t("location.square")} ${stop.square}` : t("location.notRecorded"))],
        ].map(([label, value], index) => (
          <div key={label} className={`flex justify-between px-4 py-3.5 text-[13px] ${index ? "border-t" : ""}`}>
            <span className="inv-mono text-[10px] uppercase text-[var(--inv-dim-2)]">{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className="pt-5">
        <EvidenceToggle accent={ACCENT} item={{ id: `location:${stop.id}`, appId: "location", title: `${stop.title} — ${stop.time}`, subtitle: `${t("app.location")} · ${dayLabel}`, target: { app: "location", view: "stop", id: stop.id } }} />
      </div>
    </AppShell>
  );
}

export function LocationApp() {
  const t = useT();
  const { caseData, current, open } = useDevice();
  const [dayIndex, setDayIndex] = useState(0);
  if (current?.view === "stop") {
    for (const day of caseData.locations) {
      const stop = day.stops.find((item) => item.id === current.id);
      if (stop) return <StopDetail stop={stop} dayLabel={day.label} />;
    }
  }
  const day: ResolvedLocalized<LocationDay> | undefined = caseData.locations[dayIndex];
  return (
    <AppShell
      accent={ACCENT}
      title={t("location.title")}
      subtitle={t("location.historySubtitle")}
      right={<Navigation size={16} />}
      below={<div className="inv-hide-scroll -mx-3 flex gap-2 overflow-x-auto px-3 pt-3" role="tablist" aria-label={t("location.historyDays")}>{caseData.locations.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={index === dayIndex} onClick={(e) => { setDayIndex(index); const chip = e.currentTarget; const row = chip.parentElement; row?.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" }); }} className="inv-press inv-mono shrink-0 whitespace-nowrap rounded-full border px-3 py-2 text-[10px] uppercase" style={{ borderColor: index === dayIndex ? ACCENT : "var(--inv-line-strong)", color: index === dayIndex ? ACCENT : "var(--inv-dim)" }}>{item.label}</button>)}</div>}
    >
      {day ? (
        <>
          {caseData.locationStyle === "chess" ? <ChessMap stops={day.stops} /> : <MiniMap stops={day.stops} />}
          <p className="inv-mono flex items-center gap-1.5 pt-4 text-[10px] uppercase text-[var(--inv-dim-2)]"><MapPin size={11} /> {t("location.stopCount", { count: day.stops.length })}</p>
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
      ) : <p>{t("location.noHistory")}</p>}
    </AppShell>
  );
}