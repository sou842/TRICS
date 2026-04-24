import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import john from "@/assets/avatar-john.jpg";
import stive from "@/assets/avatar-stive.jpg";

const items = [
  { quote: "Top-tier craftsmanship and flawless finishing — every detail exceeded our expectations.", name: "John Doe", role: "Operations Manager", rating: 5, avatar: john },
  { quote: "We couldn't be happier with the outcome. The team was attentive, professional, and delivered exactly what we envisioned.", name: "Stive Hook", role: "Operations Manager", rating: 4, avatar: stive },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-20 md:px-10 md:py-28 lg:px-16">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm text-ink-soft">Client's Feedback</p>
            <h2 className="mt-2 text-4xl font-bold leading-tight text-ink md:text-5xl">
              What our clients say<br />after getting our service
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition hover:bg-secondary">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((t) => (
            <div key={t.name} className="rounded-2xl bg-secondary p-7">
              <p className="text-base leading-relaxed text-ink">"{t.quote}"</p>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={48} height={48} className="h-11 w-11 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold text-ink">{t.name}</div>
                    <div className="text-xs text-ink-soft">{t.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
                    ))}
                  </div>
                  <div className="mt-1 text-xs text-ink-soft">{t.rating} out of 5 star</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}