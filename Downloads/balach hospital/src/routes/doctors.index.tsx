import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEPARTMENTS, DOCTORS } from "@/data/hospital";
import { Search, Languages } from "lucide-react";

export const Route = createFileRoute("/doctors/")({
  head: () => ({
    meta: [
      { title: "Find a Doctor — BK Baloch Hospital" },
      { name: "description", content: "Meet our 20+ expert consultants at BK Baloch Hospital. Search by department, name or specialty." },
      { property: "og:title", content: "Our Doctors — BKBH" },
      { property: "og:description", content: "20+ board-certified consultants across 10 specialties." },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState<string>("all");
  const list = useMemo(() => DOCTORS.filter((d) =>
    (dept === "all" || d.department === dept) &&
    (q === "" || d.name.toLowerCase().includes(q.toLowerCase()) || d.qualification.toLowerCase().includes(q.toLowerCase()))
  ), [q, dept]);

  return (
    <SiteLayout>
      <PageHero eyebrow="Our team" title="Find a Doctor" subtitle="20+ expert consultants ready to care for you and your family." />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="card-premium flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or qualification…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <select value={dept} onChange={(e) => setDept(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="all">All Departments</option>
            {DEPARTMENTS.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
          </select>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((d) => (
            <div key={d.id} className="card-premium overflow-hidden">
              <img src={d.photo} alt={d.name} className="h-56 w-full object-cover" />
              <div className="p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {DEPARTMENTS.find((x) => x.slug === d.department)?.name}
                </div>
                <h3 className="mt-1 text-base font-bold">{d.name}</h3>
                <p className="text-xs text-muted-foreground">{d.qualification}</p>
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{d.bio}</p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
                  <Languages className="h-3 w-3" />
                  {d.languages.join(" · ")}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-secondary px-2 py-1.5"><div className="text-[10px] text-muted-foreground">Experience</div><div className="font-semibold">{d.experience}</div></div>
                  <div className="rounded-lg bg-secondary px-2 py-1.5"><div className="text-[10px] text-muted-foreground">Fee</div><div className="font-semibold">Rs. {d.fee.toLocaleString()}</div></div>
                </div>
                <div className="mt-3 text-[11px] text-muted-foreground">{d.availability}</div>
                <Link to="/appointment" search={{ doctor: d.id } as any}>
                  <Button className="mt-4 w-full rounded-full" size="sm">Book Appointment</Button>
                </Link>
              </div>
            </div>
          ))}
          {list.length === 0 && <div className="col-span-full py-16 text-center text-muted-foreground">No doctors match your filters.</div>}
        </div>
      </section>
    </SiteLayout>
  );
}
