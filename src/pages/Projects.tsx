import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getProjects } from "@/lib/localStorageData";

const Projects = () => {
  const projects = getProjects();
  
  return (
  <div className="min-h-screen bg-background text-foreground">
    <SiteNav />
    <section className="px-6 pt-40 pb-20 bg-grid">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">// Portfolio</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
          Building the foundations of <span className="text-gradient">excellence</span>.
        </h1>
        <p className="mt-6 text-muted-foreground max-w-xl">A curated selection of our infrastructure and maintenance projects across India — from civil construction to specialized MEP services.</p>
      </div>
    </section>

    <section className="px-6 pb-32">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {projects.map((p, idx) => (
          <Link to={`/projects/${p.slug}`} key={idx} className="group bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/40 transition-all">
            <div className="relative aspect-[5/4] overflow-hidden">
              <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute top-5 left-5 font-mono text-xs bg-background/70 backdrop-blur px-3 py-1.5 rounded-full border border-border">{p.tag}</span>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.location} · {p.area}</p>
                </div>
                <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center group-hover:rotate-45 transition-transform shrink-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <SiteFooter />
  </div>
  );
};

export default Projects;
