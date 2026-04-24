"use client";

import { services } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between mb-20">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              <div className="h-px w-8 bg-primary" />
              02 / Expertise
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-ink md:text-6xl lg:text-7xl">
              National <br />
              <span className="text-ink-soft">Core Expertise.</span>
            </h2>
          </div>
          
          <div className="max-w-md border-l border-border pl-8">
            <p className="text-lg leading-relaxed text-ink-soft mb-8">
              Providing comprehensive engineering, construction, and technical 
              maintenance solutions for high-stakes public missions.
            </p>
            <Link 
              href="/services" 
              className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ink hover:text-primary transition-colors"
            >
              View Strategic Directory
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Expertise Grid */}
        <div className="grid gap-px bg-border border border-border md:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white p-10 transition-colors hover:bg-surface"
              >
                <div className="mb-10 flex h-14 w-14 items-center justify-center bg-surface text-ink transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-2xl font-bold tracking-tight text-ink mb-4">
                  {service.title}
                </h3>
                
                <p className="text-sm leading-relaxed text-ink-soft mb-8 flex-1">
                  {service.description}
                </p>

                <div className="pt-6 border-t border-border">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40 group-hover:text-primary transition-colors">
                    Standard Compliance
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}