import { cn } from "@/lib/utils";
import { Service } from "@/lib/data";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <div className="group flex flex-col bg-white p-10 border border-border hover:border-primary/20 transition-all duration-300">
      <div className="mb-8 flex h-14 w-14 items-center justify-center bg-surface text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon className="h-7 w-7" />
      </div>
      
      <h3 className="text-2xl font-bold tracking-tight text-ink">
        {service.title}
      </h3>
      
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
        {service.description}
      </p>

      <div className="mt-10 pt-8 border-t border-border">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft">Strategic Value</h4>
        <ul className="mt-6 space-y-4">
          {[
            "Compliance Guaranteed",
            "Institutional Quality",
            "Certified Workflow"
          ].map((cap) => (
            <li key={cap} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-ink/70">
              <div className="h-1.5 w-1.5 bg-primary" />
              {cap}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
