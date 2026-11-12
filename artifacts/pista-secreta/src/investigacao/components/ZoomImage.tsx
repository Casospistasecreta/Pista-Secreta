import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";

const MIN_SCALE = 1;
const MAX_SCALE = 6;

interface View { s: number; x: number; y: number }

/**
 * Imagem com zoom: pinça (2 dedos), arrastar, duplo toque/clique, roda do mouse e botões +/−.
 * Em escala 1 a aparência é idêntica à de uma imagem comum (`cover` ou `contain`).
 */
export function ZoomImage({ src, alt, fit = "cover" }: { src: string; alt: string; fit?: "cover" | "contain" }) {
  const box = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ s: 1, x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number } | null>(null);

  const clamp = (s: number, x: number, y: number): View => {
    const scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));
    const w = box.current?.clientWidth ?? 0;
    const h = box.current?.clientHeight ?? 0;
    const maxX = ((scale - 1) * w) / 2;
    const maxY = ((scale - 1) * h) / 2;
    return { s: scale, x: scale === 1 ? 0 : Math.max(-maxX, Math.min(maxX, x)), y: scale === 1 ? 0 : Math.max(-maxY, Math.min(maxY, y)) };
  };
  const zoomBy = (factor: number) => setView((v) => clamp(v.s * factor, v.x * factor, v.y * factor));

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y) || 1, scale: view.s };
    }
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const ratio = (Math.hypot(a.x - b.x, a.y - b.y) || 1) / pinch.current.dist;
      const base = pinch.current.scale;
      setView((v) => clamp(base * ratio, v.x, v.y));
    } else if (pointers.current.size === 1) {
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      setView((v) => (v.s > 1 ? clamp(v.s, v.x + dx, v.y + dy) : v));
    }
  };
  const onPointerEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
  };
  const onDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (view.s > 1) { setView({ s: 1, x: 0, y: 0 }); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    setView(clamp(3, -px * 2, -py * 2));
  };

  const btn = "inv-press flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white";
  return (
    <div
      ref={box}
      className="relative h-full w-full touch-none select-none overflow-hidden"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onDoubleClick={onDoubleClick}
      onWheel={(e) => zoomBy(e.deltaY < 0 ? 1.15 : 1 / 1.15)}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
        style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`, transformOrigin: "center" }}
      />
      <div className="absolute bottom-2 right-2 flex gap-1.5" onPointerDown={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
        {view.s > 1 && <button type="button" className={btn} aria-label="Restaurar zoom" onClick={() => setView({ s: 1, x: 0, y: 0 })}><RotateCcw size={15} /></button>}
        <button type="button" className={btn} aria-label="Diminuir zoom" onClick={() => zoomBy(1 / 1.5)}><Minus size={16} /></button>
        <button type="button" className={btn} aria-label="Aumentar zoom" onClick={() => zoomBy(1.5)}><Plus size={16} /></button>
      </div>
    </div>
  );
}
