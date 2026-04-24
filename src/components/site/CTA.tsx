import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import ctaTowers from "@/assets/cta-towers.jpg";
import Link from "next/link";

import { siteConfig } from "@/lib/data";

export function CTA() {
  return (
    <section id="contact" className="container pb-24">
      <div className="relative overflow-hidden bg-navy rounded-3xl">
        {/* Background Image with grounded overlay */}
        <div className="absolute inset-0">
          <Image 
            src={ctaTowers} 
            alt="Modern construction skyline" 
            width={1920} 
            height={1024} 
            className="h-full w-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
        </div>

        <div className="relative flex flex-col items-start px-8 py-20 text-left text-white md:px-16 md:py-24">
          <div className="mb-6 flex h-px w-12 bg-primary" />

          <h2 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            Partner with Us for Your <br /> 
            National Infrastructure Projects.
          </h2>
          
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            Specializing in high-stakes government tenders and large-scale industrial 
            developments with a focus on structural excellence and timely delivery.
          </p>

          <div className="mt-12 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-6 bg-primary px-8 py-4 text-sm font-bold text-white transition-all hover:bg-primary/90"
            >
              Start Tender Enquiry
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              <Mail className="h-4 w-4 text-primary" />
              {siteConfig.email}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}