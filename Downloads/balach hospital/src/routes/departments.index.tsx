import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { DEPARTMENTS } from "@/data/hospital";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/departments/")({
  head: () => ({
    meta: [
      { title: "Departments — BK Baloch Hospital" },
      { name: "description", content: "Explore 10 specialty departments at BK Baloch Hospital including Cardiology, Neurology, Orthopedics and more." },
      { property: "og:title", content: "Departments — BKBH" },
      { property: "og:description", content: "Ten specialty centers under one roof." },
    ],
  }),
  component: DeptIndex,
});

function DeptIndex() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Specialties" title="Our Departments" subtitle="Ten specialty centers offering end-to-end care from diagnosis to recovery." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((d) => (
            <Link key={d.slug} to="/departments/$slug" params={{ slug: d.slug }} className="card-premium group p-6 transition hover:-translate-y-1 hover:shadow-glow">
              <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-hero text-primary-foreground shadow-soft"><d.icon className="h-7 w-7" /></div>
              <h3 className="mt-5 text-xl font-bold">{d.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.short}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">View department <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
