import { promises as fs } from "node:fs";
import path from "node:path";
import { UPLOAD_DIR } from "@/lib/store";

// Serves images uploaded from the admin panel (stored outside /public so
// they survive rebuilds and don't need a redeploy).
const TYPES = { png: "image/png", jpg: "image/jpeg", webp: "image/webp", avif: "image/avif", gif: "image/gif" };

export async function GET(_req, { params }) {
  const { file } = await params;
  const match = /^[a-f0-9]{8,64}\.(png|jpg|webp|avif|gif)$/.exec(file);
  if (!match) return new Response("Not found", { status: 404 });

  try {
    const body = await fs.readFile(path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, file));
    return new Response(body, {
      headers: {
        "Content-Type": TYPES[match[1]],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
