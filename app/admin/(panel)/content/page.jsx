import { promises as fs } from "node:fs";
import path from "node:path";
import ContentEditor from "@/components/admin/ContentEditor";
import { getContent } from "@/lib/store";

// Every bundled photo under /public/images, offered as suggestions in the image fields.
async function imageLibrary(dir = path.join(process.cwd(), "public", "images"), prefix = "/images") {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  const nested = await Promise.all(
    entries.map((e) =>
      e.isDirectory()
        ? imageLibrary(path.join(dir, e.name), `${prefix}/${e.name}`)
        : /\.(webp|png|jpe?g|avif)$/i.test(e.name)
          ? [`${prefix}/${e.name}`]
          : []
    )
  );
  return nested.flat();
}

export default async function ContentPage() {
  const [content, library] = await Promise.all([getContent(), imageLibrary()]);

  return (
    <>
      <h1 className="text-3xl">Homepage &amp; services</h1>
      <p className="mt-1 text-sm text-muted">
        Edit the homepage hero, its service tiles and photos, and the services people can book.
      </p>
      <ContentEditor initial={content} library={library} />
    </>
  );
}
