import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEPARTMENTS, DOCTORS, HOSPITAL } from "@/data/hospital";
import { callApi, qrUrl } from "@/lib/api";
import { toast } from "sonner";
import { Download, Printer, CheckCircle2, Calendar, User2, Stethoscope } from "lucide-react";

type Search = { doctor?: string };

export const Route = createFileRoute("/appointment")({
  validateSearch: (s: Record<string, unknown>): Search => ({ doctor: typeof s.doctor === "string" ? s.doctor : undefined }),
  head: () => ({
    meta: [
      { title: "Book an Appointment — BK Baloch Hospital" },
      { name: "description", content: "Book your appointment at BK Baloch Hospital online. Get instant confirmation with PDF slip and QR code." },
      { property: "og:title", content: "Book Appointment — BKBH" },
      { property: "og:description", content: "Online appointment booking with instant PDF slip." },
    ],
  }),
  component: AppointmentPage,
});

const init = {
  fullName: "", fatherName: "", age: "", gender: "Male", cnic: "",
  mobile: "", email: "", address: "", department: "", doctor: "",
  date: "", time: "", problem: "",
};

function AppointmentPage() {
  const { doctor: preDoc } = Route.useSearch();
  const [f, setF] = useState(init);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { id: string; data: typeof init; doctorName: string; deptName: string }>(null);

  useEffect(() => {
    if (preDoc) {
      const d = DOCTORS.find((x) => x.id === preDoc);
      if (d) setF((p) => ({ ...p, doctor: d.id, department: d.department }));
    }
  }, [preDoc]);

  const docList = useMemo(() => DOCTORS.filter((d) => !f.department || d.department === f.department), [f.department]);

  function set<K extends keyof typeof f>(k: K, v: string) { setF((p) => ({ ...p, [k]: v })); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.fullName || !f.cnic || !f.mobile || !f.department || !f.doctor || !f.date || !f.time) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await callApi<{ success: boolean; appointmentId: string }>("createAppointment", f);
      const doctorName = DOCTORS.find((d) => d.id === f.doctor)?.name ?? "";
      const deptName = DEPARTMENTS.find((d) => d.slug === f.department)?.name ?? "";
      setResult({ id: res.appointmentId, data: f, doctorName, deptName });
      toast.success("Appointment booked successfully!");
    } catch {
      toast.error("Could not book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (result) return <SlipView res={result} onNew={() => { setResult(null); setF(init); }} />;

  return (
    <SiteLayout>
      <PageHero eyebrow="Easy & secure" title="Book an Appointment" subtitle="Fill the form and receive an instant PDF appointment slip with your unique QR-coded ID." />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <form onSubmit={submit} className="card-premium grid gap-5 p-6 sm:p-8">
          <SectionTitle icon={<User2 className="h-4 w-4" />}>Patient Information</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name *"><Input value={f.fullName} onChange={(e) => set("fullName", e.target.value)} required /></Field>
            <Field label="Father Name"><Input value={f.fatherName} onChange={(e) => set("fatherName", e.target.value)} /></Field>
            <Field label="Age"><Input type="number" min="0" value={f.age} onChange={(e) => set("age", e.target.value)} /></Field>
            <Field label="Gender">
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={f.gender} onChange={(e) => set("gender", e.target.value)}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </Field>
            <Field label="CNIC *"><Input placeholder="00000-0000000-0" value={f.cnic} onChange={(e) => set("cnic", e.target.value)} required /></Field>
            <Field label="Mobile Number *"><Input placeholder="+92 3xx xxxxxxx" value={f.mobile} onChange={(e) => set("mobile", e.target.value)} required /></Field>
            <Field label="Email"><Input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} /></Field>
            <Field label="Address"><Input value={f.address} onChange={(e) => set("address", e.target.value)} /></Field>
          </div>

          <SectionTitle icon={<Stethoscope className="h-4 w-4" />}>Appointment Details</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Department *">
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={f.department} onChange={(e) => { set("department", e.target.value); set("doctor", ""); }} required>
                <option value="">Select department</option>
                {DEPARTMENTS.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
              </select>
            </Field>
            <Field label="Doctor *">
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={f.doctor} onChange={(e) => set("doctor", e.target.value)} required>
                <option value="">Select doctor</option>
                {docList.map((d) => <option key={d.id} value={d.id}>{d.name} · Rs. {d.fee}</option>)}
              </select>
            </Field>
            <Field label="Appointment Date *"><Input type="date" min={new Date().toISOString().slice(0, 10)} value={f.date} onChange={(e) => set("date", e.target.value)} required /></Field>
            <Field label="Preferred Time *"><Input type="time" value={f.time} onChange={(e) => set("time", e.target.value)} required /></Field>
          </div>

          <Field label="Problem Description">
            <Textarea rows={4} placeholder="Briefly describe your symptoms…" value={f.problem} onChange={(e) => set("problem", e.target.value)} />
          </Field>

          <Button type="submit" size="lg" className="rounded-full" disabled={loading}>
            {loading ? "Booking…" : "Confirm Appointment"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">By booking you agree to our terms · Data is saved securely via Google Sheets.</p>
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-1.5"><Label className="text-xs font-semibold">{label}</Label>{children}</div>;
}
function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return <div className="flex items-center gap-2 border-b border-border pb-2 text-sm font-bold uppercase tracking-wider text-primary">{icon}{children}</div>;
}

function SlipView({ res, onNew }: { res: { id: string; data: typeof init; doctorName: string; deptName: string }; onNew: () => void }) {
  const { id, data, doctorName, deptName } = res;
  const qr = qrUrl(`BKBH|${id}|${data.fullName}|${data.cnic}`, 240);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 print:py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-6 w-6" />
            <span className="text-lg font-bold">Appointment Confirmed</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()} className="rounded-full"><Printer className="mr-2 h-4 w-4" /> Print / Save PDF</Button>
            <Button onClick={onNew} className="rounded-full">New Booking</Button>
          </div>
        </div>

        <div id="slip" className="rounded-3xl border-2 border-primary/30 bg-card p-8 shadow-card print:border-black print:shadow-none">
          <div className="flex items-start justify-between gap-4 border-b-2 border-primary pb-5">
            <div>
              <div className="text-2xl font-bold gradient-text">{HOSPITAL.name}</div>
              <div className="text-xs text-muted-foreground">{HOSPITAL.tagline}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{HOSPITAL.address}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Appointment ID</div>
              <div className="text-xl font-bold text-primary">{id}</div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
            <div className="grid gap-3 text-sm">
              <Row k="Patient" v={`${data.fullName}${data.fatherName ? ` (s/o ${data.fatherName})` : ""}`} />
              <Row k="CNIC" v={data.cnic} />
              <Row k="Mobile" v={data.mobile} />
              {data.age && <Row k="Age / Gender" v={`${data.age} · ${data.gender}`} />}
              <Row k="Department" v={deptName} />
              <Row k="Doctor" v={doctorName} />
              <Row k="Date & Time" v={`${data.date} · ${data.time}`} />
              {data.problem && <Row k="Concern" v={data.problem} />}
            </div>
            <div className="text-center">
              <img src={qr} alt="QR" className="rounded-lg border border-border" />
              <div className="mt-2 text-[10px] text-muted-foreground">Scan to verify</div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <strong>Emergency:</strong> {HOSPITAL.emergency} · Ambulance: {HOSPITAL.ambulance}
          </div>
          <div className="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
            <Calendar className="mx-auto mb-1 h-4 w-4" />
            Please arrive 15 minutes early with your CNIC.<br />
            <span className="font-semibold text-foreground">Thank you for choosing {HOSPITAL.name}.</span>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="font-medium">{v}</div>
    </div>
  );
}
