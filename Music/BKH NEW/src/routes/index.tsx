import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/Layout";
import { HOSPITAL, DEPARTMENTS, DOCTORS, FACILITIES, STATS, TESTIMONIALS, NEWS } from "@/data/hospital";
import { Phone, CalendarCheck, UserSearch, ShieldCheck, Stethoscope, Microscope, BadgeDollarSign, Headphones, MonitorSmartphone, HeartHandshake, Star, ArrowRight, Building2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BK Baloch Hospital — Compassionate Care, Trusted Excellence" },
      { name: "description", content: "Premium multi-specialty hospital in Balochistan. Book appointments online, find expert doctors and access 24/7 emergency care at BKBH." },
      { property: "og:title", content: "BK Baloch Hospital" },
      { property: "og:description", content: "Compassionate Care, Trusted Excellence — BKBH." },
    ],
  }),
  component: HomePage,
});

const WHY = [
  { icon: Stethoscope, t: "Experienced Doctors", d: "Board-certified consultants across 10 specialties." },
  { icon: Microscope, t: "Latest Equipment", d: "3T MRI, modular OTs and automated labs." },
  { icon: MonitorSmartphone, t: "Digital Reports", d: "Access prescriptions & reports online anytime." },
  { icon: BadgeDollarSign, t: "Affordable Care", d: "Transparent pricing and health packages." },
  { icon: Headphones, t: "24/7 Emergency", d: "Round-the-clock ER and ambulance dispatch." },
  { icon: CalendarCheck, t: "Online Appointments", d: "Book in seconds — get a PDF slip with QR." },
  { icon: HeartHandshake, t: "Patient-Centered", d: "Compassion at the core of every interaction." },
  { icon: ShieldCheck, t: "Safety First", d: "ISO-aligned infection control and audits." },
];

function HomePage() {
  const featuredDoctors = DOCTORS.slice(0, 6);
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-hero opacity-95" />
        <div className="absolute inset-0 -z-10 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 15% 25%, white, transparent 35%), radial-gradient(circle at 85% 70%, white, transparent 35%)" }} />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:py-32">
          <div className="text-primary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
              <span className="grid h-2 w-2 place-items-center rounded-full bg-success animate-pulse-ring" />
              Trusted by 15,000+ patients
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-6xl">
              {HOSPITAL.name}
              <span className="mt-2 block text-xl font-medium opacity-90 sm:text-2xl">{HOSPITAL.tagline}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base opacity-90 sm:text-lg">
              World-class multi-specialty care with expert consultants, advanced diagnostics and a 24/7 emergency response — all in one place.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/appointment"><Button size="lg" variant="secondary" className="rounded-full"><CalendarCheck className="mr-2 h-4 w-4" /> Book Appointment</Button></Link>
              <a href={`tel:${HOSPITAL.emergency}`}>
                <Button size="lg" variant="destructive" className="rounded-full"><Phone className="mr-2 h-4 w-4" /> Emergency {HOSPITAL.emergency}</Button>
              </a>
              <Link to="/doctors"><Button size="lg" variant="outline" className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20"><UserSearch className="mr-2 h-4 w-4" /> Find Doctor</Button></Link>
            </div>
          </div>

          <div className="relative">
            <div className="animate-float overflow-hidden rounded-3xl border border-white/20 shadow-glow">
              <img src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=900&q=80" alt="Doctors at BK Baloch Hospital" className="h-[420px] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl glass-strong p-4 shadow-card sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-success/15 text-success"><HeartHandshake className="h-5 w-5" /></div>
                <div>
                  <div className="text-sm font-semibold">99% Patient Satisfaction</div>
                  <div className="text-xs text-muted-foreground">Based on 2,400+ reviews</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 -top-3 hidden rounded-2xl glass-strong p-4 shadow-card md:block">
              <div className="text-xs text-muted-foreground">Available beds</div>
              <div className="text-2xl font-bold gradient-text">42 / 120</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto -mt-10 max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 rounded-3xl glass-strong p-4 shadow-card sm:grid-cols-3 sm:p-6 lg:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl bg-background/60 p-4 text-center">
              <div className="text-2xl font-bold gradient-text sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="Why choose us" title="Care you can trust" subtitle="Eight reasons families across Balochistan choose BKBH for their healthcare." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.t} className="card-premium p-6 transition hover:-translate-y-1 hover:shadow-glow">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"><w.icon className="h-6 w-6" /></div>
              <h3 className="mt-4 text-base font-bold">{w.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead eyebrow="Specialties" title="Featured Departments" subtitle="Ten specialty centers under one roof." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {DEPARTMENTS.map((d) => (
              <Link key={d.slug} to="/departments/$slug" params={{ slug: d.slug }}
                className="group card-premium p-5 transition hover:-translate-y-1 hover:shadow-glow">
                <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-hero text-primary-foreground shadow-soft"><d.icon className="h-6 w-6" /></div>
                <h3 className="mt-4 text-base font-bold">{d.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{d.short}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">View details <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="Our team" title="Featured Doctors" subtitle="Meet our most-loved consultants." action={<Link to="/doctors" className="text-sm font-semibold text-primary hover:underline">View all →</Link>} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDoctors.map((d) => (
            <div key={d.id} className="card-premium overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.photo} alt={d.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {DEPARTMENTS.find((x) => x.slug === d.department)?.name}
                </div>
                <h3 className="mt-1 text-lg font-bold">{d.name}</h3>
                <p className="text-xs text-muted-foreground">{d.qualification}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{d.experience}</span><span className="font-semibold text-foreground">Rs. {d.fee.toLocaleString()}</span>
                </div>
                <div className="mt-4">
                  <Link to="/appointment" search={{ doctor: d.id } as any}><Button className="w-full rounded-full">Book Appointment</Button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FACILITIES */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead eyebrow="Infrastructure" title="Hospital Facilities" subtitle="Modern facilities to deliver world-class care." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FACILITIES.map((f) => (
              <div key={f.name} className="glass rounded-2xl p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Building2 className="h-5 w-5" /></div>
                <h3 className="mt-3 text-sm font-bold">{f.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="Patient stories" title="What patients say" subtitle="Real feedback from people who trust BKBH with their care." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card-premium p-5">
              <div className="flex">{Array.from({ length: t.rating }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-warning text-warning" />))}</div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">"{t.comment}"</p>
              <p className="mt-4 text-xs font-semibold text-muted-foreground">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead eyebrow="News & updates" title="Latest from BKBH" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {NEWS.map((n) => (
              <article key={n.title} className="card-premium overflow-hidden">
                <div className="aspect-[16/9] gradient-hero" />
                <div className="p-5">
                  <p className="text-xs text-muted-foreground">{new Date(n.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
                  <h3 className="mt-2 text-base font-bold">{n.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto my-20 max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-10 text-primary-foreground shadow-glow">
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid items-center gap-6 sm:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">Need to see a specialist?</h3>
              <p className="mt-2 max-w-xl opacity-90">Book your appointment online in under a minute and get a PDF slip with QR code instantly.</p>
            </div>
            <Link to="/appointment"><Button size="lg" variant="secondary" className="rounded-full">Book Now</Button></Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionHead({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
        <h2 className="text-2xl font-bold sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 text-base text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
