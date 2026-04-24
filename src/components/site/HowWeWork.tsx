import { siteConfig } from "@/lib/data";
import { Play } from "lucide-react";
import Image from "next/image";
import workFrame from "@/assets/work-frame.jpg";

export function HowWeWork() {
  const steps = [
    { n: "01", title: "Consultation & Planning", desc: "We start by understanding your goals and budget to create a solid project roadmap." },
    { n: "02", title: "Design & Pre-Construction", desc: "Our team brings your ideas to life with innovative design and detailed preparation." },
    { n: "03", title: "Construction & Delivery", desc: "We handle every phase of construction with precision, safety, and quality assurance." },
  ];
  return (
    <section className="px-6 py-20 md:px-10 md:py-28 lg:px-16">
      <div className="container">
        <div className="text-center">
          <p className="text-sm text-ink-soft">How we works</p>
          <h2 className="mt-2 text-4xl font-bold leading-tight text-ink md:text-5xl">
            How to work with<br />{siteConfig.name} Construction
          </h2>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={s.n}>
                <div className="grid grid-cols-[40px_1fr] gap-4">
                  <span className="pt-1 text-sm font-medium text-ink-soft">{s.n}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{s.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && <div className="mt-8 border-t border-dashed border-border" />}
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={workFrame}
              alt="House under construction"
              width={1280}
              height={896}
              className="h-full max-h-[420px] w-full object-cover"
            />
            <button
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-card transition hover:scale-105"
            >
              <Play className="h-5 w-5 fill-ink" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}