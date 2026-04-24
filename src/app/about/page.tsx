"use client";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { departments, siteConfig } from "@/lib/data";
import { CTA } from "@/components/site/CTA";
import Image from "next/image";
import aboutImg from "@/assets/about-cranes.jpg";
import { ShieldCheck, Target, ChevronRight, Award, History, Building } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      
      {/* Structural Hero Section */}
      <section className="relative bg-white pt-40 pb-24 border-b border-border">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <nav className="mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-ink">Our Legacy</span>
              </nav>
              
              <h1 className="text-5xl font-bold tracking-tight text-ink md:text-7xl lg:text-8xl">
                Building <br />
                <span className="text-ink-soft">With Purpose.</span>
              </h1>
            </div>
            
            <div className="max-w-md border-l border-border pl-8">
              <p className="text-lg leading-relaxed text-ink-soft">
                A legacy of over 25 years in national infrastructure development, 
                defined by structural integrity and unwavering commitment to public missions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid gap-20 lg:grid-cols-2 lg:items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] overflow-hidden bg-surface"
            >
              <Image 
                src={aboutImg} 
                alt="Our Legacy" 
                fill 
                className="object-cover" 
              />
              <div className="absolute bottom-0 left-0 bg-white p-8 max-w-[240px]">
                <div className="text-4xl font-bold text-ink">25+</div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                  Years of Uninterrupted Service
                </div>
              </div>
            </motion.div>

            <div className="space-y-12 py-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-ink md:text-5xl tracking-tight">The Foundation of Trust.</h2>
                <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
                  <p>
                    {siteConfig.name} Construction was established with a clear objective: to execute 
                    infrastructure projects that serve as landmarks of quality and reliability. 
                    What began as a specialized civil contracting firm has evolved into a 
                    premier Class-A registered government vendor.
                  </p>
                  <p>
                    Our operational philosophy is built on navigating the rigorous 
                    requirements of large-scale public tenders while maintaining the 
                    agility and precision of a specialized architectural partner.
                  </p>
                </div>
              </div>

              <div className="grid gap-8 pt-12 border-t border-border sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-surface text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-ink">Certified Excellence</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    ISO 9001:2015 certified and Class-A government registered for multi-state operations.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-surface text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-ink">Operational Precision</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    Maintaining a 98% on-time completion rate across complex institutional frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-surface/30">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mb-20 max-w-2xl">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4">Strategic Partners</h2>
            <h3 className="text-3xl font-bold text-ink md:text-5xl tracking-tight">Government & Industrial Network.</h3>
            <p className="mt-6 text-lg text-ink-soft leading-relaxed">
              We operate as a trusted partner for national departments and 
              private sector leaders through diverse procurement and execution models.
            </p>
          </div>

          <div className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, idx) => (
              <motion.div 
                key={dept.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex flex-col bg-white p-10 group"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center bg-surface text-ink transition-colors group-hover:bg-primary group-hover:text-white">
                  <Building className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-bold text-ink group-hover:text-primary transition-colors">{dept.name}</h4>
                <div className="mt-8 pt-6 border-t border-border">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">Registered Vendor</span>
                </div>
              </motion.div>
            ))}
            <div className="flex flex-col bg-primary p-10 text-white">
              <div className="mb-8 flex h-12 w-12 items-center justify-center bg-white/10 text-white">
                <History className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold">25 Years of Impact</h4>
              <p className="mt-6 text-sm text-white/60 leading-relaxed">
                Ongoing partnerships with leading IT corridors and manufacturing hubs across the nation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}


