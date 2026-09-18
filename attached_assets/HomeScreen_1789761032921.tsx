import { useDevice } from "../state/DeviceProvider";
import { APPS, type AppMeta } from "../apps/registry";
import { StatusBar } from "./StatusBar";
import { Avatar } from "./Media";

function AppIcon({ app, badge }: { app: AppMeta; badge?: number }) {
  const { open } = useDevice();
  const Icon = app.icon;

  return (
    <button
      type="button"
      onClick={() => open({ app: app.id })}
      className="inv-press group flex w-full flex-col items-center gap-2"
    >
      <span
        className="relative flex h-[62px] w-[62px] items-center justify-center rounded-[19px] border border-white/10 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.9)]"
        style={{ background: app.iconBackground }}
      >
        <Icon size={25} style={{ color: app.accent }} strokeWidth={1.6} />
        <span
          className="pointer-events-none absolute inset-0 rounded-[19px]"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.14), transparent 45%)",
          }}
        />
        {badge !== undefined && badge > 0 && (
          <span
            className="inv-mono absolute -right-1.5 -top-1.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full px-1 text-[10px] text-[#120b1d]"
            style={{ background: app.accent }}
          >
            {badge}
          </span>
        )}
      </span>
      <span className="text-[11px] tracking-wide text-[var(--inv-text)]/85">
        {app.shortName ?? app.name}
      </span>
    </button>
  );
}

export function HomeScreen() {
  const { caseData, evidence } = useDevice();
  const gridApps = APPS.filter((app) => !app.dock);
  const dockApps = APPS.filter((app) => app.dock);
  const unread = caseData.messages.reduce((total, c) => total + (c.unread ?? 0), 0);

  return (
    <div className="inv-anim-screen relative flex h-full flex-col">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 45% at 20% 0%, rgba(123,63,228,0.26), transparent 60%), radial-gradient(70% 45% at 90% 100%, rgba(255,250,205,0.05), transparent 65%)",
        }}
      />
      <StatusBar />

      <div className="relative flex items-center gap-3 px-6 pb-5 pt-4">
        <Avatar name={caseData.victim.name} seed={caseData.victim.avatarSeed} src={caseData.victim.avatarSrc} size={40} ring />
        <div className="min-w-0">
          <p className="inv-mono text-[9px] uppercase tracking-[0.26em] text-[var(--inv-dim-2)]">
            Dispositivo de
          </p>
          <p className="truncate text-[15px] tracking-[0.14em] text-[var(--inv-chiffon)]">
            {caseData.victim.name}
          </p>
        </div>
      </div>

      <div className="inv-scroll relative flex-1 px-6">
        <div className="grid grid-cols-4 gap-x-3 gap-y-6 pb-6">
          {gridApps.map((app, index) => (
            <div
              key={app.id}
              className="inv-anim-rise"
              style={{ animationDelay: `${index * 35}ms` }}
            >
              <AppIcon app={app} badge={app.id === "messages" ? unread : undefined} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative px-5 pb-5 pt-2">
        <div className="flex items-center justify-around rounded-[26px] border border-white/8 bg-white/[0.05] px-4 py-3 backdrop-blur-md">
          {dockApps.map((app) => (
            <div key={app.id} className="w-[78px]">
              <AppIcon app={app} badge={evidence.length} />
            </div>
          ))}
        </div>
        <div className="mx-auto mt-4 h-[4px] w-[120px] rounded-full bg-white/20" />
      </div>
    </div>
  );
}
