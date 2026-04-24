import { ArrowRight, MapPin, Building2, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects as allProjects } from "@/lib/data";

export function Projects() {
  // Show featured projects in the original "Row" style
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <section id="projects" className="bg-surface py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Portfolio</p>
          <h2 className="mt-2 text-4xl font-bold text-ink md:text-5xl">Major Completed Works</h2>
        </div>

        <div className="space-y-4">
          {featuredProjects.map((p, index) => {
            const isReverse = index % 2 !== 0;
            const info = (
              <div className="flex flex-col justify-between rounded-2xl bg-white p-8 md:p-10 border border-border">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                    <Building2 className="h-3 w-3" />
                    {p.department}
                  </div>
                  <h3 className="text-2xl font-bold text-ink md:text-3xl">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft line-clamp-3">
                    {p.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-ink">
                    <MapPin className="h-4 w-4 text-primary" />
                    {p.location}
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-6 border-t border-dashed border-border pt-8 sm:grid-cols-4">
                  {[
                    { k: "Status:", v: p.status, c: "text-emerald-600" },
                    { k: "Client:", v: p.client },
                    { k: "Year:", v: p.year },
                    { k: "Department:", v: p.department },
                  ].map((c) => (
                    <div key={c.k}>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-ink/40">{c.k}</div>
                      <div className={cn("mt-1 text-sm font-bold text-ink truncate", c.c)} title={c.v}>{c.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
            const img = (
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={1024}
                  height={768}
                  className="h-full min-h-[300px] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            );
            return (
              <div key={p.id} className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
                {isReverse ? <>{img}{info}</> : <>{info}{img}</>}
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-4 rounded-full bg-navy px-8 py-4 text-sm font-bold text-white transition-all hover:bg-black hover:-translate-y-1"
          >
            Explore Full Portfolio
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-navy group-hover:bg-primary group-hover:text-white transition-colors">
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";