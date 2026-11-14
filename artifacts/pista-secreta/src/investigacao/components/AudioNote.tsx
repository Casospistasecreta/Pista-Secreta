import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const fmt = (seconds: number) => {
  const safe = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  return `${Math.floor(safe / 60)}:${String(Math.floor(safe % 60)).padStart(2, "0")}`;
};

/** Player de gravação de voz (arquivo real). Play/pausa, barra de posição e tempo. */
export function AudioNote({ src, label = "Gravação de voz", accent }: { src: string; label?: string; accent: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => () => audio.current?.pause(), []);

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => setFailed(true));
    else el.pause();
  };

  return (
    <div className="mt-5 rounded-2xl border bg-[var(--inv-surface)] px-4 py-3.5">
      <audio
        ref={audio}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setTime(0); }}
        onError={() => setFailed(true)}
      />
      <p className="inv-mono pb-3 text-[10px] uppercase tracking-[.2em] text-[var(--inv-dim-2)]">{label}</p>
      {failed ? (
        <p className="text-[13px] text-[var(--inv-danger)]">Não foi possível carregar o áudio desta gravação.</p>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pausar gravação" : "Ouvir gravação"}
            className="inv-press flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
            style={{ background: accent, color: "#120b1d" }}
          >
            {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="translate-x-[1px]" />}
          </button>
          <div className="min-w-0 flex-1">
            <input
              type="range"
              min={0}
              max={duration || 1}
              step={1}
              value={Math.min(time, duration || 1)}
              onChange={(e) => { const next = Number(e.target.value); if (audio.current) audio.current.currentTime = next; setTime(next); }}
              aria-label="Posição da gravação"
              className="block h-6 w-full cursor-pointer"
              style={{ accentColor: accent }}
            />
            <div className="inv-mono flex justify-between text-[10px] text-[var(--inv-dim)]"><span>{fmt(time)}</span><span>{fmt(duration)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
