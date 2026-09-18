import { BookmarkCheck, BookmarkPlus } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import type { EvidenceItem } from "../types";

/**
 * Botão "marcar como evidência".
 * Qualquer app pode usá-lo em qualquer item — basta passar um id estável.
 */
export function EvidenceToggle({
  item,
  accent,
  compact = false,
  className = "",
}: {
  item: EvidenceItem;
  accent: string;
  compact?: boolean;
  className?: string;
}) {
  const { isEvidence, toggleEvidence } = useDevice();
  const marked = isEvidence(item.id);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        toggleEvidence(item);
      }}
      className={`inv-press inv-mono inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] ${className}`}
      style={{
        borderColor: marked ? accent : "var(--inv-line-strong)",
        color: marked ? accent : "var(--inv-dim)",
        background: marked ? `${accent}14` : "transparent",
      }}
      aria-pressed={marked}
    >
      {marked ? <BookmarkCheck size={13} /> : <BookmarkPlus size={13} />}
      {compact ? (marked ? "Marcada" : "Evidência") : marked ? "Evidência marcada" : "Marcar como evidência"}
    </button>
  );
}
