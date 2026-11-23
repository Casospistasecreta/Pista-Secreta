import { getAuth } from "@clerk/express";
import { Router, type IRouter } from "express";
import { PrivateObjectStorage, ObjectNotFoundError } from "../lib/objectStorage";

const router: IRouter = Router();
const storage = new PrivateObjectStorage();

router.get("/storage/public-objects/*filePath", async (req, res) => {
  try {
    const raw = req.params.filePath;
    const filePath = Array.isArray(raw) ? raw.join("/") : raw;
    const file = await storage.searchPublicObject(filePath);
    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    const [metadata] = await file.getMetadata();
    res.setHeader("Content-Type", metadata.contentType || "application/octet-stream");
    res.setHeader("Cache-Control", "public, max-age=3600");
    if (metadata.size) res.setHeader("Content-Length", String(metadata.size));
    file.createReadStream().pipe(res);
  } catch (error) {
    req.log.error({ errorCode: error instanceof Error ? error.name : "unknown" }, "Public object could not be served");
    res.status(500).json({ error: "Failed to serve public object" });
  }
});

router.get("/storage/objects/*path", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const raw = req.params.path;
    const id = Array.isArray(raw) ? raw.join("/") : raw;
    const file = await storage.getPrivateFile(`/objects/${id}`);
    const [metadata] = await file.getMetadata();
    const owner = metadata.metadata?.ownerUserId;
    if (owner !== userId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    res.setHeader("Content-Type", metadata.contentType || "application/octet-stream");
    res.setHeader("Cache-Control", "private, no-store");
    if (metadata.size) res.setHeader("Content-Length", String(metadata.size));
    file.createReadStream().pipe(res);
  } catch (error) {
    if (error instanceof ObjectNotFoundError) {
      res.status(404).json({ error: "File not found" });
      return;
    }
    req.log.error({ errorCode: error instanceof Error ? error.name : "unknown" }, "Private object could not be served");
    res.status(500).json({ error: "Failed to serve object" });
  }
});

export default router;
