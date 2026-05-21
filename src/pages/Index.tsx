import { Button } from "@/components/ui/button";
import { ArrowUpRight, Shield, Award, Sparkles, Building2, Wrench, Lightbulb, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { projects } from "@/data/projects";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero Animations
    const heroTl = gsap.timeline();
    heroTl.fromTo(".hero-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 })
          .fromTo(".hero-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
          .fromTo(".hero-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
          .fromTo(".hero-stats", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
          .fromTo(".hero-button", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4");

    gsap.to(".hero-bg-grid", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // 2. Stats Counters
    const counters = gsap.utils.toArray(".stat-counter");
    counters.forEach((counter: any) => {
      const target = parseInt(counter.getAttribute("data-target"));
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
        }
      });
    });

    // 3. Staggered Reveals
    gsap.fromTo(".service-card", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ".services-grid", start: "top 85%" } }
    );
    
    gsap.fromTo(".process-card", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ".process-grid", start: "top 85%" } }
    );

    // 4. Magnetic Buttons
    const magnetButtons = document.querySelectorAll(".magnetic-button");
    magnetButtons.forEach((btn) => {
      const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

      btn.addEventListener("mousemove", (e: any) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        xTo((relX - rect.width / 2) * 0.4);
        yTo((relY - rect.height / 2) * 0.4);
      });

      btn.addEventListener("mouseleave", () => {
        xTo(0);
        yTo(0);
      });
    });

    // 5. Horizontal Scroll
    const track = document.querySelector('.projects-track');
    if (track) {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
      
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none"
      });
      
      ScrollTrigger.create({
        trigger: ".projects-section-wrapper",
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(".projects-progress", { scaleX: self.progress, duration: 0.1 });
        }
      });
    }
  }, { scope: container });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" ref={container}>
      <SiteNav />

      {/* HERO */}
      <section className="hero-section relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden">
        <div className="hero-bg-grid absolute inset-0 bg-grid" />
        <div className="absolute inset-0 radial-glow pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

        <div className="absolute inset-0 dark:hidden bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <p className="hero-badge font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-primary dark:text-primary mb-6 font-semibold">
            QUALITY. RELIABILITY. TIMELY DELIVERY.
          </p>

          <h1 className="hero-title font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight">
            Building The <br />
            Infrastructure{' '}
            <span className="relative inline-block px-4">
              <span className="text-gradient bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent dark:from-primary dark:via-primary-glow dark:to-primary">
                Of Tomorrow
              </span>
              <span className="absolute inset-0 border-2 dark:border border-primary/30 dark:border-primary/40 rounded-md shadow-sm dark:shadow-none" />
            </span>
          </h1>

          <p className="hero-desc mt-8 text-base md:text-lg text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A government-registered civil contracting company specializing in high-quality construction, infrastructure development, and long-term maintenance services across India.
          </p>

          <div className="hero-stats mt-10 flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br from-primary/20 to-primary/40 dark:from-muted dark:to-secondary shadow-md dark:shadow-none"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-semibold">15+</span> specialized service categories
            </p>
          </div>

          <div className="hero-button mt-10 inline-block">
            <Button
              asChild
              size="lg"
              className="magnetic-button bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 dark:hover:opacity-90 hover:shadow-lg dark:hover:shadow-none rounded-full px-8 py-6 text-base font-semibold glow-orange transition-all duration-300 shadow-md dark:shadow-none"
            >
              <Link to="/contact">Discuss Your Project →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto bg-card border border-border rounded-3xl p-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { v: "Pan-India", vNum: 0, suffix: "", l: "Presence & Execution", icon: Award },
              { v: "15+", vNum: 15, suffix: "+", l: "Service Categories", icon: LayoutGrid },
              { v: "100%", vNum: 100, suffix: "%", l: "Compliance Focused", icon: Shield },
              { v: "Govt.", vNum: 0, suffix: "", l: "Registered Contractor", icon: Building2 },
            ].map((s) => (
              <div key={s.l} className="bg-secondary/50 rounded-2xl p-6 flex flex-col gap-3">
                <s.icon className="w-5 h-5 text-primary" />
                <div className="font-display text-3xl md:text-4xl font-bold">
                  {s.vNum > 0 ? (
                    <span className="stat-counter" data-target={s.vNum}>0</span>
                  ) : (
                    <span>{s.v}</span>
                  )}
                  {s.vNum > 0 && s.suffix}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-32 bg-dots">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">// 01 — Capabilities</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight max-w-2xl">
                Infrastructure & <span className="text-gradient">maintenance</span>.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm">From foundational construction to long-term facility management — we bridge the gap between blueprint and reality.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 services-grid">
            {[
              { t: "Civil Construction", d: "High-quality RCC structures, road networks, and government infrastructure projects.", i: Building2 },
              { t: "AMC Maintenance", d: "Hospital and institutional maintenance ensuring 24/7 operational reliability.", i: Wrench },
              { t: "MEP Engineering", d: "Internal wiring, solar installations, and complex utility infrastructure systems.", i: Lightbulb },
            ].map((s, i) => (
              <Link to="/services" key={s.t} className="service-card group relative bg-card border border-border rounded-3xl p-8 hover:border-primary/40 transition-all">
                <div className="flex items-center justify-between mb-12">
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all" />
                </div>
                <s.i className="w-10 h-10 text-primary mb-6" />
                <h3 className="font-display text-2xl font-semibold mb-3">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS HORIZONTAL SCROLL */}
      <section className="relative bg-secondary/40 dark:bg-[#050505] projects-section-wrapper h-screen">
        <div className="absolute top-0 left-0 w-full h-full pt-24 pb-12 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="max-w-7xl mx-auto w-full mb-12 shrink-0 px-6">
            <div className="flex flex-col items-center text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary dark:text-[#e8714b] mb-6 border border-primary/20 dark:border-[#3e1f13] bg-primary/5 dark:bg-[#1a110d] px-4 py-1.5 rounded-sm">IMPACT</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground dark:text-white max-w-4xl leading-[1.1]">
                How We Are Doing It Faster And Better Than Others!
              </h2>
            </div>
          </div>

          {/* Track */}
          <div className="relative w-full flex-1 flex items-center">
            <div className="projects-track flex gap-6 md:gap-10 w-max px-[5vw]">
              {projects.slice(0, 5).map((p, i) => (
                <ProjectCard 
                  key={p.slug}
                  className={`w-[85vw] md:w-[420px] h-[60vh] min-h-[400px] max-h-[600px] shrink-0 ${i % 2 !== 0 ? 'md:translate-y-8' : 'md:-translate-y-8'}`}
                  img={p.img} 
                  tag={p.tag} 
                  title={p.title} 
                  location={p.desc} 
                  slug={p.slug} 
                />
              ))}
            </div>
          </div>
          
          {/* Progress Bar */}
          {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[50vw] max-w-sm h-1 bg-border dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary origin-left scale-x-0 projects-progress" />
          </div> */}
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-32 bg-secondary/40 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">// 03 — Process</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-16 max-w-3xl">From blueprint to <span className="text-gradient">handover</span>.</h2>
          <div className="grid md:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden process-grid">
            {[
              { n: "01", t: "Audit", d: "Site analysis, soil testing, and detailed infrastructure planning." },
              { n: "02", t: "Procure", d: "Direct material procurement saving 8-15% in project costs." },
              { n: "03", t: "Construct", d: "High-quality execution following all government standards." },
              { n: "04", t: "Maintain", d: "Securing long-term AMC contracts for recurring reliability." },
            ].map((p) => (
              <div key={p.n} className="process-card bg-background p-8 hover:bg-card transition-colors">
                <div className="font-mono text-primary text-sm mb-8">{p.n}</div>
                <h3 className="font-display text-2xl font-semibold mb-3">{p.t}</h3>
                <p className="text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - DESIGN MATCHED */}
      <section className="px-6 py-32 bg-background dark:bg-[#050505] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 rounded-sm border border-primary/20 dark:border-[#3e1f13] bg-primary/5 dark:bg-[#1a110d] text-primary dark:text-[#e8714b] font-mono text-[10px] uppercase tracking-[0.2em] mb-8">
              Hear from our partners
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground dark:text-white leading-tight">
              We Help Organizations Build <br />
              Ready-To-Last Infrastructure.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Rajesh Kumar",
                role: "Admin, Civil Department",
                rating: 4.8,
                text: "Trics Research delivered our community infrastructure ahead of schedule with unmatched quality. Their focus on government standards is exceptional.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
              },
              {
                name: "Dr. Ananya Singh",
                role: "Medical Superintendent",
                rating: 4.9,
                text: "The hospital AMC services provided by TRICS have been transformative. Our facility maintenance is now proactive rather than reactive.",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
              },
              {
                name: "Vikram Mehra",
                role: "Municipal Engineer",
                rating: 4.7,
                text: "Executing complex drainage and road networks requires precision. TRICS brings an engineering-first approach that is rare in the contracting world.",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
              }
            ].map((t) => (
              <div key={t.name} className="bg-card dark:bg-[#0d0d0d] border border-border dark:border-white/5 rounded-2xl p-8 hover:border-primary/20 transition-all group shadow-sm dark:shadow-none">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border dark:border-white/5">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  <div>
                    <h4 className="font-bold text-foreground dark:text-white tracking-tight text-lg">{t.name}</h4>
                    <p className="text-xs text-muted-foreground font-medium">{t.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-muted-foreground dark:text-gray-400 font-medium text-xs">{t.rating}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(t.rating) ? "fill-[#fbbf24] text-[#fbbf24]" : "fill-muted/30 dark:fill-gray-800 text-muted/30 dark:text-gray-800"}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed group-hover:text-foreground dark:group-hover:text-gray-300 transition-colors">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="px-6 py-32 bg-secondary/20 dark:bg-[#050505] relative overflow-hidden">
        {/* Decorative blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="inline-block px-4 py-1 rounded-sm border border-primary/20 dark:border-[#3e1f13] bg-primary/5 dark:bg-[#1a110d] text-primary dark:text-[#e8714b] font-mono text-[10px] uppercase tracking-[0.2em] mb-6">
                Support & Queries
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground dark:text-white mb-6 leading-[1.1]">
                Everything you <br/> need to know.
              </h2>
              <p className="text-muted-foreground dark:text-gray-400 text-lg mb-10 leading-relaxed max-w-md">
                We've compiled the most common questions our clients ask. If you have a specific inquiry about a project or contract, our team is ready to help.
              </p>
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-semibold border border-border dark:border-white/10 bg-card dark:bg-[#0d0d0d] text-foreground dark:text-white hover:bg-foreground hover:text-background dark:hover:bg-white dark:hover:text-black transition-all group shadow-sm dark:shadow-none">
                <Link to="/contact">
                  Contact Support <ArrowUpRight className="ml-2 w-4 h-4 group-hover:rotate-45 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="lg:col-span-7">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  {
                    q: "What types of infrastructure projects do you handle?",
                    a: "We specialize in a wide range of civil construction projects including RCC structures, road networks, drainage systems, and government buildings. We also handle large-scale commercial and institutional developments."
                  },
                  {
                    q: "Are you a government-registered contractor?",
                    a: "Yes, TRICS is a fully certified and government-registered civil contracting company. We adhere to all regulatory standards and compliance requirements for public and private sector projects."
                  },
                  {
                    q: "Do you provide maintenance services post-construction?",
                    a: "Absolutely. We offer comprehensive AMC (Annual Maintenance Contracts) and CMC (Comprehensive Maintenance Contracts) for hospitals, institutions, and commercial facilities ensuring 24/7 operational reliability."
                  },
                  {
                    q: "How do you ensure cost efficiency in your projects?",
                    a: "We leverage direct material procurement from manufacturers, eliminating middlemen. This allows us to consistently save 8-15% on material costs, which we pass on to our clients without compromising on quality."
                  },
                  {
                    q: "What is your approach to safety and quality control?",
                    a: "Safety and quality are our top priorities. We implement rigorous multi-phase quality audits, utilize advanced engineering techniques, and ensure all our staff and laborers are trained in the latest safety protocols."
                  }
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="bg-card dark:bg-[#0d0d0d] border border-border dark:border-white/5 rounded-2xl px-6 py-2 data-[state=open]:border-primary/40 data-[state=open]:bg-primary/5 transition-all shadow-sm dark:shadow-none">
                    <AccordionTrigger className="text-left font-display text-lg text-foreground dark:text-white hover:text-primary hover:no-underline py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground dark:text-gray-400 leading-relaxed text-base pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION - CLEAN DESIGN */}
      <section className="px-6 py-40 bg-background dark:bg-[#050505] relative overflow-hidden border-t border-border dark:border-none">
        {/* Subtle bottom glow for footer transition */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1 rounded-sm border border-primary/20 dark:border-[#3e1f13] bg-primary/5 dark:bg-[#1a110d] text-primary dark:text-[#e8714b] font-mono text-[10px] uppercase tracking-[0.2em] mb-10">
            Let's Collaborate
          </div>

          <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-foreground dark:text-white mb-12 leading-none">
            Ready to <span className="text-gradient">build</span> <br />
            your vision?
          </h2>

          <p className="text-muted-foreground dark:text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
            Partner with India's trusted government-registered contractor. We deliver excellence from rural roads to large-scale urban infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="w-full sm:w-auto rounded-none px-12 py-8 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-md dark:shadow-none">
              <Link to="/contact">Request a callback</Link>
            </Button>
            <Button asChild size="lg" className="w-full sm:w-auto rounded-none px-12 py-8 text-lg font-bold bg-secondary hover:bg-secondary/90 text-foreground dark:bg-white dark:hover:bg-white/90 dark:text-black transition-all shadow-md dark:shadow-none">
              <Link to="/projects">View Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

const ProjectCard = ({ img, tag, title, location, slug, className = "" }: { img: string; tag: string; title: string; location: string; slug: string; className?: string }) => (
  <Link to={`/projects/${slug}`} className={`group relative overflow-hidden rounded-[24px] ${className}`}>
    <img src={img} alt={title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

    {/* Tag */}
    <div className="absolute top-6 left-6 z-20">
      <span className="flex items-center gap-1.5 font-sans font-medium text-xs text-white bg-[#e8714b] px-4 py-1.5 rounded-full shadow-lg">
        <Sparkles className="w-3 h-3" />
        {tag.split(' · ')[1] || tag}
      </span>
    </div>

    {/* Arrow */}
    <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-black flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45 group-hover:scale-110 shadow-xl border border-white/10">
      <ArrowUpRight className="w-5 h-5 text-white" />
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
      <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-300 font-medium leading-relaxed line-clamp-2">{location}</p>
    </div>
  </Link>
);

export default Index;
