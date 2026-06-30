import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "@/components/ui/sonner";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export function PageHero({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <section className="relative overflow-hidden gradient-hero text-primary-foreground">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white, transparent 40%), radial-gradient(circle at 80% 60%, white, transparent 40%)" }} />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] opacity-80">{eyebrow}</p>}
        <h1 className="text-3xl font-bold sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base opacity-90 sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
