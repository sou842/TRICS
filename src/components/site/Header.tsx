"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Circle, Menu, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nav = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isLightPage = pathname === "/projects" || pathname === "/about" || pathname === "/services" || pathname === "/contact";
  
  // Theme variants based on page and scroll
  const isDarkTheme = !isLightPage && !isScrolled;

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 transition-all duration-500",
      isScrolled ? "py-4" : "py-8"
    )}>
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className={cn(
          "relative flex items-center justify-between px-6 py-3 transition-all duration-500 md:px-4",
          isScrolled 
            ? "rounded-full bg-white/80 shadow-2xl shadow-navy/5 backdrop-blur-xl border border-border" 
            : "rounded-none bg-transparent border-none"
        )}>
          {/* Logo */}
          <Link 
            href="/" 
            className={cn(
              "flex items-center gap-2.5 transition-colors duration-500",
              isDarkTheme ? "text-white" : "text-ink"
            )}
          >
            {/* <div className="relative flex h-8 w-8 items-center justify-center">
              <Circle className="h-6 w-6 fill-primary stroke-primary" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full rounded-full border border-primary/20" 
              />
            </div> */}
            <span className="text-xl font-bold tracking-tight">{siteConfig.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 md:flex">
            {nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                    isActive 
                      ? (isDarkTheme ? "text-white" : "text-ink") 
                      : (isDarkTheme ? "text-white/40 hover:text-white" : "text-ink/40 hover:text-ink")
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className={cn(
                "group hidden items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 md:flex",
                isDarkTheme 
                  ? "bg-white text-ink hover:bg-white/90" 
                  : "bg-ink text-white hover:bg-ink/90"
              )}
            >
              Get a Quote
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Mobile Toggle */}
            <button
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden",
                isDarkTheme ? "bg-white/10 text-white" : "bg-ink/5 text-ink"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] flex flex-col bg-white p-8 md:hidden"
          >
            <div className="flex items-center justify-between border-b border-border pb-8">
              <div className="flex items-center gap-2 text-ink">
                <Circle className="h-6 w-6 fill-primary stroke-primary" />
                <span className="text-xl font-bold">{siteConfig.name}</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-ink"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="mt-12 flex flex-col gap-6">
              {nav.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-4xl font-bold tracking-tight transition-colors",
                      pathname === item.href ? "text-primary" : "text-ink"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 pt-12 border-t border-border"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-4 rounded-full bg-ink py-5 text-lg font-bold text-white shadow-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get a Quote
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}