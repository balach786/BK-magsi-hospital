import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { DOCTORS, DEPARTMENTS } from "@/data/hospital";
import { CalendarCheck, Users, FileText, MessageSquare, DollarSign, Bell, Building2, Stethoscope, FlaskConical, Briefcase, Ambulance } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — BK Baloch Hospital" },
      { name: "description", content: "Internal admin dashboard for BK Baloch Hospital." },
    ],
  }),
  component: Admin,
});

const apptData = [
  { day: "Mon", v: 34 }, { day: "Tue", v: 42 }, { day: "Wed", v: 38 },
  { day: "Thu", v: 51 }, { day: "Fri", v: 47 }, { day: "Sat", v: 60 }, { day: "Sun", v: 22 },
];
const revData = [
  { m: "Jan", v: 850 }, { m: "Feb", v: 920 }, { m: "Mar", v: 1100 },
  { m: "Apr", v: 980 }, { m: "May", v: 1250 }, { m: "Jun", v: 1340 },
];

function Admin() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Internal" title="Admin Dashboard" subtitle="Overview of operations. Connect to Google Sheets via Apps Script for live data." />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: CalendarCheck, t: "Today's Appointments", v: "47", c: "text-primary" },
            { icon: Users, t: "Monthly Patients", v: "1,284", c: "text-success" },
            { icon: FileText, t: "Pending Reports", v: "12", c: "text-warning" },
            { icon: MessageSquare, t: "New Feedback", v: "8", c: "text-primary" },
            { icon: DollarSign, t: "Revenue (Jun)", v: "Rs. 1.34M", c: "text-success" },
          ].map((s) => (
            <div key={s.t} className="card-premium p-5">
              <s.icon className={`h-6 w-6 ${s.c}`} />
              <div className="mt-3 text-2xl font-bold">{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.t}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="card-premium p-5">
            <div className="flex items-center justify-between"><h3 className="font-bold">Appointments this week</h3><Bell className="h-4 w-4 text-muted-foreground" /></div>
            <div className="mt-3 h-64">
              <ResponsiveContainer><BarChart data={apptData}><XAxis dataKey="day" /><YAxis /><Tooltip /><Bar dataKey="v" fill="var(--primary)" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer>
            </div>
          </div>
          <div className="card-premium p-5">
            <h3 className="font-bold">Revenue trend (Rs. ‘000)</h3>
            <div className="mt-3 h-64">
              <ResponsiveContainer><AreaChart data={revData}><XAxis dataKey="m" /><YAxis /><Tooltip /><Area dataKey="v" stroke="var(--primary)" fill="color-mix(in oklab, var(--primary) 30%, transparent)" /></AreaChart></ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            { icon: Stethoscope, t: "Doctors", v: DOCTORS.length },
            { icon: Building2, t: "Departments", v: DEPARTMENTS.length },
            { icon: FlaskConical, t: "Lab Reports (mo)", v: 312 },
            { icon: Briefcase, t: "Job Applications", v: 47 },
            { icon: Ambulance, t: "Ambulance Requests", v: 18 },
            { icon: Bell, t: "Announcements", v: 4 },
          ].map((b) => (
            <div key={b.t} className="card-premium flex items-center gap-4 p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><b.icon className="h-5 w-5" /></div>
              <div><div className="text-lg font-bold">{b.v}</div><div className="text-xs text-muted-foreground">{b.t}</div></div>
            </div>
          ))}
        </div>

        <div className="mt-6 card-premium overflow-hidden">
          <div className="border-b border-border p-5"><h3 className="font-bold">Recent Appointments</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground"><tr>
                <th className="py-3 pl-5 text-left">ID</th><th className="text-left">Patient</th><th className="text-left">Doctor</th><th className="text-left">Date</th><th className="pr-5 text-right">Status</th>
              </tr></thead>
              <tbody>{[
                ["BKBH-2026-000142","Ahmed Khan","Dr. Balach Baloch","2026-06-26","Confirmed"],
                ["BKBH-2026-000141","Fareeha S.","Dr. Sarah Ali","2026-06-26","Pending"],
                ["BKBH-2026-000140","Bilal M.","Dr. Saddam","2026-06-25","Completed"],
                ["BKBH-2026-000139","Hina R.","Dr. Sana Riaz","2026-06-25","Completed"],
              ].map((r) => (
                <tr key={r[0]} className="border-t border-border">
                  <td className="py-3 pl-5 font-mono text-xs">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td>
                  <td className="pr-5 text-right"><span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{r[4]}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
