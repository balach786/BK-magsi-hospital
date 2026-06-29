import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { callApi } from "@/lib/api";
import { Search, FileText, Download, Pill, User2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/patient-portal")({
  head: () => ({
    meta: [
      { title: "Patient Portal — BK Baloch Hospital" },
      { name: "description", content: "View your appointments, prescriptions and lab reports at BK Baloch Hospital." },
      { property: "og:title", content: "Patient Portal — BKBH" },
      { property: "og:description", content: "Secure access to your appointments and reports." },
    ],
  }),
  component: Portal,
});

function Portal() {
  const [cnic, setCnic] = useState("");
  const [appt, setAppt] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    if (!cnic && !appt) { toast.error("Enter CNIC or Appointment ID"); return; }
    setLoading(true);
    try {
      const r = await callApi<any>("lookupPatient", { cnic, appointmentId: appt });
      if (r.found) { setData(r.patient); toast.success("Record found"); }
      else { toast.error("No record found"); setData(null); }
    } finally { setLoading(false); }
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Your records" title="Patient Portal" subtitle="Search by CNIC or Appointment ID to access your appointment, prescription and reports." />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <form onSubmit={lookup} className="card-premium grid gap-4 p-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div className="grid gap-1.5"><Label className="text-xs font-semibold">CNIC</Label><Input placeholder="00000-0000000-0" value={cnic} onChange={(e) => setCnic(e.target.value)} /></div>
          <div className="grid gap-1.5"><Label className="text-xs font-semibold">or Appointment ID</Label><Input placeholder="BKBH-2026-000145" value={appt} onChange={(e) => setAppt(e.target.value)} /></div>
          <Button type="submit" className="rounded-full" disabled={loading}><Search className="mr-2 h-4 w-4" /> {loading ? "Searching…" : "Search"}</Button>
        </form>

        {data && (
          <div className="mt-8 card-premium p-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><User2 className="h-6 w-6" /></div>
              <div>
                <div className="text-lg font-bold">{data.name}</div>
                <div className="text-xs text-muted-foreground">CNIC: {data.cnic}</div>
              </div>
              <span className="ml-auto rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">{data.status}</span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Info k="Appointment ID" v={data.appointmentId} />
              <Info k="Doctor" v={data.doctor} />
              <Info k="Department" v={data.department} />
              <Info k="Date / Time" v={`${data.date} · ${data.time}`} />
            </div>
            <div className="mt-6 rounded-2xl bg-secondary/60 p-5">
              <div className="flex items-center gap-2 text-sm font-bold"><Pill className="h-4 w-4 text-primary" /> Prescription</div>
              <p className="mt-2 text-sm text-foreground/85">{data.prescription || "No prescription on file."}</p>
            </div>
            <div className="mt-4 rounded-2xl bg-secondary/60 p-5">
              <div className="flex items-center gap-2 text-sm font-bold"><FileText className="h-4 w-4 text-primary" /> Lab Reports</div>
              {data.reports?.length ? (
                <ul className="mt-2 space-y-2">{data.reports.map((r: any, i: number) => (
                  <li key={i} className="flex items-center justify-between text-sm">
                    <span>{r.name}</span>
                    <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline"><Download className="h-3.5 w-3.5" /> Download</a>
                  </li>
                ))}</ul>
              ) : <p className="mt-2 text-sm text-muted-foreground">No reports uploaded yet.</p>}
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
function Info({ k, v }: { k: string; v: string }) {
  return <div className="rounded-xl bg-secondary/60 px-4 py-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div><div className="text-sm font-semibold">{v}</div></div>;
}
