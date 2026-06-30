import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { DEPARTMENTS, DOCTORS, HOSPITAL } from "@/data/hospital";
import { CheckCircle2, Phone, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/departments/$slug")({
  head: ({ params }) => {
    const dept = DEPARTMENTS.find((d) => d.slug === params.slug);
    const t = dept ? `${dept.name} — BK Baloch Hospital` : "Department — BKBH";
    return {
      meta: [
        { title: t },
        { name: "description", content: dept?.description ?? "Department at BK Baloch Hospital." },
        { property: "og:title", content: t },
        { property: "og:description", content: dept?.short ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const dept = DEPARTMENTS.find((d) => d.slug === params.slug);
    if (!dept) throw notFound();
    return { dept };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Department not found</h1>
        <Link to="/departments" className="mt-4 inline-block text-primary hover:underline">Browse all departments</Link>
      </div>
    </SiteLayout>
  ),
  component: DeptPage,
});

function DeptPage() {
  const { dept } = Route.useLoaderData();
  const doctors = DOCTORS.filter((d) => d.department === dept.slug);
  const Icon = dept.icon;
  return (
    <SiteLayout>
      <section className="relative overflow-hidden gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white, transparent 40%)" }} />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:grid-cols-[auto_1fr] sm:items-center sm:px-6 sm:py-20">
          <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/15 backdrop-blur"><Icon className="h-10 w-10" /></div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">Department</p>
            <h1 className="mt-1 text-3xl font-bold sm:text-5xl">{dept.name}</h1>
            <p className="mt-3 max-w-2xl opacity-90">{dept.description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/appointment"><Button size="lg" variant="secondary" className="rounded-full">Book Appointment</Button></Link>
              <a href={`tel:${HOSPITAL.emergency}`}><Button size="lg" variant="destructive" className="rounded-full"><Phone className="mr-2 h-4 w-4" /> Emergency</Button></a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <InfoCard title="Treatments Offered" items={dept.treatments} />
        <InfoCard title="Services" items={dept.services} />
        <InfoCard title="Modern Equipment" items={dept.equipment} />
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Available Doctors</h2>
              <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4" /> {dept.hours}</p>
            </div>
            <Link to="/doctors" className="text-sm font-semibold text-primary hover:underline">All doctors →</Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d) => (
              <div key={d.id} className="card-premium overflow-hidden">
                <img src={d.photo} alt={d.name} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-bold">{d.name}</h3>
                  <p className="text-xs text-muted-foreground">{d.qualification} · {d.experience}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="font-semibold">Rs. {d.fee.toLocaleString()}</span>
                  </div>
                  <Link to="/appointment" search={{ doctor: d.id } as any}>
                    <Button className="mt-4 w-full rounded-full">Book <ArrowRight className="ml-1 h-4 w-4" /></Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card-premium p-6">
      <h3 className="text-lg font-bold">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
