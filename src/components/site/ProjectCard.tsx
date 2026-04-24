import Image from "next/image";
import Link from "next/link";
import { MapPin, Building2, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isCompleted = project.status === "Completed";

  return (
    <Link 
      href={`/projects/${project.id}`}
      className="group block overflow-hidden bg-white transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Subtle Status */}
        <div className="absolute right-0 top-0 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-ink">
          {project.status}
        </div>

        {/* Minimal Progress (if ongoing) */}
        {!isCompleted && project.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-in-out" 
              style={{ width: `${project.progress}%` }} 
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-6">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-soft">
          <Building2 className="h-3 w-3" />
          {project.department}
        </div>
        
        <h3 className="text-xl font-bold leading-tight tracking-tight text-ink group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-ink-soft/80">
          {project.description}
        </p>

        {/* Footer Meta */}
        <div className="mt-6 flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-ink-soft">
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-primary" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 text-primary" />
            <span>{project.year}</span>
          </div>
          <div className="ml-auto opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}
