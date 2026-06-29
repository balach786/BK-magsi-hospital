import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Award, Target, Eye, HeartHandshake, History, Trophy, Quote } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BK Baloch Hospital — Our Story & Mission" },
      { name: "description", content: "Learn about BK Baloch Hospital — our mission, vision, history and commitment to compassionate, world-class healthcare." },
      { property: "og:title", content: "About BK Baloch Hospital" },
      { property: "og:description", content: "Our mission, vision and commitment to compassionate healthcare." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="About BKBH" title="Compassion. Excellence. Trust." subtitle="For over a decade, BK Baloch Hospital has been Balochistan's destination for premium multi-specialty healthcare." />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
        <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80" alt="Hospital" className="rounded-3xl shadow-card" />
        <div>
          <h2 className="text-3xl font-bold">Hospital Overview</h2>
          <p className="mt-4 text-muted-foreground">BK Baloch Hospital (BKBH) is a 120-bed multi-specialty hospital combining advanced medical technology with the warmth of personalized care. Our team of 20+ consultants across 10 specialties handles everything from routine consultations to complex surgeries.</p>
          <p className="mt-3 text-muted-foreground">We are committed to making quality healthcare accessible, transparent and patient-centered for every family we serve.</p>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3">
          {[
            { icon: Target, t: "Our Mission", d: "To deliver compassionate, evidence-based and accessible healthcare to every patient who walks through our doors." },
            { icon: Eye, t: "Our Vision", d: "To be the most trusted multi-specialty hospital in Balochistan, setting the benchmark for clinical excellence." },
            { icon: HeartHandshake, t: "Our Values", d: "Compassion · Integrity · Excellence · Respect · Innovation · Patient-first decisions, always." },
          ].map((b) => (
            <div key={b.t} className="card-premium p-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-hero text-primary-foreground shadow-soft"><b.icon className="h-6 w-6" /></div>
              <h3 className="mt-4 text-lg font-bold">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold">Our Journey</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            { y: "2012", t: "Founded", d: "Opened our first 30-bed facility." },
            { y: "2016", t: "Expansion", d: "Grew to 80 beds and added 5 specialties." },
            { y: "2020", t: "Tech Upgrade", d: "Modular OTs and digital records." },
            { y: "2026", t: "120 Beds", d: "10 specialties, 20+ consultants." },
          ].map((s) => (
            <div key={s.y} className="card-premium p-5">
              <div className="text-xs font-semibold text-primary">{s.y}</div>
              <h3 className="mt-1 text-base font-bold flex items-center gap-2"><History className="h-4 w-4 text-primary" /> {s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:items-center">
          <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80" alt="Chairman" className="aspect-square w-full max-w-sm rounded-3xl object-cover shadow-card" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Chairman's Message</p>
            <h2 className="mt-2 text-3xl font-bold">"Every patient is family."</h2>
            <Quote className="mt-4 h-6 w-6 text-primary" />
            <p className="mt-3 text-muted-foreground">At BKBH, our purpose is simple — bring world-class medicine to the people of Balochistan with the warmth and dignity every patient deserves. We invest in our doctors, our technology and most importantly, our culture of care.</p>
            <p className="mt-3 font-semibold">— Dr. Balach Baloch, Chairman</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold">Achievements & Certifications</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Trophy, t: "Best Hospital 2026", d: "Balochistan Health Awards" },
            { icon: Award, t: "ISO 9001:2015", d: "Quality Management" },
            { icon: Award, t: "NABH Aligned", d: "Patient safety standards" },
            { icon: Trophy, t: "15,000+ Lives", d: "Treated successfully" },
          ].map((a) => (
            <div key={a.t} className="card-premium flex items-center gap-4 p-5">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"><a.icon className="h-6 w-6" /></div>
              <div><div className="text-sm font-bold">{a.t}</div><div className="text-xs text-muted-foreground">{a.d}</div></div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
