import { randomUUID } from "node:crypto";
import { File, Storage } from "@google-cloud/storage";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

export const objectStorageClient = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token",
      },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

export class ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
  }
}

export class PrivateObjectStorage {
  private getPrivateObjectDir(): string {
    const dir = process.env.PRIVATE_OBJECT_DIR?.trim();
    if (!dir) throw new Error("PRIVATE_OBJECT_DIR is not configured");
    return dir.replace(/\/+$/, "");
  }

  private parsePath(path: string): { bucketName: string; objectName: string } {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    const parts = normalized.split("/").filter(Boolean);
    if (parts.length < 2) throw new Error("Invalid private storage path");
    return { bucketName: parts[0], objectName: parts.slice(1).join("/") };
  }

  async createUploadUrl(uploadId: string): Promise<{ uploadURL: string; objectPath: string }> {
    const fullPath = `${this.getPrivateObjectDir()}/uploads/${uploadId}`;
    const { bucketName, objectName } = this.parsePath(fullPath);
    const uploadURL = await signObjectURL({
      bucketName,
      objectName,
      method: "PUT",
      ttlSec: 900,
    });
    return { uploadURL, objectPath: `/objects/uploads/${uploadId}` };
  }

  async getPrivateFile(objectPath: string): Promise<File> {
    const match = /^\/objects\/uploads\/([0-9a-f-]{36})$/i.exec(objectPath);
    if (!match) throw new ObjectNotFoundError();
    const fullPath = `${this.getPrivateObjectDir()}/uploads/${match[1]}`;
    const { bucketName, objectName } = this.parsePath(fullPath);
    const file = objectStorageClient.bucket(bucketName).file(objectName);
    const [exists] = await file.exists();
    if (!exists) throw new ObjectNotFoundError();
    return file;
  }

  async createTemporaryDownloadUrl(objectPath: string, ttlSec = 86_400): Promise<string> {
    const file = await this.getPrivateFile(objectPath);
    return signObjectURL({
      bucketName: file.bucket.name,
      objectName: file.name,
      method: "GET",
      ttlSec,
    });
  }

  async deletePrivateFile(objectPath: string): Promise<void> {
    const file = await this.getPrivateFile(objectPath);
    await file.delete({ ignoreNotFound: true });
  }

  async searchPublicObject(filePath: string): Promise<File | null> {
    const searchPaths = (process.env.PUBLIC_OBJECT_SEARCH_PATHS ?? "")
      .split(",")
      .map((path) => path.trim())
      .filter(Boolean);
    if (!searchPaths.length) throw new Error("PUBLIC_OBJECT_SEARCH_PATHS is not configured");

    for (const searchPath of searchPaths) {
      const fullPath = `${searchPath.replace(/\/+$/, "")}/${filePath.replace(/^\/+/, "")}`;
      const { bucketName, objectName } = this.parsePath(fullPath);
      const file = objectStorageClient.bucket(bucketName).file(objectName);
      const [exists] = await file.exists();
      if (exists) return file;
    }
    return null;
  }
}

export async function readObject(file: File, maxBytes: number): Promise<Buffer> {
  const [metadata] = await file.getMetadata();
  const size = Number(metadata.size ?? 0);
  if (!Number.isSafeInteger(size) || size < 1 || size > maxBytes) {
    throw new Error("Invalid stored file size");
  }
  const [buffer] = await file.download({ start: 0, end: size - 1 });
  return buffer;
}

export async function signObjectURL({
  bucketName,
  objectName,
  method,
  ttlSec,
}: {
  bucketName: string;
  objectName: string;
  method: "GET" | "PUT" | "DELETE" | "HEAD";
  ttlSec: number;
}): Promise<string> {
  const response = await fetch(`${REPLIT_SIDECAR_ENDPOINT}/object-storage/signed-object-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bucket_name: bucketName,
      object_name: objectName,
      method,
      expires_at: new Date(Date.now() + ttlSec * 1000).toISOString(),
    }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`Failed to sign storage URL (${response.status})`);
  const result = (await response.json()) as { signed_url?: string };
  if (!result.signed_url) throw new Error("Storage service did not return a signed URL");
  return result.signed_url;
}

export function newUploadId(): string {
  return randomUUID();
}
