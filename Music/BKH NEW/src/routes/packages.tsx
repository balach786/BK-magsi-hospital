import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { PACKAGES } from "@/data/hospital";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Health Packages — BK Baloch Hospital" },
      { name: "description", content: "Affordable wellness, cardiac, diabetes and executive health packages at BK Baloch Hospital." },
      { property: "og:title", content: "Health Packages — BKBH" },
      { property: "og:description", content: "Preventive health checkup packages." },
    ],
  }),
  component: Packages,
});

function Packages() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Preventive care" title="Health Packages" subtitle="Comprehensive, transparent health checkups designed for every life stage." />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <div key={p.name} className={`card-premium p-6 ${i === 1 ? "ring-2 ring-primary" : ""}`}>
              {i === 1 && <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground"><Sparkles className="h-3 w-3" /> POPULAR</div>}
              <h3 className="text-xl font-bold">{p.name}</h3>
              <div className="mt-2 text-3xl font-bold gradient-text">Rs. {p.price.toLocaleString()}</div>
              <div className="mt-4 border-t border-border pt-4">
                <div className="text-xs font-semibold uppercase text-muted-foreground">Included Tests</div>
                <ul className="mt-2 space-y-1.5 text-sm">{p.includes.map((x) => <li key={x} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-success" /> {x}</li>)}</ul>
              </div>
              <div className="mt-4">
                <div className="text-xs font-semibold uppercase text-muted-foreground">Benefits</div>
                <ul className="mt-2 space-y-1.5 text-sm">{p.benefits.map((x) => <li key={x} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" /> {x}</li>)}</ul>
              </div>
              <Link to="/appointment"><Button className="mt-6 w-full rounded-full">Book Now</Button></Link>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
