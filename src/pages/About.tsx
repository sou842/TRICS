import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Building2, Users, CheckCircle2, Target, Briefcase, ShieldCheck, TrendingUp, Handshake } from "lucide-react";
import heroImg from "@/assets/hero-construction.jpg";

const About = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SiteNav />
    
    {/* HERO SECTION */}
    <section className="px-6 pt-40 pb-20 bg-grid relative overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">// Our Identity</p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl leading-[1.1]">
          Building legacies with <span className="text-gradient">precision and trust</span>.
        </h1>
        <p className="mt-8 text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Trics Research Private Limited is a government-registered civil contracting leader delivering high-impact infrastructure and maintenance solutions across India.
        </p>
      </div>
    </section>

    {/* OVERVIEW IMAGE */}
    <section className="px-6 pb-24">
      <div className="max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden border border-border shadow-elegant relative group">
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <img src={heroImg} alt="Trics Research Infrastructure" loading="lazy" className="w-full aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
    </section>

    {/* MISSION & STORY */}
    <section className="px-6 py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-4xl font-bold mb-6 italic text-primary/80">Founded on Integrity.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed italic">
              "We aim to build long-term relationships rather than just completing projects."
            </p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Starting as a specialized contracting unit, Trics Research has evolved into a nationwide infrastructure powerhouse. We operate across central, state, and local government bodies, focusing on quality, timely delivery, and cost-effective execution.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div>
              <div className="font-display text-4xl font-bold text-primary mb-1">15+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Service Categories</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-primary mb-1">Pan-India</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Project Presence</div>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-[2rem] p-10 md:p-12 shadow-elegant relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700" />
          <h2 className="font-display text-3xl font-bold mb-8">Our Core Promise</h2>
          <div className="space-y-8">
            {[
              { t: "High-Quality Work", d: "Adhering to strict government standards and structural excellence.", i: CheckCircle2 },
              { t: "On-Time Delivery", d: "Rigorous project management to ensure every milestone is met.", i: Target },
              { t: "Cost-Effective Execution", d: "Strategic procurement and management to maximize value.", i: TrendingUp },
            ].map((item) => (
              <div key={item.t} className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.i className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">{item.t}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CLIENTS & PARTNERS */}
    <section className="px-6 py-24 bg-secondary/30 border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">// Trusted By</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Partnering with India's most critical sectors.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { t: "Govt. Departments", d: "Central & State" },
            { t: "Gram Panchayats", d: "Rural Development" },
            { t: "Hospitals", d: "Healthcare (NHM)" },
            { t: "Schools", d: "Education Sector" },
            { t: "Private Sector", d: "Commercial Projects" },
          ].map((client) => (
            <div key={client.t} className="bg-background border border-border rounded-2xl p-6 text-center hover:border-primary/40 transition-colors">
              <h4 className="font-semibold mb-1">{client.t}</h4>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{client.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* STRATEGIC VALUE */}
    <section className="px-6 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// The Trics Edge</p>
            <h2 className="font-display text-4xl font-bold leading-tight">Strategic approach to every <span className="text-gradient">blueprint</span>.</h2>
            <p className="text-muted-foreground">We don't just build; we optimize. Our business model is designed to deliver maximum reliability at sustainable costs.</p>
          </div>
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
            {[
              { 
                t: "AMC-Based Revenue", 
                d: "We secure long-term maintenance contracts after project completion to ensure stable, recurring income and continuous asset reliability.",
                i: Handshake
              },
              { 
                t: "Direct Procurement", 
                d: "By purchasing materials directly from manufacturers, we save 8–15% in costs, passing those savings directly to project efficiency.",
                i: TrendingUp
              },
              { 
                t: "Strategic Subcontracting", 
                d: "We leverage specialized experts for finishing works (painting, flooring) while maintaining high-level project management and margins.",
                i: Briefcase
              },
              { 
                t: "Compliance Focused", 
                d: "We are registered across multiple departments (PWD, NHM, Municipal), maximizing eligibility for diverse tender opportunities.",
                i: ShieldCheck
              },
            ].map((item) => (
              <div key={item.t} className="bg-card border border-border rounded-[2rem] p-8 hover:bg-secondary/20 transition-all group">
                <item.i className="w-10 h-10 text-primary mb-6 transition-transform group-hover:scale-110 duration-300" />
                <h3 className="font-display text-xl font-semibold mb-3">{item.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* VALUE PROPOSITION CTA */}
    <section className="px-6 pb-32">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            "Quality Construction. Timely Delivery. Trusted Partnership."
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Trics Research Private Limited is more than a contractor; we are your long-term partner in building sustainable, high-quality infrastructure for the future of India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-card border border-border rounded-full flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono uppercase tracking-widest">Govt. Registered</span>
            </div>
            <div className="px-6 py-3 bg-card border border-border rounded-full flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono uppercase tracking-widest">15+ Services</span>
            </div>
            <div className="px-6 py-3 bg-card border border-border rounded-full flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono uppercase tracking-widest">Pan-India Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default About;
