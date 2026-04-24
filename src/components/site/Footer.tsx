import Link from "next/link";
import { Circle, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Footer() {
  const links = {
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Our Experience", href: "/about#experience" },
      { label: "Contact", href: "/contact" },
      { label: "Partner Portal", href: "/login" },
      { label: "Privacy Policy", href: "#" },
    ],
    Services: [
      { label: "Civil Construction", href: "/services" },
      { label: "Maintenance", href: "/services" },
      { label: "Painting", href: "/services" },
      { label: "MEP Services", href: "/services" },
    ],
    Projects: [
      { label: "Completed Projects", href: "/projects" },
      { label: "Ongoing Projects", href: "/projects" },
      { label: "Government Tenders", href: "/projects" },
    ],
  };

  return (
    <footer className="border-t border-border bg-surface px-6 pb-12 pt-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-ink">
              <Circle className="h-6 w-6 fill-primary stroke-primary" />
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-ink-soft">
              Trusted partnership in modern construction. Specialized in government tenders, 
              institutional maintenance, and large-scale private infrastructure projects.
            </p>
            <div className="space-y-3 text-sm text-ink-soft">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>{siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>{siteConfig.email}</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink">{title}</h3>
              <ul className="space-y-3 text-sm">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-ink-soft transition hover:text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-ink-soft">
            © 2025 {siteConfig.name} Construction Co. All Rights Reserved. 
            <span className="ml-2 inline-block px-2 py-0.5 rounded-sm bg-secondary text-[10px] font-bold text-ink uppercase">
              Govt Registered Vendor
            </span>
          </p>
          <div className="flex items-center gap-5 text-ink-soft">
            {/* Social icons removed temporarily */}
          </div>
        </div>
      </div>
    </footer>
  );
}