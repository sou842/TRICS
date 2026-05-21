import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Building2, Wrench, Paintbrush, LayoutGrid, Droplets, Lightbulb } from "lucide-react";

const services = [
  { i: Building2, t: "Civil Construction", d: "RCC structures, roads, drains, water tanks, and Panchayat buildings." },
  { i: Wrench, t: "Maintenance Services", d: "Hospital & institutional AMC/CMC, housekeeping, sanitation, and HVAC." },
  { i: Paintbrush, t: "Painting & Finishing", d: "Interior/exterior painting with waterproof and anti-fungal coatings." },
  { i: LayoutGrid, t: "Flooring Solutions", d: "Tiles, marble, granite, cement, and industrial epoxy flooring." },
  { i: Droplets, t: "Waterproofing & Sealing", d: "Terrace, basement, and bathroom waterproofing with tank lining." },
  { i: Lightbulb, t: "MEP Services", d: "Wiring, solar installation, street lights, and sewer line engineering." },
];

const Services = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SiteNav />
    <section className="px-6 pt-40 pb-20 bg-grid">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">// Capabilities</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
          Building India. One <span className="text-gradient">structure</span> at a time.
        </h1>
        <p className="mt-6 text-muted-foreground max-w-xl">From government infrastructure to private maintenance, our specialized teams deliver quality, efficiency, and long-term reliability.</p>
      </div>
    </section>

    <section className="px-6 pb-32 bg-dots">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <div key={s.t} className="group bg-card border border-border rounded-3xl p-8 hover:border-primary/40 transition-colors">
            <span className="font-mono text-xs text-muted-foreground">0{i+1}</span>
            <s.i className="w-10 h-10 text-primary my-6" />
            <h3 className="font-display text-xl font-semibold mb-2">{s.t}</h3>
            <p className="text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default Services;
