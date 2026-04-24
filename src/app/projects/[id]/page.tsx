import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { projects } from "@/lib/data";
import { CTA } from "@/components/site/CTA";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Building2, Calendar, User, Briefcase, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Project Hero */}
      <section className="relative h-[65vh] min-h-[500px] w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover brightness-[0.5]"
          priority
        />
        <div className="container relative mx-auto flex h-full flex-col justify-end pb-16 px-6 md:px-10 lg:px-16">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/20">
              <span className={cn(
                "h-2 w-2 rounded-full",
                project.status === "Completed" ? "bg-emerald-400" : "bg-orange-400 animate-pulse"
              )} />
              {project.status} Project
            </div>
            <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl leading-tight">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="font-medium">{project.department}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
            {/* Left Column: Details */}
            <div className="space-y-20">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-ink md:text-4xl">Project Overview</h2>
                <div className="prose prose-lg text-ink-soft max-w-none">
                  <p className="text-xl leading-relaxed text-ink/80 font-medium">
                    {project.description}
                  </p>
                  <p className="mt-6 leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>
              </div>

              <div className="space-y-10">
                <h2 className="text-3xl font-bold text-ink md:text-4xl">Project Milestones</h2>
                <div className="relative space-y-0 border-l-2 border-border ml-4">
                  {project.milestones.map((m, i) => (
                    <div key={m.title} className="relative pl-12 pb-12 last:pb-0">
                      {/* Dot */}
                      <div className="absolute -left-[11px] top-0 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-sm" />
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                          <Calendar className="h-3.5 w-3.5" />
                          {m.date}
                        </div>
                        <h3 className="text-xl font-bold text-ink">{m.title}</h3>
                        <p className="text-base text-ink-soft leading-relaxed">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery Section */}
              <div className="space-y-10">
                <h2 className="text-3xl font-bold text-ink md:text-4xl">Image Gallery</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((img, i) => (
                    <div key={i} className={cn(
                      "relative h-72 overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.02]",
                      i === 0 && "sm:col-span-2 sm:h-[450px]"
                    )}>
                      <Image 
                        src={img} 
                        alt={`Project Detail ${i + 1}`} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Section */}
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-ink md:text-4xl">Project Location</h2>
                  <div className="flex items-center gap-2 text-sm font-medium text-ink-soft">
                    <MapPin className="h-4 w-4 text-primary" />
                    {project.location}
                  </div>
                </div>
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-inner border border-border bg-surface">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(project.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Right Column: Project Info Sidebar */}
            <div className="space-y-8">
              <div className="sticky top-24 border border-border bg-white p-10">
                <div className="mb-10 flex items-center gap-4">
                  <div className="h-px w-8 bg-primary" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    Technical Specifications
                  </h3>
                </div>
                
                <div className="space-y-10">
                  <div className="group border-b border-border pb-6 transition-colors hover:border-primary/30">
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-soft/40 mb-2">Principal Client</div>
                    <p className="text-sm font-bold text-ink uppercase tracking-wider">{project.client}</p>
                  </div>

                  <div className="group border-b border-border pb-6 transition-colors hover:border-primary/30">
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-soft/40 mb-2">Executing Authority</div>
                    <p className="text-sm font-bold text-ink uppercase tracking-wider">{project.department}</p>
                  </div>

                  <div className="group border-b border-border pb-6 transition-colors hover:border-primary/30">
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-soft/40 mb-2">Commission Year</div>
                    <p className="text-sm font-bold text-ink uppercase tracking-wider">{project.year}</p>
                  </div>

                  <div className="group border-b border-border pb-6 transition-colors hover:border-primary/30">
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-soft/40 mb-2">Operational Site</div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-primary" />
                      <p className="text-sm font-bold text-ink uppercase tracking-wider">{project.location}</p>
                    </div>
                  </div>
                </div>

                {project.status === "Ongoing" && project.progress && (
                  <div className="space-y-6 pt-10 border-t border-border">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
                      <span className="text-ink-soft/40">Execution Phase</span>
                      <span className="text-primary">{project.progress}% Complete</span>
                    </div>
                    <div className="h-0.5 w-full bg-border overflow-hidden">
                      <div 
                        className="h-full bg-ink transition-all duration-1000" 
                        style={{ width: `${project.progress}%` }} 
                      />
                    </div>
                  </div>
                )}

                <button className="group mt-12 flex w-full items-center justify-center gap-6 bg-navy py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-ink">
                  Download Case Study
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
