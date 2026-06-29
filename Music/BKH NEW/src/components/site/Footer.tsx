import { Link } from "@tanstack/react-router";
import { Stethoscope, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { HOSPITAL, DEPARTMENTS } from "@/data/hospital";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-background to-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl gradient-hero text-primary-foreground shadow-glow">
              <Stethoscope className="h-6 w-6" />
            </span>
            <div>
              <div className="text-base font-bold">{HOSPITAL.name}</div>
              <div className="text-xs text-muted-foreground">{HOSPITAL.tagline}</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A trusted multi-specialty hospital delivering compassionate, world-class healthcare in Balochistan.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 transition hover:bg-primary hover:text-primary-foreground">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              ["/about","About Us"],["/doctors","Find a Doctor"],["/appointment","Book Appointment"],
              ["/patient-portal","Patient Portal"],["/careers","Careers"],["/faq","FAQ"],
            ].map(([to,l]) => (
              <li key={to}><Link to={to as any} className="transition hover:text-primary">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Departments</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {DEPARTMENTS.slice(0, 6).map((d) => (
              <li key={d.slug}>
                <Link to="/departments/$slug" params={{ slug: d.slug }} className="transition hover:text-primary">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {HOSPITAL.address}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /> {HOSPITAL.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" /> {HOSPITAL.email}</li>
            <li className="mt-2 rounded-xl bg-destructive/10 px-3 py-2 text-destructive">
              <div className="text-[11px] font-semibold uppercase">Emergency</div>
              <a href={`tel:${HOSPITAL.emergency}`} className="text-lg font-bold">{HOSPITAL.emergency}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {HOSPITAL.name} (BKBH). All rights reserved.</p>
          <p>Built with care · Powered by Google Apps Script</p>
        </div>
      </div>
    </footer>
  );
}
