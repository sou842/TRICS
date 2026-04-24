"use client";

import Image from "next/image";
import aboutCranes from "@/assets/about-cranes.jpg";
import { stats } from "@/lib/data";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 bg-white border-b border-border">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between mb-20">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              <div className="h-px w-8 bg-primary" />
              01 / Legacy & Mission
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-ink md:text-6xl lg:text-7xl">
              Grounded in <br />
              <span className="text-ink-soft">Structural Integrity.</span>
            </h2>
          </div>
          
          <div className="max-w-md border-l border-border pl-8">
            <p className="text-lg leading-relaxed text-ink-soft">
              Delivering national infrastructure excellence with a fusion of 
              <span className="text-ink font-bold"> Class-A certification</span> and 
              strategic technical insight since 1998.
            </p>
          </div>
        </div>

        {/* Story & Stats Layout */}
        <div className="grid gap-px bg-border border border-border lg:grid-cols-12">
          {/* Imagery */}
          <div className="lg:col-span-8 relative overflow-hidden group bg-surface">
            <Image
              src={aboutCranes}
              alt="Major construction project site"
              width={1280}
              height={896}
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10" />
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 bg-border gap-px">
            {stats.map((s, idx) => (
              <motion.div 
                key={s.label} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 flex flex-col justify-center group hover:bg-surface transition-colors"
              >
                <div className="text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl group-hover:text-primary transition-colors">
                  {s.value}
                </div>
                <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft/40">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}