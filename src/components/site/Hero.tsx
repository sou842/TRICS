import { ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import heroCrane from "@/assets/hero-crane.jpg";
import cardResidential from "@/assets/card-residential.jpg";
import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="px-3 pt-3 md:px-5 md:pt-5">
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px]">
        <Image
          src={heroCrane}
          alt="Construction Infrastructure"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/20 to-navy/40" />
        <div className="relative px-6 pb-12 pt-32 md:px-12 md:pb-20 md:pt-40 lg:px-16 lg:pb-28 lg:pt-48">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md border border-white/20 mb-6 uppercase tracking-widest">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Govt Registered Class-A Contractor</span>
            </div>
            
            <h1 className="text-5xl font-bold leading-[1.02] text-white md:text-6xl lg:text-7xl">
              Quality Construction. <br />
              Timely Delivery. <br />
              <span className="text-primary-foreground">Trusted Partnership.</span>
            </h1>
            
            <p className="mt-6 max-w-xl text-lg text-white/80 md:text-xl">
              Delivering excellence in Civil Construction, MEP, and Institutional Maintenance 
              for government departments and leading private enterprises across India.
            </p>
            
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/projects"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-primary px-8 text-lg font-bold text-primary-foreground transition-all hover:bg-primary/90 shadow-lg"
              >
                Explore Projects
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white/10 px-8 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 border border-white/20"
              >
                Our Experience
              </Link>
            </div>
          </div>

          <div className="mt-16 hidden md:absolute md:bottom-8 md:right-8 md:mt-0 md:block lg:bottom-10 lg:right-10">
            <div className="w-[280px] overflow-hidden rounded-2xl bg-white p-2 shadow-2xl border border-white/20">
              <Image
                src={cardResidential}
                alt="Infrastructure Excellence"
                width={560}
                height={400}
                className="h-40 w-full rounded-xl object-cover"
              />
              <div className="px-3 pb-3 pt-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Live Projects
                </div>
                <p className="mt-2 text-sm font-bold text-ink">Modern Infrastructure</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                  Executing high-spec government tenders with zero compromise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}