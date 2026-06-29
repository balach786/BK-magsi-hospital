import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HOSPITAL } from "@/data/hospital";
import { callApi } from "@/lib/api";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — BK Baloch Hospital" },
      { name: "description", content: "Reach BK Baloch Hospital by phone, email, WhatsApp or visit us. We respond 24/7." },
      { property: "og:title", content: "Contact — BKBH" },
      { property: "og:description", content: "Get in touch with BK Baloch Hospital." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    try { await callApi("submitContact", f); toast.success("Message sent! We'll get back to you shortly."); setF({ name: "", email: "", subject: "", message: "" }); }
    finally { setLoading(false); }
  }
  return (
    <SiteLayout>
      <PageHero eyebrow="Get in touch" title="Contact BK Baloch Hospital" subtitle="We're here to help, 24 hours a day." />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={submit} className="card-premium grid gap-4 p-6 sm:p-8">
          <h2 className="text-xl font-bold">Send us a message</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5"><Label className="text-xs font-semibold">Name</Label><Input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
            <div className="grid gap-1.5"><Label className="text-xs font-semibold">Email</Label><Input type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
          </div>
          <div className="grid gap-1.5"><Label className="text-xs font-semibold">Subject</Label><Input value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} /></div>
          <div className="grid gap-1.5"><Label className="text-xs font-semibold">Message</Label><Textarea rows={5} required value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></div>
          <Button type="submit" size="lg" className="rounded-full" disabled={loading}>{loading ? "Sending…" : "Send Message"}</Button>
        </form>

        <div className="grid content-start gap-4">
          {[
            { icon: Phone, t: "Phone", v: HOSPITAL.phone, href: `tel:${HOSPITAL.phone}` },
            { icon: Mail, t: "Email", v: HOSPITAL.email, href: `mailto:${HOSPITAL.email}` },
            { icon: MessageCircle, t: "WhatsApp", v: HOSPITAL.phone, href: `https://wa.me/${HOSPITAL.phone.replace(/[^\d]/g, "")}` },
            { icon: MapPin, t: "Address", v: HOSPITAL.address, href: HOSPITAL.mapUrl },
            { icon: Clock, t: "Hours", v: HOSPITAL.hours },
          ].map((c) => (
            <a key={c.t} href={c.href ?? "#"} target="_blank" rel="noreferrer" className="card-premium flex items-start gap-4 p-5 transition hover:-translate-y-0.5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><c.icon className="h-5 w-5" /></div>
              <div><div className="text-xs uppercase text-muted-foreground">{c.t}</div><div className="font-semibold">{c.v}</div></div>
            </a>
          ))}
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe title="map" className="h-56 w-full" src="https://www.google.com/maps?q=Quetta&output=embed" loading="lazy" />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
