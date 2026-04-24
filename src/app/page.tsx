import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { HowWeWork } from "@/components/site/HowWeWork";
import { Projects } from "@/components/site/Projects";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-ink">
      <div className="relative">
        <Header />
        <Hero />
      </div>
      <About />
      <Services />
      <HowWeWork />
      <Projects />
      {/* <section className="bg-surface py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary">Portfolio</p>
              <h2 className="mt-2 text-3xl font-bold text-ink md:text-5xl">Featured Projects</h2>
            </div>
            <a href="/projects" className="text-sm font-bold uppercase tracking-widest text-primary hover:underline">
              View All Projects →
            </a>
          </div>
          <Projects />
        </div>
      </section> */}

      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
