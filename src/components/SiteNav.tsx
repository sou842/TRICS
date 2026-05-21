import { Fingerprint, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/settings", label: "Settings" },
];

export const SiteNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg tracking-tight">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center">
            <Fingerprint className="w-5 h-5 text-primary-foreground" />
          </div>
          <span>TRICS<span className="text-primary">.</span>RESEARCH</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 bg-secondary/60 backdrop-blur-md border border-border rounded-full px-2 py-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden md:inline-flex rounded-full bg-gradient-to-r from-primary to-primary-glow">
            <Link to="/contact">Get Quote</Link>
          </Button>
          <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 grid place-items-center rounded-full border border-border" aria-label="Menu">
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto bg-card border border-border rounded-2xl p-3 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 text-sm font-medium rounded-xl ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};
