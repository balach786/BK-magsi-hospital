import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { GALLERY } from "@/data/hospital";
import { X } from "lucide-react";

const CATS = ["All","Hospital Building","ICU","Laboratory","Operation Theater","Doctors","Pharmacy","Wards","Emergency"];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — BK Baloch Hospital" },
      { name: "description", content: "Explore photos of BK Baloch Hospital's facilities, ICU, labs, operation theaters and team." },
      { property: "og:title", content: "Gallery — BKBH" },
      { property: "og:description", content: "Photos from our hospital." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const items = useMemo(() => cat === "All" ? GALLERY : GALLERY.filter((g) => g.cat === cat), [cat]);

  return (
    <SiteLayout>
      <PageHero eyebrow="Inside BKBH" title="Hospital Gallery" subtitle="A look inside our facilities and team." />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-accent"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g, i) => (
            <button key={i} onClick={() => setOpen(g.url)} className="group relative overflow-hidden rounded-2xl">
              <img src={g.url} alt={g.cat} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-xs font-semibold text-white">{g.cat}</div>
            </button>
          ))}
        </div>
      </section>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4" onClick={() => setOpen(null)}>
          <button className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"><X className="h-5 w-5" /></button>
          <img src={open} alt="" className="max-h-[90vh] max-w-full rounded-2xl" />
        </div>
      )}
    </SiteLayout>
  );
}
