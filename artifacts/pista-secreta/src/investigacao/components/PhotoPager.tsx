import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import type { MediaRef } from "../types";
import { Photo } from "./Media";
import { useT } from "@/i18n/LanguageProvider";

/**
 * Carrossel de fotos de perfil.
 * - Celular: deslizar com o dedo (scroll-snap nativo).
 * - Desktop: arrastar com o mouse, setas laterais ou teclas ← →.
 * - Miniaturas clicáveis, contador "2/4" e dica "Deslize" na primeira foto.
 * A foto aparece inteira (sem corte) sobre um fundo desfocado da própria imagem.
 */
export function PhotoPager({ photos, accent }: { photos: MediaRef[]; accent: string }) {
  const t = useT();
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });
  const [index, setIndex] = useState(0);
  const [touched, setTouched] = useState(false);
  /** Destino atual: evita erro quando o usuário toca várias vezes durante a animação. */
  const target = useRef(0);
  const total = photos.length;

  const goTo = useCallback(
    (to: number) => {
      const el = scroller.current;
      if (!el) return;
      const next = Math.max(0, Math.min(total - 1, to));
      target.current = next;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    },
    [total],
  );

  // Se o perfil trocar de fotos, volta para a primeira.
  useEffect(() => {
    setIndex(0);
    target.current = 0;
    scroller.current?.scrollTo({ left: 0 });
  }, [photos]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el || el.clientWidth === 0) return;
    const current = Math.round(el.scrollLeft / el.clientWidth);
    if (Math.abs(el.scrollLeft - current * el.clientWidth) < 2) target.current = current;
    setIndex((prev) => {
      if (prev !== current) setTouched(true);
      return current;
    });
  };

  // Arrastar com o mouse (no toque, o scroll-snap nativo já resolve).
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, startX: event.clientX, startLeft: el.scrollLeft };
    el.style.scrollSnapType = "none";
    el.setPointerCapture(event.pointerId);
    setTouched(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!drag.current.active || !el) return;
    el.scrollLeft = drag.current.startLeft - (event.clientX - drag.current.startX);
  };

  const endDrag = () => {
    const el = scroller.current;
    if (!drag.current.active || !el) return;
    drag.current.active = false;
    el.style.scrollSnapType = "";
    goTo(Math.round(el.scrollLeft / el.clientWidth));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setTouched(true);
      goTo(target.current + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setTouched(true);
      goTo(target.current - 1);
    }
  };

  const arrow =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-opacity hover:bg-black/70";

  return (
    <div>
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
        <div
          ref={scroller}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
          tabIndex={total > 1 ? 0 : -1}
          role="group"
          aria-roledescription={t("photos.carousel")}
          aria-label={t("photos.profileCount", { number: index + 1, total })}
          className={`flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${total > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
        >
          {photos.map((media, i) => (
            <div
              key={media.id}
              role="group"
              aria-label={t("photos.numbered", { number: i + 1, total })}
              className="relative h-full w-full shrink-0 snap-center snap-always select-none overflow-hidden"
            >
              {media.src ? (
                <>
                  <img
                    src={media.src}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-2xl"
                  />
                  <img
                    src={media.src}
                    alt={media.caption ?? t("photos.numbered", { number: i + 1, total })}
                    draggable={false}
                    className="relative h-full w-full object-contain"
                  />
                </>
              ) : (
                <Photo media={media} rounded="rounded-none" showKindBadge={false} />
              )}
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <div className="pointer-events-none absolute inset-x-4 top-3 z-10 flex gap-1.5">
              {photos.map((photo, i) => (
                <span
                  key={photo.id}
                  className="h-[3px] flex-1 rounded-full bg-white transition-opacity"
                  style={{ opacity: i === index ? 0.95 : 0.3 }}
                />
              ))}
            </div>
            <span className="inv-mono pointer-events-none absolute right-3 top-7 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-white">
              {index + 1}/{total}
            </span>
            <button
              type="button"
              aria-label={t("photos.previous")}
              onClick={() => {
                setTouched(true);
                goTo(target.current - 1);
              }}
              className={`${arrow} left-2 ${index === 0 ? "pointer-events-none opacity-0" : "opacity-100"}`}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label={t("photos.next")}
              onClick={() => {
                setTouched(true);
                goTo(target.current + 1);
              }}
              className={`${arrow} right-2 ${index === total - 1 ? "pointer-events-none opacity-0" : "opacity-100"}`}
            >
              <ChevronRight size={22} />
            </button>
            {!touched && index === 0 && (
              <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center">
                <span className="inv-anim-fade inv-mono flex items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-1.5 text-[11px] text-white backdrop-blur-sm">
                  {t("photos.swipe")} <ChevronsRight size={14} />
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {total > 1 && (
        <div
          className="flex gap-2 overflow-x-auto px-4 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={t("photos.thumbnails")}
        >
          {photos.map((media, i) => (
            <button
              key={media.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={t("photos.view", { number: i + 1 })}
              onClick={() => {
                setTouched(true);
                goTo(i);
              }}
              className="inv-press h-14 w-14 shrink-0 overflow-hidden rounded-xl transition-opacity"
              style={{
                outline: i === index ? `2px solid ${accent}` : "2px solid transparent",
                outlineOffset: 2,
                opacity: i === index ? 1 : 0.55,
              }}
            >
              <Photo media={media} rounded="rounded-none" showKindBadge={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
