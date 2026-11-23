import { useDevice } from "../state/DeviceProvider";
import { APPS, type AppMeta } from "../apps/registry";
import { StatusBar } from "./StatusBar";
import { Avatar } from "./Media";
import { LanguageSwitcher } from "@/i18n/LanguageSwitcher";
import { useT } from "@/i18n/LanguageProvider";
function AppIcon({ app, badge }: { app: AppMeta; badge?: number }) { const { open, labelFor } = useDevice(); const t = useT(); const Icon = app.icon; const fallback = t(app.shortNameKey ?? app.nameKey); return <button type="button" onClick={() => open({ app: app.id })} className="inv-press group flex w-full flex-col items-center gap-2"><span className="relative flex h-[62px] w-[62px] items-center justify-center rounded-[19px] border border-white/10" style={{ background: app.iconBackground }}><Icon size={25} style={{ color: app.accent }} strokeWidth={1.6} />{badge !== undefined && badge > 0 && <span className="inv-mono absolute -right-1.5 -top-1.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full px-1 text-[10px]" style={{ background: app.accent, color: "#120b1d" }}>{badge}</span>}</span><span className="text-[11px] text-[var(--inv-text)]/85">{labelFor(app.id, fallback)}</span></button>; }
export function HomeScreen() {
  const { caseData, evidence } = useDevice();
  const t = useT();
  const grid = APPS.filter((app) => !app.dock && (caseData.apps ? caseData.apps.includes(app.id) : app.id !== "tabulive" && app.id !== "calls"));
  const dock = APPS.filter((app) => app.dock);
  const unread = caseData.messages.reduce((count, conversation) => count + (conversation.unread ?? 0), 0);

  return (
    <div className="inv-anim-screen relative flex h-full flex-col">
      {caseData.device.homeWallpaperSrc && <>
        <img src={caseData.device.homeWallpaperSrc} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0711]/80 via-[#0a0711]/66 to-[#0a0711]/90" />
      </>}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(85% 45% at 20% 0%,rgba(123,63,228,.26),transparent 60%),radial-gradient(70% 45% at 90% 100%,rgba(255,250,205,.05),transparent 65%)" }} />
      <StatusBar />
      <div className="relative flex items-center justify-between gap-2 px-5 pb-5 pt-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={caseData.victim.name} seed={caseData.victim.avatarSeed} src={caseData.victim.avatarSrc} size={40} ring />
          <div className="min-w-0">
            <p className="inv-mono text-[9px] uppercase tracking-[.26em] text-[var(--inv-dim-2)]">{t("investigation.deviceOf")}</p>
            <p className="truncate tracking-[.14em] text-[15px]">{caseData.victim.name}</p>
          </div>
        </div>
        <div className="pointer-events-auto">
          <LanguageSwitcher />
        </div>
      </div>
      <div className="inv-scroll relative flex-1 px-6">
        <div className="grid grid-cols-4 gap-x-3 gap-y-6 pb-6">
          {grid.map((app, index) => (
            <div key={app.id} className="inv-anim-rise" style={{ animationDelay: `${index * 35}ms` }}>
              <AppIcon app={app} badge={app.id === "messages" ? unread : undefined} />
            </div>
          ))}
        </div>
      </div>
      <div className="relative px-5 pb-5 pt-2">
        <div className="flex items-center justify-around rounded-[26px] border border-white/8 bg-white/[.05] px-4 py-3">
          {dock.map((app) => <div key={app.id} className="w-[78px]"><AppIcon app={app} badge={evidence.length} /></div>)}
        </div>
        <div className="mx-auto mt-4 h-[4px] w-[120px] rounded-full bg-white/20" />
      </div>
    </div>
  );
}