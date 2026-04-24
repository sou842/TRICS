"use client";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { services } from "@/lib/data";
import { CTA } from "@/components/site/CTA";
import { ServiceCard } from "@/components/site/ServiceCard";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const categories = Array.from(new Set(services.map(s => s.category)));

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
                <span className="text-ink">Expertise</span>
              </nav>
              
              <h1 className="text-5xl font-bold tracking-tight text-ink md:text-7xl lg:text-8xl">
                Core <br />
                <span className="text-ink-soft">Capabilities.</span>
              </h1>
            </div>
            
            <div className="max-w-md border-l border-border pl-8">
              <p className="text-lg leading-relaxed text-ink-soft">
                Integrated construction and specialized maintenance solutions 
                engineered for complex institutional and government infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-10">
          <div className="space-y-32">
            {categories.map((category) => (
              <div key={category} className="space-y-16">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-border pb-8">
                  <div className="max-w-xl">
                    <h2 className="text-3xl font-bold text-ink md:text-4xl">{category}</h2>
                    <p className="mt-4 text-sm text-ink-soft">
                      Specialized solutions focused on structural integrity and rigorous compliance within {category.toLowerCase()} sectors.
                    </p>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                    {services.filter(s => s.category === category).length} Core Services
                  </div>
                </div>
                
                <div className="grid gap-px bg-border border border-border md:grid-cols-2 lg:grid-cols-3">
                  {services
                    .filter((s) => s.category === category)
                    .map((service, idx) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <ServiceCard service={service} />
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}

