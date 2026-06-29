import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { callApi } from "@/lib/api";
import { Briefcase, Upload } from "lucide-react";
import { toast } from "sonner";

const JOBS = [
  { t: "Senior Cardiologist", cat: "Doctor", type: "Full-time" },
  { t: "ICU Nurse", cat: "Nurse", type: "Full-time" },
  { t: "Front Desk Receptionist", cat: "Receptionist", type: "Full-time" },
  { t: "Hospital Pharmacist", cat: "Pharmacist", type: "Full-time" },
  { t: "Lab Technician", cat: "Lab Technician", type: "Full-time" },
  { t: "Pediatric Nurse", cat: "Nurse", type: "Part-time" },
];

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — BK Baloch Hospital" },
      { name: "description", content: "Join the BK Baloch Hospital team. View openings and apply online with your resume." },
      { property: "og:title", content: "Careers — BKBH" },
      { property: "og:description", content: "Open positions for doctors, nurses, lab and admin staff." },
    ],
  }),
  component: Careers,
});

function Careers() {
  const [f, setF] = useState({ name: "", email: "", position: "", resume: "" });
  const [loading, setLoading] = useState(false);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Resume must be under 5MB"); return; }
    const reader = new FileReader();
    reader.onload = () => setF((p) => ({ ...p, resume: String(reader.result) }));
    reader.readAsDataURL(file);
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    try { await callApi("submitCareer", f); toast.success("Application submitted! Our HR team will contact you."); setF({ name: "", email: "", position: "", resume: "" }); }
    finally { setLoading(false); }
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Join us" title="Careers at BKBH" subtitle="Build your career in a culture that values clinical excellence, learning and compassion." />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold">Open Positions</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {JOBS.map((j) => (
              <div key={j.t} className="card-premium p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Briefcase className="h-5 w-5" /></div>
                  <div><div className="text-base font-bold">{j.t}</div><div className="text-xs text-muted-foreground">{j.cat} · {j.type}</div></div>
                </div>
                <Button variant="outline" size="sm" className="mt-4 rounded-full" onClick={() => setF((p) => ({ ...p, position: j.t }))}>Apply Now</Button>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="card-premium grid h-fit gap-4 p-6">
          <h3 className="text-lg font-bold">Submit Your Application</h3>
          <div className="grid gap-1.5"><Label className="text-xs font-semibold">Full Name</Label><Input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
          <div className="grid gap-1.5"><Label className="text-xs font-semibold">Email</Label><Input type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
          <div className="grid gap-1.5"><Label className="text-xs font-semibold">Position</Label><Input required value={f.position} onChange={(e) => setF({ ...f, position: e.target.value })} /></div>
          <div className="grid gap-1.5">
            <Label className="text-xs font-semibold">Upload Resume (PDF/DOC, max 5MB)</Label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/40 px-4 py-6 text-sm text-muted-foreground hover:bg-secondary">
              <Upload className="h-4 w-4" /> {f.resume ? "File attached ✓" : "Click to upload resume"}
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={onFile} />
            </label>
          </div>
          <Button type="submit" className="rounded-full" disabled={loading}>{loading ? "Submitting…" : "Submit Application"}</Button>
          <p className="text-[11px] text-muted-foreground">Resumes are securely stored in Google Drive via Apps Script.</p>
        </form>
      </section>
    </SiteLayout>
  );
}
