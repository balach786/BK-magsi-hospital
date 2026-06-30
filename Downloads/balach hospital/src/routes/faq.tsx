import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/data/hospital";
import { Search } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — BK Baloch Hospital" },
      { name: "description", content: "Answers to common questions about appointments, emergency, lab reports and more at BK Baloch Hospital." },
      { property: "og:title", content: "FAQ — BKBH" },
      { property: "og:description", content: "Frequently asked questions." },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  const [q, setQ] = useState("");
  const items = useMemo(() => FAQS.filter((f) => (f.q + f.a).toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <SiteLayout>
      <PageHero eyebrow="Help center" title="Frequently Asked Questions" subtitle="Quick answers to the questions our patients ask most." />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search FAQs…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <Accordion type="single" collapsible className="mt-6">
          {items.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="card-premium mb-3 px-5">
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </SiteLayout>
  );
}
