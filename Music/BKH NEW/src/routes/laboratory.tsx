import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LAB_TESTS } from "@/data/hospital";
import { callApi } from "@/lib/api";
import { Home, Search, FlaskConical, Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/laboratory")({
  head: () => ({
    meta: [
      { title: "Laboratory — BK Baloch Hospital" },
      { name: "description", content: "Browse lab tests, prices and download reports from BK Baloch Hospital's fully automated lab." },
      { property: "og:title", content: "Laboratory — BKBH" },
      { property: "og:description", content: "Lab tests, pricing and online report download." },
    ],
  }),
  component: Lab,
});

function Lab() {
  const [q, setQ] = useState("");
  const [reportId, setReportId] = useState("");
  const tests = useMemo(() => LAB_TESTS.filter((t) => t.name.toLowerCase().includes(q.toLowerCase())), [q]);

  async function findReport(e: React.FormEvent) {
    e.preventDefault();
    if (!reportId) return;
    const res = await callApi<any>("getLabReport", { reportId });
    if (res?.url) window.open(res.url, "_blank");
    else toast.error("Report not found yet. Please try again later.");
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Diagnostics" title="Laboratory Services" subtitle="Accurate, accredited diagnostics with home sample collection." />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="card-premium p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search tests…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead><tr className="text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 text-left">Test</th><th className="text-left">Preparation</th><th className="text-right">Price</th><th className="text-center">Home</th>
                </tr></thead>
                <tbody>{tests.map((t) => (
                  <tr key={t.name} className="border-t border-border">
                    <td className="py-3 font-medium flex items-center gap-2"><FlaskConical className="h-4 w-4 text-primary" /> {t.name}</td>
                    <td className="text-muted-foreground">{t.prep}</td>
                    <td className="text-right font-semibold">Rs. {t.price.toLocaleString()}</td>
                    <td className="text-center">{t.home ? <Home className="mx-auto h-4 w-4 text-success" /> : "—"}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>

          <form onSubmit={findReport} className="card-premium h-fit p-6">
            <h3 className="text-lg font-bold">Download your report</h3>
            <p className="mt-1 text-sm text-muted-foreground">Enter your report ID to securely download your PDF report.</p>
            <div className="mt-4 grid gap-3">
              <Label className="text-xs font-semibold">Report ID</Label>
              <Input placeholder="LAB-2026-000123" value={reportId} onChange={(e) => setReportId(e.target.value)} />
              <Button type="submit" className="rounded-full"><Download className="mr-2 h-4 w-4" /> Get Report</Button>
            </div>
            <div className="mt-6 rounded-2xl bg-secondary/60 p-4 text-xs text-muted-foreground">
              Reports are stored securely on Google Drive and accessible only via your unique report ID.
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
