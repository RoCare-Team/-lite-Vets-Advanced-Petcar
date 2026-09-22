"use client";

import { useRef, useState, useTransition } from "react";
import { ArrowDown, ArrowUp, ImageUp, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { saveHomeContent, uploadImage } from "@/app/admin/actions";
import { Label, inputClass } from "./fields";

let seq = 0;
const tempId = () => `new${Date.now().toString(36)}${seq++}`;

export default function ContentEditor({ initial, library }) {
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState(null);
  const [saving, startSave] = useTransition();
  const { hero, services, settings } = content;

  const setHero = (patch) => setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));
  const setList = (key, list) => (key === "services" ? setContent((c) => ({ ...c, services: list })) : setHero({ [key]: list }));

  function save() {
    setStatus(null);
    startSave(async () => {
      const result = await saveHomeContent(content);
      if (result?.error) setStatus({ error: result.error });
      else {
        setContent(result.content);
        setStatus({ ok: "Saved — the website is updated." });
      }
    });
  }

  return (
    <div className="mt-6 grid gap-6 pb-24">
      <datalist id="image-library">
        {library.map((src) => (
          <option key={src} value={src} />
        ))}
      </datalist>

      <Card title="Hero text">
        <div className="grid gap-4 sm:grid-cols-2">
          <Label text="Heading — wrap words in *asterisks* to colour them teal" className="sm:col-span-2">
            <input value={hero.title} onChange={(e) => setHero({ title: e.target.value })} className={inputClass} />
          </Label>
          <Label text="Intro line" className="sm:col-span-2">
            <textarea
              rows={2}
              value={hero.subtitle}
              onChange={(e) => setHero({ subtitle: e.target.value })}
              className={`${inputClass} h-auto py-2.5`}
            />
          </Label>
          <Label text="Booking button label">
            <input value={hero.ctaLabel} onChange={(e) => setHero({ ctaLabel: e.target.value })} className={inputClass} />
          </Label>
          <Label text="Highlights (one per line)">
            <textarea
              rows={3}
              value={hero.highlights.join("\n")}
              onChange={(e) => setHero({ highlights: e.target.value.split("\n") })}
              className={`${inputClass} h-auto py-2.5`}
            />
          </Label>
        </div>
      </Card>

      <Card title="Service tiles" hint="The grid of services on the homepage. Link a tile to /book?service=<service ID> to open booking with that service selected.">
        <Rows
          items={hero.tiles}
          onChange={(list) => setList("tiles", list)}
          blank={() => ({ id: tempId(), label: "", badge: "", image: "", href: "/book" })}
          addLabel="Add tile"
          render={(tile, update) => (
            <div className="grid gap-3 sm:grid-cols-[7rem_1fr]">
              <ImageField value={tile.image} onChange={(image) => update({ image })} compact />
              <div className="grid gap-3 sm:grid-cols-3">
                <Label text="Label">
                  <input value={tile.label} onChange={(e) => update({ label: e.target.value })} className={inputClass} />
                </Label>
                <Label text="Badge (optional)">
                  <input
                    value={tile.badge}
                    placeholder="e.g. 20% Off"
                    onChange={(e) => update({ badge: e.target.value })}
                    className={inputClass}
                  />
                </Label>
                <Label text="Link">
                  <input value={tile.href} onChange={(e) => update({ href: e.target.value })} className={inputClass} />
                </Label>
                <Label text="Image path or URL" className="sm:col-span-3">
                  <input
                    list="image-library"
                    value={tile.image}
                    onChange={(e) => update({ image: e.target.value })}
                    className={inputClass}
                  />
                </Label>
              </div>
            </div>
          )}
        />
      </Card>

      <Card title="Hero photos" hint="Two small photos on top, one large photo below.">
        <div className="grid gap-4 md:grid-cols-3">
          {["Top left", "Top right", "Large"].map((label, i) => {
            const banner = hero.banners[i] || { image: "", alt: "" };
            const update = (patch) => setHero({ banners: hero.banners.map((b, j) => (j === i ? { ...b, ...patch } : b)) });
            return (
              <div key={label} className="grid gap-3 rounded-xl border border-line p-3">
                <p className="text-sm font-semibold text-navy">{label}</p>
                <ImageField value={banner.image} onChange={(image) => update({ image })} />
                <Label text="Image path or URL">
                  <input list="image-library" value={banner.image} onChange={(e) => update({ image: e.target.value })} className={inputClass} />
                </Label>
                <Label text="Caption on photo (optional)">
                  <input value={banner.caption || ""} onChange={(e) => update({ caption: e.target.value })} className={inputClass} />
                </Label>
                <Label text="Description (for screen readers)">
                  <input value={banner.alt} onChange={(e) => update({ alt: e.target.value })} className={inputClass} />
                </Label>
              </div>
            );
          })}
        </div>
      </Card>

      <Card title="Bookable services" hint="Shown in step 2 of the booking page. The ID is used in links like /book?service=grooming.">
        <Rows
          items={services}
          onChange={(list) => setList("services", list)}
          blank={() => ({ id: "", name: "", price: "", note: "" })}
          addLabel="Add service"
          render={(s, update) => (
            <div className="grid gap-3 sm:grid-cols-[1.3fr_0.8fr_0.7fr_1.6fr]">
              <Label text="Name">
                <input value={s.name} onChange={(e) => update({ name: e.target.value })} className={inputClass} />
              </Label>
              <Label text="ID">
                <input value={s.id} placeholder="auto" onChange={(e) => update({ id: e.target.value })} className={`${inputClass} font-mono`} />
              </Label>
              <Label text="Fee (optional)">
                <input value={s.price} placeholder="₹500" onChange={(e) => update({ price: e.target.value })} className={inputClass} />
              </Label>
              <Label text="Short description">
                <input value={s.note} onChange={(e) => update({ note: e.target.value })} className={inputClass} />
              </Label>
            </div>
          )}
        />
      </Card>

      <Card title="Booking rules">
        <div className="grid gap-4 sm:grid-cols-2 lg:max-w-xl">
          <Label text="Days open for booking ahead">
            <input
              type="number"
              min={1}
              max={90}
              value={settings.bookingWindowDays}
              onChange={(e) => setContent((c) => ({ ...c, settings: { ...c.settings, bookingWindowDays: e.target.value } }))}
              className={inputClass}
            />
          </Label>
          <Label text="Minimum notice (minutes)">
            <input
              type="number"
              min={0}
              max={1440}
              value={settings.minLeadMinutes}
              onChange={(e) => setContent((c) => ({ ...c, settings: { ...c.settings, minLeadMinutes: e.target.value } }))}
              className={inputClass}
            />
          </Label>
        </div>
      </Card>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:left-60">
        <div className="flex items-center justify-end gap-4">
          {status?.error && (
            <p role="alert" className="text-sm font-medium text-emergency">
              {status.error}
            </p>
          )}
          {status?.ok && (
            <p role="status" className="text-sm font-medium text-teal">
              {status.ok}
            </p>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-teal px-6 text-sm font-semibold text-white hover:bg-teal-dark disabled:opacity-60"
          >
            {saving ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Save aria-hidden="true" className="size-4" />}
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({ title, hint, children }) {
  return (
    <section className="rounded-card border border-line bg-white p-5 sm:p-6">
      <h2 className="text-xl">{title}</h2>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Editable, reorderable list. */
function Rows({ items, onChange, blank, addLabel, render }) {
  const move = (i, dir) => {
    const next = [...items];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    onChange(next);
  };
  return (
    <div className="grid gap-3">
      {items.map((item, i) => (
        <div key={i} className="flex gap-3 rounded-xl border border-line p-3">
          <div className="min-w-0 flex-1">{render(item, (patch) => onChange(items.map((x, j) => (j === i ? { ...x, ...patch } : x))))}</div>
          <div className="flex shrink-0 flex-col gap-1">
            <IconButton label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>
              <ArrowUp className="size-4" />
            </IconButton>
            <IconButton label="Move down" disabled={i === items.length - 1} onClick={() => move(i, 1)}>
              <ArrowDown className="size-4" />
            </IconButton>
            <IconButton label="Remove" danger onClick={() => onChange(items.filter((_, j) => j !== i))}>
              <Trash2 className="size-4" />
            </IconButton>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, blank()])}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-teal/50 text-sm font-semibold text-teal hover:bg-teal-soft/40"
      >
        <Plus aria-hidden="true" className="size-4" /> {addLabel}
      </button>
    </div>
  );
}

function IconButton({ label, danger, children, ...props }) {
  return (
    <button
      type="button"
      title={label}
      className={`grid size-8 place-items-center rounded-lg text-muted ring-1 ring-line disabled:opacity-30 ${
        danger ? "hover:bg-emergency/10 hover:text-emergency" : "hover:bg-cream hover:text-navy"
      }`}
      {...props}
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}

/** Image preview with an upload button. */
function ImageField({ value, onChange, compact = false }) {
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError("");
    const data = new FormData();
    data.append("file", file);
    const result = await uploadImage(data).catch(() => ({ error: "Upload failed. Try a smaller image." }));
    setBusy(false);
    if (result.error) setError(result.error);
    else onChange(result.url);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => input.current?.click()}
        className={`group relative grid w-full place-items-center overflow-hidden rounded-xl bg-cream ring-1 ring-line ${
          compact ? "aspect-square" : "aspect-video"
        }`}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="absolute inset-0 size-full object-cover" />
        ) : null}
        <span
          className={`relative flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-navy shadow-soft ${
            value ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : ""
          }`}
        >
          {busy ? <Loader2 aria-hidden="true" className="size-3.5 animate-spin" /> : <ImageUp aria-hidden="true" className="size-3.5" />}
          Upload
        </span>
      </button>
      <input ref={input} type="file" accept="image/png,image/jpeg,image/webp,image/avif,image/gif" onChange={onFile} className="hidden" />
      {error && <p className="mt-1 text-xs text-emergency">{error}</p>}
    </div>
  );
}
