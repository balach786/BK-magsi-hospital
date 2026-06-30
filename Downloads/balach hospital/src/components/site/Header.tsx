import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Moon, Sun, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOSPITAL } from "@/data/hospital";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/bk-hospital-logo.png.asset.json";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/departments", label: "Departments" },
  { to: "/doctors", label: "Doctors" },
  { to: "/laboratory", label: "Lab" },
  { to: "/packages", label: "Packages" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [urdu, setUrdu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.lang = urdu ? "ur" : "en";
    document.documentElement.dir = urdu ? "rtl" : "ltr";
  }, [urdu]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all",
        scrolled ? "glass-strong shadow-soft" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white shadow-soft">
            <img src={logoAsset.url} alt={`${HOSPITAL.name} logo`} className="h-full w-full object-contain" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold leading-tight sm:text-lg">
              {HOSPITAL.name}
            </span>
            <span className="block truncate text-[11px] text-muted-foreground">
              {HOSPITAL.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-primary/10 text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle language"
            onClick={() => setUrdu((v) => !v)}
            className="hidden h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 transition hover:bg-accent sm:grid"
          >
            <Languages className="h-4 w-4" />
          </button>
          <button
            aria-label="Toggle theme"
            onClick={() => setDark((v) => !v)}
            className="hidden h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 transition hover:bg-accent sm:grid"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={`tel:${HOSPITAL.emergency}`}
            className="hidden items-center gap-2 rounded-full bg-destructive px-3 py-2 text-xs font-semibold text-destructive-foreground shadow-soft transition hover:opacity-90 sm:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" /> {HOSPITAL.emergency}
          </a>
          <Link to="/appointment" className="hidden sm:block">
            <Button className="rounded-full">Book Appointment</Button>
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass-strong border-t border-border lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-accent"
                activeProps={{ className: "bg-primary/10 text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/appointment" onClick={() => setOpen(false)} className="mt-2">
              <Button className="w-full rounded-full">Book Appointment</Button>
            </Link>
            <a
              href={`tel:${HOSPITAL.emergency}`}
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground"
            >
              <Phone className="h-4 w-4" /> Emergency · {HOSPITAL.emergency}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
