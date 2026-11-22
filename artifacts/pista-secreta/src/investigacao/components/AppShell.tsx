import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { StatusBar } from "./StatusBar";
import { LanguageSwitcher } from "@/i18n/LanguageSwitcher";
import { useT } from "@/i18n/LanguageProvider";

export function AppShell({
  title, subtitle, accent, right, children, below, titleClassName = "",
  headerBackground, scroll = true, padded = true, backLabel, scrollBackgroundImage,
}: {
  title: ReactNode; subtitle?: ReactNode; accent: string; right?: ReactNode; children: ReactNode;
  below?: ReactNode; titleClassName?: string; headerBackground?: string; scroll?: boolean;
  padded?: boolean; backLabel?: string; scrollBackgroundImage?: string;
}) {
  const { back } = useDevice();
  const t = useT();
  const resolvedBackLabel = backLabel ?? t("investigation.back");
  return (
    <div className="inv-anim-screen flex h-full flex-col bg-[var(--inv-bg)]">
      <StatusBar />
      <header className="relative shrink-0 border-b border-[var(--inv-line)] px-3 pb-3 pt-1" style={{ background: headerBackground }}>
        <div className="flex items-center gap-1">
          <button type="button" onClick={back} aria-label={resolvedBackLabel} className="inv-press -ml-1 flex h-10 w-10 items-center justify-center rounded-full" style={{ color: accent }}><ChevronLeft size={24} /></button>
          <div className="min-w-0 flex-1">
            <div className={`truncate text-[17px] leading-tight ${titleClassName}`}>{title}</div>
            {subtitle && <div className="truncate text-[11px] text-[var(--inv-dim)]">{subtitle}</div>}
          </div>
          <div className="flex shrink-0 items-center gap-1 pr-1">
            {right}
            <LanguageSwitcher />
          </div>
        </div>
        {below}
      </header>
      <div
        className={`${scroll ? "inv-scroll" : "overflow-hidden"} flex flex-1 flex-col ${padded ? "px-4 py-3" : ""}`}
        style={scrollBackgroundImage ? {
          backgroundImage: `linear-gradient(rgba(10,7,17,.42), rgba(10,7,17,.42)), url("${scrollBackgroundImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="inv-mono px-1 pb-2 pt-4 text-[10px] uppercase tracking-[0.22em] text-[var(--inv-dim-2)]">{children}</p>;
}