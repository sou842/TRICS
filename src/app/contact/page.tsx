"use client";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mail, Phone, MapPin, Clock, Send, ChevronRight, Building2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    subject: "Tender Enquiry",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formState);
  };

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
                <span className="text-ink">Contact & Tenders</span>
              </nav>
              
              <h1 className="text-5xl font-bold tracking-tight text-ink md:text-7xl lg:text-8xl">
                Partner <br />
                <span className="text-ink-soft">With Us.</span>
              </h1>
            </div>
            
            <div className="max-w-md border-l border-border pl-8">
              <p className="text-lg leading-relaxed text-ink-soft">
                Direct channels for government tender submissions, corporate 
                partnerships, and specialized infrastructure inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid gap-20 lg:grid-cols-12 lg:items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">Strategic Headquarters</h2>
                  <div className="flex items-start gap-4 text-lg text-ink-soft leading-relaxed">
                    <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                    <p>{siteConfig.address}</p>
                  </div>
                </div>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center bg-surface text-primary shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-ink-soft mb-1">Direct Lines</h3>
                      <p className="text-lg font-bold text-ink">{siteConfig.phone}</p>
                      <p className="text-sm text-ink-soft">Primary Tenders Line</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center bg-surface text-primary shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-ink-soft mb-1">Electronic Mail</h3>
                      <p className="text-lg font-bold text-ink">{siteConfig.email}</p>
                      <p className="text-sm text-ink-soft">24/7 Monitored Registry</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="relative aspect-video w-full overflow-hidden bg-surface border border-border group">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-[12px] border-white/50" />
              </div>
            </div>

            {/* Right: Smart Form */}
            <div className="lg:col-span-7 bg-surface p-8 md:p-12 border border-border">
              <div className="mb-10 flex items-center gap-4">
                <div className="h-px w-12 bg-primary" />
                <h2 className="text-xl font-bold tracking-tight text-ink uppercase tracking-[0.2em]">Enquiry Registry</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-white border-b border-border px-0 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">Work Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-white border-b border-border px-0 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
                      placeholder="rahul@department.gov.in"
                    />
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">Organization / Dept</label>
                    <div className="relative">
                      <Building2 className="absolute right-0 top-3 h-4 w-4 text-ink-soft/30" />
                      <input 
                        type="text" 
                        className="w-full bg-white border-b border-border px-0 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
                        placeholder="e.g. PWD Bhopal"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">Enquiry Type</label>
                    <select 
                      className="w-full bg-white border-b border-border px-0 py-3 text-sm focus:border-primary focus:outline-none transition-colors appearance-none"
                    >
                      <option>Tender Enquiry</option>
                      <option>Project Consultation</option>
                      <option>Corporate Partnership</option>
                      <option>General Support</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">Project Details / Message</label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full bg-white border-b border-border px-0 py-3 text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="Provide a brief overview of your requirement or tender reference number..."
                  />
                </div>

                <button 
                  type="submit"
                  className="group inline-flex items-center gap-6 bg-navy px-10 py-5 text-sm font-bold text-white transition-all hover:bg-ink"
                >
                  Register Inquiry
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>

              <div className="mt-12 pt-12 border-t border-border flex items-center gap-4 text-ink-soft/40">
                <Clock className="h-4 w-4" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Response Time: Under 24 Business Hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

