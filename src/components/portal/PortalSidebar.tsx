"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LogOut, 
  Circle,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";

interface SidebarItem {
  label: string;
  href: string;
  icon: any;
}

interface PortalSidebarProps {
  role: "admin" | "supervisor";
  items: SidebarItem[];
}

export function PortalSidebar({ role, items }: PortalSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <motion.aside 
        initial={false}
        animate={{ 
          width: isCollapsed ? "80px" : "280px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 hidden h-screen flex-col border-r border-border bg-white lg:flex z-[100] shadow-2xl shadow-navy/5"
      >
        {/* Brand area */}
        <div className={cn(
          "flex h-24 items-center border-b border-border transition-all duration-300",
          isCollapsed ? "justify-center px-0" : "px-8"
        )}>
          <Link href="/" className="flex items-center gap-3 text-ink">
            <div className="relative flex h-8 w-8 items-center justify-center shrink-0">
              <Circle className="h-6 w-6 fill-primary stroke-primary" />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="text-xl font-bold tracking-tight text-ink uppercase leading-none">{siteConfig.name}</span>
                <div className="mt-1 flex items-center gap-1.5">
                  <div className="h-1 w-1 rounded-full bg-emerald-500" />
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-ink-soft/40">
                    {role} Core
                  </span>
                </div>
              </motion.div>
            )}
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 pt-10 overflow-y-auto no-scrollbar">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 px-4 text-[9px] font-bold uppercase tracking-[0.3em] text-ink/30"
            >
              Operations
            </motion.div>
          )}
          <div className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.label : ""}
                  className={cn(
                    "group relative flex items-center gap-4 py-4 transition-all duration-300",
                    isCollapsed ? "justify-center px-0" : "px-5",
                    isActive 
                      ? "bg-navy text-white shadow-lg shadow-navy/20" 
                      : "text-ink-soft hover:bg-surface hover:text-ink"
                  )}
                >
                  <Icon className={cn(
                    "h-4 w-4 shrink-0 transition-colors", 
                    isActive 
                      ? "text-white" 
                      : "text-ink/30 group-hover:text-ink"
                  )} />
                  {isActive && (
                    <div className="absolute right-0 top-0 h-full w-1 bg-primary" />
                  )}
                  {!isCollapsed && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom section */}
        <div className={cn(
          "border-t border-border p-4 transition-all duration-300",
          isCollapsed ? "items-center" : ""
        )}>
          <Link
            href="/"
            className={cn(
              "group flex items-center gap-4 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-ink-soft transition-all hover:text-destructive",
              isCollapsed ? "justify-center px-0" : "px-5"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1 group-hover:text-destructive" />
            {!isCollapsed && <span className="whitespace-nowrap">Exit System</span>}
          </Link>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-28 flex h-6 w-6 items-center justify-center bg-white border border-border rounded-full text-ink-soft hover:text-primary hover:shadow-lg cursor-pointer transition-all shadow-md z-50"
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </motion.aside>

      {/* Adjust main content padding based on sidebar state */}
      <style jsx global>{`
        main.lg\\:pl-64 {
          padding-left: ${isCollapsed ? '80px' : '280px'} !important;
          transition: padding-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}
