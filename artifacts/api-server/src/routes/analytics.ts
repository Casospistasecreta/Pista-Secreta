import { Router, type IRouter } from "express";
import { count } from "drizzle-orm";
import {
  GetPurchaseClickStatsResponse,
  TrackPurchaseClickBody,
  TrackPurchaseClickResponse,
} from "@workspace/api-zod";
import { db, purchaseClickEventsTable } from "@workspace/db";

const router: IRouter = Router();

async function getTotalClicks() {
  const [result] = await db.select({ value: count() }).from(purchaseClickEventsTable);
  return result?.value ?? 0;
}

router.post("/analytics/purchase-click", async (req, res, next) => {
  try {
    const body = TrackPurchaseClickBody.parse(req.body ?? {});

    await db.insert(purchaseClickEventsTable).values({
      destination: body.destination ?? "https://kiwify.app/CzueX7E",
      referrer: req.get("referer") ?? null,
      userAgent: req.get("user-agent") ?? null,
    });

    const totalClicks = await getTotalClicks();
    const data = TrackPurchaseClickResponse.parse({
      success: true,
      totalClicks,
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/analytics/purchase-clicks", async (_req, res, next) => {
  try {
    const totalClicks = await getTotalClicks();
    const data = GetPurchaseClickStatsResponse.parse({ totalClicks });

    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;