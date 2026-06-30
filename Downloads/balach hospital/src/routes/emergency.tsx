import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HOSPITAL } from "@/data/hospital";
import { callApi } from "@/lib/api";
import { Phone, Ambulance, Heart, MapPin, AlertTriangle, Bed } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency & Ambulance — BK Baloch Hospital" },
      { name: "description", content: "24/7 emergency response, ambulance and ICU services at BK Baloch Hospital." },
      { property: "og:title", content: "Emergency — BKBH" },
      { property: "og:description", content: "24/7 emergency, ambulance and ICU." },
    ],
  }),
  component: EmergencyPage,
});

function EmergencyPage() {
  const [f, setF] = useState({ name: "", phone: "", address: "", emergency: "" });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try { await callApi("submitAmbulance", f); toast.success("Ambulance dispatched. We will contact you immediately."); setF({ name: "", phone: "", address: "", emergency: "" }); }
    finally { setLoading(false); }
  }

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-destructive text-destructive-foreground">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white, transparent 40%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold"><AlertTriangle className="h-4 w-4" /> 24/7 EMERGENCY</div>
          <h1 className="mt-4 text-4xl font-bold sm:text-6xl">Need help now?</h1>
          <p className="mt-3 max-w-2xl opacity-90">Our emergency team is on standby 24 hours a day. Call our hotline or request an ambulance below.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:${HOSPITAL.emergency}`}><Button size="lg" variant="secondary" className="rounded-full"><Phone className="mr-2 h-4 w-4" /> Hotline {HOSPITAL.emergency}</Button></a>
            <a href={`tel:${HOSPITAL.ambulance}`}><Button size="lg" variant="outline" className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20"><Ambulance className="mr-2 h-4 w-4" /> Ambulance {HOSPITAL.ambulance}</Button></a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {[
          { icon: Phone, t: "Emergency Hotline", v: HOSPITAL.emergency },
          { icon: Ambulance, t: "Ambulance", v: HOSPITAL.ambulance },
          { icon: Heart, t: "Blood Bank", v: "+92 300 9876543" },
          { icon: Bed, t: "ICU Beds Available", v: "8 / 20" },
        ].map((b) => (
          <div key={b.t} className="card-premium flex items-center gap-4 p-5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-destructive/10 text-destructive"><b.icon className="h-6 w-6" /></div>
            <div><div className="text-xs text-muted-foreground">{b.t}</div><div className="text-lg font-bold">{b.v}</div></div>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-2">
        <div className="card-premium p-6">
          <h3 className="text-lg font-bold">Emergency Instructions</h3>
          <ol className="mt-4 space-y-2 text-sm text-foreground/85">
            <li>1. Stay calm and call the emergency hotline immediately.</li>
            <li>2. Share the patient's exact location and condition.</li>
            <li>3. Do not move the patient if there is a suspected spinal injury.</li>
            <li>4. Keep airway clear and apply pressure to bleeding wounds.</li>
            <li>5. Wait for the ambulance — our team will guide you on call.</li>
          </ol>
          <div className="mt-6 overflow-hidden rounded-2xl">
            <iframe title="map" className="h-64 w-full" src="https://www.google.com/maps?q=Quetta&output=embed" loading="lazy" />
          </div>
          <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {HOSPITAL.address}</p>
        </div>

        <form onSubmit={submit} className="card-premium grid gap-4 p-6">
          <h3 className="text-lg font-bold">Request an Ambulance</h3>
          <div className="grid gap-1.5"><Label className="text-xs font-semibold">Your Name *</Label><Input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
          <div className="grid gap-1.5"><Label className="text-xs font-semibold">Phone *</Label><Input required value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
          <div className="grid gap-1.5"><Label className="text-xs font-semibold">Pickup Address *</Label><Input required value={f.address} onChange={(e) => setF({ ...f, address: e.target.value })} /></div>
          <div className="grid gap-1.5"><Label className="text-xs font-semibold">Emergency Description *</Label><Textarea required rows={4} value={f.emergency} onChange={(e) => setF({ ...f, emergency: e.target.value })} /></div>
          <Button type="submit" variant="destructive" size="lg" className="rounded-full" disabled={loading}>
            <Ambulance className="mr-2 h-4 w-4" /> {loading ? "Sending…" : "Send Ambulance Request"}
          </Button>
        </form>
      </section>
    </SiteLayout>
  );
}
