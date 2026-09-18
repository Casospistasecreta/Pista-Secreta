import { useState } from "react";
import { Clock, MapPin, Navigation } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { EvidenceToggle } from "../components/EvidenceToggle";
import type { LocationDay, LocationStop } from "../types";

const ACCENT = "#8fb8ff";

/** Mapa estilizado — sem provedor externo, apenas geometria. */
function MiniMap({ stops, activeId }: { stops: LocationStop[]; activeId?: string }) {
  const points = stops.filter((stop) => stop.point);
  const path = points
    .map((stop, i) => `${i === 0 ? "M" : "L"} ${stop.point!.x} ${stop.point!.y}`)
    .join(" ");

  return (
    <div className="relative h-40 overflow-hidden rounded-2xl border border-[var(--inv-line)] bg-[var(--inv-surface)]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="inv-map-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,250,205,0.06)" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#inv-map-grid)" />
        <path d="M -5 78 L 40 58 L 72 66 L 105 44" fill="none" stroke="rgba(255,250,205,0.07)" strokeWidth="3" />
        <path d="M 18 -5 L 26 40 L 20 105" fill="none" stroke="rgba(255,250,205,0.07)" strokeWidth="2.5" />
        {path && (
          <path
            d={path}
            fill="none"
            stroke={ACCENT}
            strokeWidth="0.8"
            strokeDasharray="2.5 2"
            opacity="0.7"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {points.map((stop) => {
        const active = stop.id === activeId;
        return (
          <span
            key={stop.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${stop.point!.x}%`, top: `${stop.point!.y}%` }}
          >
            <span
              className={`block h-2.5 w-2.5 rounded-full ${active ? "" : "inv-anim-dot"}`}
              style={{
                background: stop.redacted ? "var(--inv-danger)" : ACCENT,
                boxShadow: active ? `0 0 0 5px ${ACCENT}22` : undefined,
                opacity: active ? 1 : 0.8,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}

function StopDetail({ stop, dayLabel }: { stop: LocationStop; dayLabel: string }) {
  return (
    <AppShell accent={ACCENT} title={stop.title} subtitle={dayLabel}>
      <MiniMap stops={[stop]} activeId={stop.id} />

      <div className="mt-5 rounded-2xl border border-[var(--inv-line)] bg-[var(--inv-surface)]">
        {[
          { label: "Entrada", value: stop.time },
          { label: "Saída", value: stop.exitTime ?? "—" },
          { label: "Tempo no local", value: stop.durationLabel ?? "—" },
          { label: "Endereço", value: stop.address ?? "Não registrado" },
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
            <span className="max-w-[60%] text-right">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="pt-5">
        <EvidenceToggle
          accent={ACCENT}
          item={{
            id: `location:${stop.id}`,
            appId: "location",
            title: `${stop.title} — ${stop.time}`,
            subtitle: `Localização · ${dayLabel}`,
            target: { app: "location", view: "stop", id: stop.id },
          }}
        />
      </div>
    </AppShell>
  );
}

function Timeline({ day }: { day: LocationDay }) {
  const { open } = useDevice();

  return (
    <div className="pt-5">
      {day.stops.map((stop, index) => (
        <button
          key={stop.id}
          type="button"
          onClick={() => open({ app: "location", view: "stop", id: stop.id })}
          className="inv-press flex w-full gap-4 text-left"
        >
          <div className="inv-mono w-[46px] shrink-0 pt-[3px] text-[12px] text-[var(--inv-dim)]">
            {stop.time}
          </div>
          <div className="flex flex-col items-center">
            <span
              className="mt-1.5 h-2.5 w-2.5 rounded-full"
              style={{ background: stop.redacted ? "var(--inv-danger)" : ACCENT }}
            />
            {index < day.stops.length - 1 && (
              <span className="my-1 w-px flex-1 bg-[var(--inv-line-strong)]" />
            )}
          </div>
          <div className="flex-1 pb-6">
            <p className={`text-[15px] ${stop.redacted ? "inv-mono tracking-[0.08em]" : ""}`}>
              {stop.title}
            </p>
            <p className="flex items-center gap-1.5 pt-0.5 text-[12px] text-[var(--inv-dim)]">
              {stop.durationLabel && (
                <>
                  <Clock size={11} />
                  {stop.durationLabel}
                </>
              )}
              {stop.address && (
                <>
                  <span className="opacity-40">·</span>
                  <span className="truncate">{stop.address}</span>
                </>
              )}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

export function LocationApp() {
  const { caseData, current } = useDevice();
  const [dayIndex, setDayIndex] = useState(0);

  if (current?.view === "stop") {
    for (const day of caseData.locations) {
      const stop = day.stops.find((item) => item.id === current.id);
      if (stop) return <StopDetail stop={stop} dayLabel={day.label} />;
    }
  }

  const day = caseData.locations[dayIndex] ?? caseData.locations[0];

  return (
    <AppShell
      accent={ACCENT}
      title="Localização"
      titleClassName="font-medium"
      subtitle="Histórico do dispositivo"
      right={<Navigation size={16} className="text-[var(--inv-dim)]" />}
      below={
        <div className="flex gap-2 pt-3">
          {caseData.locations.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setDayIndex(index)}
              className="inv-press inv-mono rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em]"
              style={{
                borderColor: index === dayIndex ? ACCENT : "var(--inv-line-strong)",
                color: index === dayIndex ? ACCENT : "var(--inv-dim)",
                background: index === dayIndex ? `${ACCENT}14` : "transparent",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      }
    >
      {day ? (
        <>
          <MiniMap stops={day.stops} />
          <p className="inv-mono flex items-center gap-1.5 pt-4 text-[10px] uppercase tracking-[0.2em] text-[var(--inv-dim-2)]">
            <MapPin size={11} /> {day.stops.length} paradas registradas
          </p>
          <Timeline day={day} />
        </>
      ) : (
        <p className="text-[13px] text-[var(--inv-dim)]">Nenhum histórico disponível.</p>
      )}
    </AppShell>
  );
}
