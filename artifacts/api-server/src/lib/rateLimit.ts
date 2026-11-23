import type { Request, Response } from "express";

type WindowEntry = { count: number; resetsAt: number };
const windows = new Map<string, WindowEntry>();
let lastCleanupAt = 0;

export function applyRateLimit(
  req: Request,
  res: Response,
  options: { key: string; limit: number; windowMs: number; subject?: string },
): boolean {
  const now = Date.now();
  if (now - lastCleanupAt > 60_000) {
    for (const [key, entry] of windows) {
      if (entry.resetsAt <= now) windows.delete(key);
    }
    lastCleanupAt = now;
  }

  const subject = options.subject || req.ip || req.socket.remoteAddress || "unknown";
  const mapKey = `${options.key}:${subject}`;
  const current = windows.get(mapKey);
  const entry =
    !current || current.resetsAt <= now
      ? { count: 0, resetsAt: now + options.windowMs }
      : current;
  entry.count += 1;
  windows.set(mapKey, entry);

  if (entry.count <= options.limit) return true;
  res.status(429).json({ error: "rate_limited" });
  return false;
}
